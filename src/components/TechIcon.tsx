"use client";

import React from "react";
import Image from "next/image";

// Canonical mapping of technology names to local SVG/PNG icon paths
const ICON_MAP: Record<string, { path: string; label: string }> = {
  html: { path: "/icons/html.svg", label: "HTML5" },
  html5: { path: "/icons/html.svg", label: "HTML5" },
  css: { path: "/icons/css.svg", label: "CSS3" },
  css3: { path: "/icons/css.svg", label: "CSS3" },
  tailwind: { path: "/icons/Tailwind CSS.svg", label: "Tailwind CSS" },
  tailwindcss: { path: "/icons/Tailwind CSS.svg", label: "Tailwind CSS" },
  typescript: { path: "/icons/typescript.svg", label: "TypeScript" },
  ts: { path: "/icons/typescript.svg", label: "TypeScript" },
  javascript: { path: "/icons/JavaScript.svg", label: "JavaScript" },
  js: { path: "/icons/JavaScript.svg", label: "JavaScript" },
  react: { path: "/icons/react.svg", label: "React" },
  reactjs: { path: "/icons/react.svg", label: "React" },
  redux: { path: "/icons/Redux.svg", label: "Redux / RTK Query" },
  zustand: { path: "/icons/zustend.png", label: "Zustand" },
  nodejs: { path: "/icons/nodejs.png", label: "Node.js" },
  node: { path: "/icons/nodejs.png", label: "Node.js" },
  express: { path: "/icons/express.svg", label: "Express.js" },
  expressjs: { path: "/icons/expressjs.png", label: "Express.js" },
  mongodb: { path: "/icons/MongoDB.svg", label: "MongoDB" },
  mongo: { path: "/icons/MongoDB.svg", label: "MongoDB" },
  jwt: { path: "/icons/jwt.svg", label: "JWT" },
  nextjs: { path: "/icons/nextjs.svg", label: "Next.js" },
  next: { path: "/icons/nextjs.svg", label: "Next.js" },
  docker: { path: "/icons/docker.svg", label: "Docker" },
  redis: { path: "/icons/Redis.svg", label: "Redis" },
  rabbitmq: { path: "/icons/RabbitMQ.svg", label: "RabbitMQ" },
  aws: { path: "/icons/AWS.svg", label: "AWS" },
  git: { path: "/icons/Git.svg", label: "Git" },
  postman: { path: "/icons/Postman.svg", label: "Postman" },
  database: { path: "/icons/database.png", label: "Database" },
  cpp: { path: "/icons/C++ (CPlusPlus).svg", label: "C++" },
  "c++": { path: "/icons/C++ (CPlusPlus).svg", label: "C++" },
};

interface TechIconProps {
  icon: string;
  size?: number;
  className?: string;
  showTooltip?: boolean;
}

export default function TechIcon({
  icon,
  size = 22,
  className = "",
  showTooltip = true,
}: TechIconProps) {
  if (!icon) return null;

  const trimmed = icon.trim();
  const normalizedKey = trimmed.toLowerCase().replace(/[\s\-_.]/g, "");

  let iconSrc = "";
  let label = trimmed;

  // Check if it's already a path or external URL
  if (trimmed.startsWith("/") || trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    iconSrc = trimmed;
    // Derive label from filename
    const filename = trimmed.split("/").pop() || "";
    label = filename.replace(/\.(svg|png|jpg|jpeg|webp)$/i, "");
  } else if (ICON_MAP[normalizedKey]) {
    iconSrc = ICON_MAP[normalizedKey].path;
    label = ICON_MAP[normalizedKey].label;
  } else {
    // Fallback: check direct match in ICON_MAP keys
    const match = Object.entries(ICON_MAP).find(([k]) => normalizedKey.includes(k));
    if (match) {
      iconSrc = match[1].path;
      label = match[1].label;
    } else {
      // Return a sleek text pill badge if no image match found
      return (
        <span
          title={label}
          className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-semibold ${className}`}
        >
          {label}
        </span>
      );
    }
  }

  return (
    <div
      title={showTooltip ? label : undefined}
      className={`group/icon relative inline-flex items-center justify-center p-1 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/60 transition-all hover:scale-110 ${className}`}
      style={{ width: size + 10, height: size + 10 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconSrc}
        alt={label}
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow transition-transform group-hover/icon:scale-105"
        onError={(e) => {
          // If image fails, fallback to text
          const target = e.currentTarget;
          target.style.display = "none";
        }}
      />

      {/* Hover tooltip */}
      {showTooltip && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-zinc-950 border border-purple-500/40 text-[10px] font-mono text-purple-200 whitespace-nowrap opacity-0 group-hover/icon:opacity-100 pointer-events-none transition-opacity duration-200 z-30 shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
}
