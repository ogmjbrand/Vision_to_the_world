"use client";

import * as React from "react";
import { motion, type PanInfo } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

export type CardPosition = "front" | "middle" | "back" | "hidden";

const positionStyles: Record<CardPosition, { rotate: string; x: string; zIndex: number }> = {
  front: { rotate: "-6deg", x: "0%", zIndex: 3 },
  middle: { rotate: "0deg", x: "33%", zIndex: 2 },
  back: { rotate: "6deg", x: "66%", zIndex: 1 },
  hidden: { rotate: "6deg", x: "66%", zIndex: 0 },
};

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
}: {
  handleShuffle: () => void;
  testimonial: Testimonial;
  position: CardPosition;
}) {
  const dragStartX = React.useRef(0);
  const isFront = position === "front";
  const initial = testimonial.name.charAt(0);

  function onDragStart(_: unknown, info: PanInfo) {
    dragStartX.current = info.point.x;
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (dragStartX.current - info.point.x > 150) {
      handleShuffle();
    }
    dragStartX.current = 0;
  }

  return (
    <motion.div
      style={{ zIndex: positionStyles[position].zIndex }}
      animate={{
        rotate: positionStyles[position].rotate,
        x: positionStyles[position].x,
        opacity: position === "hidden" ? 0 : 1,
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{ duration: 0.35 }}
      className={cn(
        "absolute left-0 top-0 grid h-[420px] w-[300px] select-none place-content-center space-y-5 rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:w-[320px]",
        isFront ? "cursor-grab active:cursor-grabbing" : "pointer-events-none",
      )}
    >
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-accent-400 to-accent-600 text-2xl font-bold text-white">
        {initial}
      </span>
      <div className="flex items-center justify-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < testimonial.rating ? "fill-accent-400 text-accent-400" : "fill-white/10 text-white/10",
            )}
          />
        ))}
      </div>
      <p className="text-center text-lg italic text-brand-100">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="text-center">
        <p className="text-sm font-semibold text-accent-300">{testimonial.name}</p>
        <p className="text-xs text-brand-300">
          {testimonial.location} &middot; {testimonial.service}
        </p>
      </div>
    </motion.div>
  );
}
