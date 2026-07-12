import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/container";
import { parseCheckoutItem, computeOrderTotals } from "@/lib/checkout";
import { isStripeConfigured } from "@/lib/stripe/config";
import { formatCurrency } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site-config";
import { getCurrentUser } from "@/lib/supabase/server";
import StripeButton from "@/components/checkout/stripe-button";
import PayPalButton from "@/components/checkout/paypal-button";
import CashAppPayment from "@/components/checkout/cashapp-payment";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const item = parseCheckoutItem(params);
  const sig = typeof params.sig === "string" ? params.sig : undefined;

  if (!item) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-bold text-brand-950">Nothing to check out</h1>
        <p className="mt-2 text-brand-600">
          Start a search and select a flight, hotel, car, or package to book.
        </p>
        <Link href="/" className="mt-4 inline-block font-semibold text-accent-600">
          Back to search
        </Link>
      </Container>
    );
  }

  const { subtotal, serviceFee, total } = computeOrderTotals(item.price);
  const user = await getCurrentUser();

  return (
    <Container className="py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-brand-950">Complete your booking</h1>
        <p className="mt-1 text-sm text-brand-600">
          Review your order and choose how you&apos;d like to pay.
        </p>

        <div className="mt-6 rounded-2xl border border-brand-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">
            {item.type}
          </p>
          <h2 className="mt-1 text-lg font-semibold text-brand-950">{item.title}</h2>

          <dl className="mt-5 space-y-2 border-t border-brand-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand-600">Subtotal</dt>
              <dd className="text-brand-900">{formatCurrency(subtotal, item.currency)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-600">Service fee (10%)</dt>
              <dd className="text-brand-900">{formatCurrency(serviceFee, item.currency)}</dd>
            </div>
            <div className="flex justify-between border-t border-brand-100 pt-2 text-base font-bold">
              <dt className="text-brand-950">Total</dt>
              <dd className="text-brand-950">{formatCurrency(total, item.currency)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 space-y-3">
          <StripeButton item={item} sig={sig} configured={isStripeConfigured} />
          <PayPalButton item={item} userId={user?.id} userEmail={user?.email} />
          <CashAppPayment
            cashtag={siteConfig.cashAppTag}
            total={total}
            item={item}
            userId={user?.id}
            userEmail={user?.email}
          />
        </div>

        <p className="mt-6 text-center text-xs text-brand-400">
          Payments are processed securely. You&apos;ll receive a confirmation
          email once your payment is complete.
        </p>
      </div>
    </Container>
  );
}
