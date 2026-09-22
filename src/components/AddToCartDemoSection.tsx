"use client";

import React, { useState } from "react";
import PremiumAddToCartButton from "./PremiumAddToCartButton";
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Package
} from "lucide-react";

export default function AddToCartDemoSection() {
  const [totalAddedCount, setTotalAddedCount] = useState(0);

  const handleAddToCartAction = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setTotalAddedCount((prev) => prev + 1);
  };

  return (
    <section id="add-to-cart-ui" className="py-20 bg-slate-50 dark:bg-[#090a12] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-500/40 text-violet-600 dark:text-violet-300 text-xs font-mono font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-spin" />
            <span>INTERACTIVE BUTTON COMPONENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Premium Animated{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 dark:from-[#7c4dff] dark:via-[#818cf8] dark:to-[#3b82f6]">
              Add to Cart Button
            </span>
          </h2>

          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">
            Smooth gradient button with hover shine sweep, cart tilt micro-interactions, loader spinner state, and success checkmark pop animation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left card */}
          <div className="bg-white dark:bg-[#121422] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-4">
              <span className="text-xs font-mono text-slate-600 dark:text-zinc-300 font-bold uppercase tracking-wider">
                Interactive Playground
              </span>
              <span className="text-xs font-mono text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800/60 px-2 py-0.5 rounded-full">
                {totalAddedCount} Dispatched
              </span>
            </div>

            <div className="py-2">
              <PremiumAddToCartButton onAddToCart={handleAddToCartAction} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-slate-500 dark:text-zinc-400 pt-1">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/60">
                <span className="text-violet-600 dark:text-violet-400 block font-bold mb-0.5">Hover</span>
                <span>Shine Sweep</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/60">
                <span className="text-blue-600 dark:text-blue-400 block font-bold mb-0.5">Click</span>
                <span>Loader</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/60">
                <span className="text-emerald-600 dark:text-emerald-400 block font-bold mb-0.5">Success</span>
                <span>Pop Check</span>
              </div>
            </div>
          </div>

          {/* Right Product Preview */}
          <div className="bg-white dark:bg-[#121422] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>POPULAR ITEM</span>
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified 2026
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aura Ultra Titanium Edition</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">Precision Engineered • Zero Latency Audio</p>
              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">$249.00</span>
                <span className="text-xs text-slate-400 line-through">$299.00</span>
              </div>
            </div>

            <PremiumAddToCartButton
              onAddToCart={handleAddToCartAction}
              buttonText="Add to Cart • $249.00"
              successText="Added to Bag!"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 font-mono pt-2 border-t border-slate-100 dark:border-zinc-800">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Free Express Shipping
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
