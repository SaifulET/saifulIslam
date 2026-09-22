"use client";

import React, { useState, useEffect } from "react";

export interface DayNightToggleProps {
  isNight?: boolean;
  defaultNight?: boolean;
  onToggle?: (night: boolean) => void;
  showLabel?: boolean;
  showReflection?: boolean;
  scale?: number;
  size?: "navbar" | "xs" | "sm" | "md" | "lg" | "responsive";
  className?: string;
  cloudImg1?: string;
  cloudImg2?: string;
  ariaLabel?: string;
}

interface StarDot {
  x: number;
  y: number;
  delay: number;
}

export default function DayNightToggle({
  isNight: controlledNight,
  defaultNight = false,
  onToggle,
  showLabel = false,
  showReflection = false,
  scale = 1,
  size = "responsive",
  className = "",
  cloudImg1 = "/mood/cloud2.png",
  cloudImg2 = "/mood/cloud.png",
  ariaLabel = "Toggle day and night mode",
}: DayNightToggleProps) {
  const [internalNight, setInternalNight] = useState(defaultNight);
  const isNight = controlledNight !== undefined ? controlledNight : internalNight;

  const [mounted, setMounted] = useState(false);
  const [trackStars, setTrackStars] = useState<StarDot[]>([]);

  useEffect(() => {
    setMounted(true);
    const dots: StarDot[] = Array.from({ length: 14 }, () => ({
      x: +(Math.random() * 100).toFixed(2),
      y: +(Math.random() * 100).toFixed(2),
      delay: +(Math.random() * 3).toFixed(2),
    }));
    setTrackStars(dots);
  }, []);

  const handleToggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    const nextVal = !isNight;
    if (controlledNight === undefined) {
      setInternalNight(nextVal);
    }
    onToggle?.(nextVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(e);
    }
  };

  const sizeClasses = {
    navbar: "w-[94px] sm:w-[104px] aspect-[300/96] text-[11px]",
    xs: "w-[80px] aspect-[300/96] text-[9px]",
    sm: "w-[160px] aspect-[300/96] text-[14px]",
    md: "w-[240px] aspect-[300/96] text-[18px]",
    lg: "w-[320px] aspect-[300/96] text-[24px]",
    responsive: "w-[78vw] max-w-[320px] aspect-[300/96] text-[22px]",
  }[size];

  return (
    <div 
      className={`dnt-container inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ transform: scale !== 1 ? `scale(${scale})` : undefined }}
    >
      {/* Dynamic Mode Label (Optional) */}
      {showLabel && (
        <div className="dnt-label relative h-6 w-60 text-center mb-3">
          <span
            className={`absolute inset-0 text-xs sm:text-sm tracking-[6px] uppercase font-mono font-bold transition-all duration-500 ${
              !isNight ? "opacity-90 translate-y-0 text-amber-300" : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            ☀️ Day Mode
          </span>
          <span
            className={`absolute inset-0 text-xs sm:text-sm tracking-[6px] uppercase font-mono font-bold transition-all duration-500 ${
              isNight ? "opacity-90 translate-y-0 text-indigo-300" : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            🌙 Night Mode
          </span>
        </div>
      )}

      {/* Main Interactive Button */}
      <button
        type="button"
        className={`dnt-switch relative rounded-[48px] p-0 border-0 outline-none transition-transform duration-200 active:scale-95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35),0_10px_30px_rgba(0,0,0,0.35)] shrink-0 ${sizeClasses} ${
          isNight ? "dnt-night dnt-on" : ""
        }`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-pressed={isNight}
        aria-label={ariaLabel}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <div className="dnt-track absolute inset-0 rounded-[48px] overflow-hidden">
          {/* Track Stars (Night Only) */}
          <div
            className={`dnt-stars absolute inset-0 z-[1] transition-opacity duration-1000 ${
              isNight ? "opacity-100" : "opacity-0"
            }`}
          >
            {mounted &&
              trackStars.map((dot, idx) => (
                <span
                  key={idx}
                  className="absolute w-[2px] h-[2px] rounded-full bg-white animate-twinkle"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    animationDelay: `${dot.delay}s`,
                  }}
                />
              ))}
          </div>

          {/* Toggle Shooting Stars (Night Only) */}
          <div
            className={`dnt-toggle-shooting-stars absolute inset-0 pointer-events-none overflow-hidden z-[2] transition-opacity duration-1000 ${
              isNight ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="dnt-toggle-shooting dnt-s1" />
            <span className="dnt-toggle-shooting dnt-s2" />
            <span className="dnt-toggle-shooting dnt-s3" />
          </div>

          {/* Moon Icon / Graphic */}
          <div
            className={`dnt-moon absolute left-[12%] top-[10%] w-[12%] aspect-square flex items-center justify-center -translate-y-1/2 -rotate-[130deg] z-[2] transition-opacity duration-500 pointer-events-none ${
              isNight ? "opacity-100 scale-100" : "opacity-25 scale-90"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-yellow-200 fill-yellow-200 drop-shadow-[0_0_8px_rgba(254,240,138,0.8)]"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>

          {/* Sun Graphic with Warm Radiance */}
          <div
            className={`dnt-sun absolute right-[12%] top-1/2 w-[13%] aspect-square -translate-y-1/2 rounded-full z-[2] transition-all duration-700 pointer-events-none ${
              isNight ? "opacity-0 scale-50" : "opacity-100 scale-100"
            }`}
          />

          {/* Flying Birds (Day Only) */}
          <div
            className={`dnt-birds absolute top-[26%] left-0 w-full h-[20%] z-[2] transition-opacity duration-700 pointer-events-none ${
              isNight ? "opacity-0 pointer-events-none" : "opacity-90"
            }`}
          >
            {/* Bird 1 */}
            <svg
              className="dnt-bird dnt-b1 absolute top-0 w-3.5 h-[8px]"
              viewBox="0 0 14 8"
              aria-hidden="true"
            >
              <path
                className="dnt-wing origin-[7px_6px]"
                d="M0 6 Q7 -2 14 6 Q7 3 0 6Z"
                fill="#eef6ff"
              />
            </svg>

            {/* Bird 2 */}
            <svg
              className="dnt-bird dnt-b2 absolute top-[35%] w-3.5 h-[8px]"
              viewBox="0 0 14 8"
              aria-hidden="true"
            >
              <path
                className="dnt-wing origin-[7px_6px]"
                d="M0 6 Q7 -2 14 6 Q7 3 0 6Z"
                fill="#eef6ff"
              />
            </svg>

            {/* Bird 3 */}
            <svg
              className="dnt-bird dnt-b3 absolute top-[8%] w-3.5 h-[8px]"
              viewBox="0 0 14 8"
              aria-hidden="true"
            >
              <path
                className="dnt-wing origin-[7px_6px]"
                d="M0 6 Q7 -2 14 6 Q7 3 0 6Z"
                fill="#eef6ff"
              />
            </svg>
          </div>

          {/* Moving Clouds Track from public/mood/ */}
          <div className="dnt-clouds absolute left-0 right-0 -bottom-[4%] h-[48%] overflow-hidden pointer-events-none z-[3]">
            <div className="dnt-cloud-track flex flex-nowrap w-[200%] h-full">
              <img
                src={cloudImg1}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="dnt-cloud-img"
              />
              <img
                src={cloudImg2}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="dnt-cloud-img"
              />
              <img
                src={cloudImg1}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="dnt-cloud-img"
              />
              <img
                src={cloudImg2}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="dnt-cloud-img"
              />
            </div>
          </div>
        </div>

        {/* Knob */}
        <div className="dnt-knob absolute top-[8%] w-[27%] aspect-square rounded-full z-[6]" />
      </button>

      {/* Mirrored Reflection Element */}
      {showReflection && (
        <div
          className={`dnt-reflection relative rounded-[48px] p-0 border-0 pointer-events-none -mt-1 ${sizeClasses} ${
            isNight ? "dnt-night dnt-on" : ""
          }`}
          aria-hidden="true"
        >
          <div className="dnt-track absolute inset-0 rounded-[48px] overflow-hidden">
            {/* Reflection Stars */}
            <div
              className={`dnt-stars absolute inset-0 z-[1] transition-opacity duration-1000 ${
                isNight ? "opacity-100" : "opacity-0"
              }`}
            >
              {mounted &&
                trackStars.map((dot, idx) => (
                  <span
                    key={idx}
                    className="absolute w-[2px] h-[2px] rounded-full bg-white"
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                    }}
                  />
                ))}
            </div>

            {/* Reflection Moon */}
            <div
              className={`dnt-moon absolute left-[12%] top-[10%] w-[12%] aspect-square flex items-center justify-center -translate-y-1/2 -rotate-[130deg] z-[2] transition-opacity duration-500 ${
                isNight ? "opacity-100" : "opacity-25"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-yellow-200 fill-yellow-200"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>

            {/* Reflection Sun */}
            <div
              className={`dnt-sun absolute right-[12%] top-1/2 w-[13%] aspect-square -translate-y-1/2 rounded-full z-[2] transition-all duration-700 ${
                isNight ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Reflection Clouds Track */}
            <div className="dnt-clouds absolute left-0 right-0 -bottom-[4%] h-[48%] overflow-hidden pointer-events-none z-[3]">
              <div className="dnt-cloud-track flex flex-nowrap w-[200%] h-full">
                <img
                  src={cloudImg2}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="dnt-cloud-img"
                />
                <img
                  src={cloudImg1}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="dnt-cloud-img"
                />
                <img
                  src={cloudImg2}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="dnt-cloud-img"
                />
                <img
                  src={cloudImg1}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="dnt-cloud-img"
                />
              </div>
            </div>
          </div>

          {/* Reflection Knob */}
          <div className="dnt-knob absolute top-[8%] w-[27%] aspect-square rounded-full z-[6]" />
        </div>
      )}
    </div>
  );
}
