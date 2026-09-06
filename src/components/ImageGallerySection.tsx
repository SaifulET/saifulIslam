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

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    _id: "gal-1",
    title: "Cybernetic UI & Architecture",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    caption: "Engineering high-performance futuristic user interfaces with dynamic glowing border runners and particle physics.",
    category: "Frontend Architecture",
    order: 1,
  },
  {
    _id: "gal-2",
    title: "Distributed Cloud Infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    caption: "Resilient server clusters with Redis pub/sub, high-throughput event queues, and sub-millisecond telemetry.",
    category: "Cloud & DevOps",
    order: 2,
  },
  {
    _id: "gal-3",
    title: "Real-time Telemetry & Metrics",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    caption: "Live observability telemetry dashboard visualizing microservice throughput, latency distributions, and memory usage.",
    category: "Telemetry",
    order: 3,
  },
  {
    _id: "gal-4",
    title: "AI Cognitive Intelligence Engine",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    caption: "Contextual prompt engineering console with streaming LLM responses and real-time vector embeddings.",
    category: "AI & ML",
    order: 4,
  },
  {
    _id: "gal-5",
    title: "Library Management Interface",
    imageUrl: "/images/libra-preview.svg",
    caption: "Minimalist and reactive book catalog, borrow summary analytics, and state synchronization.",
    category: "Full Stack UI",
    order: 5,
  },
  {
    _id: "gal-6",
    title: "Modern Multi-Tenant eCommerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e55722c3?q=80&w=1200&auto=format&fit=crop",
    caption: "High-volume digital storefront with Stripe payment integration, elastic catalog search, and real-time cart state.",
    category: "Cloud Platform",
    order: 6,
  },
];

export default function ImageGallerySection({ initialData }: { initialData?: GalleryItem[] }) {
  const [gallery, setGallery] = useState<GalleryItem[]>(initialData || DEFAULT_GALLERY);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGallery(data);
        }
      })
      .catch((err) => console.error("Error loading gallery:", err));
  }, []);

  const loopingItems = [...gallery, ...gallery];

  return (
    <section id="gallery" className="hard-border-b bg-[#070612] py-20 pb-28 sm:pb-20 scroll-mt-20 relative border-b border-zinc-800/80 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
            <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              GALLERY
            </h2>
          </div>
        </div>

        {/* MARQUEE INFINITE AUTO-SCROLL TRACK (MATCHING FEATURED BRANDS TRACK) */}
        <div className="overflow-hidden bg-zinc-950/90 border border-zinc-800/90 rounded-2xl relative group shadow-2xl">
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
                className="group/gallery flex min-w-[240px] sm:min-w-[300px] shrink-0 snap-start flex-col items-center justify-center border-r border-zinc-800/80 px-6 py-7 text-center transition-all duration-300 hover:bg-purple-950/30 cursor-pointer text-left"
              >
                {/* Image Container */}
                <div className="relative flex h-32 w-48 sm:h-40 sm:w-64 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group-hover/gallery:border-purple-400 shadow-md transition-transform duration-300 group-hover/gallery:scale-105">
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
                <div className="mt-3 text-xs sm:text-sm font-bold tracking-wider uppercase text-zinc-200 group-hover/gallery:text-purple-300 transition-colors truncate max-w-[240px]">
                  {item.title}
                </div>

                {/* Category / Subtitle */}
                <div className="mt-1 text-[10px] font-mono text-zinc-400 group-hover/gallery:text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>{item.category || "Architecture"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FULL PREVIEW MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0d16] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
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
