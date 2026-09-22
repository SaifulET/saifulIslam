"use client";

import React, { useState, useEffect, useRef } from "react";

export interface PremiumBlurButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export const PremiumBlurButton: React.FC<PremiumBlurButtonProps> = ({
  text,
  className = "",
  onClick,
  ...rest
}) => {
  const [replayKey, setReplayKey] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const characters = Array.from(text);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setReplayKey((prev) => prev + 1);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentElem = buttonRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  const handleMouseEnter = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`premium-btn ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={(e) => {
        setReplayKey((prev) => prev + 1);
        onClick?.(e);
      }}
      {...rest}
    >
      <span key={replayKey} className="text-wrapper" aria-label={text}>
        {characters.map((char, index) => {
          if (char === " ") {
            return (
              <span
                key={`${replayKey}-space-${index}`}
                className="space-char"
                style={{ ["--idx" as string]: index + 1 }}
              >
                &nbsp;
              </span>
            );
          }
          return (
            <span
              key={`${replayKey}-char-${index}`}
              style={{ ["--idx" as string]: index + 1 }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </button>
  );
};

export default PremiumBlurButton;
