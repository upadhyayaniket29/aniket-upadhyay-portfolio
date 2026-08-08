"use client";

import React from "react";
import { Download, Copy, Check, FileText, Mail, MapPin, Phone, Github, Linkedin, ExternalLink } from "lucide-react";

export default function ResumeModalContent() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://aniketupadhyay.dev/resume.pdf");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[900px] mx-auto pb-16">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-[-32px] z-20 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 py-4 mb-8 -mx-8 px-8 -mt-8 flex items-center justify-between shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileText className="w-4 h-4 text-[#eb6e00]" />
          <span className="text-xs font-mono">aniket_upadhyay_resume.pdf</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </>
            )}
          </button>
          <a
            href="/resume.pdf"
            download="Aniket_Upadhyay_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eb6e00] hover:bg-[#ff8a1c] text-white text-[10px] font-mono font-semibold transition-colors cursor-pointer shadow-[0_0_15px_rgba(235,110,0,0.3)] hover:shadow-[0_0_20px_rgba(235,110,0,0.5)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* HTML Resume Container (No fake PDF styling, native blending) */}
      <div className="relative">
        {/* Header Section */}
        <header className="border-b border-white/10 pb-8 mb-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight uppercase mb-4">
            Aniket <span className="text-[#eb6e00]">Upadhyay</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default"><Phone className="w-3.5 h-3.5" /> +91-9179303750</span>
            <a href="mailto:upadhyayaniket29@gmail.com" className="flex items-center gap-1.5 hover:text-[#eb6e00] transition-colors"><Mail className="w-3.5 h-3.5" /> upadhyayaniket29@gmail.com</a>
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default"><MapPin className="w-3.5 h-3.5" /> Gwalior, India</span>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-[13px] font-medium text-zinc-300">
            <a href="https://linkedin.com/in/aniket-upadhyay-02ba07222" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#eb6e00] transition-colors"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>
            <a href="https://github.com/upadhyayaniket29" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#eb6e00] transition-colors"><Github className="w-3.5 h-3.5" /> GitHub</a>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-10 relative z-10">
          
          {/* Objective */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-4">Objective</h2>
            <p className="text-[14px] text-zinc-300 leading-[1.8] font-sans">
              Computer Science undergraduate with hands-on experience in building full-stack web applications and REST APIs using React, Node.js, Express.js, and MongoDB. Strong foundation in data structures, object-oriented programming, and software engineering principles, with a passion for building scalable backend solutions.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-5">Experience</h2>
            <div className="space-y-6">
              <div className="relative pl-5 border-l border-white/10">
                <div className="absolute w-2 h-2 rounded-full bg-[#eb6e00] -left-[4.5px] top-1.5 border-2 border-[#0a0a0a]"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Web Development Intern</h3>
                    <div className="text-[13px] text-zinc-400 mt-1">Praedico Global Research</div>
                  </div>
                  <div className="text-[12px] font-mono text-zinc-500 mt-1 md:mt-0">Jan 2026 - March 2026</div>
                </div>
                <ul className="list-disc list-outside ml-4 mt-3 space-y-2 text-[14px] text-zinc-300 leading-relaxed marker:text-zinc-600">
                  <li>Designing and implementing frontend pages with form validation and state management in Next.js.</li>
                  <li>Developing backend APIs and database schemas to support CRUD operations for students and courses.</li>
                </ul>
              </div>

              <div className="relative pl-5 border-l border-white/10">
                <div className="absolute w-2 h-2 rounded-full bg-zinc-600 -left-[4.5px] top-1.5 border-2 border-[#0a0a0a]"></div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <div>
                    <h3 className="text-[15px] font-bold text-white">Software Development Intern</h3>
                    <div className="text-[13px] text-zinc-400 mt-1">DRDE (Defence Research & Development Establishment)</div>
                  </div>
                  <div className="text-[12px] font-mono text-zinc-500 mt-1 md:mt-0">June 2025 - July 2025</div>
                </div>
                <ul className="list-disc list-outside ml-4 mt-3 space-y-2 text-[14px] text-zinc-300 leading-relaxed marker:text-zinc-600">
                  <li>Developed a Monthly Report System and assisted in GUI development tasks for GROMACS under the supervision of Scientist ‘F’.</li>
                  <li>Collaborated with the IT Division to improve reporting workflows and support system enhancement activities.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-5">Projects</h2>
            <div className="grid gap-6">
              
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <h3 className="text-[15px] font-bold text-white flex items-center gap-3">
                    SMS - Student Management System
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <a href="#" className="px-2 py-0.5 rounded-full bg-[#eb6e00]/10 text-[#eb6e00] hover:bg-[#eb6e00]/20 transition-colors">Live Demo</a>
                      <a href="#" className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors">GitHub</a>
                    </div>
                  </h3>
                </div>
                <div className="text-[12px] font-mono text-zinc-500 mb-3"><span className="text-zinc-400">Stack:</span> Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB</div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-[13px] text-zinc-300 leading-relaxed marker:text-zinc-600">
                  <li>Developed a full-stack Student Management System with role-based access for Admin and Users.</li>
                  <li>Implemented secure authentication using JWT with password hashing via bcrypt and API-driven dashboards.</li>
                  <li>Developed modular backend architecture following MVC principles.</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <h3 className="text-[15px] font-bold text-white flex items-center gap-3">
                    Zento Cars - Car Rental Platform
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <a href="#" className="px-2 py-0.5 rounded-full bg-[#eb6e00]/10 text-[#eb6e00] hover:bg-[#eb6e00]/20 transition-colors">Live Demo</a>
                      <a href="#" className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors">GitHub</a>
                    </div>
                  </h3>
                </div>
                <div className="text-[12px] font-mono text-zinc-500 mb-3"><span className="text-zinc-400">Stack:</span> React.js, Node.js, Express.js, MongoDB</div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-[13px] text-zinc-300 leading-relaxed marker:text-zinc-600">
                  <li>Built a full-stack car rental platform with user authentication, vehicle availability checks, and booking management.</li>
                  <li>Developed REST APIs with MongoDB to support admin booking approvals and secure data handling.</li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                  <h3 className="text-[15px] font-bold text-white flex items-center gap-3">
                    Zink - Real Time Chat Application
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <a href="#" className="px-2 py-0.5 rounded-full bg-[#eb6e00]/10 text-[#eb6e00] hover:bg-[#eb6e00]/20 transition-colors">Live Demo</a>
                      <a href="#" className="px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors">GitHub</a>
                    </div>
                  </h3>
                </div>
                <div className="text-[12px] font-mono text-zinc-500 mb-3"><span className="text-zinc-400">Stack:</span> React.js, Node.js, Express.js, MongoDB, Socket.io</div>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-[13px] text-zinc-300 leading-relaxed marker:text-zinc-600">
                  <li>Developed a real-time chat application with one-to-one messaging and online/offline user presence using Socket.io, featuring a responsive frontend styled with DaisyUI and MongoDB-backed APIs.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Technical Skills */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-4">Technical Skills</h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 overflow-x-auto">
              <table className="w-full text-left border-collapse text-[13px]">
                <tbody>
                  <tr className="border-b border-white/5">
                    <th className="py-3 pr-4 font-mono text-zinc-400 font-normal w-1/3 align-top whitespace-nowrap">Programming Languages</th>
                    <td className="py-3 text-zinc-200 font-medium font-sans">C++, JavaScript, Python</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <th className="py-3 pr-4 font-mono text-zinc-400 font-normal align-top whitespace-nowrap">Frameworks & Tech</th>
                    <td className="py-3 text-zinc-200 font-medium font-sans leading-relaxed">React.js, Next.js, Node.js, Express.js, REST APIs</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <th className="py-3 pr-4 font-mono text-zinc-400 font-normal align-top whitespace-nowrap">Databases</th>
                    <td className="py-3 text-zinc-200 font-medium font-sans">SQL, MongoDB</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <th className="py-3 pr-4 font-mono text-zinc-400 font-normal align-top whitespace-nowrap">Core Subjects</th>
                    <td className="py-3 text-zinc-200 font-medium font-sans leading-relaxed">Data Structures, DBMS, Operating Systems, Computer Networks, OOPs, SDLC</td>
                  </tr>
                  <tr>
                    <th className="py-3 pr-4 font-mono text-zinc-400 font-normal align-top whitespace-nowrap">Tools</th>
                    <td className="py-3 text-zinc-200 font-medium font-sans">Git, GitHub, Postman, VS Code</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-4">Education</h2>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                <div>
                  <h3 className="text-[14px] font-bold text-white">B. Tech in Computer Science and Design</h3>
                  <div className="text-[13px] text-zinc-400 mt-0.5">Madhav Institute of Technology and Science, Gwalior</div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <span className="text-[12px] font-mono text-[#eb6e00]">2022 - 2026</span>
                  <span className="text-[13px] text-zinc-300 font-semibold mt-0.5">CGPA: 7.49</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                <div>
                  <h3 className="text-[14px] font-bold text-white">Class XII</h3>
                  <div className="text-[13px] text-zinc-400 mt-0.5">Pragati Vidhya Peeth, Gwalior</div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <span className="text-[12px] font-mono text-zinc-500">2020 - 2021</span>
                  <span className="text-[13px] text-zinc-300 font-semibold mt-0.5">81.2%</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                <div>
                  <h3 className="text-[14px] font-bold text-white">Class X</h3>
                  <div className="text-[13px] text-zinc-400 mt-0.5">ST Paul’s School, Morar, Gwalior</div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  <span className="text-[12px] font-mono text-zinc-500">2018 - 2019</span>
                  <span className="text-[13px] text-zinc-300 font-semibold mt-0.5">87.6%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-[11px] font-mono tracking-[0.2em] text-[#eb6e00] uppercase mb-4">Achievements</h2>
            <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors">
              <ul className="list-disc list-outside ml-4 space-y-2 text-[14px] text-zinc-300 leading-relaxed marker:text-[#eb6e00]">
                <li>Participated in Walmart Sparkathon 2025 and Smart India Hackathon (SIH); Core Member, Startup Cell, MITS.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
