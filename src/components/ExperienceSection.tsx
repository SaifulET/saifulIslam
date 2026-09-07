"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2, Sparkles } from "lucide-react";

export interface ExperienceItem {
  _id: string;
  company: string;
  role: string;
  timeBound: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location?: string;
}

export default function ExperienceSection({ initialData }: { initialData?: ExperienceItem[] }) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialData || []);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExperiences(data);
        }
      })
      .catch((err) => console.error("Error loading experience:", err));
  }, []);

  return (
    <section id="experience" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              EXPERIENCE
            </h2>
          </div>
        </div>

        {/* TIMELINE CARDS */}
        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={exp._id || index}
              className="group relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-slate-200/80 dark:bg-zinc-900/40 shadow-xl"
            >
              {/* Flowing Border Beam on Hover */}
              <div
                className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 will-change-transform"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #5AB2FF 315deg, #ffffff 352deg, #c084fc 360deg)`,
                  animation: "borderBeam 3.2s linear infinite",
                }}
              />

              {/* Static Border */}
              <div className="absolute inset-0 rounded-3xl border border-slate-200 dark:border-zinc-800/80 group-hover:border-transparent transition-colors duration-200 pointer-events-none" />

              {/* Inner Card */}
              <div className="relative z-10 rounded-[calc(1.5rem-1.5px)] bg-white dark:bg-[#0c0d16] p-6 sm:p-8 space-y-5">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-sm font-semibold">
                      <span className="text-sky-600 dark:text-[#5AB2FF] font-mono">{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-zinc-400 font-normal">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Time Bound Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono">
                    <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>{exp.timeBound}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Key Responsibilities / Achievements */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                    {exp.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies Used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-sky-600 dark:text-[#5AB2FF]" />
                      Tech:
                    </span>
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:border-purple-500/50 hover:text-purple-600 dark:hover:text-purple-200 text-[11px] font-mono transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
