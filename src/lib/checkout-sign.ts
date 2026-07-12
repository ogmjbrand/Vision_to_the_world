import { createHmac, timingSafeEqual } from "node:crypto";
import type { CheckoutItem } from "@/lib/checkout";

/**
 * Server-only: signs/verifies a checkout item's price-bearing fields so
 * /api/checkout/stripe can reject a request whose price doesn't match what
 * was originally quoted — e.g. the /checkout URL edited in devtools, or the
 * POST body replayed with a lower price. Keyed on STRIPE_SECRET_KEY, which
 * never reaches the browser and is already required for this flow, so no
 * new secret needs provisioning. Import this only from server components and
 * route handlers — node:crypto breaks the client bundle.
 */
function canonical(item: CheckoutItem): string {
  return [item.type, item.title, item.price, item.currency, item.travelDate ?? ""].join("|");
}

export function signCheckoutItem(item: CheckoutItem): string | null {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return null;
  return createHmac("sha256", secret).update(canonical(item)).digest("hex");
}

export function verifyCheckoutItemSignature(
  item: CheckoutItem,
  signature: string | undefined | null,
): boolean {
  const expected = signCheckoutItem(item);
  if (!expected || !signature) return false;
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(signature, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Same query-string shape as src/lib/checkout.ts#checkoutHref, plus a `sig` the Stripe route requires. */
export function checkoutHref(item: CheckoutItem): string {
  const params = new URLSearchParams({
    type: item.type,
    title: item.title,
    price: String(item.price),
    currency: item.currency,
  });
  if (item.travelDate) params.set("travelDate", item.travelDate);
  const sig = signCheckoutItem(item);
  if (sig) params.set("sig", sig);
  return `/checkout?${params.toString()}`;
}
