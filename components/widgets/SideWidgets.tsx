"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  {
    text: "Avoidance doesn't eliminate pain — it compounds it.",
    author: "uaniket",
    context: "WRITING"
  },
  {
    text: "Those sudden spikes of self-worth are reminders, not discoveries.",
    author: "uaniket",
    context: "WRITING"
  },
  {
    text: "The cost of procrastination is the life you could have lived.",
    author: "uaniket",
    context: "THOUGHTS"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "uaniket",
    context: "DESIGN"
  }
];

export function ThoughtsWidget() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex flex-col relative overflow-hidden transition-all hover:bg-black/50 shadow-2xl">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      <div className="w-6 h-[2px] bg-white/10 rounded-full mx-auto mb-4" />
      
      <div className="min-h-[80px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="text-[14px] text-zinc-300 font-medium leading-relaxed font-sans"
          >
            “{QUOTES[index].text}”
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center gap-1.5 mb-3">
        {QUOTES.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-full transition-all duration-300 ${i === index ? 'w-4 bg-[#eb6e00]' : 'w-[3px] bg-zinc-700'}`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
        <span>— {QUOTES[index].author}</span>
        <span className="w-1 h-1 rounded-full bg-zinc-700" />
        <span>{QUOTES[index].context}</span>
      </div>
    </div>
  );
}

export function SpotifyWidget() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="w-full bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 flex flex-col relative overflow-hidden transition-all hover:bg-black/50 shadow-2xl">
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
      <div className="w-6 h-[2px] bg-white/10 rounded-full mx-auto mb-4" />
      
      <div className="flex items-center gap-4">
        {/* Album Art */}
        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 shadow-lg" style={{ background: "linear-gradient(135deg, #f43f5e, #8b5cf6)" }}>
          <img 
            src="https://c.saavncdn.com/181/Hasee-Toh-Phasee-Hindi-2014-20190607133748-500x500.jpg" 
            alt="Ishq Bulaava" 
            className="w-full h-full object-cover opacity-90"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setIsPlaying(false)}>
              <div className="w-3 h-3 bg-white/80" style={{ clipPath: "polygon(0 0, 30% 0, 30% 100%, 0 100%, 70% 0, 100% 0, 100% 100%, 70% 100%)" }} />
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-1 overflow-hidden">
          <h4 className="text-[13px] font-bold text-white font-display truncate">Ishq Bulaava</h4>
          <p className="text-[11px] text-zinc-500 font-mono mt-0.5 truncate">Vishal-Shekhar, Sanam Puri</p>
        </div>

        {/* Playback Indicator */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors flex-shrink-0 cursor-pointer"
        >
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-[10px]">
              {[1, 2, 3].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-[2px] bg-[#eb6e00] rounded-t-sm"
                  animate={{ height: ["3px", "10px", "3px"] }}
                  transition={{ duration: 1, repeat: Infinity, delay: bar * 0.2, ease: "easeInOut" }}
                />
              ))}
            </div>
          ) : (
            <div className="flex gap-1">
               <div className="w-1 h-3 bg-zinc-400 rounded-sm" />
               <div className="w-1 h-3 bg-zinc-400 rounded-sm" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export function SideWidgets() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[320px]">
      <ThoughtsWidget />
      <SpotifyWidget />
    </div>
  );
}
