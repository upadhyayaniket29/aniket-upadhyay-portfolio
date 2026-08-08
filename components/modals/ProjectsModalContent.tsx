"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Cpu, Layers, Sparkles, CheckCircle2 } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  category: "PERSONAL" | "CLIENT WORK";
  githubUrl: string;
  demoUrl: string;
  features: string[];
  learnings: string;
}

const projects: ProjectItem[] = [
  {
    id: "sms",
    title: "SMS - Student Management System",
    subtitle: "Enterprise Role-Based Management Portal",
    description: "Developed a full-stack Student Management System with role-based access for Admin and Users. Implemented secure authentication using JWT with password hashing via bcrypt and API-driven dashboards. Developed modular backend architecture following MVC principles.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    category: "PERSONAL",
    githubUrl: "https://github.com/upadhyayaniket29",
    demoUrl: "https://github.com/upadhyayaniket29",
    features: [
      "JWT-authenticated role-based dashboard for Admins & Students",
      "API-driven REST architecture with password hashing via bcrypt",
      "Modular MVC architecture with MongoDB schema validation",
    ],
    learnings: "Mastered full-stack authentication flows, JWT refresh tokens, and scalable MongoDB schema design."
  },
  {
    id: "zento",
    title: "Zento Cars - Car Rental Platform",
    subtitle: "Production Rental & Booking Engine",
    description: "Built a full-stack car rental platform with user authentication, vehicle availability checks, and booking management. Developed REST APIs with MongoDB to support admin booking approvals and secure data handling.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    category: "PERSONAL",
    githubUrl: "https://github.com/upadhyayaniket29",
    demoUrl: "https://github.com/upadhyayaniket29",
    features: [
      "Real-time vehicle availability checking & reservation engine",
      "Admin approval portal for pending booking requests",
      "Responsive glassmorphism UI with dark theme styling",
    ],
    learnings: "Deepened expertise in MongoDB transactional queries, REST API performance tuning, and responsive UI micro-interactions."
  },
  {
    id: "zink",
    title: "Zink - Real Time Chat Application",
    subtitle: "Low-Latency WebSocket Messaging Suite",
    description: "Developed a real-time chat application with one-to-one messaging and online/offline user presence using Socket.io, featuring a responsive frontend styled with DaisyUI and MongoDB-backed APIs.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io"],
    category: "PERSONAL",
    githubUrl: "https://github.com/upadhyayaniket29",
    demoUrl: "https://github.com/upadhyayaniket29",
    features: [
      "Sub-50ms WebSocket real-time messaging via Socket.io",
      "Live online/offline presence indicators & typing status",
      "Persistent message storage with indexed MongoDB collections",
    ],
    learnings: "Gained practical experience with event-driven Socket.io socket pools, state persistence, and real-time frontend syncing."
  }
];

export default function ProjectsModalContent() {
  const [activeTab, setActiveTab] = useState<"PERSONAL" | "CLIENT WORK">("PERSONAL");

  const filteredProjects = projects.filter(p => p.category === activeTab);

  return (
    <div className="w-full flex flex-col pb-32">
      
      {/* Sticky Top Header & Tabs Bar */}
      <div className="sticky top-[-24px] z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 pt-4 pb-4 mb-6 -mx-6 px-6 sm:-mx-8 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <h3 className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-1">
            Featured Works
          </h3>
          <h2 className="text-base font-bold text-white font-sans tracking-tight">
            Production Software & Architecture
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("PERSONAL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all uppercase ${
              activeTab === "PERSONAL"
                ? "bg-[#eb6e00] text-white font-bold shadow-[0_0_12px_rgba(235,110,0,0.4)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Personal Projects
          </button>
          <button
            onClick={() => setActiveTab("CLIENT WORK")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all uppercase ${
              activeTab === "CLIENT WORK"
                ? "bg-[#eb6e00] text-white font-bold shadow-[0_0_12px_rgba(235,110,0,0.4)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Client Work
          </button>
        </div>
      </div>

      {/* Projects List with Sticky Action Pill Headers */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="space-y-8"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-[#111111]/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20"
              >
                {/* 1. Project Title & Sticky Glass Action Bar */}
                <div className="sticky top-[52px] z-20 bg-[#0d0d0d]/90 backdrop-blur-xl border-b border-white/10 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
                  <div>
                    <h4 className="text-lg font-bold text-white font-sans tracking-tight">{project.title}</h4>
                    <p className="text-xs text-[#eb6e00] font-mono mt-0.5">{project.subtitle}</p>
                  </div>

                  {/* Premium Glass Action Pills (CODE & LIVE DEMO) */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* GitHub CODE Pill */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-[#151515]/80 backdrop-blur-xl border border-white/15 text-white hover:border-[#eb6e00]/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(235,110,0,0.35)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/code cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-zinc-300 group-hover/code:text-[#eb6e00] group-hover/code:rotate-12 transition-all" />
                      <span className="text-xs font-mono font-bold tracking-wider">CODE</span>
                    </a>

                    {/* LIVE DEMO Pill */}
                    <a
                      href={project.demoUrl}
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
                </div>

                {/* 2. Project Card Content */}
                <div className="p-5 sm:p-6 space-y-6">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/5 border border-white/10 text-zinc-300"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Key Architecture Features */}
                  <div className="space-y-3 pt-2">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#eb6e00]" />
                      <span>Key Architectural Highlights</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {project.features.map((feat, i) => (
                        <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-xs text-zinc-300 font-sans leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Learnings */}
                  <div className="p-4 rounded-xl bg-[#eb6e00]/5 border border-[#eb6e00]/15 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#eb6e00] shrink-0 mt-0.5" />
                    <div className="text-xs text-zinc-300 font-sans leading-relaxed">
                      <span className="font-mono text-[#eb6e00] font-bold">Learnings & Impact: </span>
                      {project.learnings}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-zinc-500 text-xs font-mono border border-dashed border-white/10 rounded-2xl">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
