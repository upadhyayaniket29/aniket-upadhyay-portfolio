"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const engineeringVisuals = [
  {
    url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop&q=80",
    label: "SpaceX Launch",
  },
  {
    url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80",
    label: "Lamborghini Supercar",
  },
  {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    label: "VS Code Editor",
  },
  {
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    label: "Cyberpunk City Skyline",
  },
  {
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    label: "Server Racks & Cloud Infrastructure",
  },
  {
    url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    label: "Mechanical Keyboard & Workspace",
  },
];

const loadingSteps = [
  "Initializing Workspace",
  "Loading Critical Assets",
  "Compiling Projects",
  "Rendering 3D Environment",
  "Launching Portfolio",
];

export default function CinematicPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Lock body scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Smooth progress counter from 0 to 100% over 4200ms
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 42); // 42ms * 100 = ~4200ms

    // Cycle text status every 850ms
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 850);

    // Cycle active masked letter and engineering image every 700ms
    const visualInterval = setInterval(() => {
      setVisualIndex((prev) => (prev + 1) % engineeringVisuals.length);
      setActiveLetterIndex((prev) => (prev + 1) % 6);
    }, 700);

    // 1.8-Second Hold Pause: Expand into full name & title at 4.2 seconds
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 4200);

    // Gracefully fade out preloader at 6.0 seconds (1.8s pause after 100%) and unlock body scroll
    const endTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearInterval(visualInterval);
      clearTimeout(expandTimer);
      clearTimeout(endTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04, 
            filter: "blur(12px)",
            transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999999] bg-[#050505] flex flex-col items-center justify-between p-6 sm:p-12 select-none overflow-hidden"
        >
          {/* Ambient Film Grain & Soft Orange Glow */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#eb6e00]/10 rounded-full blur-[160px] pointer-events-none" />

          {/* Top Status & Brand Header */}
          <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#eb6e00] animate-pulse" />
              <span>ANIKET.OS // v3.0</span>
            </div>
            <span className="text-[#eb6e00] font-bold">
              {isExpanded ? "[ WORKSPACE READY • LAUNCHING ]" : "[ INITIALIZING WORKSPACE ]"}
            </span>
          </div>

          {/* Center Monolith NYC Masked Typography */}
          <div className="my-auto relative z-10 flex flex-col items-center justify-center text-center w-full">
            {!isExpanded ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center gap-1 sm:gap-3 font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter text-white"
              >
                {"ANIKET".split("").map((char, idx) => {
                  const isActive = idx === activeLetterIndex;
                  if (isActive) {
                    return (
                      <div
                        key={idx}
                        className="relative w-16 sm:w-28 md:w-36 h-24 sm:h-36 md:h-44 rounded-2xl overflow-hidden border-2 border-[#eb6e00] shadow-[0_0_40px_rgba(235,110,0,0.6)] mx-1 transform -rotate-1 transition-all duration-300 shrink-0"
                      >
                        <motion.img
                          key={engineeringVisuals[visualIndex].url}
                          initial={{ opacity: 0, scale: 1.2 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          src={engineeringVisuals[visualIndex].url}
                          alt="Engineering visual"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#eb6e00] font-bold uppercase tracking-widest bg-black/60 px-1.5 py-0.5 rounded">
                          {char}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <span
                      key={idx}
                      className="transition-colors duration-300 hover:text-[#eb6e00]"
                    >
                      {char}
                    </span>
                  );
                })}
              </motion.div>
            ) : (
              /* Smooth 1.8-Second Hold & Pause Reveal Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center space-y-3"
              >
                <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none">
                  ANIKET <span className="text-[#8A8A8A]">UPADHYAY</span>
                </h1>
                <p className="text-xs sm:text-sm font-mono text-[#eb6e00] font-bold tracking-[0.35em] uppercase pt-2">
                  SOFTWARE ENGINEER
                </p>
                <div className="flex items-center gap-2 pt-4 text-[10px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold uppercase tracking-widest">
                    Entering System...
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Progress Bar & Loading Status */}
          <div className="w-full max-w-xs sm:max-w-sm space-y-3 z-10">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="uppercase tracking-widest">{loadingSteps[stepIndex]}...</span>
              <span className="text-[#eb6e00] font-bold">{progress}%</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative border border-white/5">
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#eb6e00] to-[#ff881a] shadow-[0_0_15px_rgba(235,110,0,0.9)] transition-all duration-75"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
