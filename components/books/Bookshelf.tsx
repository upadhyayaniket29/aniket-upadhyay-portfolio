"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trophy, BookOpen, Clock, Heart, Award, Sparkles, X, Star, FileText, ChevronDown } from "lucide-react";
import { useModal } from "../ModalProvider";
import { BookReader } from "./BookReader";

export function Bookshelf() {
  const {
    activeModal,
    setActiveModal,
    selectedBookId,
    setSelectedBookId,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useModal();

  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch seeded books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/books");
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        }
      } catch (err) {
        console.error("Failed to load books:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const selectedBook = books.find((b) => b.id === selectedBookId);

  // Gather stats
  const completedBooks = books.filter((b) => b.status === "COMPLETED");
  const readingBooks = books.filter((b) => b.status === "READING");
  const averageRating = "4.8"; // Hardcoded metric to match premium layout
  const totalPagesRead = "1,792";
  const notesCount = "127";

  const categories = ["ALL", "Biography", "Business", "Finance", "Self-Improvement", "Technology"];

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#eb6e00]" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between relative pointer-events-none p-4 md:p-8">
      {/* Top Header Controls (Search and Dropdown Category Selector) */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pointer-events-auto z-10"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#eb6e00]" />
            <h2 className="text-xl font-extrabold tracking-widest text-white font-mono uppercase">
              MY LIBRARY
            </h2>
          </div>
          <p className="text-[10px] text-zinc-500 font-sans tracking-wide">
            Books that shaped the way I think, build and live.
          </p>
        </div>

        {/* Search and Exit actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Top Search bar */}
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search books... ⌘K"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950/80 border border-white/5 focus:border-[#eb6e00]/50 outline-none rounded-xl py-2 pl-9 pr-4 text-[10px] font-sans text-white placeholder-zinc-600 transition-colors shadow-lg"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-zinc-950/80 border border-white/5 text-zinc-400 hover:text-white rounded-xl py-2 px-3 pr-8 text-[10px] font-mono outline-none appearance-none cursor-pointer shadow-lg w-[140px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-zinc-950 text-zinc-400">
                  {cat === "ALL" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
          </div>

          {/* Close HUD and return home */}
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full border border-white/10 hover:border-white/20 bg-zinc-950/80 text-zinc-400 hover:text-white transition-colors cursor-pointer shadow-lg"
            title="Exit Library"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Main HUD overlay grid (Dashboard HUD Left, empty interactive room center) */}
      <div className="w-full max-w-7xl mx-auto flex-1 flex items-center justify-between gap-12 mt-6">
        
        {/* Left Side: Stats and timeline panel (Direct replication of reference mockup card slots) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full max-w-[280px] space-y-4 pointer-events-auto z-10 hidden md:block"
        >
          {/* Card 1: Overview stats */}
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/85 backdrop-blur-md p-4 space-y-3.5 shadow-xl">
            <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block border-b border-white/5 pb-1">
              OVERVIEW
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#eb6e00]" />
                <div>
                  <span className="block text-[12px] font-extrabold text-white font-mono">{completedBooks.length}</span>
                  <span className="block text-[8px] text-zinc-500 font-sans uppercase">Books Read</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#eb6e00]" />
                <div>
                  <span className="block text-[12px] font-extrabold text-white font-mono">{averageRating}</span>
                  <span className="block text-[8px] text-zinc-500 font-sans uppercase">Avg Rating</span>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                <FileText className="w-4 h-4 text-[#eb6e00]" />
                <div>
                  <span className="block text-[12px] font-extrabold text-white font-mono">{totalPagesRead}</span>
                  <span className="block text-[8px] text-zinc-500 font-sans uppercase">Pages Read</span>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                <Clock className="w-4 h-4 text-[#eb6e00]" />
                <div>
                  <span className="block text-[12px] font-extrabold text-white font-mono">{notesCount}</span>
                  <span className="block text-[8px] text-zinc-500 font-sans uppercase">Notes & Quotes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vertical Reading Journey timeline */}
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/85 backdrop-blur-md p-4 space-y-3 shadow-xl">
            <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block border-b border-white/5 pb-1">
              READING JOURNEY
            </span>
            <div className="relative pl-4 border-l border-white/5 space-y-4 pt-1">
              <div className="relative">
                <span className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-[#f97316]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white">2026</span>
                  <span className="text-[8px] font-mono text-[#f97316] bg-[#f97316]/10 px-1.5 py-0.5 rounded">Reading</span>
                </div>
                <span className="block text-[9px] text-zinc-400 font-semibold mt-0.5">Elon Musk</span>
                <span className="block text-[7px] text-zinc-600 font-sans">by Walter Isaacson</span>
              </div>

              <div className="relative">
                <span className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-[#10b981]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white">2025</span>
                  <span className="text-[8px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded">Completed</span>
                </div>
                <span className="block text-[9px] text-zinc-400 font-semibold mt-0.5">Atomic Habits</span>
                <span className="block text-[7px] text-zinc-600 font-sans">by James Clear</span>
              </div>

              <div className="relative">
                <span className="absolute -left-[20.5px] top-1 w-2 h-2 rounded-full bg-[#10b981]" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-white">2024</span>
                  <span className="text-[8px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded">Completed</span>
                </div>
                <span className="block text-[9px] text-zinc-400 font-semibold mt-0.5">Rich Dad Poor Dad</span>
                <span className="block text-[7px] text-zinc-600 font-sans">by Robert Kiyosaki</span>
              </div>
            </div>
          </div>

          {/* Card 3: Top Categories */}
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0c]/85 backdrop-blur-md p-4 space-y-3.5 shadow-xl">
            <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block border-b border-white/5 pb-1">
              TOP CATEGORIES
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded text-[8px] font-mono border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Center spacing lets the 3D room render completely unblocked */}
        <div className="flex-1 h-full pointer-events-none" />
      </div>

      {/* Floating guidelines footer */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center opacity-40 pointer-events-none select-none py-2 mt-auto">
        <span className="text-[8px] font-mono tracking-widest text-zinc-600 uppercase">
          [ Drag Canvas to Orbit • Hover Spine to Slide Book • Click Cover to Read ]
        </span>
      </div>

      {/* Open book pageflip viewer overlays */}
      <AnimatePresence>
        {selectedBookId && selectedBook && (
          <BookReader book={selectedBook} onClose={() => setSelectedBookId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
export default Bookshelf;
