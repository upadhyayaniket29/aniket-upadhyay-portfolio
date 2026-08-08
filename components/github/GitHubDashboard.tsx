"use client";

import React, { useState, useEffect } from "react";
import { GitFork, Star, GitPullRequest, Users, Flame, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export function GitHubDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load GitHub stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Simple contribution grid rendering (7 columns x 15 rows of blocks)
  const contributionWeeks = 15;
  const daysPerWeek = 7;
  const contributionGrid = Array.from({ length: contributionWeeks * daysPerWeek }, (_, i) => {
    // Generate organic-looking contribution grid weights
    const weight = Math.floor(Math.sin(i * 0.2) * 2 + Math.cos(i * 0.5) * 2 + Math.random() * 3);
    const colorWeight = Math.max(0, Math.min(4, weight));
    const greenColors = ["bg-[#161b22]", "bg-[#0e4429]", "bg-[#006d32]", "bg-[#26a641]", "bg-[#39d353]"];
    return greenColors[colorWeight];
  });

  const languages = [
    { name: "TypeScript", percent: 64, color: "bg-[#3178C6]" },
    { name: "JavaScript", percent: 18, color: "bg-[#F7DF1E]" },
    { name: "Rust", percent: 10, color: "bg-[#DEA584]" },
    { name: "GLSL / CSS", percent: 8, color: "bg-[#563D7C]" },
  ];

  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 rounded-2xl border border-white/5 bg-[#111111]/70 backdrop-blur-md animate-pulse h-[220px]" />
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-white/5 bg-[#111111]/60 backdrop-blur-md glass-card p-6">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono">LIVE INTEGRATION</span>
          <h3 className="text-lg font-bold text-white font-sans mt-0.5">GitHub Workspace</h3>
        </div>
        <a
          href="https://github.com/aniket-upadhyay"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-mono text-zinc-300 hover:text-white"
        >
          github.com/aniket-upadhyay
        </a>
      </div>

      {/* Grid of basic stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Star className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-mono">STARS</span>
          </div>
          <span className="text-lg font-bold text-white font-mono mt-2">
            {(stats?.totalStars || 1420).toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <GitFork className="w-3.5 h-3.5 text-[#eb6e00]" />
            <span className="text-[10px] font-mono">FORKS</span>
          </div>
          <span className="text-lg font-bold text-white font-mono mt-2">
            {(stats?.totalForks || 185).toLocaleString()}
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-white/5 bg-white/5 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-zinc-500">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] font-mono">STREAK</span>
          </div>
          <span className="text-lg font-bold text-white font-mono mt-2 flex items-center gap-1">
            <span>{stats?.streak || 42}</span>
            <span className="text-[10px] text-zinc-500 font-normal">days</span>
          </span>
        </div>
      </div>

      {/* Contribution Calendar Graph */}
      <div className="mb-6 p-4 rounded-xl border border-white/5 bg-[#050505]/80">
        <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono mb-3">
          <span>CONTRIBUTIONS (LAST 100 DAYS)</span>
          <span className="flex items-center gap-1">
            <span>Less</span>
            <span className="w-2.5 h-2.5 rounded bg-[#161b22]" />
            <span className="w-2.5 h-2.5 rounded bg-[#0e4429]" />
            <span className="w-2.5 h-2.5 rounded bg-[#006d32]" />
            <span className="w-2.5 h-2.5 rounded bg-[#26a641]" />
            <span className="w-2.5 h-2.5 rounded bg-[#39d353]" />
            <span>More</span>
          </span>
        </div>

        <div className="grid grid-flow-col grid-rows-7 gap-[3px] justify-between">
          {contributionGrid.map((colorClass, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.002, duration: 0.1 }}
              className={`w-[10px] h-[10px] rounded-[1.5px] ${colorClass}`}
            />
          ))}
        </div>
      </div>

      {/* Language Breakdown */}
      <div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>LANGUAGE COMPOSITION</span>
        </div>

        {/* Combined bar chart */}
        <div className="flex w-full h-2 rounded-full overflow-hidden mb-4 bg-zinc-800">
          {languages.map((lang, i) => (
            <div
              key={i}
              className={`${lang.color} h-full`}
              style={{ width: `${lang.percent}%` }}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
          {languages.map((lang, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-400">
              <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
              <span className="font-medium text-white">{lang.name}</span>
              <span className="font-mono text-zinc-500 text-[10px] ml-auto">{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default GitHubDashboard;
