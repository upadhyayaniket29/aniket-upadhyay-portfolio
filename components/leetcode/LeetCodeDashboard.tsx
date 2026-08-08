"use client";

import React, { useState, useEffect } from "react";
import { Award, Code2, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export function LeetCodeDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stats/leetcode?username=aniket-upadhyay");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error("Failed to load LeetCode stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalQuestions = 3000;
  const solvedCount = stats?.solvedTotal || 342;
  const easySolved = stats?.solvedEasy || 120;
  const mediumSolved = stats?.solvedMedium || 180;
  const hardSolved = stats?.solvedHard || 42;

  const categories = [
    { name: "Easy", count: easySolved, max: 800, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/20" },
    { name: "Medium", count: mediumSolved, max: 1500, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { name: "Hard", count: hardSolved, max: 700, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  ];

  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 rounded-2xl border border-white/5 bg-[#111111]/70 backdrop-blur-md animate-pulse h-[220px]" />
    );
  }

  // Circular progress calculations for the main total badge
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const solvedPercent = (solvedCount / 1000) * 100; // Track milestones out of 1000
  const strokeDashoffset = circumference - (Math.min(100, solvedPercent) / 100) * circumference;

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl border border-white/5 bg-[#111111]/60 backdrop-blur-md glass-card p-6">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono">LIVE INTEGRATION</span>
          <h3 className="text-lg font-bold text-white font-sans mt-0.5">LeetCode Metrics</h3>
        </div>
        <a
          href="https://leetcode.com/aniket-upadhyay"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-mono text-zinc-300 hover:text-white"
        >
          leetcode.com/aniket-upadhyay
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Total problems ring */}
        <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Foreground active ring */}
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-[#eb6e00]"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-2xl font-bold text-white font-mono">{solvedCount}</span>
              <span className="block text-[8px] text-zinc-500 font-mono tracking-wider mt-0.5">SOLVED</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 mt-4">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Ranking: #{stats?.ranking?.toLocaleString() || "154,200"}</span>
          </div>
        </div>

        {/* Right: Solved categories breakdown */}
        <div className="space-y-4">
          {categories.map((cat, i) => {
            const pct = (cat.count / cat.max) * 100;
            return (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-medium text-white">{cat.name}</span>
                  <span className="font-mono text-zinc-400">
                    <strong className={cat.color}>{cat.count}</strong>
                    <span className="text-zinc-600 text-[10px]"> / {cat.max}</span>
                  </span>
                </div>
                {/* Custom Progress Bar */}
                <div className="h-1.5 w-full rounded-full bg-zinc-800/80 overflow-hidden relative border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                    className={`h-full ${cat.color.replace("text", "bg")} rounded-full`}
                  />
                </div>
              </div>
            );
          })}

          {/* Last Submission status indicator */}
          <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between text-[9px] text-zinc-500 font-mono">
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3 text-[#eb6e00]" />
              <span>LAST SOLVED:</span>
            </div>
            <span className="text-white hover:text-[#eb6e00] transition-colors truncate max-w-[120px] text-right font-sans font-medium cursor-pointer">
              {stats?.lastSolvedName || "Search in Rotated Sorted Array"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeetCodeDashboard;
