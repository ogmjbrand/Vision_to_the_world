import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripeClient } from "@/lib/stripe/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { findBookingByStripeSession, recordPaidBooking } from "@/lib/supabase/bookings";
import { sendBookingConfirmationEmail, sendInvoiceEmail } from "@/lib/resend/emails";

export const maxDuration = 30;

/**
 * The authoritative fulfillment path for Stripe payments: unlike
 * src/app/checkout/success/page.tsx (which only runs if the customer's
 * browser makes it back to that page with an active session), Stripe calls
 * this server-to-server the moment a Checkout Session completes — so a
 * closed tab, dropped connection, or failed redirect still results in a
 * recorded booking and a sent confirmation/invoice.
 *
 * Both paths call the same findBookingByStripeSession() guard, and
 * bookings.stripe_session_id is unique-constrained in the schema, so
 * whichever path runs first wins and the other is a no-op — safe even if
 * both fire for the same session.
 */
export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[webhook:stripe] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const meta = session.metadata;

  if (!meta?.userId || !meta.type || !meta.title || !meta.subtotal) {
    console.error("[webhook:stripe] checkout.session.completed missing required metadata:", session.id);
    return NextResponse.json({ received: true });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    console.error("[webhook:stripe] SUPABASE_SERVICE_ROLE_KEY is not configured — cannot fulfill", session.id);
    return NextResponse.json({ error: "Service role not configured." }, { status: 503 });
  }

  const existing = await findBookingByStripeSession(supabase, session.id);
  if (existing) {
    return NextResponse.json({ received: true, alreadyFulfilled: true });
  }

  const { booking, invoice, error: bookingError } = await recordPaidBooking(supabase, {
    userId: meta.userId,
    item: {
      type: meta.type,
      title: meta.title,
      price: Number(meta.subtotal),
      currency: meta.currency ?? "USD",
      travelDate: meta.travelDate,
    },
    gateway: "stripe",
    gatewayReference: session.id,
    stripeSessionId: session.id,
  });

  if (bookingError || !booking) {
    console.error("[webhook:stripe] failed to record booking for session", session.id, bookingError);
    return NextResponse.json({ error: "Failed to record booking." }, { status: 500 });
  }

  const customerEmail = session.customer_details?.email ?? session.customer_email;
  if (!customerEmail) {
    console.error("[webhook:stripe] booking recorded but no customer email on session", session.id);
    return NextResponse.json({ received: true });
  }

  const bookingRef = `VTW-${booking.id.slice(0, 8).toUpperCase()}`;
  const subtotal = Number(meta.subtotal);
  const total = Number(meta.total ?? meta.subtotal);

  await Promise.all([
    sendBookingConfirmationEmail({
      to: customerEmail,
      title: meta.title,
      type: meta.type,
      bookingRef,
      total,
      currency: meta.currency ?? "USD",
    }),
    sendInvoiceEmail({
      to: customerEmail,
      invoiceNumber: invoice?.invoice_number ?? bookingRef,
      title: meta.title,
      subtotal,
      serviceFee: total - subtotal,
      total,
      currency: meta.currency ?? "USD",
    }),
  ]);

  return NextResponse.json({ received: true, bookingId: booking.id });
}
