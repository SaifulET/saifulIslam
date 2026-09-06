"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Calendar, Award, MapPin, ArrowRight, BookOpen } from "lucide-react";

export interface EducationItem {
  _id: string;
  degree: string;
  university: string;
  timeBound: string;
  cgpa: string;
  description: string;
  coursework: string[];
  highlights: string[];
  location?: string;
}

export default function EducationSection({ initialData }: { initialData?: EducationItem[] }) {
  const [educationList, setEducationList] = useState<EducationItem[]>(initialData || []);

  useEffect(() => {
    fetch("/api/education")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEducationList(data);
        }
      })
      .catch((err) => console.error("Error loading education:", err));
  }, []);

  return (
    <section id="education" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-[#070612] text-white border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              EDUCATION
            </h2>
          </div>
        </div>

        {/* EDUCATION CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {educationList.map((item) => (
            <Link
              key={item._id}
              href={`/education/${item._id}`}
              className="group relative block rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.015] cursor-pointer shadow-xl bg-zinc-900/40"
            >
              {/* Hover Flowing Light Beam */}
              <div
                className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 will-change-transform"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #5AB2FF 315deg, #ffffff 352deg, #c084fc 360deg)`,
                  animation: "borderBeam 3.2s linear infinite",
                }}
              />

              {/* Static Border */}
              <div className="absolute inset-0 rounded-2xl border border-zinc-800/80 group-hover:border-transparent transition-colors duration-200 pointer-events-none" />

              {/* Inner Card Body */}
              <div className="relative z-10 h-full rounded-[calc(1rem-1.5px)] bg-[#0c0d16] p-6 sm:p-7 flex flex-col justify-between space-y-6">
                
                <div className="space-y-3">
                  {/* Top Meta: University & Time Bound */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-[#5AB2FF] font-semibold">
                      <GraduationCap className="w-4 h-4" />
                      {item.university}
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      {item.timeBound}
                    </span>
                  </div>

                  {/* Degree Name */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.degree}
                  </h3>

                  {/* CGPA Badge & Location */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono">
                      <Award className="w-3.5 h-3.5 text-purple-400" />
                      <span>CGPA: {item.cgpa}</span>
                    </div>

                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed line-clamp-3 pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Coursework Tags & View Details Prompt */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                  {item.coursework && item.coursework.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.coursework.slice(0, 4).map((course, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono"
                        >
                          {course}
                        </span>
                      ))}
                      {item.coursework.length > 4 && (
                        <span className="text-[10px] font-mono text-zinc-500 self-center">
                          +{item.coursework.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-mono pt-1 text-purple-400 group-hover:text-[#5AB2FF] transition-colors">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      View Academic Details
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
