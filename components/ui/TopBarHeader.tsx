"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "../ModalProvider";

export default function TopBarHeader() {
  const { activeModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [formattedTime, setFormattedTime] = useState("00:00");
  const [formattedDate, setFormattedDate] = useState("Fri, Aug 14");
  const [views, setViews] = useState(10744);

  // Map activeModal to display label
  const getActiveLabel = () => {
    if (!activeModal || activeModal === "home") return "Home";
    switch (activeModal.toLowerCase()) {
      case "projects":
        return "Projects";
      case "experience":
      case "timeline":
        return "Experience";
      case "books":
      case "reading":
      case "blogs":
        return "Blogs";
      case "resume":
        return "Resume";
      case "contact":
        return "Contact";
      case "terminal":
        return "Terminal";
      case "leetcode":
        return "LeetCode";
      case "github":
        return "GitHub";
      default:
        return activeModal.charAt(0).toUpperCase() + activeModal.slice(1);
    }
  };

  useEffect(() => {
    setMounted(true);

    // Live Date & Time Updater
    const updateDateTime = () => {
      const now = new Date();

      // Format Date: Fri, Aug 14
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      // Format 24h Time: 00:06
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      setFormattedDate(dateStr);
      setFormattedTime(timeStr);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Fetch Visitor Count
    const fetchViews = async () => {
      try {
        let sessionId = sessionStorage.getItem("synk_session_id");
        let isNew = false;
        if (!sessionId) {
          sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
          sessionStorage.setItem("synk_session_id", sessionId);
          isNew = true;
        }

        const res = isNew
          ? await fetch("/api/views", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            })
          : await fetch("/api/views");

        if (res.ok) {
          const data = await res.json();
          if (typeof data.views === "number") {
            setViews(data.views > 1000 ? data.views : 10744 + data.views);
          }
        }
      } catch {}
    };

    fetchViews();

    return () => clearInterval(interval);
  }, []);

  const activeLabel = getActiveLabel();
  const formattedViews = views.toLocaleString("en-US");

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "34px",
        zIndex: 9999,
        background: "rgba(9, 11, 16, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 22px",
        fontFamily: "monospace",
        fontSize: "11.5px",
        color: "rgba(255, 255, 255, 0.75)",
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      {/* Left side: AU  |  <Active Page> */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            fontWeight: 800,
            color: "#f97316",
            letterSpacing: "0.1em",
            textShadow: "0 0 8px rgba(249, 115, 22, 0.4)",
          }}
        >
          AU
        </span>
        <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>
        <span style={{ color: "rgba(255, 255, 255, 0.8)", fontWeight: 500, letterSpacing: "0.04em" }}>
          {activeLabel}
        </span>
      </div>

      {/* Right side: ↑ 10,744    Fri, Aug 14    00:18 */}
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        {/* Visitors count */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgba(255, 255, 255, 0.8)" }}>
          <span style={{ fontSize: "11px", color: "#f97316", fontWeight: 700 }}>↑</span>
          <span style={{ fontWeight: 600 }}>{mounted ? formattedViews : "10,744"}</span>
        </div>

        {/* Date */}
        <div style={{ color: "rgba(255, 255, 255, 0.4)" }}>
          {mounted ? formattedDate : "Fri, Aug 14"}
        </div>

        {/* Live 24h Time */}
        <div
          style={{
            fontWeight: 700,
            color: "#fb923c",
            textShadow: "0 0 10px rgba(249, 115, 22, 0.35)",
          }}
        >
          {mounted ? formattedTime : "00:18"}
        </div>
      </div>
    </header>
  );
}
