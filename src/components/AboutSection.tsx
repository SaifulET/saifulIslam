"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { getSafeImageUrl } from "@/lib/imageUtils";

/**
 * Individual About Item with Video-like Staggered Entrance Animations:
 * - Card container reveals
 * - Left image floats up & expands smoothly
 * - Role title and bio glide into place
 * - Personal info items and education preview cards slide in progressively
 */
function AboutSectionItem({
  section,
  idx,
  educationList,
  experienceList,
  activeTab,
  setActiveTab,
}: {
  section: any;
  idx: number;
  educationList: any[];
  experienceList: any[];
  activeTab: "education" | "experience";
  setActiveTab: (tab: "education" | "experience") => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    const el = cardRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const imageSrc = getSafeImageUrl(section.image || "/images/about-me.png", "/images/about-me.png");
  const isFirst = idx === 0;

  const hasName = Boolean(section.name && section.name.trim());
  const hasLocation = Boolean(section.location && section.location.trim());
  const hasEmail = Boolean(section.email && section.email.trim());
  const hasPhone = Boolean(section.phone && section.phone.trim());
  const hasPersonalInfo = hasName || hasLocation || hasEmail || hasPhone;
  const showEducation = Boolean(section.showDetails);

  // Split description into individual paragraphs so each paragraph glides in one-by-one from the right
  const paragraphs: string[] = React.useMemo(() => {
    if (!section.description) return [];
    const raw = section.description
      .split(/\n+/)
      .map((p: string) => p.trim())
      .filter(Boolean);
    return raw.length > 0 ? raw : [section.description];
  }, [section.description]);

  const baseInfoDelay = 360 + paragraphs.length * 120;

  return (
    <div
      ref={cardRef}
      className={`w-full ${isInView ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-300`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 max-w-6xl mx-auto items-start ${
          !isFirst ? "pt-12 border-t border-slate-200 dark:border-zinc-800/80" : ""
        }`}
      >
        
        {/* LEFT COLUMN: Developer Photo (Comes cleanly from LEFT with no blur) */}
        <div
          style={{ animationDelay: "200ms" }}
          className={`lg:col-span-5 flex justify-center ${
            isInView ? "animate-about-left" : "opacity-0"
          }`}
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 dark:bg-zinc-900 border-2 border-slate-300 dark:border-purple-500/40 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] group/photo">
            <Image
              src={imageSrc}
              alt={section.title || "About Me"}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover/photo:scale-105"
              priority={isFirst}
            />
            {/* Subtle gradient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* RIGHT COLUMN: Bio & Details (Comes cleanly from RIGHT, paragraph by paragraph) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Title / Role Heading (First from Right) */}
          {section.title && (
            <div
              style={{ animationDelay: "280ms" }}
              className={isInView ? "animate-about-right" : "opacity-0"}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {section.title}
              </h3>
            </div>
          )}

          {/* Paragraphs rendered and animated ONE BY ONE from Right */}
          <div className="space-y-4">
            {paragraphs.map((para, pIdx) => {
              const paraDelay = 360 + pIdx * 120;
              return (
                <p
                  key={pIdx}
                  style={{ animationDelay: `${paraDelay}ms` }}
                  className={`text-slate-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed font-normal text-justify ${
                    isInView ? "animate-about-right" : "opacity-0"
                  }`}
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* OPTIONAL 2-SUBCOLUMN: Personal Details & Education/Experience Preview */}
          {(hasPersonalInfo || showEducation) && (
            <div
              className={`grid grid-cols-1 ${
                hasPersonalInfo && showEducation ? "sm:grid-cols-2" : "grid-cols-1"
              } gap-6 pt-2 items-start`}
            >
              
              {/* LEFT SUBCOLUMN: Personal Info fields arriving sequentially from Right */}
              {hasPersonalInfo && (
                <div className="space-y-4">
                  
                  {/* Name */}
                  {hasName && (
                    <div
                      style={{ animationDelay: `${baseInfoDelay}ms` }}
                      className={`space-y-0.5 ${isInView ? "animate-about-right" : "opacity-0"}`}
                    >
                      <div className="text-xs font-mono font-bold text-sky-600 dark:text-[#5AB2FF] uppercase tracking-wider">
                        Name
                      </div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {section.name}
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {hasLocation && (
                    <div
                      style={{ animationDelay: `${baseInfoDelay + 60}ms` }}
                      className={`space-y-0.5 ${isInView ? "animate-about-right" : "opacity-0"}`}
                    >
                      <div className="text-xs font-mono font-bold text-sky-600 dark:text-[#5AB2FF] uppercase tracking-wider">
                        Location
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(section.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{section.location}</span>
                      </a>
                    </div>
                  )}

                  {/* Gmail / Email */}
                  {hasEmail && (
                    <div
                      style={{ animationDelay: `${baseInfoDelay + 120}ms` }}
                      className={`space-y-0.5 ${isInView ? "animate-about-right" : "opacity-0"}`}
                    >
                      <div className="text-xs font-mono font-bold text-sky-600 dark:text-[#5AB2FF] uppercase tracking-wider">
                        Gmail
                      </div>
                      <a
                        href={`mailto:${section.email}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-[#5AB2FF] transition-colors inline-flex items-center gap-1.5 break-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-[#5AB2FF] shrink-0" />
                        <span>{section.email}</span>
                      </a>
                    </div>
                  )}

                  {/* Mobile / Phone */}
                  {hasPhone && (
                    <div
                      style={{ animationDelay: `${baseInfoDelay + 180}ms` }}
                      className={`space-y-0.5 ${isInView ? "animate-about-right" : "opacity-0"}`}
                    >
                      <div className="text-xs font-mono font-bold text-sky-600 dark:text-[#5AB2FF] uppercase tracking-wider">
                        Mobile
                      </div>
                      <a
                        href={`tel:${section.phone}`}
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{section.phone}</span>
                      </a>
                    </div>
                  )}

                </div>
              )}

              {/* RIGHT SUBCOLUMN: Tabs for Education / Experience Preview from Right */}
              {showEducation && (
                <div
                  style={{ animationDelay: `${baseInfoDelay + 100}ms` }}
                  className={`space-y-3 ${isInView ? "animate-about-right" : "opacity-0"}`}
                >
                  
                  {/* Tab Selector Buttons */}
                  <div className="flex items-center gap-6 border-b border-slate-200 dark:border-zinc-800 pb-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("education")}
                      className={`text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 pb-1 relative ${
                        activeTab === "education"
                          ? "text-sky-600 dark:text-[#5AB2FF] border-b-2 border-sky-600 dark:border-[#5AB2FF] -mb-[10px]"
                          : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Education</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("experience")}
                      className={`text-sm font-bold transition-colors cursor-pointer flex items-center gap-2 pb-1 relative ${
                        activeTab === "experience"
                          ? "text-sky-600 dark:text-[#5AB2FF] border-b-2 border-sky-600 dark:border-[#5AB2FF] -mb-[10px]"
                          : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Experience</span>
                    </button>
                  </div>

                  {/* Tab Content Cards */}
                  <div className="space-y-2.5 pt-1">
                    {activeTab === "education" ? (
                      educationList.length > 0 ? (
                        educationList.map((edu, eIdx) => (
                          <div
                            key={edu._id || eIdx}
                            className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 transition-all hover:border-purple-400 shadow-sm"
                          >
                            <div className="font-bold text-slate-900 dark:text-white text-sm">
                              {edu.degree}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
                              {edu.university}
                            </div>
                            <div className="text-[11px] font-mono text-purple-600 dark:text-purple-300 mt-1 font-semibold">
                              {edu.cgpa ? `CGPA ${edu.cgpa}` : edu.timeBound}
                            </div>
                          </div>
                        ))
                      ) : null
                    ) : (
                      experienceList.length > 0 ? (
                        experienceList.map((exp, expIdx) => (
                          <div
                            key={exp._id || expIdx}
                            className="p-3.5 rounded-2xl bg-slate-100/90 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 transition-all hover:border-emerald-400 shadow-sm"
                          >
                            <div className="font-bold text-slate-900 dark:text-white text-sm">
                              {exp.role}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium mt-0.5">
                              {exp.company} | {exp.timeBound}
                            </div>
                            {exp.description && (
                              <div className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1">
                                {exp.description}
                              </div>
                            )}
                          </div>
                        ))
                      ) : null
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function AboutSection() {
  const [profile, setProfile] = useState<any>({
    name: "Saiful Islam",
    title: "Junior Fullstack Developer",
    aboutTitle: "Junior Fullstack Developer",
    aboutDescription: "I'm a passionate front-end developer with a keen eye for design and a dedication to creating intuitive, engaging user experiences. With a background in both design and development, I bridge the gap between aesthetics and functionality. My journey in web development started 5 years ago, and I've been in love with crafting digital experiences ever since. I specialize in building responsive, accessible websites and applications that not only look great but perform exceptionally well. When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or hiking in the mountains to recharge my creative batteries.",
    location: "Jatrabari, Dhaka",
    email: "saifulislam3412883@gmail.com",
    phone: "01707961402",
    aboutImage: "/images/about-me.png",
    avatarUrl: "/images/about-me.png",
  });

  const [aboutSections, setAboutSections] = useState<any[]>([]);
  const [educationList, setEducationList] = useState<any[]>([]);
  const [experienceList, setExperienceList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"education" | "experience">("education");

  // Section Header Observer
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    // Fetch profile
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setProfile((prev: any) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.error("Error fetching profile for about section:", err));

    // Fetch dynamic about sections
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAboutSections(data);
        }
      })
      .catch(() => {});

    // Fetch education
    fetch("/api/education")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setEducationList(data);
      })
      .catch(() => {});

    // Fetch experience
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setExperienceList(data);
      })
      .catch(() => {});
  }, []);

  // Section Header Observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsHeaderVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsHeaderVisible(true);
          } else {
            setIsHeaderVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const el = headerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Determine sections to display: use dynamic aboutSections if available, otherwise single default profile section
  const sectionsToRender = aboutSections.length > 0
    ? aboutSections
    : [
        {
          _id: "default",
          title: profile.aboutTitle || "",
          description: profile.aboutDescription || profile.bio,
          image: profile.aboutImage || profile.avatarUrl || "/images/about-me.png",
          name: "",
          location: "",
          email: "",
          phone: "",
          showDetails: false,
        },
      ];

  return (
    <section
      id="about"
      className="relative py-20 pb-28 sm:pb-20 scroll-mt-20 bg-slate-50 dark:bg-[#070612] text-slate-900 dark:text-white border-b border-slate-200 dark:border-zinc-800/80 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER (Reveals First) */}
        <div
          ref={headerRef}
          style={{ animationDelay: "50ms" }}
          className={`flex items-center justify-center mb-12 ${
            isHeaderVisible ? "animate-project-header" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
            <User className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 dark:text-white" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-wider uppercase">
              ABOUT ME
            </h2>
          </div>
        </div>

        {/* SECTIONS LIST (Staggered progressive entrance matching video reference) */}
        <div className="space-y-12 max-w-6xl mx-auto">
          {sectionsToRender.map((section, idx) => (
            <AboutSectionItem
              key={section._id || idx}
              section={section}
              idx={idx}
              educationList={educationList}
              experienceList={experienceList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
