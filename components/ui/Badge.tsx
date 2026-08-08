"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "green" | "purple" | "neutral";
  style?: React.CSSProperties;
}

export function Badge({ children, variant = "orange", style = {} }: BadgeProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    orange: {
      background: "rgba(235, 110, 0, 0.1)",
      color: "#eb6e00",
      border: "1px solid rgba(235, 110, 0, 0.3)",
    },
    green: {
      background: "rgba(0, 208, 132, 0.1)",
      color: "#00d084",
      border: "1px solid rgba(0, 208, 132, 0.3)",
    },
    purple: {
      background: "rgba(168, 85, 247, 0.1)",
      color: "#a855f7",
      border: "1px solid rgba(168, 85, 247, 0.3)",
    },
    neutral: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#8c8c90",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        borderRadius: "20px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        width: "fit-content",
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
