"use client";

import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import {
  UserPlus,
  Search,
  CreditCard,
  FileCheck,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";

const stepIcons: LucideIcon[] = [UserPlus, Search, CreditCard, FileCheck];

export default function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section className="bg-brand-50 py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.howItWorks.eyebrow}
            title={t.howItWorks.title}
            description={t.howItWorks.description}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="group relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-white transition-colors duration-300 group-hover:bg-accent-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="absolute right-0 top-0 text-4xl font-bold text-brand-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-brand-950">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-600">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
