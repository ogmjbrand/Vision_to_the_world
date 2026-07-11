"use client";

import { useState } from "react";
import Container from "@/components/ui/container";
import { TestimonialCard, type CardPosition } from "@/components/home/testimonial-card";
import { testimonials } from "@/lib/data/testimonials";
import { useLanguage } from "@/components/i18n/language-provider";

function positionFor(depth: number): CardPosition {
  if (depth === 0) return "front";
  if (depth === 1) return "middle";
  if (depth === 2) return "back";
  return "hidden";
}

export default function Testimonials() {
  const { t } = useLanguage();
  const [frontIndex, setFrontIndex] = useState(0);

  function handleShuffle() {
    setFrontIndex((i) => (i + 1) % testimonials.length);
  }

  return (
    <section className="overflow-hidden bg-gradient-to-br from-brand-950 to-brand-900 py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-brand-300">{t.testimonials.description}</p>
        </div>

        <div className="mt-16 grid place-content-center">
          <div className="relative -ml-[75px] h-[420px] w-[300px] sm:-ml-[130px] sm:w-[320px] md:-ml-[160px]">
            {testimonials.map((testimonial, index) => {
              const depth = (index - frontIndex + testimonials.length) % testimonials.length;
              return (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  position={positionFor(depth)}
                  handleShuffle={handleShuffle}
                />
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-brand-400">
          Drag a card to the left for the next story
        </p>
      </Container>
    </section>
  );
}
