"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryMediaItem } from "@/lib/data/gallery-media";

export default function MediaItem({
  item,
  className,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  onClick,
}: {
  item: GalleryMediaItem;
  className?: string;
  sizes?: string;
  onClick?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { root: null, rootMargin: "50px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  useEffect(() => {
    let mounted = true;
    const node = videoRef.current;

    async function play() {
      if (!node || !isInView || !mounted) return;
      try {
        if (node.readyState >= 3) {
          setIsBuffering(false);
          await node.play();
        } else {
          setIsBuffering(true);
          await new Promise<void>((resolve) => {
            node.oncanplay = () => resolve();
          });
          if (mounted) {
            setIsBuffering(false);
            await node.play();
          }
        }
      } catch {
        // Autoplay can be blocked by the browser; the poster frame covers this.
      }
    }

    if (isInView) {
      play();
    } else {
      node?.pause();
    }

    return () => {
      mounted = false;
    };
  }, [isInView]);

  if (item.type === "video") {
    return (
      <div className={`${className ?? ""} relative overflow-hidden`}>
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          onClick={onClick}
          poster={item.poster}
          playsInline
          muted
          loop
          preload="none"
          style={{ opacity: isBuffering ? 0.8 : 1, transition: "opacity 0.2s" }}
        >
          <source src={item.url} type="video/mp4" />
        </video>
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={item.url}
      alt={item.title}
      fill
      sizes={sizes}
      className={`${className ?? ""} cursor-pointer object-cover`}
      onClick={onClick}
    />
  );
}
