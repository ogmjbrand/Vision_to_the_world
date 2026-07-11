"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/data/site-config";
import Reveal from "@/components/ui/reveal";

const collageImages = [
  "/media/gallery/egypt-sphinx.jpg",
  "/media/gallery/beachfront-dining.jpg",
  "/media/gallery/tropical-garden-villa.jpg",
  "/media/gallery/rainbow-valley.jpg",
  "/media/gallery/egypt-camel-caravan.jpg",
];

const features = [
  {
    title: "Real-time search, worldwide",
    description:
      "Live flight and hotel availability powered by a global GDS — search any route, any city, and get real pricing back in seconds.",
    skeleton: <SkeletonOne />,
    className: "col-span-1 md:col-span-4 lg:col-span-4 border-b md:border-r border-brand-100",
  },
  {
    title: "Every trip, beautifully documented",
    description:
      "Real travelers, real destinations — a look at the journeys Vision To The World travelers have taken.",
    skeleton: <SkeletonTwo />,
    className: "col-span-1 md:col-span-2 lg:col-span-2 border-b border-brand-100",
  },
  {
    title: "Follow us on YouTube",
    description: "Travel tips, destination guides, and updates from the Vision To The World team.",
    skeleton: <SkeletonThree />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-r border-brand-100",
  },
  {
    title: "One platform, every country",
    description:
      "Book from anywhere to anywhere — our self-service platform isn't limited to a handful of routes or regions.",
    skeleton: <SkeletonFour />,
    className: "col-span-1 md:col-span-3 lg:col-span-3 border-b md:border-none",
  },
];

export default function FeaturesBentoGrid() {
  return (
    <div className="relative z-20 mx-auto max-w-7xl py-16 lg:py-24">
      <Reveal className="px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-brand-950 sm:text-4xl">
          Built for travelers, not travel agents
        </h2>
        <p className="mx-auto my-4 max-w-2xl text-center text-base text-brand-600">
          A self-service platform with the real infrastructure to back it up — live pricing, real
          partners, and support when you want it.
        </p>
      </Reveal>

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-md border border-brand-100 md:grid-cols-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 2) * 0.1} className={feature.className}>
              <FeatureCard>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden p-4 transition-colors duration-300 hover:bg-brand-50/60 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

function FeatureTitle({ children }: { children?: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-5xl text-left text-xl font-semibold tracking-tight text-brand-950 md:text-2xl md:leading-snug">
      {children}
    </p>
  );
}

function FeatureDescription({ children }: { children?: React.ReactNode }) {
  return <p className="mx-0 my-2 max-w-sm text-left text-sm text-brand-600">{children}</p>;
}

function SkeletonOne() {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group mx-auto h-full w-full bg-white p-5 shadow-2xl">
        <div className="flex h-full w-full flex-1 flex-col space-y-2">
          <Image
            src="/media/gallery/egypt-pyramids-panorama.jpg"
            alt="Live search results across a real destination"
            width={800}
            height={800}
            className="aspect-square h-full w-full rounded-sm object-cover object-left-top"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-white via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-white via-white to-transparent" />
    </div>
  );
}

function SkeletonThree() {
  return (
    <Link
      href={siteConfig.social.youtube ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group/image relative flex h-full gap-10"
    >
      <div className="group mx-auto h-full w-full bg-transparent">
        <div className="relative flex h-full w-full flex-1 flex-col space-y-2">
          <PlayCircle className="absolute inset-0 z-10 m-auto h-16 w-16 text-white drop-shadow-lg" strokeWidth={1.5} />
          <Image
            src="/media/gallery/vineyard-lake-sunset.jpg"
            alt="Vision To The World on YouTube"
            width={800}
            height={800}
            className="aspect-square h-full w-full rounded-sm object-cover object-center blur-none transition-all duration-200 group-hover/image:blur-sm"
          />
        </div>
      </div>
    </Link>
  );
}

function SkeletonTwo() {
  const imageVariants = {
    whileHover: { scale: 1.1, rotate: 0, zIndex: 100 },
    whileTap: { scale: 1.1, rotate: 0, zIndex: 100 },
  };

  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      <div className="-ml-20 flex flex-row">
        {collageImages.map((image, idx) => (
          <motion.div
            variants={imageVariants}
            key={`row-one-${image}`}
            style={{ rotate: (idx % 2 === 0 ? -1 : 1) * (4 + idx * 2) }}
            whileHover="whileHover"
            whileTap="whileTap"
            className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-brand-100 bg-white p-1"
          >
            <Image
              src={image}
              alt="Vision To The World traveler moment"
              width={160}
              height={160}
              className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            />
          </motion.div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

function SkeletonFour() {
  return (
    <div className="relative mt-10 flex h-60 flex-col items-center">
      <FeatureGlobe className="absolute -bottom-72 -right-10 md:-bottom-72 md:-right-10" />
    </div>
  );
}

const GLOBE_MARKERS = [
  { location: [42.8864, -78.8784] as [number, number], size: 0.08 }, // Buffalo, NY (HQ)
  { location: [30.0444, 31.2357] as [number, number], size: 0.08 }, // Cairo, Egypt
  { location: [6.5244, 3.3792] as [number, number], size: 0.08 }, // Lagos, Nigeria
  { location: [51.5074, -0.1278] as [number, number], size: 0.08 }, // London, UK
  { location: [25.2769, 55.2962] as [number, number], size: 0.08 }, // Dubai, UAE
];

function FeatureGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let animationFrame: number;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.13, 0.24, 0.38],
      markerColor: [0.97, 0.56, 0.06],
      glowColor: [0.9, 0.94, 1],
      markers: GLOBE_MARKERS,
    });

    function frame() {
      phi += 0.006;
      globe.update({ phi });
      animationFrame = requestAnimationFrame(frame);
    }
    animationFrame = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrame);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
}
