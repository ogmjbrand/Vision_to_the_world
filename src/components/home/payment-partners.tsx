"use client";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { paymentMethods } from "@/lib/data/payment-methods";
import { cn } from "@/lib/utils";

export default function PaymentPartners() {
  const { t } = useLanguage();

  return (
    <section className="border-y border-brand-100 bg-brand-50/60 py-14">
      <Container>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <span className="flex items-center gap-2 text-sm font-semibold text-brand-700">
            <ShieldCheck className="h-4 w-4 text-accent-600" />
            {t.paymentPartners.trustLine}
          </span>

          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {paymentMethods.map(({ id, label, Icon, dark }) => (
              <li key={id} title={label}>
                <div
                  className={cn(
                    "flex h-12 w-[4.25rem] items-center justify-center rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:h-14 sm:w-20",
                    dark
                      ? "border-brand-950 bg-brand-950"
                      : "border-brand-200 bg-white",
                  )}
                >
                  <Icon
                    aria-hidden
                    size={30}
                    className={dark ? "text-white" : "text-brand-900"}
                  />
                  <span className="sr-only">{label}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
