"use client";

import React from "react";

interface HeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export function Heading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  style = {},
}: HeadingProps) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === "center" ? "780px" : "100%",
        margin: align === "center" ? "0 auto 40px" : "0 0 40px",
        ...style,
      }}
      className={className}
    >
      {eyebrow && (
        <p
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: "#eb6e00",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 600,
            margin: "0 0 12px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#eb6e00",
              boxShadow: "0 0 8px #eb6e00",
            }}
          />
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontSize: " clamp(32px, 5vw, 52px)",
          letterSpacing: "-2.2px",
          lineHeight: 1.08,
          color: "#ffffff",
          fontWeight: 800,
          margin: "0 0 16px",
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: "15px",
            color: "#8c8c90",
            lineHeight: 1.65,
            margin: 0,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
