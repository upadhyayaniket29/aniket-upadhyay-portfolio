"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../ModalProvider";

export function BookPreloader() {
  const { isLibraryPreloading, setIsLibraryPreloading, setActiveModal } = useModal();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLibraryPreloading) {
      setIsExiting(false);
      return;
    }

    // Step 1: Open the Library modal behind the preloader at 3.0 seconds so it compiles beneath
    const mountLibraryTimer = setTimeout(() => {
      setActiveModal("books");
      setIsExiting(true);
    }, 3000);

    // Step 2: Unmount preloader at 5.0 seconds (giving full 2.0s smooth blur-fade reveal transition)
    const finishPreloaderTimer = setTimeout(() => {
      setIsLibraryPreloading(false);
      setIsExiting(false);
    }, 5000);

    return () => {
      clearTimeout(mountLibraryTimer);
      clearTimeout(finishPreloaderTimer);
    };
  }, [isLibraryPreloading, setIsLibraryPreloading, setActiveModal]);

  if (!isLibraryPreloading) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="book-preloader"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.06 : 1,
          filter: isExiting ? "blur(24px)" : "blur(0px)",
        }}
        transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[999999] bg-[#0a0a0a] flex flex-col items-center justify-between p-6 sm:p-12 select-none overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Ambient Film Grain & Soft Warm Orange Glow Spotlight */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.035] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#eb6e00]/12 rounded-full blur-[170px] pointer-events-none animate-pulse" />

        {/* Top Header */}
        <div className="w-full flex items-center justify-between z-10 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#eb6e00] animate-pulse" />
            <span>ANIKET.OS // ARCHIVE</span>
          </div>
          <span className="text-[#eb6e00] font-bold">[ ENTERING LIBRARY ]</span>
        </div>

        {/* Center Premium Editorial Book Archive Card */}
        <div className="my-auto relative z-20 flex flex-col items-center justify-center w-full max-w-md">
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[290px] h-[380px] sm:w-[350px] sm:h-[450px] bg-[#141416] rounded-2xl border border-[#eb6e00]/40 p-6 sm:p-10 flex flex-col justify-between shadow-[0_0_60px_rgba(235,110,0,0.25),0_30px_90px_rgba(0,0,0,0.9)] text-center overflow-hidden"
          >
            {/* Subtle Spine Accent Line */}
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#eb6e00] via-[#eb6e00]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#eb6e00]/10 via-transparent to-black/60 pointer-events-none" />

            <div className="space-y-4 my-auto flex flex-col items-center relative z-10">
              <span className="text-[9px] font-mono text-[#eb6e00] font-bold uppercase tracking-[0.3em] bg-[#eb6e00]/10 border border-[#eb6e00]/25 px-3.5 py-1 rounded-full shadow-inner">
                ARCHIVE UNLOCKED
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight leading-none pt-2">
                ANIKET&apos;S <br />
                <span className="text-[#eb6e00]">LIBRARY</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#eb6e00]/60 my-2" />
              <p className="text-xs sm:text-sm italic font-serif text-zinc-300 max-w-xs leading-relaxed">
                &ldquo;Books that shaped how I think, build and learn.&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-emerald-400 relative z-10 pt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold uppercase tracking-widest">Opening Collection...</span>
            </div>
          </motion.div>

          {/* Minimal Editorial Caption Below Book */}
          <div className="mt-8 flex flex-col items-center space-y-2 text-center">
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#eb6e00] animate-pulse" />
              <span>You&apos;re heading to Aniket&apos;s Library</span>
            </div>
            <div className="w-32 h-0.5 bg-white/10 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-[#eb6e00]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Metadata Footer */}
        <div className="w-full flex justify-between items-center z-10 text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          <span>CINEMATIC ENTRY TRANSITION</span>
          <span>ANIKET UPADHYAY</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BookPreloader;
