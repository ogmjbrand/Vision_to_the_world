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
 * Also keeps payment/booking status in sync when a refund is issued
 * (whether from the admin panel's Refund button or directly in the Stripe
 * Dashboard) via charge.refunded, and carries a payment_intent.succeeded
 * backstop for the rare case checkout.session.completed itself is lost in
 * transit (see handlePaymentIntentSucceeded below).
 *
 * Configure all three events on the Stripe Dashboard endpoint — see
 * docs/STRIPE_SETUP.md.
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

  const supabase = createAdminClient();
  if (!supabase) {
    console.error("[webhook:stripe] SUPABASE_SERVICE_ROLE_KEY is not configured — cannot process", event.id);
    return NextResponse.json({ error: "Service role not configured." }, { status: 503 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      return handleCheckoutCompleted(supabase, event.data.object as Stripe.Checkout.Session);
    case "payment_intent.succeeded":
      return handlePaymentIntentSucceeded(stripe, supabase, event.data.object as Stripe.PaymentIntent);
    case "charge.refunded":
      return handleChargeRefunded(supabase, event.data.object as Stripe.Charge);
    default:
      return NextResponse.json({ received: true });
  }
}

async function handleCheckoutCompleted(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  session: Stripe.Checkout.Session,
) {
  const meta = session.metadata;

  if (!meta?.userId || !meta.type || !meta.title || !meta.subtotal) {
    console.error("[webhook:stripe] checkout.session.completed missing required metadata:", session.id);
    return NextResponse.json({ received: true });
  }

  // bookings.stripe_session_id is unique-constrained, so this guard makes
  // the handler safe to run twice for the same session (a Stripe retry, or
  // a race with the success-page path) — whichever arrives first wins.
  const existing = await findBookingByStripeSession(supabase, session.id);
  if (existing) {
    return NextResponse.json({ received: true, alreadyFulfilled: true });
  }

  // The payment_intent id (not the checkout session id) is what refunds are
  // issued against, so it's what gets stored as the payment's gateway
  // reference — session id stays on bookings.stripe_session_id for the
  // idempotency check above.
  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;

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
    gatewayReference: paymentIntentId ?? session.id,
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

/**
 * checkout.session.completed is what actually fulfils a booking — it fires
 * at (or within moments of) the same time this event does for the same
 * payment, so this is normally a no-op. It exists purely as a backstop for
 * the rare case that event is lost in transit but this one still arrives:
 * look up which Checkout Session this PaymentIntent belongs to and run it
 * through the exact same handler, so there's exactly one idempotency check
 * (bookings.stripe_session_id) regardless of which event triggers
 * fulfillment — no separate code path that could double-book a payment
 * both events report.
 */
async function handlePaymentIntentSucceeded(
  stripe: NonNullable<ReturnType<typeof getStripeClient>>,
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  paymentIntent: Stripe.PaymentIntent,
) {
  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent.id,
    limit: 1,
  });
  const session = sessions.data[0];
  if (!session) {
    return NextResponse.json({ received: true }); // Not a Checkout-originated payment.
  }
  return handleCheckoutCompleted(supabase, session);
}

async function handleChargeRefunded(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  charge: Stripe.Charge,
) {
  const paymentIntentId =
    typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
  if (!paymentIntentId) {
    return NextResponse.json({ received: true });
  }

  const { data: payment } = await supabase
    .from("payments")
    .select("id, booking_id, status")
    .eq("gateway_reference", paymentIntentId)
    .eq("gateway", "stripe")
    .maybeSingle();

  if (!payment) {
    console.error("[webhook:stripe] charge.refunded for unknown payment_intent:", paymentIntentId);
    return NextResponse.json({ received: true });
  }

  if (payment.status === "refunded") {
    return NextResponse.json({ received: true, alreadyProcessed: true }); // Stripe retry / duplicate delivery.
  }

  const fullyRefunded = charge.amount_refunded >= charge.amount;

  await Promise.all([
    supabase
      .from("payments")
      .update({ status: fullyRefunded ? "refunded" : "paid" })
      .eq("id", payment.id),
    fullyRefunded
      ? supabase.from("bookings").update({ status: "cancelled" }).eq("id", payment.booking_id)
      : Promise.resolve(),
  ]);

  return NextResponse.json({ received: true, refunded: fullyRefunded });
}
