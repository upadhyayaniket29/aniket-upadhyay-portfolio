"use client";

import React from "react";
import { FileText, Rocket, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useModal } from "../ModalProvider";

export default function AboutWindowCard() {
  const { setActiveModal } = useModal();

  return (
    <div className="w-full max-w-[860px] mx-auto my-6 font-sans">
      {/* IDE macOS Window Frame */}
      <div className="relative rounded-2xl bg-[#0a0c12]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
        
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          {/* macOS 3 Dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 block" />
          </div>

          {/* Centered Window Title */}
          <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-white/40 uppercase">
            ABOUT
          </span>

          {/* Dummy right spacer */}
          <div className="w-12" />
        </div>

        {/* Card Main Body */}
        <div className="p-6 sm:p-10 space-y-7">
          
          {/* Large Hero Name & Role Header */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.05] font-display">
              Aniket <br />
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Upadhyay
              </span>
            </h1>

            {/* Subtitle / Role */}
            <p className="font-mono text-[11px] sm:text-[12.5px] font-bold tracking-[0.16em] text-[#fb923c] uppercase pt-1">
              FULL-STACK DEVELOPER — AI, DISTRIBUTED SYSTEMS & WEB APPLICATIONS
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-full" />

          {/* Bio Text */}
          <div className="text-zinc-300 text-[14px] sm:text-[15px] leading-[1.8] font-sans font-normal space-y-4">
            <p>
              Software engineer specializing in high-performance web applications, distributed infrastructure, and full-stack systems programming. Builds low-latency services, real-time data pipelines, interactive developer tooling, and modern web applications in <span className="text-white font-semibold">TypeScript, Next.js 15, React, C++,</span> and <span className="text-white font-semibold">Python</span> — bridging complex backend architectures with sleek, intuitive user interfaces.
            </p>
            <p>
              Driven by clean code, minimalist design principles, and deep protocol exploration — occasionally writing tech articles and contributing to open-source software.
            </p>
          </div>

          {/* Call-to-Action Buttons Row (View Resume & Explore Projects) */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
            {/* View Resume Button */}
            <button
              onClick={() => setActiveModal("resume")}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#f97316]/60 text-white font-mono text-[12px] sm:text-[13px] font-bold tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#f97316]" />
              <span>View Resume</span>
            </button>

            {/* Explore Projects Button */}
            <button
              onClick={() => setActiveModal("projects")}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] hover:brightness-110 text-black font-mono text-[12px] sm:text-[13px] font-extrabold tracking-wide transition-all duration-200 shadow-[0_0_25px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-black" />
              <span>Explore Projects</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-full" />

          {/* Card Footer Info & Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            {/* Left: Avatar Handle & Location */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#fbbf24] p-[1.5px] shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                <div className="w-full h-full rounded-[10px] bg-[#090b12] flex items-center justify-center font-mono font-bold text-white text-[12px]">
                  AU
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[12px] font-bold text-white tracking-wider">
                  @upadhyayaniket29
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  Gwalior · India
                </span>
              </div>
            </div>

            {/* Right: Quick Social Links */}
            <div className="flex items-center gap-3 text-zinc-400">
              <a
                href="https://github.com/upadhyayaniket29"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/aniketupadhyay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="mailto:upadhyayaniket29@gmail.com"
                className="p-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
