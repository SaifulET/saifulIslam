"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  GraduationCap, 
  Briefcase, 
  FolderGit2, 
  Image as ImageIcon,
  Cpu, 
  Send, 
  Sun, 
  Moon,
  ShieldAlert
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
    { id: "gallery", label: "Gallery", icon: <ImageIcon className="w-4 h-4" />, href: "#gallery" },
    { id: "skills", label: "Skills", icon: <Cpu className="w-4 h-4" />, href: "#skills" },
    { id: "contact", label: "Contact", icon: <Send className="w-4 h-4" />, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
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
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070612]/90 border-b border-zinc-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* LOGO: </S> */}
          <Link 
            href="#home" 
            className="flex items-center gap-1 group transition-transform hover:scale-105"
          >
            <div className="flex items-center font-mono font-extrabold text-2xl tracking-tighter px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 group-hover:border-[#5AB2FF]/50 shadow-[0_0_15px_rgba(90,178,255,0.15)] transition-all">
              <span className="text-[#5AB2FF] group-hover:text-cyan-300 transition-colors">&lt;/</span>
              <span className="text-[#c084fc] group-hover:text-purple-300 font-sans font-black transition-colors">S</span>
              <span className="text-[#5AB2FF] group-hover:text-cyan-300 transition-colors">&gt;</span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono font-medium text-zinc-400 ml-1">
              Saiful.dev
            </span>
          </Link>

          {/* DESKTOP NAVIGATION LINKS WITH NAME AND ICONS */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800/90 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-950/60 text-purple-300 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.25)] font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-[#5AB2FF]" : "text-zinc-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT CONTROLS: THEME TOGGLE & ADMIN LINK */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-all hover:scale-105 shadow-sm"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90" />
              ) : (
                <Moon className="w-4 h-4 text-purple-400 animate-in spin-in-90" />
              )}
            </button>

            {/* Admin Dashboard Button */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.35)] transition-all hover:scale-105"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>

        </div>
      </header>

      {/* MOBILE BOTTOM DOCKED NAVIGATION BAR (NO UNDERLAP, CLEAN NATIVE APP FEEL) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-[#070612]/95 backdrop-blur-2xl border-t border-zinc-800/90 py-2 px-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
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
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
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
