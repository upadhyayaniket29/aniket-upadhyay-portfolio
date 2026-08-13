"use client";

import React from "react";
import { FileText, Rocket, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { useModal } from "../ModalProvider";

export default function AboutWindowCard() {
  const { setActiveModal } = useModal();

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -48%)",
        zIndex: 30,
        pointerEvents: "auto",
        width: "92%",
        maxWidth: "620px",
        userSelect: "none",
      }}
    >
      {/* IDE macOS Window Frame */}
      <div className="relative rounded-2xl bg-[#090b10]/85 backdrop-blur-2xl border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
        
        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
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

          {/* Right Spacer */}
          <div className="w-12" />
        </div>

        {/* Card Main Body */}
        <div className="p-5 sm:p-7 space-y-5 text-left">
          
          {/* Large Hero Name & Role Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Aniket <br />
              <span className="text-white">
                Upadhyay
              </span>
            </h1>

            {/* Subtitle / Role */}
            <p className="font-mono text-[10px] sm:text-[11.5px] font-bold tracking-[0.16em] text-[#fb923c] uppercase pt-1">
              FULL-STACK DEVELOPER — AI, DISTRIBUTED SYSTEMS & WEB APPLICATIONS
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-full" />

          {/* Bio Text */}
          <div className="text-zinc-300 text-[13px] sm:text-[14px] leading-[1.75] font-sans font-normal space-y-3">
            <p>
              Software engineer specializing in high-performance web applications, distributed infrastructure, and full-stack systems programming. Builds low-latency services, real-time data pipelines, developer tooling, and interactive applications in <span className="text-white font-semibold">TypeScript, Next.js 15, React, C++,</span> and <span className="text-white font-semibold">Python</span> — bridging complex backend architectures with sleek, intuitive user interfaces.
            </p>
          </div>

          {/* Call-to-Action Buttons Row (View Resume & Explore Projects) */}
          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* View Resume Button */}
            <button
              onClick={() => setActiveModal("resume")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-[#f97316]/60 text-white font-mono text-[11.5px] sm:text-[12.5px] font-bold tracking-wide transition-all duration-200 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#f97316]" />
              <span>View Resume</span>
            </button>

            {/* Explore Projects Button */}
            <button
              onClick={() => setActiveModal("projects")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] hover:brightness-110 text-black font-mono text-[11.5px] sm:text-[12.5px] font-extrabold tracking-wide transition-all duration-200 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 text-black" />
              <span>Explore Projects</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 w-full" />

          {/* Card Footer Info & Socials */}
          <div className="flex flex-row items-center justify-between gap-3 pt-0.5">
            {/* Left: Avatar Handle & Location */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f97316] to-[#fbbf24] p-[1.5px] shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                <div className="w-full h-full rounded-[7px] bg-[#090b12] flex items-center justify-center font-mono font-bold text-white text-[11px]">
                  AU
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[11px] font-bold text-white tracking-wider">
                  @upadhyayaniket29
                </span>
                <span className="font-mono text-[9.5px] text-zinc-500">
                  Gwalior · India
                </span>
              </div>
            </div>

            {/* Right: Quick Social Links */}
            <div className="flex items-center gap-1.5 text-zinc-400">
              <a
                href="https://github.com/upadhyayaniket29"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/aniketupadhyay"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:upadhyayaniket29@gmail.com"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200"
                title="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
