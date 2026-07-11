"use client";

import Container from "@/components/ui/container";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

const partners = ["Stripe", "PayPal", "Cash App"];

export default function PaymentPartners() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-brand-100 bg-brand-50/60 py-14">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="flex items-center gap-2 text-sm font-semibold text-brand-700">
            <ShieldCheck className="h-4 w-4 text-accent-600" />
            {t.paymentPartners.trustLine}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {partners.map((p) => (
              <div
                key={p}
                className="rounded-xl border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-sm"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
