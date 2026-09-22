import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ImageGallerySection from "@/components/ImageGallerySection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white selection:bg-purple-600 selection:text-white transition-colors duration-300">
      {/* STICKY TOP / MOBILE BOTTOM NAVBAR */}
      <Navbar />

      {/* MAIN SECTIONS */}
      <main className="flex-1 pb-24 md:pb-0">
        {/* HERO SECTION */}
        <HeroSection />

        {/* EDUCATION SECTION */}
        <EducationSection />

        {/* EXPERIENCE SECTION */}
        <ExperienceSection />

        {/* PROJECTS SECTION */}
        <ProjectsSection isAllPage={false} />

        {/* SKILLS SECTION (Positioned right after Projects) */}
        <SkillsSection />

        {/* ABOUT ME SECTION (Positioned before Image Gallery) */}
        <AboutSection />

        {/* IMAGE GALLERY SLIDER */}
        <ImageGallerySection />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <footer className="py-6 sm:py-8 bg-slate-50 dark:bg-[#070612] border-t border-slate-200 dark:border-zinc-800/80 text-slate-600 dark:text-zinc-400 text-xs font-mono transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="flex items-center font-mono font-extrabold text-lg px-2.5 py-0.5 rounded-lg bg-slate-200/80 dark:bg-zinc-900/90 border border-slate-300 dark:border-zinc-800 shadow-sm">
              <span className="text-sky-600 dark:text-[#5AB2FF]">&lt;/</span>
              <span className="text-purple-600 dark:text-[#c084fc] font-sans font-black">S</span>
              <span className="text-sky-600 dark:text-[#5AB2FF]">&gt;</span>
            </div>
            <span>Saiful Islam &copy; {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#home" className="hover:text-sky-600 dark:hover:text-[#5AB2FF] transition-colors">
              Top
            </Link>
            <Link href="#projects" className="hover:text-sky-600 dark:hover:text-[#5AB2FF] transition-colors">
              Projects
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
