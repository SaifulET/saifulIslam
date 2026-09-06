"use client";

import React, { useEffect, useState } from "react";

export default function CustomGlobalCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] top-0 left-0 w-6 h-6 -ml-3 -mt-3 flex items-center justify-center select-none transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      {/* Target Crosshair Outer Ring */}
      <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#5AB2FF] shadow-[0_0_12px_#5AB2FF] flex items-center justify-center animate-[spin_10s_linear_infinite]">
        {/* Center Target Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#5AB2FF]" />
      </div>
    </div>
  );
}
