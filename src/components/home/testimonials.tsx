"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-brand-50 py-20">
      <Container>
        <SectionHeading
          eyebrow="Trusted by travelers worldwide"
          title="What our travelers are saying"
          description="Real feedback from people who booked flights, hotels, packages, and more through Vision To The World."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex flex-col rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <Quote className="h-6 w-6 text-accent-300" />
              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-4 w-4 ${
                      starIndex < t.rating
                        ? "fill-accent-500 text-accent-500"
                        : "fill-brand-100 text-brand-100"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-brand-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-brand-100 pt-4">
                <p className="text-sm font-semibold text-brand-950">{t.name}</p>
                <p className="text-xs text-brand-500">
                  {t.location} &middot; {t.service}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
