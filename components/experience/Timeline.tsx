"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, ExternalLink, Award, Sparkles } from "lucide-react";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  duration: string;
  location?: string;
  description: string;
  details?: string[];
  skills: string[];
  isHighlighted?: boolean;
  isArrowTimeline?: boolean;
  certificateNote?: string;
}

const experiences: ExperienceItem[] = [
  // 1. Praedico Global Research (Most recent Web Dev internship)
  {
    id: "praedico",
    role: "Web Developer Intern",
    company: "Praedico Global Research Pvt. Ltd.",
    type: "Internship",
    duration: "Jan 2026 - Mar 2026 · 3 mos",
    location: "Remote",
    description: "Designed and implemented frontend pages with complex form validation and state management in Next.js. Developed backend APIs and database schemas to support CRUD operations for students and courses.",
    skills: ["Next.js", "Tailwind CSS", "REST APIs", "Node.js", "State Management", "Web Development"],
    isHighlighted: true
  },
  // 2. DRDE (SDE internship)
  {
    id: "drde",
    role: "SDE Intern",
    company: "DRDE (Defence Research & Development Organization)",
    type: "Internship",
    duration: "Jun 2025 - Jul 2025 · 2 mos",
    location: "Gwalior, Madhya Pradesh, India · On-site",
    description: "Worked on core backend and frontend engineering projects under the supervision of Senior Scientists at DRDE:",
    details: [
      "Upgraded the Monthly Report System using PHP and MySQL to improve reporting efficiency and workflow optimization.",
      "Developed a custom GUI for GROMACS using Python Tkinter, simplifying molecular dynamics and computational chemistry workflows for researchers."
    ],
    skills: ["Python", "MySQL", "PHP", "Tkinter", "Backend Development", "GUI Engineering"],
    isHighlighted: true
  },
  // 3. Synk IN
  {
    id: "synk-in",
    role: "Co-Founder",
    company: "Synk IN",
    type: "Full-time",
    duration: "Aug 2023 ↗",
    isArrowTimeline: true,
    description: "Co-founded Synk IN platform, driving overall product strategy, system design, and technical architecture.",
    skills: ["Full-Stack Architecture", "Business Strategy", "Product Design", "System Architecture"]
  },
  // 4. Intervue.io
  {
    id: "intervue",
    role: "Operation Scheduling Intern",
    company: "Intervue.io",
    type: "Internship",
    duration: "Apr 2026 - Jun 2026 · 3 mos",
    location: "Remote",
    description: "Handled interviewer onboarding and operations scheduling. Honored with a Certificate of Appreciation for Outstanding Interviewer Onboarding Performance while maintaining high quality standards.",
    certificateNote: "Recognition for Outstanding Interviewer Onboarding Performance",
    skills: ["Operations Management", "Interviewer Onboarding", "Workflow Optimization"]
  },
  // 5. Founder's Office - Ghar Mandir
  {
    id: "ghar-mandir",
    role: "Founder's Office",
    company: "Ghar Mandir",
    type: "Internship",
    duration: "Dec 2024 - Jan 2025 · 2 mos",
    description: "Worked closely with leadership in the Founder's Office focusing on operational scaling, strategy execution, and process management.",
    skills: ["Organization Skills", "Operations Management", "Strategy"]
  }
];

export function Timeline() {
  return (
    <div className="w-full max-w-3xl mx-auto relative px-2 sm:px-4 pb-16">
      {/* Central Spine line */}
      <div className="absolute left-[16px] sm:left-[24px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#eb6e00]/60 via-white/10 to-transparent" />

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
            className="relative pl-8 sm:pl-12 flex flex-col"
          >
            {/* Timeline Node Orb */}
            <div 
              className={`absolute left-[10px] sm:left-[18px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transform -translate-x-1/2 transition-colors ${
                exp.isHighlighted 
                  ? "bg-[#eb6e00] border-[#0a0a0a] shadow-[0_0_10px_rgba(235,110,0,0.8)]" 
                  : "bg-zinc-800 border-zinc-500"
              }`}
            />

            {/* Experience Glass Card */}
            <div className={`p-5 rounded-xl border transition-all duration-300 ${
              exp.isHighlighted 
                ? "bg-[#111111]/70 border-[#eb6e00]/30 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(235,110,0,0.05)]" 
                : "bg-[#111111]/40 border-white/5 hover:border-white/10"
            }`}>
              
              {/* Card Top Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white font-sans">{exp.role}</h4>
                    {exp.isHighlighted && (
                      <span className="px-2 py-0.5 rounded-full bg-[#eb6e00]/10 border border-[#eb6e00]/30 text-[9px] font-mono text-[#eb6e00] font-semibold flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        FEATURED TECH
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-zinc-400 font-mono mt-0.5 flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-[#eb6e00]" />
                    <span className="font-semibold text-zinc-300">{exp.company}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">{exp.type}</span>
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                  <Calendar className="w-3 h-3 text-[#eb6e00]" />
                  {exp.isArrowTimeline ? (
                    <span className="text-[#eb6e00] font-semibold flex items-center gap-1">
                      {exp.duration}
                      <ExternalLink className="w-3 h-3 inline-block" />
                    </span>
                  ) : (
                    <span>{exp.duration}</span>
                  )}
                </div>
              </div>

              {/* Location */}
              {exp.location && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mb-3">
                  <MapPin className="w-3 h-3 text-zinc-600" />
                  <span>{exp.location}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-[13px] text-zinc-300 font-sans leading-relaxed mt-2">
                {exp.description}
              </p>

              {/* Bullet Details */}
              {exp.details && (
                <ul className="list-disc list-outside ml-4 mt-2.5 space-y-1.5 text-[12px] text-zinc-400 leading-relaxed marker:text-[#eb6e00]">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx}>{detail}</li>
                  ))}
                </ul>
              )}

              {/* Certificate Note */}
              {exp.certificateNote && (
                <div className="mt-3 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-center gap-2 text-[11px] text-amber-300 font-sans">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{exp.certificateNote}</span>
                </div>
              )}

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/5 text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
