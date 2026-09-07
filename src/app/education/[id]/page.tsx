"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  MapPin, 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  Sparkles,
  Building2
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface EducationDetail {
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

export default function EducationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [edu, setEdu] = useState<EducationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/education/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setEdu(data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080f] text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* BACK BUTTON */}
        <Link
          href="/#education"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-zinc-700 text-xs font-semibold mb-8 transition-all hover:scale-105 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
          <span>Back to Portfolio</span>
        </Link>

        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-mono text-sm">
            Loading education details...
          </div>
        ) : !edu ? (
          <div className="p-12 text-center text-slate-500 dark:text-zinc-400 font-mono text-sm">
            Education record not found.
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* HERO HEADER CARD */}
            <div className="relative rounded-3xl p-[1.5px] overflow-hidden bg-slate-200/80 dark:bg-zinc-800/80 shadow-xl">
              <div className="rounded-[calc(1.5rem-1.5px)] bg-white dark:bg-[#0c0e18] p-6 sm:p-10 space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-100 dark:bg-cyan-950/60 border border-sky-300 dark:border-cyan-500/50 text-sky-800 dark:text-cyan-300 text-xs font-bold font-mono">
                    <GraduationCap className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                    <span>Academic Qualification</span>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono">
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>{edu.timeBound}</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {edu.degree}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-700 dark:text-zinc-300">
                  <span className="flex items-center gap-1.5 text-sky-600 dark:text-cyan-400 font-bold">
                    <Building2 className="w-4 h-4" />
                    {edu.university}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-xs">
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>CGPA: {edu.cgpa}</span>
                  </span>

                  {edu.location && (
                    <span className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                      {edu.location}
                    </span>
                  )}
                </div>

              </div>
            </div>

            {/* DESCRIPTION */}
            {edu.description && (
              <div className="rounded-2xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-zinc-800/80 p-6 sm:p-8 space-y-3 shadow-lg">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                  <BookOpen className="w-4 h-4 text-sky-600 dark:text-cyan-400" />
                  Overview &amp; Specialization
                </h2>
                <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {edu.description}
                </p>
              </div>
            )}

            {/* COURSEWORK & SUBJECTS */}
            {edu.coursework && edu.coursework.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-zinc-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Key Coursework &amp; Topics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {edu.coursework.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800/90 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-cyan-400 shrink-0" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ACHIEVEMENTS & HIGHLIGHTS */}
            {edu.highlights && edu.highlights.length > 0 && (
              <div className="rounded-2xl bg-white dark:bg-[#0c0e18] border border-slate-200 dark:border-zinc-800/80 p-6 sm:p-8 space-y-4 shadow-lg">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                  <Award className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  Honors &amp; Extracurricular Highlights
                </h2>
                <div className="space-y-2.5">
                  {edu.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800/80 text-slate-700 dark:text-zinc-200 text-xs sm:text-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
