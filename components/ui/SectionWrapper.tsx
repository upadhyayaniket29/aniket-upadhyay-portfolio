"use client";

import React from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  glow?: boolean;
  glowPosition?: "top" | "center" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

export function SectionWrapper({
  children,
  id,
  glow = false,
  glowPosition = "center",
  className = "",
  style = {},
}: SectionWrapperProps) {
  const glowTopMap = {
    top: "10%",
    center: "50%",
    bottom: "90%",
  };

  return (
    <section
      id={id}
      style={{
        position: "relative",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "100px 34px",
        ...style,
      }}
      className={className}
    >
      {glow && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: glowTopMap[glowPosition],
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(235, 110, 0, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(60px)",
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}
