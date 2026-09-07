"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const percent = Math.round((window.scrollY / scrollHeight) * 100);
        setScrollPercentage(percent);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* VERTICAL SIDELINE PROGRESS TRACK (RIGHT EDGE) */}
      <div className="fixed right-0 top-0 bottom-0 z-40 w-1 pointer-events-none hidden sm:block bg-zinc-900/60">
        <div
          className="w-full bg-purple-600 transition-all duration-150"
          style={{ height: `${scrollPercentage}%` }}
        />
      </div>

      {/* FLOATING SCROLL PERCENTAGE & SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-zinc-950/90 text-cyan-400 hover:text-white border border-zinc-700/80 hover:border-purple-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          <span className="hidden sm:inline ml-1 text-[11px] font-mono font-bold text-zinc-300">
            {scrollPercentage}%
          </span>
        </button>
      )}
    </>
  );
}
