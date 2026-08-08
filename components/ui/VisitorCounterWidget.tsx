"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Clock, Eye } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";

export function VisitorCounterWidget() {
  const [mounted, setMounted] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [views, setViews] = useState(101);
  const [onlineCount, setOnlineCount] = useState(3);

  // Framer Motion spring counter for smooth CountUp animation
  const springValue = useSpring(101, {
    stiffness: 60,
    damping: 15,
  });

  const displayCount = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString("en-US")
  );

  const [formattedNumber, setFormattedNumber] = useState("101");

  useEffect(() => {
    const unsubscribe = displayCount.on("change", (latest) => {
      setFormattedNumber(latest);
    });
    return () => unsubscribe();
  }, [displayCount]);

  useEffect(() => {
    setMounted(true);

    // 1. Live Time Update
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 2. Real-Time Session & Visitor Tracking (Starts from 101)
    const initVisitorSession = async () => {
      try {
        let sessionId = sessionStorage.getItem("synk_session_id");
        let isNewSession = false;

        if (!sessionId) {
          sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          sessionStorage.setItem("synk_session_id", sessionId);
          isNewSession = true;
        }

        const endpoint = "/api/views";
        const res = isNewSession
          ? await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            })
          : await fetch(endpoint);

        if (res.ok) {
          const data = await res.json();
          const liveViews = typeof data.views === "number" ? data.views : 101;
          setViews(liveViews);
          setOnlineCount(data.online || 3);
          springValue.set(liveViews);
        } else {
          springValue.set(101);
        }
      } catch (e) {
        springValue.set(101);
      }
    };

    initVisitorSession();

    return () => clearInterval(interval);
  }, [springValue]);

  return (
    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-12 lg:right-12 flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono text-zinc-300 border border-white/10 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#090909]/75 backdrop-blur-xl pointer-events-auto shadow-[0_8px_25px_rgba(0,0,0,0.5)] z-30">
      
      {/* 1. Location */}
      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#eb6e00]" />
        <span className="tracking-wide">GWALIOR, INDIA</span>
      </span>

      <span className="w-px h-3 bg-white/15" />

      {/* 2. Real-Time Visitor Counter (With Micro Glass Tooltip) */}
      <div className="relative group/views cursor-pointer flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-white/5 transition-colors">
        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#eb6e00] group-hover/views:scale-110 transition-transform" />
        <span className="text-white font-bold font-mono tracking-tight">
          {formattedNumber}
        </span>

        {/* Micro-Glass Tooltip on Hover */}
        <div className="absolute top-full right-1/2 translate-x-1/2 mt-2.5 hidden group-hover/views:flex flex-col p-3 rounded-xl bg-[#121212]/95 backdrop-blur-2xl border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.8)] z-50 text-left min-w-[170px] pointer-events-none transition-all">
          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
            <span>Portfolio Views</span>
            <span className="text-[#eb6e00] font-bold">LIVE</span>
          </div>
          <span className="text-sm font-bold text-white font-mono">
            {views.toLocaleString()} Total Visits
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-2 pt-2 border-t border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{onlineCount} Visitors Online</span>
          </div>
        </div>
      </div>

      <span className="w-px h-3 bg-white/15" />

      {/* 3. Live IST Clock */}
      <span className="flex items-center gap-1.5 hover:text-white transition-colors">
        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-400" />
        <span>{mounted ? localTime : "--:--:--"} IST</span>
      </span>
    </div>
  );
}

export default VisitorCounterWidget;
