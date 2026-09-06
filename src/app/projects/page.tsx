"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-[#07080f] text-white">
      <Navbar />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Back to Home</span>
          </Link>
        </div>

        <ProjectsSection isAllPage={true} />
      </main>
    </div>
  );
}
