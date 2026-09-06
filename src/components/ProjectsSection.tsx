"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  FolderGit2, 
  ExternalLink, 
  Code2, 
  Server, 
  ChevronRight, 
  Globe,
  X, 
  Sparkles,
  Layers,
  Maximize2
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import TechIcon from "@/components/TechIcon";

export interface ProjectItem {
  _id: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  features?: string[];
  frontendTech?: string[];
  backendTech?: string[];
  icons?: string[];
  liveUrl?: string;
  githubUrl?: string;
  githubFrontend?: string;
  githubBackend?: string;
  featured?: boolean;
  order?: number;
}

export default function ProjectsSection({ isAllPage = false }: { isAllPage?: boolean }) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const url = isAllPage ? "/api/projects" : "/api/projects?limit=4";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, [isAllPage]);

  return (
    <section id="projects" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-[#070811] text-white border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase">
            <FolderGit2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider uppercase">
              {isAllPage ? "ALL PROJECTS" : "PROJECTS"}
            </h2>
          </div>
        </div>

        {/* PROJECTS LIST (MATCHING SCREENSHOT LAYOUT) */}
        <div className="space-y-10 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.005] bg-gradient-to-r from-purple-900/30 via-zinc-800/40 to-purple-900/20 shadow-2xl"
            >
              {/* Flowing Border Beam on Hover */}
              <div
                className="absolute -inset-[150%] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 will-change-transform"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #c084fc 315deg, #ffffff 352deg, #9333ea 360deg)`,
                  animation: "borderBeam 3.5s linear infinite",
                }}
              />

              {/* Inner Card Container */}
              <div className="relative z-10 rounded-[calc(1.5rem-1.5px)] bg-[#0c0d16] p-6 sm:p-8 md:p-10 border border-purple-950/60">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  {/* LEFT COLUMN: Project Screenshot / Mockup */}
                  <div className="lg:col-span-6 flex items-center justify-center">
                    <div 
                      onClick={() => setSelectedProject(project)}
                      className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl cursor-pointer group/img transition-all duration-300 hover:border-purple-400"
                    >
                      <Image
                        src={project.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"}
                        alt={project.title}
                        fill
                        className="object-cover p-1 transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Click overlay pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-700/80 text-[11px] font-mono text-zinc-300 group-hover/img:border-purple-400 group-hover/img:text-white transition-colors flex items-center gap-1.5">
                        <Maximize2 className="w-3 h-3 text-purple-300" />
                        <span>Click to Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Project Details & Tech Stack */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                    
                    {/* Title */}
                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-2xl sm:text-3xl font-extrabold text-[#c084fc] hover:text-purple-300 transition-colors cursor-pointer tracking-tight"
                    >
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Bullet Points / Features */}
                    {project.features && project.features.length > 0 && (
                      <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-purple-400 font-bold text-base leading-none mt-0.5">•</span>
                            <span className="text-zinc-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* PROJECT INFO Header */}
                    <div className="pt-2">
                      <div className="text-xs font-bold font-mono tracking-wider text-zinc-200 uppercase">
                        PROJECT INFO
                      </div>

                      {/* Technology Row (Icons from Backend) */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs sm:text-sm font-semibold text-zinc-300 mr-1">
                          Technology:
                        </span>
                        
                        {/* Render backend icon array */}
                        {project.icons && project.icons.length > 0 ? (
                          project.icons.map((icon, idx) => (
                            <TechIcon key={idx} icon={icon} size={22} />
                          ))
                        ) : (
                          // Fallback to frontendTech / backendTech list if icons not specified
                          project.frontendTech?.concat(project.backendTech || []).map((tech, idx) => (
                            <TechIcon key={idx} icon={tech} size={22} />
                          ))
                        )}
                      </div>
                    </div>

                    {/* Dashed horizontal divider */}
                    <div className="border-b border-dashed border-purple-500/30 w-full pt-1" />

                    {/* Action Buttons: Live site, Github, Frontend, Backend - Strictly One Line */}
                    <div className="flex items-center flex-nowrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 pt-2">
                      {/* Live site button */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-md shadow-purple-500/20 hover:opacity-90 hover:scale-105 transition-all flex-shrink-0 whitespace-nowrap"
                        >
                          <span>Live site</span>
                          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-950" />
                        </a>
                      )}

                      {/* Main Github button */}
                      {(project.githubUrl || (!project.githubFrontend && !project.githubBackend)) && (
                        <a
                          href={project.githubUrl || project.githubFrontend || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#120f26] border-2 border-purple-500/90 text-white font-bold text-xs sm:text-sm hover:bg-purple-900/40 hover:scale-105 transition-all flex-shrink-0 whitespace-nowrap"
                        >
                          <span>Github</span>
                          <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
                        </a>
                      )}

                      {/* Separate Frontend / Backend buttons if specifically provided */}
                      {!project.githubUrl && project.githubFrontend && (
                        <a
                          href={project.githubFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#120f26] border-2 border-purple-500/80 text-white font-bold text-xs sm:text-sm hover:bg-purple-900/40 hover:scale-105 transition-all flex-shrink-0 whitespace-nowrap"
                          title="Frontend Repository"
                        >
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Frontend</span>
                        </a>
                      )}

                      {!project.githubUrl && project.githubBackend && (
                        <a
                          href={project.githubBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#120f26] border-2 border-purple-500/80 text-white font-bold text-xs sm:text-sm hover:bg-purple-900/40 hover:scale-105 transition-all flex-shrink-0 whitespace-nowrap"
                          title="Backend Repository"
                        >
                          <Server className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Backend</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL PROJECTS BUTTON (ON HOME PAGE ONLY - MATCHING SCREENSHOT) */}
        {!isAllPage && (
          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-2xl border-2 border-purple-600/80 bg-purple-950/20 text-purple-300 hover:bg-purple-600 hover:text-white font-bold text-sm shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all hover:scale-105"
            >
              <span>All Projects</span>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </Link>
          </div>
        )}

      </div>

      {/* DETAILED PROJECT MODAL (CLICK TO SHOW FULL DESCRIPTION) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0d16] border border-purple-900/60 p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <Image
                src={selectedProject.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"}
                alt={selectedProject.title}
                fill
                className="object-cover p-2"
              />
            </div>

            {/* Modal Title & Links */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#c084fc]">
                {selectedProject.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 text-black font-bold text-xs shadow-md"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Live site</span>
                  </a>
                )}
                {(selectedProject.githubUrl || selectedProject.githubFrontend) && (
                  <a
                    href={selectedProject.githubUrl || selectedProject.githubFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#120f26] border border-purple-500 text-white font-semibold text-xs"
                  >
                    <GithubIcon className="w-4 h-4 text-purple-300" />
                    <span>Github</span>
                  </a>
                )}
              </div>
            </div>

            {/* Full Technical Description */}
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Overview &amp; Highlights
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedProject.fullDescription || selectedProject.shortDescription}
              </p>
            </div>

            {/* Features List in Modal */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                  Key Features
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-purple-400 font-bold text-base leading-none">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technology Stack Icons in Modal */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Technology Stack
              </h4>
              <div className="flex flex-wrap items-center gap-2">
                {selectedProject.icons && selectedProject.icons.length > 0 ? (
                  selectedProject.icons.map((icon, i) => (
                    <TechIcon key={i} icon={icon} size={24} />
                  ))
                ) : (
                  selectedProject.frontendTech?.concat(selectedProject.backendTech || []).map((t, i) => (
                    <TechIcon key={i} icon={t} size={24} />
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
