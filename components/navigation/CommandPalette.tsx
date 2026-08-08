"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Monitor, Terminal, FileText, BookOpen, Briefcase, Sun, Moon, Sparkles, Command } from "lucide-react";
import { useTheme } from "next-themes";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Toggle visibility on Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSearch("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Static list of actions and pages
  const staticItems = [
    { id: "home", title: "Home Page", category: "Pages", icon: <Sparkles className="w-4 h-4" />, action: () => router.push("/") },
    { id: "projects", title: "View Projects", category: "Pages", icon: <Briefcase className="w-4 h-4" />, action: () => router.push("/projects") },
    { id: "experience", title: "Work Experience", category: "Pages", icon: <FileText className="w-4 h-4" />, action: () => router.push("/experience") },
    { id: "blog", title: "Read Blog Posts", category: "Pages", icon: <FileText className="w-4 h-4" />, action: () => router.push("/blog") },
    { id: "books", title: "Books Read & Notes", category: "Pages", icon: <BookOpen className="w-4 h-4" />, action: () => router.push("/books") },
    { id: "now", title: "Now Page - Focus", category: "Pages", icon: <Terminal className="w-4 h-4" />, action: () => router.push("/now") },
    { id: "uses", title: "Uses - Setup & Gear", category: "Pages", icon: <Monitor className="w-4 h-4" />, action: () => router.push("/uses") },
    { id: "theme-dark", title: "Switch to Dark Mode", category: "Actions", icon: <Moon className="w-4 h-4" />, action: () => setTheme("dark") },
    { id: "theme-light", title: "Switch to Light Mode", category: "Actions", icon: <Sun className="w-4 h-4" />, action: () => setTheme("light") },
  ];

  // Dynamic filter based on search query
  useEffect(() => {
    if (!search) {
      setResults(staticItems);
      return;
    }

    const filtered = staticItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
    setActiveIndex(0);
  }, [search, theme]);

  // Keyboard navigation inside list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) {
        results[activeIndex].action();
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Keyboard Shortcut Indicator - Minimal HUD - Hidden on Home Page to preserve Cinematic Hero */}
      {pathname !== "/" && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-[#111111]/85 text-xs text-zinc-400 hover:text-white transition-colors glass-card cursor-pointer"
        >
          <Command className="w-3.5 h-3.5" />
          <span>Search</span>
          <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px]">⌘K</kbd>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Main Command Window */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]/95 text-white shadow-2xl glass-panel"
            >
              {/* Search Header */}
              <div className="flex items-center border-b border-white/5 px-4 py-3">
                <Search className="w-4 h-4 text-zinc-500 mr-3" />
                <input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent font-sans text-sm text-white placeholder-zinc-500 outline-none"
                />
              </div>

              {/* Search Results */}
              <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
                {results.length > 0 ? (
                  results.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          item.action();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                          isActive ? "bg-white/5 text-[#eb6e00]" : "text-zinc-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${isActive ? "text-[#eb6e00]" : "text-zinc-500"}`}>
                            {item.icon}
                          </span>
                          <span className="font-sans text-xs font-medium text-white">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-600">
                          {item.category}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-zinc-500 font-sans">
                    No results found for &ldquo;{search}&rdquo;
                  </div>
                )}
              </div>

              {/* Command Footer */}
              <div className="flex items-center justify-between border-t border-white/5 bg-[#050505] px-4 py-2 text-[10px] text-zinc-500 font-mono">
                <div className="flex items-center gap-3">
                  <span>↑↓ Nav</span>
                  <span>↵ Enter</span>
                </div>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
export default CommandPalette;
