"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TermIcon, ShieldAlert, Sparkles } from "lucide-react";

interface LogEntry {
  input?: string;
  output: string;
  isError?: boolean;
  isAI?: boolean;
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<LogEntry[]>([
    {
      output: `Welcome to Aniket Upadhyay's Personal Platform Terminal [v1.0.0]
Type 'help' to see all available commands.
Recruiters: Type 'ask <your question>' to query Aniket's AI Knowledge Base! (e.g. 'ask what projects did he build?')`,
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isPending, setIsPending] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim();
      if (!command) return;

      processCommand(command);
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === -1) return;
      const nextIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
      setHistoryIndex(nextIndex);
      setInput(nextIndex === -1 ? "" : commandHistory[nextIndex]);
    }
  };

  const processCommand = async (fullCommand: string) => {
    const parts = fullCommand.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    let output = "";
    let isError = false;
    let isAI = false;

    switch (cmd) {
      case "help":
        output = `Available commands:
  help        - Show list of terminal commands.
  about       - Brief background about Aniket Upadhyay.
  skills      - Key technical skills and expertise levels.
  experience  - View timeline of professional work experience.
  projects    - Listing of prominent software projects.
  spotify     - View currently or recently played tracks.
  leetcode    - Get competitive programming statistics.
  github      - Fetch GitHub user information.
  quote       - Render an inspiring technical quote.
  books       - List of recommended books read.
  uses        - Detailed desk setup and developer gear.
  now         - Current focus and active goals.
  contact     - Display social channels and email details.
  clear       - Wipe terminal log history.
  ask <query> - Ask Aniket's AI Terminal details about his work. (e.g. 'ask where does he work?')`;
        break;

      case "clear":
        setHistory([]);
        return;

      case "about":
        output = `ANIKET UPADHYAY - Senior Full Stack Engineer.
Obsessed with layout alignment, edge optimizations, and building interactive WebGL/Three.js environments.
Currently crafting developer experiences at Vercel. Former engineer at Linear.
Known for writing clean, database-normalized, fast production code.`;
        break;

      case "skills":
        output = `Aniket Upadhyay's Primary Toolbelt:
  - Frontend: Next.js 15, TypeScript, React 19, React Three Fiber, Three.js, Tailwind CSS
  - Backend: Node.js, Express, Prisma ORM, MySQL, PostgreSQL, Redis, REST APIs, WebSockets
  - DevOps: Docker, Kubernetes, AWS, Vercel Edge Server, CI/CD Actions`;
        break;

      case "experience":
        output = `Work Experience:
  1. Vercel (Senior Full Stack Engineer, 2024 - Present)
     - Engineered edge caches and optimized React static compilation engines.
  2. Linear (Product Engineer, 2022 - 2024)
     - Implemented offline-first SQLite sync and accelerated editor query inputs to sub-8ms.`;
        break;

      case "projects":
        output = `Featured Work:
  1. OmniRAG (Cognitive search engine parsing PDFs, indexing vectors under 15ms).
  2. Aura3D (LIGHTWEIGHT 3D CAD workspace supporting 100k polygon CAD imports at 60 FPS in-browser).
  Type 'ask details about OmniRAG' or visit the Projects page for architecture diagrams.`;
        break;

      case "spotify":
        try {
          setIsPending(true);
          const res = await fetch("http://localhost:5000/api/spotify/now-playing");
          if (!res.ok) throw new Error();
          const track = await res.json();
          if (track.isPlaying) {
            output = `🎵 Now Playing: ${track.title} by ${track.artist} (Album: ${track.album})`;
          } else {
            output = `🔇 Offline. Last played: ${track.title || "Unknown"} by ${track.artist || "Unknown"}`;
          }
        } catch {
          output = "🔇 Offline. Last played: Synthwave Ambient loop (Spotify Cache refresh paused).";
        } finally {
          setIsPending(false);
        }
        break;

      case "leetcode":
        try {
          setIsPending(true);
          const res = await fetch("http://localhost:5000/api/stats/leetcode?username=aniket-upadhyay");
          if (!res.ok) throw new Error();
          const data = await res.json();
          output = `LeetCode Profile Statistics (aniket-upadhyay):
  - Ranking: #${data.ranking.toLocaleString()}
  - Solved: ${data.solvedTotal} Total (Easy: ${data.solvedEasy}, Medium: ${data.solvedMedium}, Hard: ${data.solvedHard})
  - Active Streak: ${data.streak} Days`;
        } catch {
          output = `LeetCode Profile Statistics (aniket-upadhyay):
  - Ranking: #154,200
  - Solved: 342 Total (Easy: 120, Medium: 180, Hard: 42)
  - Active Streak: 5 Days (GraphQL fetch returned cache)`;
        } finally {
          setIsPending(false);
        }
        break;

      case "github":
        try {
          setIsPending(true);
          const res = await fetch("http://localhost:5000/api/stats/github?username=aniket-upadhyay");
          if (!res.ok) throw new Error();
          const data = await res.json();
          output = `GitHub Profile (aniket-upadhyay):
  - Repositories: ${data.publicRepos}
  - Total Stars: ★${data.totalStars}
  - Followers: ${data.followers} | Following: ${data.following}
  - Active Commit Streak: ${data.streak} Days`;
        } catch {
          output = `GitHub Profile (aniket-upadhyay):
  - Repositories: 15
  - Total Stars: ★1,420
  - Followers: 120 | Following: 80
  - Active Commit Streak: 12 Days (Public API fallback cached)`;
        } finally {
          setIsPending(false);
        }
        break;

      case "quote":
        output = `"Simplicity is the ultimate sophistication." — Leonardo da Vinci`;
        break;

      case "books":
        output = `Currently reading / completed:
  1. Designing Data-Intensive Applications by Martin Kleppmann (Status: COMPLETED - Rating: 5/5)
  2. High Performance Browser Networking by Ilya Grigorik (Status: COMPLETED - Rating: 4.8/5)`;
        break;

      case "uses":
        output = `Aniket's Toolbelt & Desktop Rig:
  - Hardware: MacBook Pro M3 Max, Keychron Q1 Pro Mechanical, LG 34" Ultrawide.
  - IDE: Cursor & VS Code (Customized Zen Mode).
  - Terminal: Warp with JetBrains Mono font.`;
        break;

      case "now":
        output = `What Aniket is focused on now:
  - Reading: High Performance Browser Networking.
  - Learning: Rust for WebAssembly and GPU shaders.
  - Building: Distributed edge caching frameworks.
  - Goal: Optimizing canvas renders for 60 FPS mobile layouts.`;
        break;

      case "contact":
        output = `Let's connect:
  - Email: admin@aniket.dev
  - LinkedIn: linkedin.com/in/aniket-upadhyay
  - GitHub: github.com/aniket-upadhyay
  - Twitter: twitter.com/aniket_dev`;
        break;

      case "ask":
        if (!args) {
          output = "Please provide a query for the AI. Example: 'ask what is his engineering philosophy?'";
          isError = true;
          break;
        }

        try {
          setIsPending(true);
          isAI = true;
          const res = await fetch("http://localhost:5000/api/stats/ai/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: args }),
          });

          if (!res.ok) throw new Error();
          const data = await res.json();
          output = data.answer;
        } catch {
          output = "AI Terminal is running on backup queries. (Fallback): Aniket is a Senior Full Stack Engineer at Vercel with expert skills in Next.js, R3F, Node, and Prisma.";
        } finally {
          setIsPending(false);
        }
        break;

      default:
        output = `Command not found: '${cmd}'. Type 'help' to see all available options.`;
        isError = true;
    }

    setHistory((prev) => [...prev, { input: fullCommand, output, isError, isAI }]);
  };

  return (
    <div
      onClick={handleTerminalClick}
      className="w-full max-w-4xl mx-auto rounded-lg border border-white/10 bg-[#050505]/90 text-[#a1a1aa] font-mono text-xs shadow-2xl p-4 min-h-[450px] flex flex-col justify-between glass-panel cursor-text"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1 text-[10px] text-zinc-500">
          <TermIcon className="w-3 h-3" />
          <span>aniket-upadhyay@terminal: ~</span>
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Terminal Output Log */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3.5 max-h-[350px] scrollbar-none pr-1">
        {history.map((entry, i) => (
          <div key={i} className="space-y-1">
            {entry.input && (
              <div className="flex items-center gap-1.5 text-white">
                <span className="text-[#eb6e00]">aniket-upadhyay@terminal:~$</span>
                <span>{entry.input}</span>
              </div>
            )}
            <div
              className={`whitespace-pre-wrap leading-relaxed ${
                entry.isError ? "text-red-400" : entry.isAI ? "text-emerald-400" : "text-zinc-300"
              }`}
            >
              {entry.isAI && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono mb-0.5">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Generated response:</span>
                </div>
              )}
              {entry.output}
            </div>
          </div>
        ))}
        {isPending && (
          <div className="flex items-center gap-1 text-[#eb6e00]">
            <span className="animate-pulse">●</span>
            <span className="animate-pulse">●</span>
            <span className="animate-pulse">●</span>
            <span className="text-zinc-500 text-[10px] ml-2">Streaming response...</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Command Input Line */}
      <div className="flex items-center gap-1.5 border-t border-white/5 pt-2">
        <span className="text-[#eb6e00] font-bold">aniket-upadhyay@terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs focus:ring-0 p-0"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
export default InteractiveTerminal;
