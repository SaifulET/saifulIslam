"use client";

import React, { useState, useEffect } from "react";
import DayNightToggle from "./DayNightToggle";
import { useTheme } from "./ThemeProvider";
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Check, 
  Copy, 
  CloudSun,
  Feather,
  Sliders
} from "lucide-react";

export default function DayNightToggleShowcase() {
  const { theme, setTheme } = useTheme();
  const [isNight, setIsNight] = useState(theme === "dark");
  const [syncWithAppTheme, setSyncWithAppTheme] = useState(true);
  const [showReflection, setShowReflection] = useState(true);
  const [showLabel, setShowLabel] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pageStars, setPageStars] = useState<Array<{ x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const stars = Array.from({ length: 50 }, () => ({
      x: +(Math.random() * 100).toFixed(2),
      y: +(Math.random() * 100).toFixed(2),
      delay: +(Math.random() * 3).toFixed(2),
    }));
    setPageStars(stars);
  }, []);

  useEffect(() => {
    if (syncWithAppTheme) {
      setIsNight(theme === "dark");
    }
  }, [theme, syncWithAppTheme]);

  const handleToggle = (night: boolean) => {
    setIsNight(night);
    if (syncWithAppTheme) {
      setTheme(night ? "dark" : "light");
    }
  };

  const copyCode = () => {
    const code = `<DayNightToggle 
  isNight={${isNight}} 
  onToggle={(val) => setIsNight(val)} 
  showReflection={${showReflection}} 
  showLabel={${showLabel}} 
  cloudImg1="/mood/cloud2.png" 
  cloudImg2="/mood/cloud.png" 
/>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/80 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Title & Badge */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-slate-200 dark:border-zinc-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                <CloudSun className="w-3.5 h-3.5" /> Interactive UI Component
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                public/mood/ Assets
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
              Day & Night Mode <span className="bg-gradient-to-r from-amber-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Atmospheric Toggle</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 mt-1 max-w-2xl">
              Physics-based day & night toggle switch featuring continuous moving clouds from <code className="text-amber-600 dark:text-amber-300 font-mono text-xs bg-slate-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-zinc-800">public/mood/</code>, flapping birds, twinkling night stars, shooting stars, and mirrored ambient glass reflection.
            </p>
          </div>

          {/* Quick Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleToggle(!isNight)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border shadow-lg cursor-pointer ${
                isNight
                  ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-200 shadow-indigo-500/20"
                  : "bg-amber-100/90 dark:bg-amber-950/80 border-amber-400/50 text-amber-900 dark:text-amber-200 shadow-amber-500/20"
              }`}
            >
              {isNight ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-400" /> Mode: Night 🌙
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" /> Mode: Day ☀️
                </>
              )}
            </button>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Copied JSX!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* The Live Interactive Canvas Stage */}
        <div className="relative rounded-3xl border border-slate-300 dark:border-zinc-700/60 overflow-hidden shadow-2xl">
          {/* Top Bar for Stage */}
          <div className="bg-slate-100/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 px-4 py-3 flex items-center justify-between z-10 relative">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-600 dark:text-zinc-400 ml-2">
                Atmosphere: {isNight ? "Cosmic Midnight 🌌" : "Sunny Daylight 🌤️"}
              </span>
            </div>

            {/* Stage Options */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={syncWithAppTheme}
                  onChange={(e) => setSyncWithAppTheme(e.target.checked)}
                  className="rounded bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-purple-600 focus:ring-0"
                />
                Sync App Theme
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={showReflection}
                  onChange={(e) => setShowReflection(e.target.checked)}
                  className="rounded bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-purple-600 focus:ring-0"
                />
                Reflection
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={showLabel}
                  onChange={(e) => setShowLabel(e.target.checked)}
                  className="rounded bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 text-purple-600 focus:ring-0"
                />
                Label
              </label>
            </div>
          </div>

          {/* Full Stage with Radial Gradient Background */}
          <div className={`dnt-stage relative min-h-[480px] flex items-center justify-center p-6 transition-all duration-1000 ${
            isNight ? "dnt-night" : ""
          }`}>
            {/* Page Stars (Night Sky Background) */}
            <div className="dnt-page-stars" id="pageStars">
              {mounted &&
                pageStars.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      animationDelay: `${s.delay}s`,
                    }}
                  />
                ))}
            </div>

            {/* High Altitude Shooting Stars */}
            <div className="dnt-shooting-stars">
              <div
                className="dnt-shooting"
                style={{
                  top: "14%",
                  left: "70%",
                  animationDuration: "5.5s",
                  animationDelay: ".2s",
                }}
              />
              <div
                className="dnt-shooting"
                style={{
                  top: "26%",
                  left: "40%",
                  animationDuration: "8s",
                  animationDelay: ".5s",
                }}
              />
              <div
                className="dnt-shooting"
                style={{
                  top: "8%",
                  left: "85%",
                  animationDuration: "7s",
                  animationDelay: ".8s",
                }}
              />
            </div>

            {/* The Main DayNightToggle Button Component */}
            <DayNightToggle
              isNight={isNight}
              onToggle={handleToggle}
              showLabel={showLabel}
              showReflection={showReflection}
              cloudImg1="/mood/cloud2.png"
              cloudImg2="/mood/cloud.png"
            />
          </div>
        </div>

        {/* Feature Highlights & Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 font-mono text-sm font-bold">
              <Sun className="w-4 h-4" /> Moving Cloud System
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Dynamically loads <code className="text-amber-600 dark:text-amber-300 font-mono">cloud.png</code> and <code className="text-amber-600 dark:text-amber-300 font-mono">cloud2.png</code> from <code className="text-slate-800 dark:text-zinc-200 font-mono">public/mood/</code> in a seamless infinite translateX animation loop.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-500 dark:text-indigo-400 font-mono text-sm font-bold">
              <Moon className="w-4 h-4" /> Celestial Night Physics
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Knob transitions smoothly across with cubic-bezier easing, unveiling 14 track stars, 3 streak shooting stars, and a crescent moon with celestial aura.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-mono text-sm font-bold">
              <Feather className="w-4 h-4" /> Birds & Water Reflection
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Includes 3 flapping SVG birds across the daylight sky and a blurred inverted glass reflection with gradient transparency masking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
