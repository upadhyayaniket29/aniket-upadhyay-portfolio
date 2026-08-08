"use client";

import React from "react";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

export default function ContactModalContent() {
  const links = [
    {
      icon: <Mail className="w-4 h-4 text-zinc-400" />,
      label: "Email",
      value: "upadhyayaniket29@gmail.com",
      href: "mailto:upadhyayaniket29@gmail.com"
    },
    {
      icon: <Twitter className="w-4 h-4 text-zinc-400" />,
      label: "X / Twitter",
      value: "@uaniket2906",
      href: "https://x.com/uaniket2906"
    },
    {
      icon: <Linkedin className="w-4 h-4 text-zinc-400" />,
      label: "LinkedIn",
      value: "in/aniket-upadhyay",
      href: "https://www.linkedin.com/in/aniket-upadhyay-02ba07222/"
    },
    {
      icon: <Github className="w-4 h-4 text-zinc-400" />,
      label: "GitHub",
      value: "upadhyayaniket29",
      href: "https://github.com/upadhyayaniket29"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-white font-display tracking-tight">Let's Connect</h3>
        <p className="text-[13px] text-zinc-400 font-sans mt-2">
          Open to collaborations, freelance work, or just a conversation.
        </p>
      </div>

      {/* Links List */}
      <div className="flex flex-col border-t border-white/5">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-5 border-b border-white/5 group hover:bg-white/[0.02] transition-colors -mx-6 px-6 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {link.icon}
              <span className="text-sm font-sans font-medium text-zinc-200 group-hover:text-white transition-colors">
                {link.label}
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
              {link.value}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
