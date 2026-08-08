"use client";

import React from "react";

interface SetupItem {
  name: string;
  detail: string;
}

interface CategorySection {
  category: string;
  items: SetupItem[];
}

const usesSections: CategorySection[] = [
  {
    category: "HARDWARE",
    items: [
      { name: "Windows 11 Pro PC", detail: "32GB RAM · primary machine" },
      { name: "WSL2 Ubuntu 24.04", detail: "linux development environment" },
      { name: "Dual 27\" Monitors", detail: "4K IPS display setup" },
    ],
  },
  {
    category: "IDE & EDITOR",
    items: [
      { name: "VS Code", detail: "daily driver" },
      { name: "Cursor AI", detail: "ai pair programming" },
      { name: "IntelliJ IDEA", detail: "java development" },
    ],
  },
  {
    category: "PROGRAMMING LANGUAGES",
    items: [
      { name: "JavaScript", detail: "frontend & backend" },
      { name: "TypeScript", detail: "large scale apps" },
      { name: "C++", detail: "dsa & problem solving" },
      { name: "Java", detail: "backend / oop" },
      { name: "SQL", detail: "database queries" },
    ],
  },
  {
    category: "FRONTEND",
    items: [
      { name: "React.js", detail: "daily framework" },
      { name: "Next.js", detail: "full stack apps" },
      { name: "Tailwind CSS", detail: "ui styling" },
      { name: "HTML5 / CSS3", detail: "markup & styling" },
      { name: "Redux Toolkit", detail: "state management" },
    ],
  },
  {
    category: "BACKEND & DATABASE",
    items: [
      { name: "Node.js", detail: "javascript runtime" },
      { name: "Express.js", detail: "rest api framework" },
      { name: "MongoDB", detail: "nosql database" },
      { name: "MySQL", detail: "relational database" },
      { name: "JWT", detail: "secure authentication" },
      { name: "Socket.io", detail: "realtime websockets" },
    ],
  },
  {
    category: "DEVOPS & CLOUD",
    items: [
      { name: "Docker", detail: "containerization" },
      { name: "Jenkins", detail: "ci/cd pipeline" },
      { name: "Vercel", detail: "production deployments" },
      { name: "Render & Netlify", detail: "hosting platforms" },
      { name: "Git & GitHub", detail: "version control & actions" },
    ],
  },
  {
    category: "BIG DATA",
    items: [
      { name: "Hadoop", detail: "distributed processing" },
      { name: "Apache Spark", detail: "large scale data engine" },
      { name: "Hive", detail: "sql on top of hadoop" },
    ],
  },
  {
    category: "AI TOOLS",
    items: [
      { name: "ChatGPT", detail: "daily development" },
      { name: "GitHub Copilot", detail: "ai autocompletion" },
      { name: "Claude", detail: "code review & architecture" },
    ],
  },
  {
    category: "TERMINAL & PRODUCTIVITY",
    items: [
      { name: "Windows Terminal", detail: "powershell & git bash" },
      { name: "Postman & Thunder Client", detail: "api testing" },
      { name: "Notion", detail: "documentation & notes" },
      { name: "Chrome DevTools", detail: "debugging & profiling" },
    ],
  },
];

export default function UsesModalContent() {
  return (
    <div className="w-full flex flex-col space-y-10 py-2 pb-32 max-w-2xl mx-auto">
      
      {/* Top Section Header */}
      <div className="space-y-1 border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">
          USES
        </span>
        <h2 className="text-xl font-bold text-white font-sans tracking-tight">
          Developer Equipment & Stack
        </h2>
      </div>

      {/* Sections List */}
      <div className="space-y-10">
        {usesSections.map((section) => (
          <div key={section.category} className="space-y-4">
            
            {/* Category Header */}
            <h3 className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">
              {section.category}
            </h3>

            {/* List Rows matching reference image */}
            <div className="space-y-0">
              {section.items.map((item, idx) => (
                <div
                  key={item.name}
                  className="group flex items-center justify-between py-3 border-b border-white/5 hover:border-white/15 transition-all duration-150 cursor-default"
                >
                  {/* Left: Tool Name */}
                  <span className="text-sm font-semibold text-zinc-100 font-sans group-hover:text-white group-hover:translate-x-1 transition-all">
                    {item.name}
                  </span>

                  {/* Right: Description / Detail */}
                  <span className="text-xs font-mono text-zinc-500 group-hover:text-[#eb6e00] transition-colors">
                    {item.detail}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
