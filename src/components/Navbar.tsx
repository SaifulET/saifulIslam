"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  User,
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  Send, 
  Sun, 
  Moon
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: <Home className="w-4 h-4" />, href: "#home" },
    { id: "education", label: "Education", icon: <GraduationCap className="w-4 h-4" />, href: "#education" },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-4 h-4" />, href: "#experience" },
    { id: "projects", label: "Projects", icon: <FolderGit2 className="w-4 h-4" />, href: "#projects" },
    { id: "skills", label: "Skills", icon: <Cpu className="w-4 h-4" />, href: "#skills" },
    { id: "about", label: "About", icon: <User className="w-4 h-4" />, href: "#about" },
    { id: "contact", label: "Contact", icon: <Send className="w-4 h-4" />, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled near bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection("contact");
        return;
      }

      const sections = navItems.map((item) => item.id);
      const scrollY = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* DESKTOP TOP STICKY NAVBAR */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/90 dark:bg-[#070612]/90 border-b border-slate-200 dark:border-zinc-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* LOGO: </S> */}
          <Link 
            href="#home" 
            className="flex items-center gap-1 group transition-transform hover:scale-105"
          >
            <div className="flex items-center font-mono font-extrabold text-2xl tracking-tighter px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 group-hover:border-[#5AB2FF]/50 shadow-sm transition-all">
              <span className="text-[#0284c7] dark:text-[#5AB2FF] group-hover:text-cyan-500 transition-colors">&lt;/</span>
              <span className="text-purple-600 dark:text-[#c084fc] font-sans font-black transition-colors">S</span>
              <span className="text-[#0284c7] dark:text-[#5AB2FF] group-hover:text-cyan-500 transition-colors">&gt;</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono font-medium text-slate-500 dark:text-zinc-400 ml-1">
              Saiful.dev
            </span>
          </Link>

          {/* DESKTOP NAVIGATION LINKS WITH NAME AND ICONS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800/90 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-600 text-white !text-white shadow-sm font-semibold"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-zinc-900/60 border border-transparent"
                  }`}
                >
                  <span className={isActive ? "!text-white text-white" : "text-slate-500 dark:text-zinc-400"}>
                    {item.icon}
                  </span>
                  <span className={isActive ? "!text-white text-white font-semibold" : ""}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT CONTROLS: THEME TOGGLE */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105 shadow-sm cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90" />
              ) : (
                <Moon className="w-4 h-4 text-purple-600 animate-in spin-in-90" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE BOTTOM DOCKED NAVIGATION BAR (NO UNDERLAP, CLEAN NATIVE APP FEEL) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 dark:bg-[#070612]/95 backdrop-blur-2xl border-t border-slate-200 dark:border-zinc-800/90 py-2 px-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-colors duration-300">
        <nav className="max-w-md mx-auto flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <div key={item.id} className="relative flex flex-col items-center">
                {/* Hover / Active Tooltip */}
                {isHovered && (
                  <div className="absolute -top-8 px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold tracking-wide shadow-lg pointer-events-none animate-in fade-in zoom-in-90 duration-150 whitespace-nowrap">
                    {item.label}
                  </div>
                )}

                <a
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onTouchStart={() => setHoveredItem(item.id)}
                  onTouchEnd={() => setTimeout(() => setHoveredItem(null), 1200)}
                  className={`p-2.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    isActive
                      ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800/60"
                  }`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
