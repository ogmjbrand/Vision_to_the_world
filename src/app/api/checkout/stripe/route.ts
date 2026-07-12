import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe/server";
import { computeOrderTotals } from "@/lib/checkout";

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured on this deployment." },
      { status: 503 },
    );
  }

  const body = await request.json();
  const { type, title, price, currency, travelDate } = body as {
    type?: string;
    title?: string;
    price?: number;
    currency?: string;
    travelDate?: string;
  };

  if (!type || !title || !Number.isFinite(price) || (price as number) <= 0) {
    return NextResponse.json({ error: "Invalid checkout item." }, { status: 400 });
  }

  const { subtotal, serviceFee, total } = computeOrderTotals(price as number);
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
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
    cancel_url: `${origin}/checkout?${new URLSearchParams({
      type,
      title,
      price: String(price),
      currency: currency ?? "USD",
    }).toString()}`,
    metadata: {
      type,
      title,
      subtotal: String(subtotal),
      total: String(total),
      currency: currency ?? "USD",
      ...(travelDate ? { travelDate } : {}),
    },
  });

  return NextResponse.json({ url: session.url });
}
