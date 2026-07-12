"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { X } from "lucide-react";
import MediaItem from "@/components/home/gallery-media-item";
import type { GalleryMediaItem } from "@/lib/data/gallery-media";

export default function GalleryModal({
  selectedItem,
  onClose,
  setSelectedItem,
  mediaItems,
}: {
  selectedItem: GalleryMediaItem;
  onClose: () => void;
  setSelectedItem: (item: GalleryMediaItem) => void;
  mediaItems: GalleryMediaItem[];
}) {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

  function handleDockDragEnd(_: unknown, info: PanInfo) {
    setDockPosition((prev) => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }));
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={selectedItem.title}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="fixed inset-0 z-10 min-h-screen overflow-hidden backdrop-blur-lg sm:h-[90vh] md:h-[600px] md:rounded-xl"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-1 items-center justify-center bg-brand-950/50 p-2 sm:p-3 md:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className="relative h-auto max-h-[70vh] w-full max-w-[95%] overflow-hidden rounded-lg shadow-md sm:max-w-[85%] md:max-w-3xl"
                style={{ aspectRatio: "16 / 9" }}
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
                }}
                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                onClick={onClose}
              >
                <MediaItem item={selectedItem} className="h-full w-full bg-black object-contain" onClick={onClose} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 sm:p-3 md:p-4">
                  <h3 className="text-base font-semibold text-white sm:text-lg md:text-xl">
                    {selectedItem.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/80 sm:text-sm">{selectedItem.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          type="button"
          className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-brand-800 backdrop-blur-sm hover:bg-white sm:right-2.5 sm:top-2.5 md:right-3 md:top-3"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close"
        >
          <X className="h-3 w-3" />
        </motion.button>
      </motion.div>

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={handleDockDragEnd}
        className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 touch-none"
      >
        <div className="relative cursor-grab rounded-xl border border-accent-400/30 bg-brand-900/70 shadow-lg backdrop-blur-xl active:cursor-grabbing">
          <div className="flex items-center -space-x-2 px-3 py-2">
            {mediaItems.map((item, index) => {
              const isActive = selectedItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                  aria-current={isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedItem(item);
                    }
                  }}
                  style={{ zIndex: isActive ? 30 : mediaItems.length - index }}
                  className={`relative h-8 w-8 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-9 sm:w-9 md:h-10 md:w-10 ${
                    isActive ? "ring-2 ring-white/70" : "hover:ring-2 hover:ring-white/30"
                  }`}
                  initial={{ rotate: index % 2 === 0 ? -15 : 15 }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    rotate: isActive ? 0 : index % 2 === 0 ? -15 : 15,
                    y: isActive ? -8 : 0,
                  }}
                  whileHover={{ scale: 1.3, rotate: 0, y: -10 }}
                >
                  <MediaItem item={item} className="h-full w-full" onClick={() => setSelectedItem(item)} />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
