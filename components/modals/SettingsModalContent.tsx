"use client";

import React from "react";
import { Sun, Moon, Laptop, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";

export default function SettingsModalContent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: "dark", label: "Midnight Dark", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { name: "light", label: "Classic Light", icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { name: "system", label: "System Default", icon: <Laptop className="w-4 h-4 text-zinc-400" /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-white font-sans">Workspace Settings</h3>
        <p className="text-xs text-zinc-500 font-sans mt-1">
          Configure color modes, hardware acceleration filters, and layout preferences.
        </p>
      </div>

      {/* Theme selector */}
      <div className="space-y-2">
        <label className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider font-semibold">
          Select Color Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => {
            const isSelected = theme === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#eb6e00]/10 border-[#eb6e00] text-white shadow-[0_0_15px_rgba(235,110,0,0.1)]"
                    : "bg-white/5 border-white/5 hover:border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {t.icon}
                <span className="text-[10px] font-sans font-semibold">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Preferences */}
      <div className="space-y-2">
        <label className="block text-[9px] text-zinc-500 font-mono uppercase tracking-wider font-semibold">
          System Preferences
        </label>
        <div className="p-4 rounded-xl border border-white/5 bg-[#111111]/30 space-y-4">
          {/* Parallax Toggle */}
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="block font-sans font-semibold text-zinc-300">GPU Parallax</span>
              <span className="block text-[10px] text-zinc-500 font-sans">Track cursor positions in R3F Canvas</span>
            </div>
            <div className="w-8 h-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
          </div>

          {/* Noise Toggle */}
          <div className="flex items-center justify-between text-xs border-t border-white/5 pt-3">
            <div>
              <span className="block font-sans font-semibold text-zinc-300">Film Grain Noise</span>
              <span className="block text-[10px] text-zinc-500 font-sans">Toggle noise film grain background overlay</span>
            </div>
            <div className="w-8 h-4 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-end px-0.5 cursor-pointer">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
