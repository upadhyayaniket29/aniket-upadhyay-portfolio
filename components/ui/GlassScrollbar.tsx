"use client";

import React from "react";
import { useScrollbar } from "./useScrollbar";

export function GlassScrollbar() {
  const { scrollProgress, setIsHovered, isDesktop } = useScrollbar();

  if (!isDesktop) return null;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-3.5 top-1/2 -translate-y-1/2 z-40 flex items-center pointer-events-auto group"
    >
      {/* Permanent Glass Pill Track (VisionOS inspired) */}
      <div className="relative w-2 group-hover:w-3 h-[45vh] max-h-[400px] min-h-[200px] rounded-full bg-[#0d0d0d]/80 backdrop-blur-xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 flex flex-col justify-between py-2 items-center">
        
        {/* Subtle Track Tick Marks */}
        <div className="absolute inset-0 flex flex-col justify-between items-center py-4 pointer-events-none opacity-25 group-hover:opacity-50 transition-opacity">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-[1px] bg-white/40 rounded-full" />
          ))}
        </div>

        {/* Glowing Orange Pill Thumb */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-1.5 group-hover:w-2.5 h-8 rounded-full bg-gradient-to-b from-[#ff881a] via-[#eb6e00] to-[#d65f00] shadow-[0_0_14px_rgba(235,110,0,0.85)] border border-white/20 transition-all duration-75 ease-out"
          style={{
            top: `calc(${scrollProgress * 100}% - ${(scrollProgress) * 32}px)`
          }}
        />
      </div>
    </div>
  );
}

export default GlassScrollbar;
