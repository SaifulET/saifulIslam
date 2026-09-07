"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Monitor, Layers, Server, Wrench, Cpu } from "lucide-react";

export interface SkillItem {
  _id?: string;
  name: string;
  category: "frontend" | "backend" | "tools";
  borderColor: string;
  textColor: string;
  iconPath: string;
  order?: number;
}

export default function SkillsSection({ initialSkills }: { initialSkills?: SkillItem[] }) {
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills || []);
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSkills(data);
        }
      })
      .catch((err) => console.error("Error loading skills:", err));
  }, []);

  const filteredSkills = activeTab === "all"
    ? skills
    : skills.filter((s) => s.category === activeTab);

  const tabs = [
    { id: "all", label: "All Skills", count: skills.length, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "frontend", label: "Frontend", count: skills.filter(s => s.category === "frontend").length, icon: <Monitor className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: "backend", label: "Backend", count: skills.filter(s => s.category === "backend").length, icon: <Server className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: "tools", label: "Tools", count: skills.filter(s => s.category === "tools").length, icon: <Wrench className="w-3.5 h-3.5 text-amber-400" /> },
  ];

  return (
    <section id="skills" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 overflow-hidden select-none transition-colors duration-300">

      {/* VINTAGE CODE MATRIX BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06] font-mono text-[11px] leading-relaxed select-none overflow-hidden text-emerald-600 dark:text-emerald-400">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-6">
          <pre>{`void ClearPal() {
  int entry;
  for (entry = 0; entry < 256; entry++) {
    SetPalEntry(entry, 0, 0, 0);
  }
  wait_for_retrace();
}
/* coding first block */
while ((inp(INPUT_STATUS) & VRETRACE))
void FadeIn(int pause);`}</pre>
          <pre>{`void SetColor() {
  red = palorig[entry][0] * intensity / 63;
  green = palorig[entry][1] * intensity / 63;
  blue = palorig[entry][2] * intensity / 63;
  SetPalEntry(entry, red, green, blue);
}
// check position of user
targetting();`}</pre>
          <pre>{`void FadeOut(int pause) {
  int intensity;
  for (intensity = 63; intensity >= 0; intensity--) {
    wait_for_retrace();
  }
}
cout << "OK\\n";
switch(charmingtaker) {
  case 24: break;
}`}</pre>
          <pre>{`int main() {
  circle(x, y, radius);
  fillcircle(x, y, radius);
  setup();
  token += 4;
  cout << "Operation finish";
}`}</pre>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER: LUCIDE CPU ICON + SKILLS */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              SKILLS
            </h2>
          </div>
        </div>

        {/* INTERACTIVE CATEGORY FILTER TABS: Strictly One Single Line Across All Screen Sizes */}
        <div className="flex justify-center mb-10 w-full px-1">
          <div className="inline-flex flex-nowrap items-center justify-between sm:justify-center p-1 sm:p-1.5 rounded-2xl bg-slate-100 dark:bg-zinc-950/90 border border-slate-200 dark:border-zinc-800/90 gap-1 sm:gap-1.5 max-w-full shadow-lg">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-sm font-sans font-medium transition-all duration-200 border whitespace-nowrap shrink-0 cursor-pointer ${isActive
                      ? "bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-500/80 font-bold shadow-sm"
                      : "bg-transparent text-slate-600 dark:text-zinc-400 border-transparent hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-slate-200/60 dark:hover:bg-zinc-900/60"
                    }`}
                >
                  <span className="shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span
                    className={`text-[9px] sm:text-[11px] px-1 sm:px-2 py-0.5 rounded-full font-mono transition-colors shrink-0 ${isActive
                        ? "bg-purple-200 dark:bg-purple-900/90 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-400/40"
                        : "bg-slate-200 dark:bg-zinc-900 text-slate-700 dark:text-zinc-400 border border-slate-300 dark:border-zinc-800"
                      }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* UNIFIED GRID VIEW (18 SKILLS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 max-w-6xl mx-auto animate-in fade-in duration-300">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill._id || `${skill.name}-${index}`}
              className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-105 min-h-[105px]"
            >
              {/* Animated Flowing Border Beam - ONLY ON HOVER */}
              <div
                className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 will-change-transform"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${skill.borderColor} 315deg, #ffffff 352deg, ${skill.borderColor} 360deg)`,
                  animation: "borderBeam 3s linear infinite",
                }}
              />

              {/* Normal State Border: Subtle Clean */}
              <div className="absolute inset-0 rounded-2xl border border-slate-200 dark:border-zinc-800/80 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />

              {/* Hover State Static Colored Border Track */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  border: `1.5px solid ${skill.borderColor}`,
                }}
              />

              {/* Inner Card Body */}
              <div className="relative z-10 w-full h-full rounded-[calc(1rem-1.5px)] bg-white dark:bg-[#0c0d16] p-3.5 sm:p-4 flex flex-col items-center justify-center gap-2">
                {/* Icon loaded strictly from public folder */}
                <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative">
                  <Image
                    src={skill.iconPath}
                    alt={skill.name}
                    width={38}
                    height={38}
                    className="object-contain"
                  />
                </div>

                {/* Skill Name - Highlights with Brand Color on Hover */}
                <span className="text-xs font-semibold tracking-wide font-sans text-center truncate w-full text-slate-700 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  <span className="group-hover:hidden">{skill.name}</span>
                  <span
                    className="hidden group-hover:inline font-bold"
                    style={{ color: skill.textColor }}
                  >
                    {skill.name}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
