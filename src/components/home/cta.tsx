"use client";

import Container from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import Reveal from "@/components/ui/reveal";
import { useLanguage } from "@/components/i18n/language-provider";

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 to-brand-950 px-8 py-16 text-center sm:px-16">
          <div
            className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl"
            aria-hidden
          />
          <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-brand-200">
            {t.cta.description}
          </p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <LinkButton href="/auth/sign-up" size="lg">
              {t.cta.createAccount}
            </LinkButton>
            <LinkButton href="/contact#consultant" size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              {t.cta.talkToConsultant}
            </LinkButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
