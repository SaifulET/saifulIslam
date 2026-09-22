"use client";

import React, { useState, useEffect, useRef } from "react";

export interface StaggeredBlurTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delayStep?: number;
  triggerOnHover?: boolean;
}

export const StaggeredBlurText: React.FC<StaggeredBlurTextProps> = ({
  text,
  className = "",
  as: Component = "h1",
  triggerOnHover = true,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const characters = Array.from(text);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimationKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.15 }
    );

    const currentElem = containerRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setAnimationKey((prev) => prev + 1);
    }
  };

  const DynamicTag = Component as React.ElementType;

  return (
    <DynamicTag
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`staggered-blur cursor-pointer select-none ${className}`}
      key={animationKey}
    >
      {characters.map((char, index) => {
        if (char === " ") {
          return (
            <span
              key={`${animationKey}-space-${index}`}
              className="space-char"
              style={{ ["--delay" as string]: index + 1 }}
            >
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={`${animationKey}-char-${index}`}
            style={{ ["--delay" as string]: index + 1 }}
          >
            {char}
          </span>
        );
      })}
    </DynamicTag>
  );
};

export default StaggeredBlurText;
