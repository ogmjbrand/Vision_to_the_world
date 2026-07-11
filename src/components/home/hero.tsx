"use client";

import Image from "next/image";
import SearchWidget from "@/components/search/search-widget";
import Container from "@/components/ui/container";
import VideoBackground from "@/components/home/video-background";
import { useLanguage } from "@/components/i18n/language-provider";

const postcards = [
  { src: "/media/gallery/egypt-sphinx.jpg", alt: "The Sphinx, Giza, Egypt", rotate: "-rotate-6", top: "top-6", right: "right-8" },
  { src: "/media/gallery/rainbow-valley.jpg", alt: "Rainbow Valley, open road", rotate: "rotate-3", top: "top-40", right: "right-24" },
  { src: "/media/gallery/beachfront-dining.jpg", alt: "Beachfront dining, Saffron Beach", rotate: "-rotate-3", top: "top-72", right: "right-4" },
];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <VideoBackground
        src="/media/hero/hero-clip-1.mp4"
        poster="/media/gallery/vineyard-lake-sunset.jpg"
        overlay="glass"
      />

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {postcards.map((card) => (
          <div
            key={card.src}
            className={`absolute ${card.top} ${card.right} h-40 w-32 ${card.rotate} overflow-hidden rounded-lg border-2 border-white shadow-2xl`}
          >
            <Image src={card.src} alt={card.alt} fill sizes="128px" className="object-cover" />
          </div>
        ))}
      </div>

      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-accent-200 ring-1 ring-white/20 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
            {t.hero.titleLine1}{" "}
            <span className="text-accent-400">{t.hero.titleLine2}</span>{" "}
            {t.hero.titleLine3}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="mt-10">
          <SearchWidget />
        </div>
      </Container>
    </section>
  );
}
