"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Globe, 
  Mail, 
  Code2, 
  Server, 
  Database, 
  Cpu, 
  Terminal, 
  Download, 
  Sparkles, 
  ChevronDown 
} from "lucide-react";
import SocialIcon from "./SocialIcon";

const CODE_TABS = [
  {
    id: "frontend",
    label: "Frontend",
    iconSvg: <Code2 className="w-3.5 h-3.5" />,
    code: `interface IFrontend {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const frontend: IFrontend = {
  overview: 'Modern responsive UI development specialist',
  technologies: [
    'HTML', 'CSS', 'Sass', 'Tailwind',
    'Bootstrap', 'JavaScript', 'TypeScript',
    'Redux', 'React.js', 'Next.js'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "backend",
    label: "Backend",
    iconSvg: <Server className="w-3.5 h-3.5" />,
    code: `interface IBackend {
  architecture: string;
  technologies: string[];
  proficiencyLevel: string;
}

const backend: IBackend = {
  architecture: 'High-performance microservices specialist',
  technologies: [
    'NestJS', 'Node.js', 'Express.js', 'RabbitMQ',
    'Redis', 'PostgreSQL', 'Socket.IO', 'gRPC'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "database",
    label: "Database",
    iconSvg: <Database className="w-3.5 h-3.5" />,
    code: `interface IDatabase {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const database: IDatabase = {
  overview: 'Exploring database design and data handling',
  technologies: [
    'MongoDB', 'PostgreSQL', 'Database Design',
    'Query Optimization', 'Data Modeling'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "devops",
    label: "DevOps",
    iconSvg: <Cpu className="w-3.5 h-3.5" />,
    code: `interface IDevOps {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const devops: IDevOps = {
  overview: 'Automated CI/CD & container orchestration',
  technologies: [
    'Docker', 'Kubernetes', 'GitHub Actions',
    'AWS (S3, EC2)', 'Render', 'Vercel'
  ],
  proficiencyLevel: 'Advanced'
};`
  },
  {
    id: "others",
    label: "Others",
    iconSvg: <Terminal className="w-3.5 h-3.5" />,
    code: `interface IOthers {
  overview: string;
  technologies: string[];
  proficiencyLevel: string;
}

const others: IOthers = {
  overview: 'Real-time protocols & security integrations',
  technologies: [
    'WebRTC', 'Socket.IO', 'ACID Transactions',
    'Idempotent Webhooks', 'JWT / OAuth2'
  ],
  proficiencyLevel: 'Advanced'
};`
  }
];

const DEFAULT_PHRASES = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Engineer",
  "Distributed Systems Architect",
  "System Architect"
];

// HIGH PERFORMANCE FLOATING CANVAS GEOMETRIC BUBBLE ENGINE
function FloatingShapesCanvas({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let currentX = 400;
    let currentY = 300;

    const numShapes = 200;
    const shapes: {
      relX: number;
      relY: number;
      curX: number;
      curY: number;
      radius: number;
      sides: number;
      rotation: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < numShapes; i++) {
      const angle = i * 0.34;
      const dist = 22 + i * 4.8;
      const relX = Math.cos(angle) * dist;
      const relY = Math.sin(angle) * dist;
      
      let radius: number;
      let sides = 0;

      if (i % 5 === 0) {
        radius = 22 + (i % 5) * 3.5;
        sides = (i % 3 === 0) ? 5 : 0;
      } else if (i % 3 === 0) {
        radius = 10 + (i % 4) * 2;
        sides = (i % 2 === 0) ? 4 : 0;
      } else {
        radius = 2.5 + (i % 4) * 1.0;
        sides = 0;
      }

      shapes.push({
        relX,
        relY,
        curX: relX,
        curY: relY,
        radius,
        sides,
        rotation: (i * Math.PI) / 8,
        opacity: Math.max(0.08, 0.52 - i * 0.0022)
      });
    }

    const render = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current?.x ?? width / 2;
      const targetY = mouseRef.current?.y ?? height / 2;

      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = currentX - centerX;
      const offsetY = currentY - centerY;

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        shape.curX += (shape.relX + offsetX - shape.curX) * (0.04 + (i % 5) * 0.012);
        shape.curY += (shape.relY + offsetY - shape.curY) * (0.04 + (i % 5) * 0.012);

        const renderX = centerX + shape.curX;
        const renderY = centerY + shape.curY;

        const isLight = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "light";

        if (isLight) {
          ctx.strokeStyle = `rgba(14, 165, 233, ${shape.opacity * 0.28})`;
          ctx.fillStyle = `rgba(186, 230, 253, ${shape.opacity * 0.25})`;
        } else {
          ctx.strokeStyle = `rgba(168, 85, 247, ${shape.opacity * 0.5})`;
          ctx.fillStyle = `rgba(59, 7, 100, ${shape.opacity * 0.4})`;
        }
        ctx.lineWidth = shape.radius < 4 ? 0.8 : 1.2;

        ctx.beginPath();
        if (shape.sides === 0) {
          ctx.arc(renderX, renderY, shape.radius, 0, Math.PI * 2);
        } else {
          for (let s = 0; s < shape.sides; s++) {
            const rotAngle = shape.rotation + (s * 2 * Math.PI) / shape.sides;
            const px = renderX + shape.radius * Math.cos(rotAngle);
            const py = renderY + shape.radius * Math.sin(rotAngle);
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-95"
    />
  );
}

export default function HeroSection() {
  const mouseRef = useRef({ x: 400, y: 300 });
  const [activeTab, setActiveTab] = useState("others");
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [profile, setProfile] = useState<any>({
    name: "Saiful Islam",
    resumeUrl: "/resume.pdf",
    roles: [
      "Full Stack Developer",
      "Next.js & React Specialist",
      "Distributed Systems Architect",
      "Backend & Cloud Engineer"
    ],
    bio: "Software Engineer passionate about crafting high-performance full-stack web applications, microservices, and interactive developer experiences. Striving to never stop learning and improving.",
    socialLinks: [
      { platform: "Discord", url: "https://discord.com", iconName: "Discord" },
      { platform: "GitHub", url: "https://github.com", iconName: "Github" },
      { platform: "HackerRank", url: "https://www.hackerrank.com", iconName: "Hackerrank" },
      { platform: "Stack Overflow", url: "https://stackoverflow.com", iconName: "Stackoverflow" },
      { platform: "LinkedIn", url: "https://linkedin.com", iconName: "Linkedin" },
      { platform: "Dev.to", url: "https://dev.to", iconName: "Devto" }
    ]
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setProfile(data);
        }
      })
      .catch(() => {});
  }, []);

  const phrases = (profile.roles && profile.roles.length > 0)
    ? profile.roles
    : DEFAULT_PHRASES;

  // Typewriter effect logic
  useEffect(() => {
    const currentPhrase = phrases[phraseIdx % phrases.length] || "Full Stack Developer";
    let timer: NodeJS.Timeout;

    if (!isDeleting && typedText.length < currentPhrase.length) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, 90);
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, 45);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIdx, phrases]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
  };

  const currentTabObj = CODE_TABS.find((t) => t.id === activeTab) || CODE_TABS[0];

  const socialLinksToRender = (profile.socialLinks && profile.socialLinks.length > 0)
    ? profile.socialLinks.filter((l: any) => l.showInHero !== false)
    : [
        { platform: "Discord", url: "https://discord.com", iconName: "Discord" },
        { platform: "GitHub", url: "https://github.com", iconName: "Github" },
        { platform: "HackerRank", url: "https://www.hackerrank.com", iconName: "Hackerrank" },
        { platform: "Stack Overflow", url: "https://stackoverflow.com", iconName: "Stackoverflow" },
        { platform: "LinkedIn", url: "https://linkedin.com", iconName: "Linkedin" },
        { platform: "Dev.to", url: "https://dev.to", iconName: "Devto" }
      ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] bg-[#070612] text-white overflow-hidden py-16 scroll-mt-20 flex flex-col justify-between border-b border-zinc-800/80 select-none"
    >
      {/* High-Performance Canvas */}
      <FloatingShapesCanvas mouseRef={mouseRef} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: HERO INFORMATION & TYPING TEXT */}
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* HERO GREETING BADGE */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-zinc-900/90 border border-zinc-700/80 hover:border-[#5AB2FF] transition-colors duration-200 select-none shadow-sm">
              <Code2 className="w-5 h-5 text-[#5AB2FF] shrink-0" />
              <span className="text-zinc-200 text-sm sm:text-base font-medium">
                Hi, I&apos;m <span className="text-[#5AB2FF] font-bold">{profile.name || "Saiful Islam"}</span>
              </span>
            </div>

            {/* Typewriter Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-extrabold tracking-tight text-white min-h-[58px] sm:min-h-[68px] flex items-center justify-center lg:justify-start whitespace-nowrap">
              <span className="text-[#5AB2FF] font-bold">
                {typedText}
              </span>
              <span className="text-[#5AB2FF] ml-1 font-mono font-bold">_</span>
            </h1>

            {/* Description Text */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-[620px] mx-auto lg:mx-0 font-sans text-center lg:text-left">
              {profile.bio || "Software Engineer passionate about crafting high-performance full-stack web applications, microservices, and interactive developer experiences. Striving to never stop learning and improving."}
            </p>

            {/* Resume Button & Social Tooltip Tiles - Centered on Mobile */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 sm:pt-3 w-full">
              
              {/* Resume Button */}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 text-[#5AB2FF] border border-[#5AB2FF] hover:border-[#5AB2FF] rounded-lg px-5 py-2.5 sm:px-6 sm:py-3 hover:bg-[#5AB2FF40] text-sm sm:text-base font-semibold transition-all shadow-lg shrink-0"
                >
                  <span>Resume</span>
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              )}

              {/* Dynamic Social Tiles - Centered on Mobile */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {socialLinksToRender.map((link: any, idx: number) => (
                  <a
                    key={link._id || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 border border-[#5AB2FF] hover:bg-[#5AB2FF40] text-[#5AB2FF] rounded-lg transition-all hover:scale-105 flex items-center justify-center"
                    title={link.platform}
                  >
                    <SocialIcon iconName={link.iconName} platform={link.platform} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE CODE CARD */}
          <div className="rounded-xl bg-[#0e1017]/90 backdrop-blur-sm border border-[#5AB2FF]/40 font-mono text-xs shadow-2xl overflow-hidden">
            {/* Header Tabs */}
            <div className="flex items-center justify-between bg-[#121624] border-b border-[#5AB2FF]/20 rounded-t-xl overflow-x-auto">
              <div className="flex items-center">
                {CODE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-colors ${
                      activeTab === tab.id
                        ? "bg-[#5AB2FF]/20 text-[#5AB2FF] border-b-2 border-[#5AB2FF]"
                        : "text-white hover:text-[#5AB2FF]"
                    }`}
                  >
                    <span className="text-sm">{tab.iconSvg}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Red Yellow Green Window Dots */}
              <div className="flex gap-1 pr-3">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-red-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-yellow-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-2.5 w-2.5 text-green-500">
                  <circle r="12" cy="12" cx="12" />
                </svg>
              </div>
            </div>

            {/* Syntax Highlighted Code Viewer */}
            <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto min-h-[300px] text-zinc-200 bg-[#090b12]/95">
              <pre className="text-xs font-mono">
                <code>
                  {currentTabObj.code.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-zinc-600 select-none text-right w-6">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        {line.startsWith('interface') ? (
                          <>
                            <span className="text-[#96cbfe]">interface</span>{" "}
                            <span className="text-[#ffffb6] underline">{line.split(' ')[1]}</span>{" "}
                            <span className="text-zinc-400">{line.split(' ')[2]}</span>
                          </>
                        ) : line.startsWith('const') ? (
                          <>
                            <span className="text-[#96cbfe]">const</span>{" "}
                            <span className="text-white">{line.split(' ')[1]}</span>{" "}
                            <span className="text-zinc-400">{line.split(' ').slice(2).join(' ')}</span>
                          </>
                        ) : line.includes(':') ? (
                          <>
                            <span className="text-zinc-300">{line.split(':')[0]}:</span>
                            <span className="text-[#a8ff60]">{line.split(':').slice(1).join(':')}</span>
                          </>
                        ) : (
                          <span className="text-zinc-400">{line}</span>
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM MIDDLE MOUSE POINT INDICATOR */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8 pb-4 group w-full">
        <a href="#education" className="flex flex-col items-center justify-center gap-1 mx-auto">
          <div className="w-5 h-8 border-2 border-[#5AB2FF] rounded-full flex justify-center pt-1.5 shadow-[0_0_10px_#5AB2FF40] group-hover:border-cyan-300 transition-colors">
            <span className="w-1 h-2 bg-[#5AB2FF] rounded-full animate-bounce" />
          </div>
          <div className="flex flex-col items-center justify-center -space-y-1 text-[#5AB2FF] group-hover:text-cyan-300 transition-colors">
            <ChevronDown className="w-4 h-4 animate-pulse" />
          </div>
        </a>
      </div>
    </section>
  );
}
