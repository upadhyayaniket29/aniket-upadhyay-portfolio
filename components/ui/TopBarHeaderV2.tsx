"use client";

import React, { useEffect, useState } from "react";
import { useModal } from "../ModalProvider";

export default function TopBarHeaderV2() {
  const { activeModal } = useModal();
  const [mounted, setMounted] = useState(false);
  const [formattedTime, setFormattedTime] = useState("00:54");
  const [formattedDate, setFormattedDate] = useState("Fri, Aug 14");
  const [views, setViews] = useState(10845);

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

    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
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
            setViews(data.views > 1000 ? data.views : 10845 + data.views);
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
    <header className="fixed top-0 left-0 right-0 h-[34px] z-[99999] bg-[#090b10]/75 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-between px-3.5 sm:px-6 font-mono text-[11px] sm:text-[11.5px] text-white/75 select-none pointer-events-auto">
      {/* Left side: AU  |  <Active Page> */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="font-extrabold text-[#f97316] tracking-wider drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
          AU
        </span>
        <span className="text-white/20">|</span>
        <span className="text-white/80 font-medium tracking-wide max-w-[100px] sm:max-w-none truncate">
          {activeLabel}
        </span>
      </div>

      {/* Right side: ↑ 10,845    Fri, Aug 14    00:54 */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Visitors count */}
        <div className="flex items-center gap-1 text-white/80">
          <span className="text-[10px] text-[#f97316] font-bold">↑</span>
          <span className="font-semibold">{mounted ? formattedViews : "10,845"}</span>
        </div>

        {/* Date (hidden on mobile < 640px) */}
        <div className="hidden sm:block text-white/40">
          {mounted ? formattedDate : "Fri, Aug 14"}
        </div>

        {/* Live 24h Time */}
        <div className="font-bold text-[#fb923c] drop-shadow-[0_0_8px_rgba(249,115,22,0.35)]">
          {mounted ? formattedTime : "00:54"}
        </div>
      </div>
    </header>
  );
}
