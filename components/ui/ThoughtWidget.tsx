"use client";

import { useState, useEffect } from "react";

const THOUGHTS = [
  { quote: "Hard work beats talent when talent doesn't work hard.", tag: "FUEL" },
  { quote: "The best time to start was yesterday. The second best time is now.", tag: "ACTION" },
  { quote: "Code is poetry written for machines, read by humans.", tag: "CRAFT" },
  { quote: "Discipline is choosing between what you want now and what you want most.", tag: "MINDSET" },
  { quote: "Your setbacks are setting you up for a massive comeback.", tag: "GROWTH" },
  { quote: "Build in silence. Let success make the noise.", tag: "GRIND" },
  { quote: "Every expert was once a beginner who refused to quit.", tag: "PERSIST" },
  { quote: "Write code that you'll be proud of in 2 years.", tag: "QUALITY" },
  { quote: "Dreams don't work unless you do.", tag: "WORK" },
  { quote: "The only way out is through — and the only way through is code.", tag: "FOCUS" },
];

const INTERVAL = 4500;

export default function ThoughtWidget() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % THOUGHTS.length);
        setFade(true);
      }, 500);
    }, INTERVAL);
    return () => clearInterval(cycle);
  }, []);

  const thought = THOUGHTS[current];

  return (
    <div
      style={{
        position: "absolute",
        top: "24px",
        left: "28px",
        zIndex: 50,
        maxWidth: "300px",
        pointerEvents: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* OPEN TO WORK Status Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          alignSelf: "flex-start",
          background: "rgba(8, 12, 16, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(34, 197, 94, 0.35)",
          borderRadius: "999px",
          padding: "6px 14px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 16px rgba(34, 197, 94, 0.15)",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 10px #22c55e, 0 0 4px #4ade80",
            display: "block",
            animation: "pulse 1.6s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#4ade80",
            textTransform: "uppercase",
            textShadow: "0 0 8px rgba(74, 222, 128, 0.4)",
          }}
        >
          OPEN TO WORK
        </span>
      </div>

      {/* Glassmorphism Thought Card */}
      <div
        style={{
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "16px 18px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {/* Tag row */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          {/* Pulse dot */}
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#f97316",
              boxShadow: "0 0 8px rgba(249,115,22,0.9)",
              display: "block",
              animation: "pulse 1.5s infinite",
            }}
          />
          {/* Tag text */}
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#fb923c",
              textTransform: "uppercase",
            }}
          >
            {thought.tag}
          </span>
          {/* Dot indicator pills */}
          <div style={{ display: "flex", gap: "3px", marginLeft: "auto", alignItems: "center" }}>
            {THOUGHTS.map((_, i) => (
              <span
                key={i}
                style={{
                  height: "4px",
                  borderRadius: "999px",
                  transition: "all 0.4s ease",
                  width: i === current ? "14px" : "4px",
                  background: i === current ? "rgba(251,146,60,0.95)" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Quote with fade+slide animation */}
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 500,
            opacity: fade ? 1 : 0,
            transform: fade ? "translateY(0px)" : "translateY(8px)",
            transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          &ldquo;{thought.quote}&rdquo;
        </p>

        {/* Aniket signature */}
        <div
          style={{
            marginTop: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1px",
              background: "linear-gradient(90deg, #f97316, #fbbf24)",
              borderRadius: "999px",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            Aniket
          </span>
        </div>
      </div>
    </div>
  );
}
