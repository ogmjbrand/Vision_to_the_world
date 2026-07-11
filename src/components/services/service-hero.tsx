"use client";

import { CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/container";
import { getService } from "@/lib/data/services";
import { useLanguage } from "@/components/i18n/language-provider";
import { getServiceCopy } from "@/lib/i18n/types";

export default function ServiceHero({ slug }: { slug: string }) {
  const { t } = useLanguage();
  const service = getService(slug)!;
  const copy = getServiceCopy(t, slug);

  return (
    <section className="bg-gradient-to-br from-brand-950 to-brand-800 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent-300 ring-1 ring-white/20">
              <service.icon className="h-6 w-6" />
            </span>
            <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              {copy.name}
            </h1>
            <p className="mt-2 text-accent-200">{copy.tagline}</p>
            <p className="mt-4 max-w-lg text-brand-100">{copy.description}</p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {copy.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 rounded-lg bg-white/5 p-3 text-sm text-brand-50 ring-1 ring-white/10"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
