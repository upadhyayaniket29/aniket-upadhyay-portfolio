"use client";

import React from "react";
import { FileText, Rocket } from "lucide-react";
import { useModal } from "../ModalProvider";

export default function HeroCenterBranding() {
  const { setActiveModal } = useModal();

  return (
    <div
      style={{
        position: "absolute",
        top: "52%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 30,
        pointerEvents: "auto",
        textAlign: "center",
        width: "90%",
        maxWidth: "680px",
        userSelect: "none",
      }}
    >
      {/* Sleek Glassmorphism Hero Card */}
      <div
        style={{
          background: "rgba(8, 10, 16, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "24px",
          padding: "32px 28px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(249, 115, 22, 0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Top Tag Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(249, 115, 22, 0.12)",
            border: "1px solid rgba(249, 115, 22, 0.3)",
            borderRadius: "999px",
            padding: "5px 14px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#f97316",
              boxShadow: "0 0 8px #f97316",
            }}
          />
          <span
            style={{
              fontSize: "10px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#fb923c",
              textTransform: "uppercase",
            }}
          >
            SOFTWARE ENGINEER · FULL-STACK & AI
          </span>
        </div>

        {/* GenZ Bold Center Name Header */}
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            fontFamily: "system-ui, -apple-system, sans-serif",
            color: "#ffffff",
            textShadow: "0 0 40px rgba(249, 115, 22, 0.35), 0 0 80px rgba(0, 0, 0, 0.8)",
          }}
        >
          ANIKET{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #fb923c 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            UPADHYAY
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            margin: 0,
            fontSize: "13.5px",
            color: "rgba(255, 255, 255, 0.75)",
            maxWidth: "480px",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Engineering high-performance web applications, distributed systems & intuitive AI experiences.
        </p>

        {/* Action Buttons: View Resume & Explore Projects */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginTop: "6px",
          }}
        >
          {/* View Resume Button */}
          <button
            onClick={() => setActiveModal("resume")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 22px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              color: "#ffffff",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(249, 115, 22, 0.2)";
              e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.6)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(249, 115, 22, 0.35)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <FileText size={15} color="#f97316" />
            <span>View Resume</span>
          </button>

          {/* Explore Projects Button */}
          <button
            onClick={() => setActiveModal("projects")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "11px 24px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)",
              border: "none",
              color: "#0a0c12",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: 800,
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 0 24px rgba(249, 115, 22, 0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 36px rgba(249, 115, 22, 0.7)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 24px rgba(249, 115, 22, 0.45)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Rocket size={15} color="#0a0c12" />
            <span>Explore Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
}
