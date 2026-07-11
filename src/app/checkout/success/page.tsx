import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { getStripeClient } from "@/lib/stripe/server";
import { formatCurrency } from "@/lib/utils";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { findBookingByStripeSession, recordPaidBooking } from "@/lib/supabase/bookings";

export const metadata: Metadata = { title: "Booking Confirmed" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  let title: string | undefined;
  let amount: number | undefined;
  let currency: string | undefined;

  if (sessionId) {
    const stripe = getStripeClient();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        title = (session.metadata?.title as string | undefined) ?? undefined;
        amount = session.amount_total ? session.amount_total / 100 : undefined;
        currency = session.currency?.toUpperCase();

        const user = await getCurrentUser();
        const supabase = await createClient();
        const meta = session.metadata;

        if (user && supabase && meta?.type && meta.title && meta.subtotal) {
          const existing = await findBookingByStripeSession(supabase, sessionId);
          if (!existing) {
            await recordPaidBooking(supabase, {
              userId: user.id,
              item: {
                type: meta.type,
                title: meta.title,
                price: Number(meta.subtotal),
                currency: meta.currency ?? "USD",
              },
              gateway: "stripe",
              gatewayReference: sessionId,
              stripeSessionId: sessionId,
            });
          }
        }
      } catch {
        // Session lookup or booking insert failed — still show a generic confirmation below.
      }
    }
  }

  return (
    <Container className="py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-brand-950">Booking confirmed</h1>
      <p className="mt-2 text-brand-600">
        {title ? (
          <>
            Thanks for booking <strong>{title}</strong>
            {amount && currency ? ` — ${formatCurrency(amount, currency)} paid.` : "."}
          </>
        ) : (
          "Thanks — your payment was received."
        )}{" "}
        A confirmation has been sent to your email.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <LinkButton href="/dashboard/bookings">View my bookings</LinkButton>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-brand-200 px-4 py-2.5 text-sm font-semibold text-brand-900 hover:bg-brand-50"
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
