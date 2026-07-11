"use client";

import SearchWidget from "@/components/search/search-widget";
import Container from "@/components/ui/container";
import VideoBackground from "@/components/home/video-background";
import { useLanguage } from "@/components/i18n/language-provider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <VideoBackground
        src="/media/hero/hero-clip-1.mp4"
        poster="/media/gallery/vineyard-lake-sunset.jpg"
      />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t.hero.titleLine1}{" "}
            <span className="text-accent-400">{t.hero.titleLine2}</span>{" "}
            {t.hero.titleLine3}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100">{t.hero.subtitle}</p>
        </div>

        <div className="mt-10">
          <SearchWidget />
        </div>
      </Container>
    </section>
  );
}
