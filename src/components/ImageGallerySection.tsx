"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Image as ImageIcon, Sparkles, X, Layers, ExternalLink, Maximize2 } from "lucide-react";

export interface GalleryItem {
  _id: string;
  title: string;
  imageUrl: string;
  caption: string;
  category?: string;
  order?: number;
}

export default function ImageGallerySection({ initialData }: { initialData?: GalleryItem[] }) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialData || []);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGallery(data);
        }
      })
      .catch((err) => console.error("Error loading gallery:", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  const loopingItems = gallery.length > 0 ? [...gallery, ...gallery] : [];

  return (
    <section id="gallery" className="hard-border-b bg-slate-50 dark:bg-[#070612] py-20 pb-28 sm:pb-20 scroll-mt-20 relative border-b border-slate-200 dark:border-zinc-800/80 overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              GALLERY
            </h2>
          </div>
        </div>

        {/* MARQUEE INFINITE AUTO-SCROLL TRACK (MATCHING FEATURED BRANDS TRACK) */}
        <div className="overflow-hidden bg-white dark:bg-zinc-950/90 border border-slate-200 dark:border-zinc-800/90 rounded-2xl relative group shadow-2xl">
          <div
            className="marquee-track-slow"
            style={{
              animationDuration: "55s", // Smooth continuous motion speed
            }}
          >
            {loopingItems.map((item, idx) => (
              <div
                key={`${item._id || item.title}-${idx}`}
                onClick={() => setSelectedImage(item)}
                className="group/gallery flex min-w-[240px] sm:min-w-[300px] shrink-0 snap-start flex-col items-center justify-center border-r border-slate-200 dark:border-zinc-800/80 px-6 py-7 text-center transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 cursor-pointer text-left"
              >
                {/* Image Container */}
                <div className="relative flex h-32 w-48 sm:h-40 sm:w-64 items-center justify-center overflow-hidden rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 group-hover/gallery:border-purple-400 shadow-md transition-transform duration-300 group-hover/gallery:scale-105">
                  <Image
                    src={item.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/gallery:scale-110"
                  />

                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity" />

                  {/* Inspect pill on hover */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-mono text-zinc-200 opacity-0 group-hover/gallery:opacity-100 transition-opacity flex items-center gap-1">
                    <Maximize2 className="w-2.5 h-2.5 text-zinc-300" />
                    <span>Inspect</span>
                  </div>
                </div>

                {/* Title */}
                <div className="mt-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-zinc-200 group-hover/gallery:text-purple-600 dark:group-hover:text-purple-300 transition-colors truncate max-w-[240px]">
                  {item.title}
                </div>

                {/* Category / Subtitle */}
                <div className="mt-1 text-[10px] font-mono text-slate-500 dark:text-zinc-400 group-hover/gallery:text-sky-600 dark:group-hover:text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                  <span>{item.category || "Architecture"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULL PREVIEW MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0d16] border border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.25)]"
          >
            {/* High-visibility Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/90 hover:bg-red-500/20 border border-zinc-700/80 hover:border-red-500/60 text-zinc-100 hover:text-red-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 group cursor-pointer"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner">
              <Image
                src={selectedImage.imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-2">
              {selectedImage.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-xs font-mono font-bold text-purple-300 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  {selectedImage.category}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {selectedImage.title}
              </h2>
              {selectedImage.caption && (
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed pt-2">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
