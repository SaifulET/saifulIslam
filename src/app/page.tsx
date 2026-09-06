import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
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
    <div className="min-h-screen flex flex-col bg-[#070612] text-white selection:bg-purple-600 selection:text-white">
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

        {/* IMAGE GALLERY SLIDER */}
        <ImageGallerySection />

        {/* SKILLS SECTION */}
        <SkillsSection />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <footer className="pt-10 pb-28 md:pb-10 bg-[#05060b] border-t border-zinc-800/80 text-zinc-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <div className="flex items-center font-mono font-extrabold text-lg px-2.5 py-0.5 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-sm">
              <span className="text-[#5AB2FF]">&lt;/</span>
              <span className="text-[#c084fc] font-sans font-black">S</span>
              <span className="text-[#5AB2FF]">&gt;</span>
            </div>
            <span>Saiful Islam &copy; {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#home" className="hover:text-[#5AB2FF] transition-colors">
              Top
            </Link>
            <Link href="#projects" className="hover:text-[#5AB2FF] transition-colors">
              Projects
            </Link>
            <Link href="/admin" className="text-[#c084fc] hover:text-purple-300 transition-colors font-bold">
              Admin Console
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
