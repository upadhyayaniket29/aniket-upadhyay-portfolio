"use client";

import React, { useState } from "react";
import { Award, ExternalLink, Download, Image as ImageIcon, CheckCircle2, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Certificate {
  id: number;
  title: string;
  organization: string;
  date: string;
  skills: string[];
  description?: string;
  image: string;
  verifyUrl?: string;
  pdfUrl?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Introduction to Subagents",
    organization: "Anthropic",
    date: "March 2026",
    skills: ["AI Subagents", "Agentic Workflows"],
    description: "Completed Anthropic's Introduction to Subagents course. Gained foundational understanding of multi-agent architectures, tool calling, and autonomous execution.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    verifyUrl: "https://verify.skilljar.com/c/petzkbapfh9g",
  },

  {
    id: 3,
    title: "Customer Service: Problem Solving and Troubleshooting",
    organization: "LinkedIn Learning",
    date: "2024",
    skills: ["Customer Support", "Customer Service"],
    description: "Mastered strategic troubleshooting workflows, effective communication, and problem resolution frameworks.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
    verifyUrl: "https://www.linkedin.com/learning/certificates/899909ad6468930375f0e55804bf43a5da729e33ccdf22f0a74d64ce0b439813?trk=share_certificate",
  },
  {
    id: 4,
    title: "Digital Marketing Foundation",
    organization: "LinkedIn Learning",
    date: "2024",
    skills: ["Digital Marketing", "Growth Strategy"],
    description: "Covered digital marketing strategy, channel allocation, performance analytics, and content optimization.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    verifyUrl: "https://www.linkedin.com/learning/certificates/26c3cda02075653cbe22f938809c7c3334ee12c5bed81d9daeae8d734ad4b6ae?trk=share_certificate",
  },
  {
    id: 5,
    title: "What is Graphic Design",
    organization: "LinkedIn Learning",
    date: "2024",
    skills: ["Graphic Design", "Visual Hierarchy"],
    description: "Explored visual design fundamentals, layout composition, typography rules, and brand aesthetic principles.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    verifyUrl: "https://www.linkedin.com/learning/certificates/d588a99dcbe5e35d2457af8473be478bff8a1dadeb624be57f2be8203a7eb51d?trk=share_certificate",
  }
];

export default function CertificatesModalContent() {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  return (
    <div className="h-full flex flex-col space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <span>Licenses & Certifications</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#eb6e00]/10 text-[#eb6e00]">
              {certificates.length} Verified
            </span>
          </h3>
          <p className="text-xs text-zinc-500 font-sans mt-1">
            Verified credentials, course completions, and technical achievements.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            whileHover={{ 
              y: -4, 
              boxShadow: "0 10px 30px -10px rgba(235,110,0,0.15)",
              borderColor: "rgba(235,110,0,0.4)"
            }}
            className="group flex flex-col bg-[#111111]/40 border border-white/5 rounded-xl overflow-hidden transition-all duration-200"
          >
            {/* Image Banner */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-white/5 border-b border-white/5">
              {!loadedImages[cert.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                  <ImageIcon className="w-6 h-6 text-white/10 animate-pulse" />
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                onLoad={() => setLoadedImages(prev => ({ ...prev, [cert.id]: true }))}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${
                  loadedImages[cert.id] ? "opacity-100" : "opacity-0"
                }`}
              />
              
              {/* Organization Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#090909]/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-zinc-300">
                <CheckCircle2 className="w-3 h-3 text-[#eb6e00]" />
                <span>{cert.organization}</span>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            </div>

            {/* Card Body */}
            <div className="flex flex-col flex-1 p-5 space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white font-sans leading-snug group-hover:text-[#eb6e00] transition-colors">
                  {cert.title}
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-1">
                  Issued: {cert.date}
                </p>
              </div>

              {cert.description && (
                <p className="text-[12px] text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {cert.description}
                </p>
              )}

              {/* Skills Tags */}
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 flex items-center gap-1"
                    >
                      <Tag className="w-2.5 h-2.5 text-[#eb6e00]/70" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              )}

              {/* Footer / Show Credential Button */}
              {cert.verifyUrl && cert.verifyUrl !== "#" && (
                <div className="mt-auto pt-3 border-t border-white/5">
                  <a 
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-white/5 hover:bg-[#eb6e00]/15 hover:text-[#eb6e00] hover:border-[#eb6e00]/30 border border-white/5 transition-all duration-200 text-[11px] font-mono text-zinc-300 w-full group/btn"
                  >
                    <span>Show Credential</span>
                    <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
