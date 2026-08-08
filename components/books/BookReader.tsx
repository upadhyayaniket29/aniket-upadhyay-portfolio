"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Star, BookOpen, ShoppingCart } from "lucide-react";
import HTMLFlipBook from "react-pageflip";

interface BookReaderProps {
  book: any;
  onClose: () => void;
}

// ForwardRef page component for react-pageflip
const BookPage = React.forwardRef<HTMLDivElement, { children: React.ReactNode; pageNum: number }>((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative bg-[#0d0d0f] border-l border-white/5 shadow-2xl p-6 md:p-8 flex flex-col justify-between h-full w-full select-none overflow-hidden"
      style={{ boxSizing: "border-box" }}
    >
      {/* Subtle paper shadow overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none" />
      <div className="relative z-10 flex flex-col justify-between h-full">
        {props.children}
      </div>
      {/* Page number footer */}
      <div className="absolute bottom-4 right-6 left-6 flex justify-between text-[8px] font-mono text-zinc-600 pointer-events-none">
        <span>{props.pageNum % 2 === 0 ? `PAGE ${props.pageNum}` : ""}</span>
        <span>{props.pageNum % 2 !== 0 ? `PAGE ${props.pageNum}` : ""}</span>
      </div>
    </div>
  );
});
BookPage.displayName = "BookPage";

