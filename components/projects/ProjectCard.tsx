"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Download, Users, Gauge, Github, ExternalLink, X, Cpu, Layers } from "lucide-react";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    problem: string;
    solution: string;
    architecture: string;
    github?: string | null;
    demo?: string | null;
    featuredImage: string;
    mobileImage?: string | null;
    desktopImage?: string | null;
    status: string;
    githubStars?: number | null;
    downloads?: number | null;
    usersCount?: number | null;
    lighthouseScore?: number | null;
    tags: { tag: { name: string } }[];
    technologies: { technology: { name: string; color?: string | null } }[];
  };
}

export function ProjectCard({ project }: ProjectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Background spotlight position tracking for the card glow effect
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {/* 1. Normal Listing Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        className="w-full rounded-2xl border border-white/5 bg-[#111111]/45 hover:bg-[#111111]/70 transition-all duration-300 relative overflow-hidden group cursor-pointer p-6 flex flex-col justify-between h-[300px]"
        style={{
          boxShadow: isHovered ? "0 20px 40px rgba(0, 0, 0, 0.4)" : "none",
        }}
      >
        {/* Hover spotlight glow overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(235, 110, 0, 0.15), transparent 80%)`,
            }}
          />
        )}

        {/* Content Header */}
        <div className="relative z-10">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[9px] font-mono font-medium tracking-wide uppercase bg-[#eb6e00]/10 text-[#eb6e00] border border-[#eb6e00]/25"
              >
                {t.tag.name}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white font-sans group-hover:text-[#eb6e00] transition-colors leading-snug">
            {project.title}
          </h3>
          <p className="text-xs text-[#a1a1aa] font-sans mt-2 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Bottom statistics & tools */}
        <div className="relative z-10 mt-6 border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="text-[10px] text-zinc-500 font-mono font-semibold"
                style={{ color: tech.technology.color || undefined }}
              >
                #{tech.technology.name}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] text-zinc-600 font-mono">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Metrics bar */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
            {project.githubStars !== undefined && project.githubStars !== null && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>{project.githubStars.toLocaleString()}</span>
              </div>
            )}

            {project.downloads !== undefined && project.downloads !== null && (
              <div className="flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-emerald-500" />
                <span>{project.downloads >= 1000 ? `${(project.downloads/1000).toFixed(1)}k` : project.downloads}</span>
              </div>
            )}

            {project.lighthouseScore !== undefined && project.lighthouseScore !== null && (
              <div className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-[#eb6e00]" />
                <span className="text-white font-semibold">{project.lighthouseScore}%</span>
              </div>
            )}
            <span className="text-[9px] uppercase tracking-wider text-[#eb6e00] font-bold group-hover:translate-x-1 transition-transform">
              Case Study &rarr;
            </span>
          </div>
        </div>
      </div>

      {/* 2. Expanded Detail Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-panel max-h-[85vh] flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/90">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">PROJECT CASE STUDY</span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-none">
                {/* Intro */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white font-sans leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-[#a1a1aa] font-sans mt-3 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-5">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-white">
                        {t.tag.name}
                      </span>
                    ))}
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded text-[10px] font-mono text-[#eb6e00] bg-[#eb6e00]/5 border border-[#eb6e00]/10">
                        {tech.technology.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core stats panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="text-center md:text-left">
                    <span className="block text-[9px] text-zinc-500 font-mono uppercase">Lighthouse score</span>
                    <span className="text-lg font-bold text-white font-mono mt-1 block">
                      {project.lighthouseScore || 100}%
                    </span>
                  </div>
                  <div className="text-center md:text-left border-l border-white/5 pl-0 md:pl-4">
                    <span className="block text-[9px] text-zinc-500 font-mono uppercase">GitHub Stars</span>
                    <span className="text-lg font-bold text-white font-mono mt-1 block">
                      ★{project.githubStars || 0}
                    </span>
                  </div>
                  <div className="text-center md:text-left border-l border-white/5 pl-0 md:pl-4">
                    <span className="block text-[9px] text-zinc-500 font-mono uppercase">NPM Downloads</span>
                    <span className="text-lg font-bold text-white font-mono mt-1 block">
                      {project.downloads?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="text-center md:text-left border-l border-white/5 pl-0 md:pl-4">
                    <span className="block text-[9px] text-zinc-500 font-mono uppercase">Monthly Users</span>
                    <span className="text-lg font-bold text-white font-mono mt-1 block">
                      {project.usersCount?.toLocaleString() || 0}+
                    </span>
                  </div>
                </div>

                {/* Case Study Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  {/* Problem */}
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-xs font-bold text-red-400 font-mono uppercase">
                      <X className="w-4 h-4" />
                      <span>The Problem Statement</span>
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400 font-sans">
                      {project.problem}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono uppercase">
                      <Cpu className="w-4 h-4" />
                      <span>The Solution</span>
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-400 font-sans">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Architecture Details */}
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <h4 className="flex items-center gap-2 text-xs font-bold text-zinc-300 font-mono uppercase">
                    <Layers className="w-4 h-4 text-[#eb6e00]" />
                    <span>System Architecture & Data Flow</span>
                  </h4>
                  <div className="p-4 rounded-xl border border-white/5 bg-[#050505]/95 font-mono text-[10px] text-zinc-400 whitespace-pre-wrap leading-relaxed">
                    {project.architecture}
                  </div>
                </div>
              </div>

              {/* Footer CTAs */}
              <div className="px-6 py-4 border-t border-white/10 bg-[#050505]/95 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={project.github || "https://github.com/upadhyayaniket29"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-[#151515]/80 backdrop-blur-xl border border-white/15 text-white hover:border-[#eb6e00]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(235,110,0,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/code cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-zinc-300 group-hover/code:text-[#eb6e00] group-hover/code:rotate-12 transition-all" />
                    <span className="text-xs font-mono font-bold tracking-wider">CODE</span>
                  </a>

                  <a
                    href={project.demo || "https://github.com/upadhyayaniket29"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-[#eb6e00]/15 backdrop-blur-xl border border-[#eb6e00]/40 text-white hover:bg-[#eb6e00]/25 hover:border-[#ff881a] hover:shadow-[0_0_25px_rgba(235,110,0,0.55)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/demo cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="absolute w-3 h-3 rounded-full bg-emerald-400/40 animate-ping" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-[#ff881a]">LIVE DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#ff881a] group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
export default ProjectCard;
