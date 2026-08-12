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
      
      {/* Pure Raw Full-Bleed Artwork Image Background (100% Visibility AS IS) */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden">
        <img 
          src="/hero-bg.jpg" 
          alt="Developer Workspace Artwork" 
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Bottom Fade for smooth transition into About section */}
        <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none z-10 bg-gradient-to-t from-[#090909] to-transparent"></div>
      </div>

      {/* Main Hero Content */}
      <section className="relative z-10 w-full min-h-screen flex flex-col p-4 sm:p-6 md:p-12 lg:pl-32 lg:pr-20 lg:pt-24 lg:pb-10 pt-16 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <header className="w-full flex items-center justify-between mb-auto pointer-events-none">
          <div className="flex items-center gap-2.5 pt-2 sm:pt-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500] shadow-[0_0_12px_#ff5500] animate-pulse"></span>
            <span className="text-[9px] sm:text-[10px] tracking-widest font-mono text-amber-100 uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">Open to SDE Opportunities</span>
          </div>
        </header>

        {/* Unified Location, Real-Time Visitor Counter & Clock Widget */}
        <VisitorCounterWidget />

        {/* Hero Left Content */}
        <div className="w-full h-full flex flex-col justify-center flex-1 mt-12 sm:mt-20 md:mt-12 pointer-events-none">
          <div className="max-w-[460px] flex flex-col space-y-6 sm:space-y-8 bg-black/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] pointer-events-auto">
            
            {/* Hi I'm & Motto Badge */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-zinc-200 font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">Hi, I'm</span>
                <div className="h-px bg-amber-500/50 w-12"></div>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5500]/25 border border-[#ff5500]/50 backdrop-blur-md w-fit shadow-[0_0_15px_rgba(255,85,0,0.3)]">
                <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase font-extrabold">WORK IN SILENCE • LET COMEBACK BE THE NOISE</span>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col leading-[1.02]">
              <h1 className="fluid-h1 font-black tracking-tight text-white font-display uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                Aniket
              </h1>
              <h1 className="fluid-h1 font-black tracking-tight text-[#ff7700] font-display uppercase drop-shadow-[0_4px_25px_rgba(255,119,0,0.6)]">
                Upadhyay
              </h1>
            </div>

            {/* Title & Description */}
            <div className="space-y-4 sm:space-y-6">
              <span className="text-[11px] font-mono tracking-[0.25em] text-[#ff8800] font-black uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] block">
                SOFTWARE ENGINEER
              </span>
              
              <div className="relative pl-4 border-l-2 border-[#ff5500]">
                <p className="fluid-body text-zinc-200 font-sans leading-[1.8] max-w-[380px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  Building production-grade applications with modern technologies and exceptional user experiences.
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/15 text-[10px] font-mono text-amber-300 font-extrabold uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  Discipline beats talent — every time.
                </div>
              </div>
            </div>

            {/* Interactions (Buttons + Socials) */}
            <div className="flex flex-col pt-2 sm:pt-4 pointer-events-auto space-y-8 sm:space-y-10">
              
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                <button 
                  onClick={() => setActiveModal("projects")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-[11px] hover:bg-zinc-100 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 min-h-[44px] cursor-pointer"
                >
                  <span className="text-black font-extrabold">Explore Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                </button>

                <button 
                  onClick={() => setActiveModal("resume")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent border border-white/10 text-white font-semibold text-[11px] hover:bg-white/5 active:scale-95 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 min-h-[44px]"
                >
                  <span>View Resume</span>
                  <Download className="w-3.5 h-3.5" />
                </button>

                <button 
                  onClick={() => setActiveModal("contact")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-transparent border border-white/10 text-white font-semibold text-[11px] hover:bg-white/5 active:scale-95 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 min-h-[44px]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Let's Connect</span>
                </button>
              </div>

              {/* Socials */}
              <div className="space-y-3 antialiased">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-400 block">Follow Me</span>
                <div className="flex gap-3">
                  <a href="https://github.com/upadhyayaniket29" target="_blank" rel="noopener noreferrer" className="group w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-colors transition-transform duration-200 [backface-visibility:hidden]">
                    <Github className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/aniket-upadhyay-02ba07222/" target="_blank" rel="noopener noreferrer" className="group w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-colors transition-transform duration-200 [backface-visibility:hidden]">
                    <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </a>
                  <a href="https://x.com/uaniket2906" target="_blank" rel="noopener noreferrer" className="group w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-colors transition-transform duration-200 [backface-visibility:hidden]">
                    <Twitter className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </a>
                  <button onClick={() => setActiveModal("contact")} className="group w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-colors transition-transform duration-200 [backface-visibility:hidden]">
                    <Mail className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>

          </div>
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
