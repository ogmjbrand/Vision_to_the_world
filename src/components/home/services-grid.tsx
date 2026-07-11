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

            if (service.cardVideo) {
              return (
                <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/${service.slug}`}
                    className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
                  >
                    <video
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={service.cardVideo}
                      poster={service.cardVideoPoster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 transition-colors duration-300 group-hover:from-black/90" />
                    <div className="relative flex h-full flex-col p-6">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent-500">
                        <service.icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-white">
                        {copy.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/80">{copy.description}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-300">
                        {t.servicesGrid.explore}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            }

            return (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/${service.slug}`}
                  className="group flex h-full min-h-[260px] flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent-200 hover:shadow-lg"
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
