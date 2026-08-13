// v=restore-sleek-music-widget-v1000
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, Download, Mail, Github, Linkedin, Twitter, MapPin, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../components/ModalProvider";
import { ModalWindow } from "../components/modals/ModalWindow";
import { AmbientSoundToggle } from "../components/animations/AmbientSoundToggle";

// Load Cinematic 3D Environment & Utilities
const CinematicCanvasEnv = dynamic(() => import("../components/three/CinematicCanvasEnv"), { ssr: false });
import LibraryOverlay from "../components/books/LibraryOverlay";
const GlassScrollbar = dynamic(() => import("../components/ui/GlassScrollbar"), { ssr: false });
import CinematicPreloader from "../components/ui/CinematicPreloader";
import GitHubActivityCard from "../components/github/GitHubActivityCard";
import LeetCodeActivityCard from "../components/leetcode/LeetCodeActivityCard";
const VisitorCounterWidget = dynamic(() => import("../components/ui/VisitorCounterWidget"), { ssr: false });
const ThoughtWidget = dynamic(() => import("../components/ui/ThoughtWidget"), { ssr: false });
const MusicWidget = dynamic(() => import("../components/ui/MusicWidget"), { ssr: false });

// Modals
import ProjectsModalContent from "../components/modals/ProjectsModalContent";
import ExperienceModalContent from "../components/modals/ExperienceModalContent";
import ResumeModalContent from "../components/modals/ResumeModalContent";
import UsesModalContent from "../components/modals/UsesModalContent";
import NowModalContent from "../components/modals/NowModalContent";
import ContactModalContent from "../components/modals/ContactModalContent";
import InteractiveTerminal from "../components/terminal/InteractiveTerminal";
import SettingsModalContent from "../components/modals/SettingsModalContent";
import CertificatesModalContent from "../components/modals/CertificatesModalContent";

export default function Home() {
  const { activeModal, setActiveModal } = useModal();
  const [localTime, setLocalTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-[#090909] text-white overflow-x-hidden font-sans">
      
      {/* Apple VisionOS Floating Glass Scrollbar */}
      <GlassScrollbar />
      
      {/* Landing First Screen - 100% Full-Bleed Masterpiece Sunset Artwork */}
      <section className="relative w-full h-screen overflow-hidden bg-[#090b12] flex items-center justify-center">
        <img 
          src="/hero-sunset-v999.png?v=999" 
          alt="Developer Workspace Sunset Artwork" 
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay container - sits above image, holds all floating widgets */}
        <div style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
        }}>
          {/* Animated Thought Widget - Top Left */}
          <ThoughtWidget />
          {/* Music Player Widget - Bottom Left */}
          <MusicWidget />
        </div>
      </section>

      {/* Developer Activity Section (GitHub & LeetCode) */}
      <div className="relative z-20 space-y-8 my-8">
        <GitHubActivityCard />
        <LeetCodeActivityCard />
      </div>

      {/* About Section */}
      <section className="relative z-20 w-full bg-[#090909] px-6 md:px-12 lg:px-32 pt-16 pb-16">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1200px] w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-start relative z-10 mx-auto"
        >
          
          <div className="lg:w-1/3 flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-widest font-mono text-[#eb6e00] uppercase">01 / Introduction</span>
              <div className="h-px bg-white/10 flex-1"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Engineering <br />
              <span className="text-zinc-500">Digital</span> <br />
              Experiences.
            </h2>
            <p className="text-zinc-500 text-[13px] font-sans leading-relaxed">
              Based in Gwalior, India. Currently focused on building scalable web applications and exploring 3D interactive environments.
            </p>
          </div>

          <div className="lg:w-2/3 flex flex-col space-y-12 text-zinc-300 font-sans leading-[1.8] text-[15px]">
            <div className="space-y-6">
              <p>
                I'm a software engineer deeply passionate about building polished, production-grade applications. I focus on creating seamless user experiences powered by robust, scalable architectures.
              </p>
              <p>
                My work spans across full-stack development, where I bridge the gap between complex backend systems and beautiful, intuitive frontend interfaces. I believe that great software should not only work flawlessly but also feel incredible to use.
              </p>
              <p>
                Currently, I'm open to <span className="text-white font-medium">Software Development Engineer</span> opportunities where I can contribute to challenging projects and grow alongside talented teams. 
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/5 flex flex-col space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Core Technologies & Stack</span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {[
                  "C++ (DSA)",
                  "JavaScript",
                  "TypeScript",
                  "React.js",
                  "Next.js 15",
                  "Tailwind CSS",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "MySQL",
                  "SQL",
                  "Python",
                  "Java",
                  "Git & GitHub",
                  "Docker",
                  "REST APIs",
                  "Redux Toolkit",
                  "Three.js",
                  "Vercel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-[#eb6e00]/60 hover:bg-[#eb6e00]/10 hover:shadow-[0_0_15px_rgba(235,110,0,0.3)] hover:-translate-y-0.5 transition-all duration-200 text-[11px] sm:text-[12px] font-mono tracking-wide cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* Library Overlay */}
      <AnimatePresence>
        {activeModal === "books" && <LibraryOverlay />}
      </AnimatePresence>

      <ModalWindow id="projects" title="Projects & Cases Archive" size="lg"><ProjectsModalContent /></ModalWindow>
      <ModalWindow id="experience" title="Career Experience Timeline" size="lg"><ExperienceModalContent /></ModalWindow>
      <ModalWindow id="resume" title="Professional Resume PDF" size="lg"><ResumeModalContent /></ModalWindow>
      <ModalWindow id="certificates" title="Professional Certifications" size="lg"><CertificatesModalContent /></ModalWindow>
      <ModalWindow id="now" title="Live Focus Board" size="md"><NowModalContent /></ModalWindow>
      <ModalWindow id="uses" title="Operating Setup & Equipment" size="lg"><UsesModalContent /></ModalWindow>
      <ModalWindow id="contact" title="Direct Messaging Terminal" size="md"><ContactModalContent /></ModalWindow>
      <ModalWindow id="terminal" title="System Interactive Terminal" size="lg"><InteractiveTerminal /></ModalWindow>
      <ModalWindow id="settings" title="Color Mode & Preferences" size="sm"><SettingsModalContent /></ModalWindow>
    </div>
  );
}
