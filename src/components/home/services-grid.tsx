"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { services } from "@/lib/data/services";
import { useLanguage } from "@/components/i18n/language-provider";
import { getServiceCopy } from "@/lib/i18n/types";

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t.servicesGrid.eyebrow}
            title={t.servicesGrid.title}
            description={t.servicesGrid.description}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const copy = getServiceCopy(t, service.slug);
            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-900 group-hover:text-white">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-950">
                    {copy.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-brand-600">{copy.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                    {t.servicesGrid.explore}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
