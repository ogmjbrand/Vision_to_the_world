"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Container from "@/components/ui/container";
import MediaItem from "@/components/home/gallery-media-item";
import GalleryModal from "@/components/home/gallery-modal";
import { galleryMediaItems, type GalleryMediaItem } from "@/lib/data/gallery-media";

export default function DestinationsGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(null);
  const [items, setItems] = useState(galleryMediaItems);
  const [isDragging, setIsDragging] = useState(false);

  function handleTileDragEnd(index: number, info: PanInfo) {
    setIsDragging(false);
    const moveDistance = info.offset.x + info.offset.y;
    if (Math.abs(moveDistance) <= 50) return;

    const next = [...items];
    const [dragged] = next.splice(index, 1);
    const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
    next.splice(targetIndex, 0, dragged);
    setItems(next);
  }

  return (
    <section className="overflow-hidden bg-brand-950 py-20">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-400">
            Real Trips, Real Travelers
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Every journey starts with a picture like this
          </h2>
          <p className="mt-4 text-lg text-brand-300">
            A few of the moments Vision To The World travelers have captured along the way. Drag
            a tile to reorder it, or click one to open the viewer.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {selectedItem ? (
            <GalleryModal
              selectedItem={selectedItem}
              onClose={() => setSelectedItem(null)}
              setSelectedItem={setSelectedItem}
              mediaItems={items}
            />
          ) : (
            <motion.div
              className="mt-12 grid auto-rows-[40px] grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={`media-${item.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${item.title}`}
                  className={`group relative cursor-move overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white ${item.span}`}
                  onClick={() => !isDragging && setSelectedItem(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedItem(item);
                    }
                  }}
                  variants={{
                    hidden: { y: 30, scale: 0.9, opacity: 0 },
                    visible: {
                      y: 0,
                      scale: 1,
                      opacity: 1,
                      transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.04 },
                    },
                  }}
                  whileHover={{ scale: 1.02 }}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  dragElastic={1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(_, info) => handleTileDragEnd(index, info)}
                >
                  <MediaItem
                    item={item}
                    className="absolute inset-0 h-full w-full"
                    onClick={() => !isDragging && setSelectedItem(item)}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-brand-200">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
