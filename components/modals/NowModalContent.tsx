"use client";

import React, { useState, useEffect } from "react";
import { Zap, Eye, BookOpen, Headphones, Target, ExternalLink, Disc, CheckCircle2, Circle, Clock, Check, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Song {
  title: string;
  artist: string;
  album: string;
  cover: string;
  url: string;
}

const eminemPlaylist: Song[] = [
  {
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile Original Motion Picture Soundtrack",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/5ieJ1L1BJTmFflTfqvR9gB"
  },
  {
    title: "Mockingbird",
    artist: "Eminem",
    album: "Encore (Deluxe Edition)",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/561wsWuV94jZ0Zivp3z4LZ"
  },
  {
    title: "Rap God",
    artist: "Eminem",
    album: "The Marshall Mathers LP2",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/6L89FXIYNdY2jeM4avLbhB"
  },
  {
    title: "Till I Collapse",
    artist: "Eminem",
    album: "The Eminem Show",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/4r9eYjh2vY908581eB8pY8"
  },
  {
    title: "Stan",
    artist: "Eminem",
    album: "The Marshall Mathers LP",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/3U4isOIWM3VvDubwSI3y7a"
  },
  {
    title: "Godzilla (feat. Juice WRLD)",
    artist: "Eminem",
    album: "Music To Be Murdered By",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/7FIWs0pqAYiEJuG11wR2Z1"
  },
  {
    title: "Without Me",
    artist: "Eminem",
    album: "The Eminem Show",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/722frAYmDUhRKeC4wLUtj0"
  },
  {
    title: "Not Afraid",
    artist: "Eminem",
    album: "Recovery",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&auto=format&fit=crop&q=80",
    url: "https://open.spotify.com/track/15JINEG2vWq1mZ8F0PzVaZ"
  },
];

interface TechTopic {
  name: string;
  status: "completed" | "active" | "learning";
}

const techStackBoard: TechTopic[] = [
  { name: "React.js", status: "completed" },
  { name: "Next.js 15", status: "completed" },
  { name: "TypeScript", status: "completed" },
  { name: "Node.js", status: "completed" },
  { name: "Express.js", status: "completed" },
  { name: "MongoDB", status: "completed" },
  { name: "System Design", status: "active" },
  { name: "Redis Caching", status: "active" },
  { name: "Docker", status: "learning" },
  { name: "AWS", status: "learning" },
  { name: "C++ DSA", status: "completed" },
];

export default function NowModalContent() {
  const [songIndex, setSongIndex] = useState(0);

  // Rotation timer every 4 seconds (never showing same song twice in a row)
  useEffect(() => {
    const timer = setInterval(() => {
      setSongIndex((prevIndex) => {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * eminemPlaylist.length);
        } while (nextIndex === prevIndex);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentSong = eminemPlaylist[songIndex];

  return (
    <div className="w-full flex flex-col space-y-8 pb-32 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#eb6e00] animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.25em]">
            LIVE / NOW • ANIKET.OS v3.0
          </span>
        </div>
        <h2 className="text-xl font-bold text-white font-sans tracking-tight">
          Aniket's Current Workspace Dashboard
        </h2>
      </div>

      {/* 5 Distinct Handcrafted Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1️⃣ BUILDING CARD (Browser Mockup Preview + Progress) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative p-5 rounded-2xl bg-[#0e0e10]/80 backdrop-blur-xl border border-white/10 hover:border-[#eb6e00]/50 hover:shadow-[0_0_30px_rgba(235,110,0,0.35)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#eb6e00]/15 border border-[#eb6e00]/30 flex items-center justify-center text-[#eb6e00]">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  BUILDING
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-white/5 border border-white/10 text-zinc-400">
                Updated 2h ago
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-sans group-hover:text-[#eb6e00] transition-colors">
                Portfolio v3.0
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Apple-Inspired Production Portfolio
              </p>
            </div>

            {/* Miniature Browser Window Mockup */}
            <div className="p-3 rounded-xl bg-[#050507] border border-white/10 space-y-2 group-hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] font-mono text-zinc-500">aniketupadhyay.dev</span>
              </div>
              <div className="font-mono text-[10px] text-zinc-400 space-y-1">
                <div className="text-emerald-400">✓ Production Ready Architecture</div>
                <div className="text-zinc-500">pnpm build &amp; deploy --prod</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-400">Building Progress</span>
                <span className="text-[#eb6e00] font-bold">87%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "87%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#eb6e00] to-[#ff881a] shadow-[0_0_10px_rgba(235,110,0,0.8)]"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2️⃣ LEARNING CARD (Interactive Technology Board) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="group relative p-5 rounded-2xl bg-[#0e0e10]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  LEARNING
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">
                11 Active Topics
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white font-sans">
                Technology Stack Board
              </h3>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Interactive engineering competency matrix
              </p>
            </div>

            {/* Glowing Tech Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {techStackBoard.map((tech) => (
                <div
                  key={tech.name}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all duration-200 cursor-default flex items-center gap-1.5 ${
                    tech.status === "completed"
                      ? "bg-[#eb6e00]/10 text-[#ff881a] border border-[#eb6e00]/30 hover:bg-[#eb6e00]/20"
                      : tech.status === "active"
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                      : "bg-white/5 text-zinc-400 border border-white/5 hover:text-white"
                  }`}
                >
                  {tech.status === "active" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span className="text-amber-400">● Orange = Mastered</span>
            <span className="text-cyan-400">● Pulsing = Active Focus</span>
          </div>
        </motion.div>

        {/* 3️⃣ LISTENING CARD (Hero Spotify Card with Animated Album Cover & Rotation) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => window.open(currentSong.url, "_blank", "noopener,noreferrer")}
          className="group relative p-5 rounded-2xl bg-[#0e0e10]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
        >
          {/* Ambient Blurred Album Art Overlay */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center blur-2xl pointer-events-none transition-all duration-700 group-hover:opacity-30"
            style={{ backgroundImage: `url(${currentSong.cover})` }}
          />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  SPOTIFY / LISTENING
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Currently Vibing</span>
              </div>
            </div>

            {/* Album Cover & Track Details */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg border border-white/10 shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={currentSong.cover} 
                  alt={currentSong.title}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSong.title}
                    initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-0.5"
                  >
                    <h3 className="text-base font-bold text-white font-sans truncate group-hover:text-emerald-400 transition-colors">
                      {currentSong.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono font-semibold">
                      {currentSong.artist}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-sans truncate">
                      {currentSong.album}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Track Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <div className="h-full rounded-full bg-emerald-400 w-3/5 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-500">
                <span>2:14</span>
                <span className="text-emerald-400 font-bold">Open on Spotify ↗</span>
                <span>4:28</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4️⃣ READING CARD (Real Book Cover + Progress) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="group relative p-5 rounded-2xl bg-[#0e0e10]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  READING
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold">
                Page 218 / 616
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Book Cover Visual */}
              <div className="w-14 h-20 rounded-lg bg-gradient-to-br from-amber-700 via-amber-900 to-zinc-900 border border-amber-500/30 p-2 shadow-lg shrink-0 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                <div className="text-[8px] font-mono font-bold text-amber-300 leading-tight">
                  DDIA
                </div>
                <div className="text-[7px] font-sans text-amber-200/70">
                  Kleppmann
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-sans leading-snug group-hover:text-amber-400 transition-colors">
                  Designing Data-Intensive Applications
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  by Martin Kleppmann
                </p>
                <div className="text-[10px] text-zinc-500 font-sans pt-1">
                  Distributed Storage, Replication &amp; Consensus
                </div>
              </div>
            </div>

            {/* Reading Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-400">Reading Progress</span>
                <span className="text-amber-400 font-bold">68%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 border border-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 w-[68%] shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5️⃣ CURRENT MISSION CARD (Full-Width Career & Task Board) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="md:col-span-2 group relative p-6 rounded-2xl bg-[#0e0e10]/80 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Target className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">
                  CURRENT MISSION
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                Today 4/6 Tasks Done
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Mission Goal & Progress Ring */}
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-lg font-bold text-white font-sans group-hover:text-purple-400 transition-colors">
                  Land a Software Development Engineer (SDE) Role
                </h3>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Building production-ready full-stack applications, optimizing system design architectures, and mastering advanced algorithm problem solving.
                </p>
              </div>

              {/* Circular Progress Ring */}
              <div className="flex items-center justify-center md:justify-end gap-3 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-white/10" fill="transparent" />
                    <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-purple-500" strokeDasharray={138} strokeDashoffset={34} strokeLinecap="round" fill="transparent" />
                  </svg>
                  <span className="absolute text-xs font-bold text-white font-mono">75%</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  <div>Quarterly Goal</div>
                  <div className="text-purple-400 font-bold">Target: Q3 2026</div>
                </div>
              </div>
            </div>

            {/* Daily Checklist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Daily C++ DSA</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Portfolio Architecture</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">REST API Testing</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-purple-400 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                <span className="truncate">Daily Applications</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Circle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Mock Interviews</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-500">
                <Circle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Networking</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
