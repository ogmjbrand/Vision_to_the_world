"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const GLOBE_MARKERS = [
  { location: [42.8864, -78.8784] as [number, number], size: 0.08 }, // Buffalo, NY (HQ)
  { location: [30.0444, 31.2357] as [number, number], size: 0.08 }, // Cairo, Egypt
  { location: [6.5244, 3.3792] as [number, number], size: 0.08 }, // Lagos, Nigeria
  { location: [51.5074, -0.1278] as [number, number], size: 0.08 }, // London, UK
  { location: [25.2769, 55.2962] as [number, number], size: 0.08 }, // Dubai, UAE
];

/**
 * Split into its own module so it can be next/dynamic-imported with
 * ssr:false from features-bento-grid.tsx — cobe (WebGL) is only needed for
 * this one bento cell, and shouldn't be in the main homepage JS bundle that
 * has to parse before any above-the-fold content hydrates.
 */
export default function FeatureGlobe({ className }: { className?: string }) {
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
