"use client";

import React, { useState, useEffect, useRef } from "react";
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

const DEFAULT_SKILLS: SkillItem[] = [
  // FRONTEND
  { name: "HTML", category: "frontend", borderColor: "#e44d26", textColor: "#e44d26", iconPath: "/icons/html.svg", order: 1 },
  { name: "CSS", category: "frontend", borderColor: "#1572b6", textColor: "#38bdf8", iconPath: "/icons/css.svg", order: 2 },
  { name: "JavaScript", category: "frontend", borderColor: "#f7df1e", textColor: "#facc15", iconPath: "/icons/JavaScript.svg", order: 3 },
  { name: "TypeScript", category: "frontend", borderColor: "#3178c6", textColor: "#60a5fa", iconPath: "/icons/typescript.svg", order: 4 },
  { name: "React", category: "frontend", borderColor: "#61dafb", textColor: "#38bdf8", iconPath: "/icons/react.svg", order: 5 },
  { name: "Next.js", category: "frontend", borderColor: "#ffffff", textColor: "#ffffff", iconPath: "/icons/nextjs.svg", order: 6 },
  { name: "Tailwind CSS", category: "frontend", borderColor: "#06b6d4", textColor: "#22d3ee", iconPath: "/icons/Tailwind CSS.svg", order: 7 },
  { name: "Redux", category: "frontend", borderColor: "#764abc", textColor: "#c084fc", iconPath: "/icons/Redux.svg", order: 8 },
  { name: "Zustand", category: "frontend", borderColor: "#d97706", textColor: "#fbbf24", iconPath: "/icons/zustend.png", order: 9 },

  // BACKEND
  { name: "Node.js", category: "backend", borderColor: "#22c55e", textColor: "#4ade80", iconPath: "/icons/nodejs.png", order: 10 },
  { name: "Express.js", category: "backend", borderColor: "#cbd5e1", textColor: "#e2e8f0", iconPath: "/icons/express.svg", order: 11 },
  { name: "C++", category: "backend", borderColor: "#00599c", textColor: "#60a5fa", iconPath: "/icons/C++ (CPlusPlus).svg", order: 12 },
  { name: "MongoDB", category: "backend", borderColor: "#13aa52", textColor: "#34d399", iconPath: "/icons/MongoDB.svg", order: 13 },
  { name: "Redis", category: "backend", borderColor: "#dc2626", textColor: "#ef4444", iconPath: "/icons/Redis.svg", order: 14 },
  { name: "RabbitMQ", category: "backend", borderColor: "#ff6600", textColor: "#fb923c", iconPath: "/icons/RabbitMQ.svg", order: 15 },
  { name: "JWT", category: "backend", borderColor: "#d63aff", textColor: "#e879f9", iconPath: "/icons/jwt.svg", order: 16 },
  { name: "Database", category: "backend", borderColor: "#3b82f6", textColor: "#60a5fa", iconPath: "/icons/database.png", order: 17 },

  // TOOLS & DEVOPS
  { name: "Git", category: "tools", borderColor: "#f05032", textColor: "#f87171", iconPath: "/icons/Git.svg", order: 18 },
  { name: "Docker", category: "tools", borderColor: "#0db7ed", textColor: "#38bdf8", iconPath: "/icons/docker.svg", order: 19 },
  { name: "AWS", category: "tools", borderColor: "#ff9900", textColor: "#fbbf24", iconPath: "/icons/AWS.svg", order: 20 },
  { name: "Postman", category: "tools", borderColor: "#ff6c37", textColor: "#fb923c", iconPath: "/icons/Postman.svg", order: 21 },
];

export default function SkillsSection({ initialSkills }: { initialSkills?: SkillItem[] }) {
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills && initialSkills.length > 0 ? initialSkills : DEFAULT_SKILLS);
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "tools">("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch((err) => console.error("Error loading skills:", err));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            // Re-trigger animation when user comes back to the section
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
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
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 overflow-hidden select-none transition-colors duration-300"
    >

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

        {/* SECTION HEADER: LUCIDE CPU ICON + SKILLS (Animated First) */}
        <div
          style={{
            animationDelay: "50ms",
          }}
          className={`flex items-center justify-center mb-12 ${
            isVisible ? "animate-skill-header" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              SKILLS
            </h2>
          </div>
        </div>

        {/* INTERACTIVE CATEGORY FILTER TABS (Animated Second) */}
        <div
          style={{
            animationDelay: "150ms",
          }}
          className={`flex justify-center mb-10 w-full px-1 ${
            isVisible ? "animate-skill-header" : "opacity-0"
          }`}
        >
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

        {/* UNIFIED GRID VIEW (18+ SKILLS: Staggered Sequential Entrance) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {filteredSkills.map((skill, index) => {
            const staggerDelay = 220 + index * 55;
            return (
              <div
                key={skill._id || skill.name || index}
                style={{
                  animationDelay: `${staggerDelay}ms`,
                }}
                className={`w-full h-full flex flex-col ${isVisible ? "animate-skill-card" : "opacity-0 pointer-events-none"}`}
              >
                <div
                  className="group relative rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-105 min-h-[116px] sm:min-h-[120px] w-full h-full flex flex-col"
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
                  <div className="relative z-10 w-full h-full rounded-[calc(1rem-1.5px)] bg-white dark:bg-[#0c0d16] py-3.5 px-2 sm:py-4 sm:px-3 flex flex-col items-center justify-center gap-2 flex-1">
                    {/* Icon loaded strictly from public folder */}
                    <div className="w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative shrink-0">
                      <Image
                        src={skill.iconPath}
                        alt={skill.name}
                        width={38}
                        height={38}
                        className="object-contain"
                      />
                    </div>

                    {/* Skill Name - Highlights with Brand Color on Hover */}
                    <span className="text-xs font-semibold tracking-wide font-sans text-center truncate w-full text-slate-700 dark:text-zinc-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 px-1 leading-normal">
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
