"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/ui/container";
import { galleryDestinations, type GalleryDestination } from "@/lib/data/gallery";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

function GalleryMedia({
  dest,
  allowMotion,
  duration,
}: {
  dest: GalleryDestination;
  allowMotion: boolean;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={allowMotion ? { scale: [1, 1.12, 1] } : undefined}
      transition={
        allowMotion
          ? { duration, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      {dest.video && allowMotion ? (
        <video
          className="h-full w-full object-cover"
          src={dest.video}
          poster={dest.image}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      ) : (
        <Image
          src={dest.image}
          alt={dest.title}
          fill
          sizes="(min-width: 640px) 25vw, 50vw"
          className="object-cover"
        />
      )}
    </motion.div>
  );
}

export default function DestinationsGallery() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowMotion = !prefersReducedMotion;

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
              <GalleryMedia
                dest={dest}
                allowMotion={allowMotion}
                duration={18 + (i % 3) * 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-sm font-semibold text-white">{dest.title}</p>
                <p className="text-xs text-brand-200">{dest.location}</p>
              </div>
              {dest.video && allowMotion && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-accent-400" />
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
