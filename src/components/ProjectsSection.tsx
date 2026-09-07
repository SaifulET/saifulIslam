"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderGit2,
  Code2,
  Server,
  ChevronRight,
  ChevronLeft,
  Globe,
  X,
  Sparkles,
  Layers,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import TechIcon from "@/components/TechIcon";
import { getSafeImageUrl } from "@/lib/imageUtils";

export interface ProjectItem {
  _id: string;
  title: string;
  image: string;
  images?: string[];
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

function SafeProjectImage({
  src,
  alt,
  className = "",
  fill = true,
  style,
  objectFit = "cover",
}: {
  src?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  objectFit?: "cover" | "contain" | "fill";
}) {
  const [hasError, setHasError] = useState(false);
  const safeSrc = getSafeImageUrl(src);

  if (hasError || !src || !src.trim()) {
    return (
      <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-purple-50 dark:from-[#0c0e18] dark:via-zinc-950 dark:to-purple-950/40 p-6 text-center select-none">
        <div className="p-3.5 rounded-2xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/40 text-purple-600 dark:text-purple-400 mb-2 shadow-sm">
          <FolderGit2 className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <span className="text-sm sm:text-base font-bold text-slate-800 dark:text-white tracking-wide">{alt}</span>
        <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 mt-1">Interactive System Mockup</span>
      </div>
    );
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      fill={fill}
      className={`${objectFit === "contain" ? "object-contain" : "object-cover"} object-center ${className}`}
      style={{ objectFit, ...style }}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setHasError(true)}
    />
  );
}

export default function ProjectsSection({ isAllPage = false }: { isAllPage?: boolean }) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const url = isAllPage ? "/api/projects" : "/api/projects?featured=true&limit=4";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, [isAllPage]);

  // Open modal and reset slide to 0
  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setCurrentSlideIndex(0);
  };

  // Extract all unique slide images for modal slider
  const modalImages: string[] = React.useMemo(() => {
    if (!selectedProject) return [];
    const list: string[] = [];
    if (selectedProject.image && selectedProject.image.trim()) {
      list.push(selectedProject.image.trim());
    }
    if (Array.isArray(selectedProject.images)) {
      selectedProject.images.forEach((img) => {
        if (img && img.trim() && !list.includes(img.trim())) {
          list.push(img.trim());
        }
      });
    }
    return list.length > 0 ? list : [selectedProject.image];
  }, [selectedProject]);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : modalImages.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < modalImages.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for slider (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, modalImages.length]);

  return (
    <section id="projects" className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <FolderGit2 className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              {isAllPage ? "ALL PROJECTS" : "PROJECTS"}
            </h2>
          </div>
        </div>

        {/* PROJECTS LIST (WITH FLOWING BORDER BEAM HOVER EFFECT) */}
        <div className="space-y-10 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300 hover:scale-[1.005] bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 hover:from-purple-500/60 hover:to-pink-500/60 shadow-xl"
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
              <div className="relative z-10 rounded-[calc(1.5rem-1.5px)] bg-white dark:bg-[#0c0d16] p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-purple-950/60">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

                  {/* LEFT COLUMN: Project Screenshot / Mockup (Like Before: Cover View) */}
                  <div className="lg:col-span-6 flex items-center justify-center w-full">
                    <div
                      onClick={() => handleOpenProject(project)}
                      className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-xl cursor-pointer group/img transition-all duration-300 hover:border-purple-400"
                    >
                      <SafeProjectImage
                        src={project.image}
                        alt={project.title}
                        fill
                        objectFit="cover"
                        className="p-1 transition-transform duration-500 group-hover/img:scale-105"
                      />

                      {/* Click overlay pill */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-700/80 dark:border-zinc-700/80 text-[11px] font-mono text-white group-hover/img:border-purple-400 transition-colors flex items-center gap-1.5 z-10 shadow-lg">
                        <Maximize2 className="w-3 h-3 text-purple-300" />
                        <span>Click to Expand</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Project Details & Tech Stack */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">

                    {/* Title */}
                    <h3
                      onClick={() => handleOpenProject(project)}
                      className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-[#c084fc] hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer tracking-tight"
                    >
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Key Highlights (Top 3 on initial card view) */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-1.5">
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="text-purple-600 dark:text-purple-400 font-bold text-base leading-none mt-0.5">•</span>
                              <span className="text-slate-700 dark:text-zinc-300 line-clamp-2">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {project.features.length > 3 && (
                          <button
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className="text-[11px] font-mono text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline flex items-center gap-1 font-semibold pt-1 transition-colors cursor-pointer"
                          >
                            <span>+ {project.features.length - 3} more features</span>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">(click to view all)</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* PROJECT INFO Header */}
                    <div className="pt-2">
                      <div className="text-xs font-bold font-mono tracking-wider text-slate-800 dark:text-zinc-200 uppercase">
                        PROJECT INFO
                      </div>

                      {/* Technology Row (Icons from Backend) */}
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-zinc-300 mr-1">
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

                    {/* Action Buttons: Live site, Frontend, Backend, Github */}
                    <div className="flex items-center flex-wrap gap-2.5 pt-2">
                      {/* Live site button */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white !text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
                        >
                          <span className="text-white !text-white">Live site</span>
                          <Globe className="w-3.5 h-3.5 text-white !text-white shrink-0" />
                        </a>
                      )}

                      {/* Frontend Repo */}
                      {project.githubFrontend && (
                        <a
                          href={project.githubFrontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-[#120f26] border-2 border-slate-700 dark:border-purple-500/80 text-white !text-white font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-purple-900/40 hover:scale-105 transition-all whitespace-nowrap shadow-sm cursor-pointer"
                          title="Frontend Repository"
                        >
                          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-white !text-white">Frontend</span>
                        </a>
                      )}

                      {/* Backend Repo */}
                      {project.githubBackend && (
                        <a
                          href={project.githubBackend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-[#120f26] border-2 border-slate-700 dark:border-purple-500/80 text-white !text-white font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-purple-900/40 hover:scale-105 transition-all whitespace-nowrap shadow-sm cursor-pointer"
                          title="Backend Repository"
                        >
                          <Server className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-white !text-white">Backend</span>
                        </a>
                      )}

                      {/* General Github Repo (shown if neither frontend nor backend specified, OR if provided) */}
                      {project.githubUrl && !project.githubFrontend && !project.githubBackend && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-[#120f26] border-2 border-slate-700 dark:border-purple-500/90 text-white !text-white font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-purple-900/40 hover:scale-105 transition-all whitespace-nowrap shadow-sm cursor-pointer"
                        >
                          <span className="text-white !text-white">Github</span>
                          <GithubIcon className="w-3.5 h-3.5 text-purple-300" />
                        </a>
                      )}

                      {/* Fallback Github link if none provided at all */}
                      {!project.githubUrl && !project.githubFrontend && !project.githubBackend && (
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-[#120f26] border-2 border-slate-700 dark:border-purple-500/90 text-white !text-white font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-purple-900/40 hover:scale-105 transition-all whitespace-nowrap shadow-sm cursor-pointer"
                        >
                          <span className="text-white !text-white">Github</span>
                          <GithubIcon className="w-3.5 h-3.5 text-purple-300" />
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
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl border-2 border-purple-500/80 bg-purple-100 hover:bg-purple-600 text-purple-900 hover:text-white dark:bg-purple-950/40 dark:text-purple-300 dark:hover:bg-purple-600 dark:hover:text-white font-bold text-sm shadow-[0_2px_16px_rgba(168,85,247,0.25)] transition-all hover:scale-105 cursor-pointer"
            >
              <span className="font-bold">All Projects</span>
              <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </Link>
          </div>
        )}

      </div>

      {/* DETAILED PROJECT MODAL (EXPAND VIEW) */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0c0d16] border border-slate-200 dark:border-purple-500/40 p-6 sm:p-8 space-y-6 shadow-2xl dark:shadow-[0_0_50px_rgba(168,85,247,0.25)] text-slate-900 dark:text-zinc-100"
          >
            
            {/* High-visibility Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 dark:bg-zinc-900/90 dark:hover:bg-red-500/20 border border-slate-300 hover:border-red-400 dark:border-zinc-700/80 dark:hover:border-red-500/60 text-slate-700 hover:text-red-500 dark:text-zinc-100 dark:hover:text-red-400 shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95 group cursor-pointer"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
            </button>

            {/* Modal Image Slider Header - Displays Actual Full Uncropped Image with Left/Right Navigation */}
            <div className="space-y-4">
              <div className="relative w-full h-80 sm:h-[460px] md:h-[540px] rounded-2xl overflow-hidden bg-zinc-950 dark:bg-[#060710] border border-slate-200 dark:border-zinc-800/90 shadow-inner p-3 flex items-center justify-center group/modalimg select-none">
                {/* Subtle grid pattern background */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Active Slider Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <SafeProjectImage
                    key={modalImages[currentSlideIndex] || currentSlideIndex}
                    src={modalImages[currentSlideIndex] || selectedProject.image}
                    alt={`${selectedProject.title} - Screenshot ${currentSlideIndex + 1}`}
                    fill
                    objectFit="contain"
                    className="object-contain object-center transition-all duration-300 animate-in fade-in"
                  />
                </div>

                {/* Slide Counter Badge */}
                {modalImages.length > 1 && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-slate-900/85 dark:bg-zinc-950/85 backdrop-blur-md border border-purple-500/40 text-xs font-mono font-bold text-purple-300 shadow-xl flex items-center gap-1.5 z-20">
                    <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                    <span>{currentSlideIndex + 1} / {modalImages.length}</span>
                  </div>
                )}

                {/* Left & Right Slide Arrow Controls */}
                {modalImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevSlide();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white border border-slate-700/80 hover:border-purple-400 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl z-20 cursor-pointer group/arrow"
                      aria-label="Previous image"
                      title="Previous image (← Arrow key)"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover/arrow:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextSlide();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white border border-slate-700/80 hover:border-purple-400 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-2xl z-20 cursor-pointer group/arrow"
                      aria-label="Next image"
                      title="Next image (→ Arrow key)"
                    >
                      <ChevronRight className="w-6 h-6 group-hover/arrow:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Clickable Dots Bar */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 dark:bg-zinc-950/80 backdrop-blur-md border border-slate-800 z-20">
                      {modalImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlideIndex(i);
                          }}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            currentSlideIndex === i
                              ? "w-6 bg-purple-400 shadow-[0_0_8px_#c084fc]"
                              : "w-2 bg-zinc-600 hover:bg-zinc-400"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Open full image in new tab helper */}
                {modalImages[currentSlideIndex] && (
                  <a
                    href={getSafeImageUrl(modalImages[currentSlideIndex])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-700/80 dark:border-zinc-700 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-purple-400 transition-all flex items-center gap-1.5 shadow-lg z-20"
                    title="Open high-res original image in new tab"
                  >
                    <Maximize2 className="w-3 h-3 text-purple-400" />
                    <span>View Original ↗</span>
                  </a>
                )}
              </div>

              {/* Multi-Image Thumbnail Selector Strip (When > 1 image) */}
              {modalImages.length > 1 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                      <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span>Project Screenshots ({modalImages.length} images)</span>
                    </span>
                    <span className="text-[11px] text-zinc-500">Click any thumbnail or use keyboard arrows ← →</span>
                  </div>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin">
                    {modalImages.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentSlideIndex(i)}
                        className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer bg-zinc-950 ${
                          currentSlideIndex === i
                            ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-105"
                            : "border-slate-300 dark:border-zinc-800 opacity-60 hover:opacity-100 hover:border-purple-400"
                        }`}
                      >
                        <img src={getSafeImageUrl(imgUrl)} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 font-mono text-[9px] text-white font-bold">
                          {i + 1}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Title & Actions Header */}
            <div className="space-y-3 pb-2 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-[#c084fc]">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 mt-1">
                    {selectedProject.shortDescription}
                  </p>
                </div>
              </div>
              
              {/* Modal Action Links */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 border border-purple-600 hover:border-purple-500 text-white !text-white font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer hover:shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  >
                    <Globe className="w-4 h-4 text-white !text-white shrink-0" />
                    <span className="text-white !text-white">Live site</span>
                  </a>
                )}
                {selectedProject.githubFrontend && (
                  <a
                    href={selectedProject.githubFrontend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-800 hover:text-sky-700 border border-slate-300 hover:border-sky-400 dark:bg-zinc-900 dark:hover:bg-sky-950/40 dark:text-zinc-200 dark:hover:text-sky-300 dark:border-zinc-700 dark:hover:border-sky-500/50 font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer hover:shadow-[0_0_12px_rgba(56,189,248,0.2)] group/btn"
                    title="Frontend Repository"
                  >
                    <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span>Frontend Repository</span>
                  </a>
                )}
                {selectedProject.githubBackend && (
                  <a
                    href={selectedProject.githubBackend}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-300 hover:border-emerald-400 dark:bg-zinc-900 dark:hover:bg-emerald-950/40 dark:text-zinc-200 dark:hover:text-emerald-300 dark:border-zinc-700 dark:hover:border-emerald-500/50 font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] group/btn"
                    title="Backend Repository"
                  >
                    <Server className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span>Backend Repository</span>
                  </a>
                )}
                {selectedProject.githubUrl && !selectedProject.githubFrontend && !selectedProject.githubBackend && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-300 hover:border-purple-400 dark:bg-zinc-900 dark:hover:bg-purple-950/40 dark:text-zinc-200 dark:hover:text-purple-300 dark:border-zinc-700 dark:hover:border-purple-500/50 font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] group/btn"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-700 dark:text-zinc-300 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span>Github Repository</span>
                  </a>
                )}
                {!selectedProject.githubUrl && !selectedProject.githubFrontend && !selectedProject.githubBackend && (
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-800 hover:text-purple-700 border border-slate-300 hover:border-purple-400 dark:bg-zinc-900 dark:hover:bg-purple-950/40 dark:text-zinc-200 dark:hover:text-purple-300 dark:border-zinc-700 dark:hover:border-purple-500/50 font-semibold text-xs sm:text-sm shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] group/btn"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-700 dark:text-zinc-300 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span>Github</span>
                  </a>
                )}
              </div>
            </div>

            {/* Full Technical Description & Architecture Overview */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-purple-400 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Architecture &amp; Technical Overview</span>
              </h4>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
                <p className="text-slate-700 dark:text-zinc-300 text-xs sm:text-sm sm:leading-relaxed leading-normal whitespace-pre-line">
                  {selectedProject.fullDescription || selectedProject.shortDescription}
                </p>
              </div>
            </div>

            {/* Key Features / Bullet Points in Modal */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-800 dark:text-purple-300 font-bold flex items-center gap-2">
                  <span>Key Features &amp; Implementation Capabilities</span>
                  <span className="text-[11px] font-normal text-purple-600 dark:text-purple-400">
                    ({selectedProject.features.length} points)
                  </span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300"
                    >
                      <span className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-500/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categorized Tech Breakdown */}
            {(selectedProject.frontendTech?.length || selectedProject.backendTech?.length) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {selectedProject.frontendTech && selectedProject.frontendTech.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5 uppercase">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Frontend Technologies</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.frontendTech.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-500/30 text-sky-800 dark:text-sky-300 text-xs font-mono font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.backendTech && selectedProject.backendTech.length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-200 dark:border-zinc-800 space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Server className="w-3.5 h-3.5" />
                      <span>Backend &amp; Cloud Infra</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.backendTech.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Technology Stack Icons in Modal */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-purple-700 dark:text-cyan-400 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Technology Stack &amp; Tools</span>
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
