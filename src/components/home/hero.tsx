"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import SearchWidget from "@/components/search/search-widget";
import Container from "@/components/ui/container";
import { useLanguage } from "@/components/i18n/language-provider";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { heroSlides } from "@/lib/data/hero-slides";
import { cn } from "@/lib/utils";

const SLIDE_DURATION_MS = 7000;

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "22%"]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const current = heroSlides[active];
  const next = heroSlides[(active + 1) % heroSlides.length];

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] bg-ink">
      {/* Full-bleed background carousel */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: parallaxY }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={current.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={prefersReducedMotion ? { scale: 1 } : { scale: 1.12 }}
              transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "linear" }}
            >
              {prefersReducedMotion ? (
                <Image
                  src={current.poster}
                  alt={current.location}
                  fill
                  sizes="100vw"
                  priority={active === 0}
                  className="object-cover"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={current.poster}
                  className="h-full w-full object-cover"
                >
                  <source src={current.video} type="video/mp4" />
                </video>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 border-b border-[rgba(225,240,245,0.2)] bg-[rgba(13,13,13,0.35)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]" />

      {/* Content */}
      <Container className="relative flex h-full flex-col justify-center pb-24 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(225,240,245,0.25)] bg-white/10 px-3 py-1 text-xs font-semibold text-ice [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
            <MapPin className="h-3.5 w-3.5" />
            {current.location}
          </span>

          <h1 className="mt-6 text-6xl font-bold leading-[0.95] tracking-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.55)] sm:text-7xl lg:text-8xl">
            {t.hero.titleLine1}
            <br />
            <span className="text-accent-400">{t.hero.titleLine2}</span>
            <br />
            {t.hero.titleLine3}
          </h1>

          <p className="mt-6 max-w-xl text-lg font-light text-ice/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="#search"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-accent-800"
            >
              Explore
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="hidden items-center gap-2 text-sm font-medium text-ice/70 sm:flex">
              <ChevronDown className="h-4 w-4 animate-bounce" />
              Scroll to search
            </span>
          </div>
        </motion.div>

        <div id="search" className="mt-12 scroll-mt-28">
          <SearchWidget />
        </div>
      </Container>

      {/* Dot pagination */}
      <div className="absolute bottom-6 left-4 z-10 flex items-center gap-2 sm:left-6 lg:left-8">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.location}`}
            onClick={() => setActive(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === active ? "w-6 bg-accent-400" : "w-2 bg-white/40 hover:bg-white/70",
            )}
          />
        ))}
      </div>

      {/* Next-destination preview tile */}
      <button
        type="button"
        onClick={() => setActive((active + 1) % heroSlides.length)}
        className="group absolute bottom-6 right-4 z-10 hidden h-20 w-32 overflow-hidden rounded-xl border border-white/20 shadow-xl transition-transform hover:-translate-y-1 sm:block sm:right-6 lg:right-8"
      >
        <Image
          src={next.poster}
          alt={next.location}
          fill
          sizes="128px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute inset-x-0 bottom-1 text-center text-[11px] font-semibold text-white">
          {next.location}
        </span>
      </button>
    </section>
  );
}
