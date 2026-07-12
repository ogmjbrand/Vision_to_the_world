import { SERVICE_FEE_RATE } from "@/lib/stripe/config";

export type CheckoutItem = {
  type: string;
  title: string;
  price: number;
  currency: string;
  /** ISO date (YYYY-MM-DD) the trip departs/checks in — powers the trip-reminder cron. Optional since not every service (visa assistance, insurance) has one. */
  travelDate?: string;
};

export function parseCheckoutItem(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
): CheckoutItem | null {
  const get = (key: string): string | undefined =>
    params instanceof URLSearchParams
      ? (params.get(key) ?? undefined)
      : typeof params[key] === "string"
        ? (params[key] as string)
        : undefined;

  const type = get("type");
  const title = get("title");
  const price = Number(get("price"));
  const currency = get("currency") ?? "USD";
  const travelDate = get("travelDate");

  if (!type || !title || !Number.isFinite(price) || price <= 0) return null;

  return { type, title, price, currency, ...(travelDate ? { travelDate } : {}) };
}

export function computeOrderTotals(price: number) {
  const serviceFee = Math.round(price * SERVICE_FEE_RATE * 100) / 100;
  const total = Math.round((price + serviceFee) * 100) / 100;
  return { subtotal: price, serviceFee, total };
}
