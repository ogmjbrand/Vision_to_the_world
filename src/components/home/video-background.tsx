"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export default function VideoBackground({
  src,
  poster,
  overlay = "solid",
}: {
  src: string;
  poster?: string;
  /** "glass" gives a frosted, semi-transparent overlay instead of the default solid dark gradient. */
  overlay?: "solid" | "glass";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const allowMotion = !prefersReducedMotion;

  useEffect(() => {
    if (allowMotion) {
      videoRef.current?.play().catch(() => {
        // Autoplay can still be blocked by the browser; the poster frame covers this.
      });
    }
  }, [allowMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {allowMotion && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      {!allowMotion && poster && (
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
      )}
      {overlay === "glass" ? (
        <div className="absolute inset-0 border-b border-[rgba(225,240,245,0.2)] bg-[rgba(13,13,13,0.35)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/70" />
      )}
    </div>
  );
}
