"use client";

import { useState, useEffect, useRef } from "react";

const THOUGHTS = [
  {
    quote: "Hard work beats talent when talent doesn't work hard.",
    tag: "FUEL",
  },
  {
    quote: "The best time to start was yesterday. The second best time is now.",
    tag: "ACTION",
  },
  {
    quote: "Code is poetry written for machines, read by humans.",
    tag: "CRAFT",
  },
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    tag: "MINDSET",
  },
  {
    quote: "Your setbacks are setting you up for a massive comeback.",
    tag: "GROWTH",
  },
  {
    quote: "Build in silence. Let success make the noise.",
    tag: "GRIND",
  },
  {
    quote: "Every expert was once a beginner who refused to quit.",
    tag: "PERSIST",
  },
  {
    quote: "Write code that you'll be proud of in 2 years.",
    tag: "QUALITY",
  },
  {
    quote: "Dreams don't work unless you do.",
    tag: "WORK",
  },
  {
    quote: "The only way out is through — and the only way through is code.",
    tag: "FOCUS",
  },
];

const INTERVAL = 4000;

export default function ThoughtWidget() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runCycle = () => {
    // Fade out
    setVisible(false);
    setProgress(0);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % THOUGHTS.length);
      setVisible(true);
    }, 500);
  };

  useEffect(() => {
    // Progress bar
    progressRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + 100 / (INTERVAL / 50);
      });
    }, 50);

    // Cycle thoughts
    timerRef.current = setInterval(() => {
      runCycle();
      setProgress(0);
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const thought = THOUGHTS[current];

  return (
    <div
      className="absolute top-5 left-5 sm:top-8 sm:left-8 z-30 max-w-[260px] sm:max-w-[310px]"
      style={{ pointerEvents: "none" }}
    >
      {/* Glass Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-5 py-4">
        
        {/* Top Tag Row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(255,140,0,0.8)] animate-pulse" />
          <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-orange-400 uppercase">
            {thought.tag}
          </span>
          <div className="ml-auto flex gap-[3px] items-center">
            {THOUGHTS.map((_, i) => (
              <span
                key={i}
                className="block rounded-full transition-all duration-500"
                style={{
                  width: i === current ? "14px" : "4px",
                  height: "4px",
                  background: i === current
                    ? "rgba(251,146,60,0.9)"
                    : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Quote text with fade+slide animation */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0px)" : "translateY(8px)",
            transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p className="text-[13px] sm:text-[14px] font-medium text-white/90 leading-[1.65] tracking-[-0.01em]">
            &ldquo;{thought.quote}&rdquo;
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[2px] rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
            style={{
              width: `${progress}%`,
              transition: "width 50ms linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}
