"use client";

import React, { useState } from "react";
import PremiumFeatureCard from "./PremiumFeatureCard";
import { PenTool, Layers, Sparkles, Wand2 } from "lucide-react";

export default function PremiumFeatureShowcase() {
  const [activeTab, setActiveTab] = useState<"grid" | "single">("grid");

  const cardsData = [
    {
      number: "01",
      icon: <PenTool size={25} strokeWidth={1.7} />,
      category: "UI / UX",
      title: (
        <>
          Creative
          <br />
          Design
        </>
      ),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Esse fuga adipisicing elit.",
    },
    {
      number: "02",
      icon: <Layers size={25} strokeWidth={1.7} />,
      category: "ENGINEERING",
      title: (
        <>
          Modern
          <br />
          Frontend
        </>
      ),
      description:
        "High performance reactive architecture with fluid micro-interactions and GPU liquid shaders.",
    },
    {
      number: "03",
      icon: <Sparkles size={25} strokeWidth={1.7} />,
      category: "AI SYSTEMS",
      title: (
        <>
          Intelligent
          <br />
          Agents
        </>
      ),
      description:
        "Autonomous LLM workflows, planetary multi-agent routing, and real-time streaming interfaces.",
    },
  ];

  return (
    <section id="feature-cards" className="py-20 bg-slate-100/70 dark:bg-[#080911] border-b border-slate-200 dark:border-zinc-800/80 relative overflow-hidden transition-colors">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/50 text-purple-700 dark:text-purple-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Wand2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Liquid Physics Morph System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400">Feature Card</span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Multi-layered morphing purple liquid shapes with frosted glass backdrop blur, spring physics icon transformations, and expanding kinetic underline indicators. Hover any card to trigger organic liquid expansion.
          </p>

          {/* View Mode Switcher */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 shadow-inner">
            <button
              onClick={() => setActiveTab("grid")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === "grid"
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              3-Card Showcase Grid
            </button>
            <button
              onClick={() => setActiveTab("single")}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === "single"
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
              }`}
            >
              Standalone Specimen (01)
            </button>
          </div>
        </div>

        {/* Card Display Container */}
        {activeTab === "single" ? (
          <div className="flex items-center justify-center py-10">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#f8f8fa] border border-slate-200 dark:border-zinc-700 shadow-2xl flex items-center justify-center">
              <PremiumFeatureCard />
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#f8f8fa] border border-slate-200 dark:border-zinc-700 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {cardsData.map((card) => (
                <PremiumFeatureCard
                  key={card.number}
                  number={card.number}
                  icon={card.icon}
                  category={card.category}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Feature Specs Matrix */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm">
            <div className="text-purple-600 dark:text-purple-400 font-mono text-sm font-bold">3-Layer Blob Shaders</div>
            <div className="text-slate-600 dark:text-zinc-400 text-xs mt-1">Multi-axis rotation & asymmetric border-radius morphing</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm">
            <div className="text-indigo-600 dark:text-indigo-400 font-mono text-sm font-bold">Frosted Glass Number</div>
            <div className="text-slate-600 dark:text-zinc-400 text-xs mt-1">Backdrop blur 4px with semi-transparent border pill</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 shadow-sm">
            <div className="text-pink-600 dark:text-pink-400 font-mono text-sm font-bold">Wave Animated Dots</div>
            <div className="text-slate-600 dark:text-zinc-400 text-xs mt-1">Staggered Y-axis wave bounce on hover</div>
          </div>
        </div>
      </div>
    </section>
  );
}
