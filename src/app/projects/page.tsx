"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080f] text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-zinc-700 text-xs font-semibold transition-all hover:scale-105 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        <ProjectsSection isAllPage={true} />
      </main>
    </div>
  );
}