export function BookReader({ book, onClose }: BookReaderProps) {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chapters = book.chapters || [];

  const handleNext = () => {
    if (flipBookRef.current) {
      flipBookRef.current.getPageFlip().flipNext();
    }
  };

  const handlePrev = () => {
    if (flipBookRef.current) {
      flipBookRef.current.getPageFlip().flipPrev();
    }
  };

  const handleJumpToChapter = (idx: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.getPageFlip().turnToPage(3 + idx * 2);
    }
  };

  const handleOpenBook = () => {
    if (flipBookRef.current) {
      flipBookRef.current.getPageFlip().flip(1);
    }
  };

  const handleAmazonBuy = () => {
    if (book.amazonUrl) {
      window.open(book.amazonUrl, "_blank", "noopener,noreferrer");
    }
  };

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  const progressPercent = Math.min(
    100,
    Math.round((book.pagesRead / (book.pagesTotal || 300)) * 100)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md pointer-events-auto"
    >
      {/* Top action headers */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        {book.amazonUrl && (
          <button
            onClick={handleAmazonBuy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs font-mono uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Buy on Amazon</span>
          </button>
        )}

        <button
          onClick={onClose}
          className="p-2 rounded-xl border border-white/10 hover:border-white/20 bg-zinc-900/80 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          title="Close Reader"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Book Hardcover Frame */}
      <div className="relative w-full max-w-4xl h-[85vh] max-h-[620px] rounded-2xl border border-white/10 bg-[#0d0d0f] shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Spine book depth shadow */}
        {currentPage > 0 && (
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[30px] bg-gradient-to-r from-black/40 via-black/5 to-black/40 z-25 pointer-events-none" />
        )}

        <div className="flex-1 flex items-center justify-center overflow-hidden p-6 md:p-10 relative">
          {mounted && (
            <HTMLFlipBook
              ref={flipBookRef}
              width={420}
              height={520}
              size="stretch"
              minWidth={320}
              maxWidth={500}
              minHeight={400}
              maxHeight={600}
              showCover={true}
              onFlip={onFlip}
              drawShadow={true}
              maxShadowOpacity={0.4}
              useMouseEvents={false}
              className="shadow-2xl shadow-black/80"
            >
              {/* PAGE 1: Hardcover Cover Page */}
              <div className="relative bg-[#1e1b4b] border-l border-white/10 p-8 flex flex-col justify-between h-full w-full select-none shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-2.5 h-full bg-black/60 z-20" />

                <div className="space-y-4">
                  <span className="text-[9px] font-mono tracking-widest text-[#eb6e00] font-bold block uppercase bg-[#eb6e00]/10 border border-[#eb6e00]/20 px-2 py-0.5 rounded w-fit">
                    {book.category}
                  </span>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight pt-2 font-display">
                    {book.title}
                  </h1>
                  <p className="text-xs text-zinc-400 font-mono">by {book.author}</p>
                </div>

                <div className="space-y-4 bg-black/30 border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(book.rating || 5) ? "text-[#eb6e00] fill-[#eb6e00]" : "text-zinc-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
                      Status: {book.status || "Read"}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-zinc-300 italic leading-relaxed">
                    &ldquo;Must-read essential book for growth &amp; mastery.&rdquo;
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleOpenBook}
                    className="flex-1 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors font-sans font-bold text-xs uppercase tracking-wider cursor-pointer text-center"
                  >
                    [ Open Journal ]
                  </button>

                  {book.amazonUrl && (
                    <button
                      onClick={handleAmazonBuy}
                      className="px-4 py-3 rounded-xl bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      title="Buy on Amazon"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Amazon</span>
                    </button>
                  )}
                </div>
              </div>

              {/* PAGE 2: Left Page: Table of Contents & Streak */}
              <BookPage pageNum={2}>
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">CONTENTS</span>
                    <h3 className="text-sm font-bold text-white mt-1">Table of Chapters</h3>
                  </div>

                  {chapters.length > 0 ? (
                    <div className="space-y-1.5 mt-2">
                      {chapters.map((ch: any, idx: number) => (
                        <button
                          key={ch.id}
                          onClick={() => handleJumpToChapter(idx)}
                          className="w-full flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-[#eb6e00]/10 border border-white/5 hover:border-[#eb6e00]/20 text-left text-[10px] text-zinc-300 hover:text-white transition-all cursor-pointer group"
                        >
                          <span className="truncate pr-2">{ch.title}</span>
                          <span className="text-[8px] font-mono text-zinc-500 group-hover:text-[#eb6e00]">
                            Page {idx * 2 + 4}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-zinc-400 leading-relaxed">
                      This book is part of my personal growth collection. Click <strong>Buy on Amazon</strong> to grab your physical/Kindle copy!
                    </p>
                  )}
                </div>

                <div className="space-y-2 bg-white/5 border border-white/5 p-3 rounded-lg">
                  <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block">PROGRESS SUMMARY</span>
                  <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                    <span>{book.pagesRead || 320} of {book.pagesTotal || 320} pages</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="h-1 bg-zinc-950 rounded-full overflow-hidden w-full relative">
                    <div className="h-full bg-[#eb6e00] rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </BookPage>

              {/* PAGE 3: Right Page: Thoughts and Takeaways */}
              <BookPage pageNum={3}>
                <div className="space-y-4">
                  <div className="border-b border-white/5 pb-2">
                    <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase">MY JOURNAL</span>
                    <h3 className="text-sm font-bold text-white mt-1">Key Takeaway</h3>
                  </div>

                  <p className="text-[11px] text-zinc-300 italic leading-relaxed border-l-2 border-[#eb6e00]/50 pl-3">
                    &ldquo;{book.biggestTakeaway || "Focus on systems rather than goals. Small 1% improvements compound into massive long-term results."}&rdquo;
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[8px] text-zinc-500 font-mono tracking-widest uppercase block">💡 MY THOUGHTS</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {book.myThoughts || "One of the most practical books on human behavior and habit loops."}
                    </p>
                  </div>

                  {book.amazonUrl && (
                    <div className="pt-4 border-t border-white/5">
                      <button
                        onClick={handleAmazonBuy}
                        className="w-full py-2.5 rounded-xl bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Get copy on Amazon</span>
                      </button>
                    </div>
                  )}
                </div>
              </BookPage>
            </HTMLFlipBook>
          )}
        </div>

        {/* Booklet bottom navigation controls */}
        {currentPage > 0 && (
          <div className="border-t border-white/5 bg-[#0a0a0c] px-6 py-4 flex items-center justify-between z-30">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            <span className="text-[10px] font-mono text-[#eb6e00]">
              [ Page {currentPage} ]
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage >= 3}
              className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
export default BookReader;
