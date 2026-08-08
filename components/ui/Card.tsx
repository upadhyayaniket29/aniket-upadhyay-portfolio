"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  glow?: boolean;
  glowColor?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Card({
  children,
  glow = false,
  glowColor = "rgba(235, 110, 0, 0.15)",
  className = "",
  style = {},
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        background: "#0d0d0f",
        border: glow ? "1px solid rgba(235, 110, 0, 0.3)" : "1px solid rgba(255, 255, 255, 0.07)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: glow
          ? `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${glowColor}`
          : "0 10px 30px rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(16px)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
        ...style,
      }}
      className={`glass-card-hover ${className}`}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
}
