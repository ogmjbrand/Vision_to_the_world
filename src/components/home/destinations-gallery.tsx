"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import { galleryDestinations } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";

export default function DestinationsGallery() {
  return (
    <section className="bg-brand-950 py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            Real Trips, Real Travelers
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every journey starts with a picture like this
          </h2>
          <p className="mt-4 text-lg text-brand-300">
            A few of the moments Vision To The World travelers have captured
            along the way.
          </p>
        </div>

        <div className="mt-12 grid grid-flow-dense auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] sm:grid-cols-4">
          {galleryDestinations.map((dest, i) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                dest.span === "wide" && "col-span-2",
                dest.span === "tall" && "row-span-2",
              )}
            >
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-semibold text-white">{dest.title}</p>
                <p className="text-xs text-brand-200">{dest.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
