import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/server";
import { computeOrderTotals } from "@/lib/checkout";
import { checkoutHref, verifyCheckoutItemSignature } from "@/lib/checkout-sign";
import { getCurrentUser } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 503 },
    );
  }

  // Identify the payer server-side (never trust a client-supplied user id) so
  // the webhook can record the booking and send emails even if this browser
  // never makes it back to /checkout/success.
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "You must be signed in to check out." }, { status: 401 });
  }

  const body = await request.json();
  const { type, title, price, currency, travelDate, sig } = body as {
    type?: string;
    title?: string;
    price?: number;
    currency?: string;
    travelDate?: string;
    sig?: string;
  };

  if (!type || !title || !Number.isFinite(price) || (price as number) <= 0) {
    return NextResponse.json({ error: "Invalid checkout item." }, { status: 400 });
  }

  const item = { type, title, price: price as number, currency: currency ?? "USD", travelDate };

  // The price a client submits here must match what checkoutHref() originally
  // signed when the listing was rendered — otherwise nothing stops a browser
  // from editing the /checkout URL (or replaying this POST) with a lower
  // price and having Stripe charge that instead.
  if (!verifyCheckoutItemSignature(item, sig)) {
    return NextResponse.json(
      { error: "This checkout link has expired or was modified. Please go back and select the item again." },
      { status: 400 },
    );
  }

  const { subtotal, serviceFee, total } = computeOrderTotals(price as number);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: (currency ?? "usd").toLowerCase(),
          unit_amount: Math.round(subtotal * 100),
          product_data: { name: title, description: `${type} booking` },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: (currency ?? "usd").toLowerCase(),
          unit_amount: Math.round(serviceFee * 100),
          product_data: { name: "Vision To The World service fee (10%)" },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${checkoutHref(item)}`,
    metadata: {
      type,
      title,
      subtotal: String(subtotal),
      total: String(total),
      currency: currency ?? "USD",
      userId: user.id,
      ...(travelDate ? { travelDate } : {}),
    },
  });

  return NextResponse.json({ url: session.url });
}
