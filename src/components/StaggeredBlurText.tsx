"use client";

import React from "react";

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
}) => {
  const characters = Array.from(text);
  const DynamicTag = Component as React.ElementType;

  return (
    <DynamicTag
      className={`staggered-blur cursor-pointer select-none ${className}`}
    >
      {characters.map((char, index) => {
        if (char === " ") {
          return (
            <span
              key={`space-${index}`}
              className="space-char"
              style={{ ["--delay" as string]: index + 1 }}
            >
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={`char-${index}`}
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
