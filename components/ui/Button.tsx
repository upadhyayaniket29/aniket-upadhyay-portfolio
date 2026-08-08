"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  style = {},
}: ButtonProps) {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: "8px 16px", fontSize: "11px" },
    md: { padding: "12px 22px", fontSize: "12px" },
    lg: { padding: "16px 30px", fontSize: "13px" },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg, #eb6e00 0%, #ff801a 100%)",
      color: "#ffffff",
      border: "1px solid #eb6e00",
      boxShadow: "0 8px 25px rgba(235, 110, 0, 0.25)",
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.03)",
      color: "#f8f7f5",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(12px)",
    },
    outline: {
      background: "transparent",
      color: "#eb6e00",
      border: "1px solid rgba(235, 110, 0, 0.4)",
    },
    secondary: {
      background: "#18181b",
      color: "#ffffff",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "30px",
    fontWeight: 700,
    letterSpacing: "-0.2px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  if (href) {
    return (
      <Link href={href} style={baseStyle} className={`custom-btn-hover ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} style={baseStyle} className={`custom-btn-hover ${className}`}>
      {children}
    </button>
  );
}
