"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/use-reduced-motion";

export default function VideoBackground({ src, poster }: { src: string; poster?: string }) {
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
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950/90 via-brand-900/80 to-brand-800/70" />
    </div>
  );
}
