"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, ExternalLink, ShoppingCart } from "lucide-react";
import { useModal } from "../ModalProvider";
import { BookReader } from "../books/BookReader";

export const MY_BOOKS = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Improvement",
    status: "COMPLETED",
    pagesRead: 320,
    rating: 5.0,
    cover: "https://covers.openlibrary.org/b/isbn/0735211299-L.jpg",
    fallback: ["#0f172a", "#1e3a5f"],
    amazonUrl: "https://www.amazon.in/Atomic-Habits-James-Clear/dp/1847941834/"
  },
  {
    id: "2",
    title: "Elon Musk",
    author: "Ashlee Vance",
    category: "Biography",
    status: "COMPLETED",
    pagesRead: 400,
    rating: 4.8,
    cover: "/books/elon_musk.png",
    fallback: ["#0c0c1a", "#1e1b4b"],
    amazonUrl: "https://www.amazon.in/Elon-Musk-Ashlee-Vance/dp/0062301233/"
  },
  {
    id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    status: "COMPLETED",
    pagesRead: 336,
    rating: 4.5,
    cover: "https://covers.openlibrary.org/b/isbn/1612680194-L.jpg",
    fallback: ["#431407", "#7c2d12"],
    amazonUrl: "https://www.amazon.in/Rich-Dad-Poor-Middle-Anniversary/dp/1612681131/"
  },
  {
    id: "4",
    title: "The Richest Man in Babylon",
    author: "George S. Clason",
    category: "Finance",
    status: "TO_READ",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/0451205367-L.jpg",
    fallback: ["#2c1810", "#4a2a18"],
    amazonUrl: "https://www.amazon.in/Richest-Man-Babylon-George-Clason/dp/9388144317/"
  },
  {
    id: "5",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Self-Improvement",
    status: "TO_READ",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/1439167346-L.jpg",
    fallback: ["#1a2e35", "#2a4a55"],
    amazonUrl: "https://www.amazon.in/Friends-Influence-People-English-Communication/dp/9371420995/"
  },
  {
    id: "6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    status: "TO_READ",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/0857197681-L.jpg",
    fallback: ["#2d3a2a", "#4a5a4a"],
    amazonUrl: "https://www.amazon.in/Psychology-Money-Morgan-Housel/dp/9390166268/"
  },
  {
    id: "7",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Self-Improvement",
    status: "TO_READ",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/0062457713-L.jpg",
    fallback: ["#4a1c1c", "#6a2a2a"],
    amazonUrl: "https://www.amazon.in/Subtle-Art-Not-Giving/dp/0062641549/"
  },
  {
    id: "8",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    status: "WISHLIST",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/0804139296-L.jpg",
    fallback: ["#b45309", "#78350f"],
    amazonUrl: "https://www.amazon.in/Zero-One-Notes-Startups-Future/dp/0753555190/"
  },
  {
    id: "9",
    title: "Can't Hurt Me",
    author: "David Goggins",
    category: "Self-Improvement",
    status: "WISHLIST",
    pagesRead: 0,
    rating: 0,
    cover: "https://m.media-amazon.com/images/I/71QK7rPa3NL._AC_UF1000,1000_QL80_.jpg",
    fallback: ["#78350f", "#451a03"],
    amazonUrl: "https://www.amazon.in/Cant-Hurt-Me-Master-Mind/dp/1544512287/"
  },
  {
    id: "10",
    title: "Rework",
    author: "Jason Fried & DHH",
    category: "Business",
    status: "WISHLIST",
    pagesRead: 0,
    rating: 0,
    cover: "https://covers.openlibrary.org/b/isbn/0307463745-L.jpg",
    fallback: ["#1e293b", "#0f172a"],
    amazonUrl: "https://www.amazon.in/Rework-Jason-Fried/dp/0307463745/"
  }
];

const SCFG = {
  COMPLETED: { dot: "#34d399", label: "Completed", glow: "rgba(52,211,153,0.3)" },
  READING: { dot: "#fb923c", label: "Reading", glow: "rgba(251,146,60,0.3)" },
  TO_READ: { dot: "#71717a", label: "Pending", glow: "rgba(113,113,122,0.2)" },
  WISHLIST: { dot: "#a855f7", label: "Wishlist", glow: "rgba(168,85,247,0.3)" },
} as const;

function DustParticles() {
  const pts = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i, left: `${5 + (i * 3.7) % 90}%`, bottom: `${5 + (i * 2.3) % 60}%`,
    size: 1 + (i % 3) * 0.5, duration: 8 + (i % 7) * 2, delay: (i % 12) * 1.1,
    anim: i % 2 === 0 ? "dust-float" : "dust-drift",
  })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {pts.map(p => (
        <div key={p.id} className="absolute rounded-full bg-amber-100/40"
          style={{
            left: p.left, bottom: p.bottom, width: p.size, height: p.size,
            animation: `${p.anim} ${p.duration}s ${p.delay}s ease-in-out infinite`
          }} />
      ))}
    </div>
  );
}

function RoomBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 55% 45%, #2a1608 0%, #150d05 40%, #080402 100%)" }} />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent 0px,transparent 78px,rgba(255,180,80,0.04) 78px,rgba(255,180,80,0.04) 80px,transparent 80px,transparent 158px)" }} />
      <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "repeating-linear-gradient(180deg,transparent 0,transparent 28px,rgba(120,70,20,0.25) 29px,transparent 30px)" }} />
      <div className="absolute pointer-events-none" style={{ top: "28%", left: "27%", width: 8, height: 8, borderRadius: "50%", background: "#fed7aa", boxShadow: "0 0 60px 40px rgba(254,215,170,0.12),0 0 120px 80px rgba(180,100,20,0.07)" }} />
      <div className="absolute pointer-events-none" style={{ top: "28%", right: "4%", width: 8, height: 8, borderRadius: "50%", background: "#fed7aa", boxShadow: "0 0 60px 40px rgba(254,215,170,0.10),0 0 120px 80px rgba(180,100,20,0.06)" }} />
      <div className="absolute top-0 inset-x-0 h-64 pointer-events-none" style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(180,90,10,0.18) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none" style={{ background: "linear-gradient(0deg,rgba(100,50,10,0.15) 0%,transparent 100%)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 55% 50%, transparent 35%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.85) 100%)" }} />
      <DustParticles />
    </div>
  );
}

function DeskLamp() {
  return (
    <div className="relative flex flex-col items-center justify-end flex-shrink-0" style={{ width: 56, height: 150, transform: "scale(0.75)", transformOrigin: "bottom" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{
        width: 48, height: 28,
        background: "linear-gradient(180deg,#fef3bf 0%,#fde68a 60%,#f59e0b 100%)",
        clipPath: "polygon(8% 0%,92% 0%,100% 100%,0% 100%)", borderRadius: "0 0 4px 4px",
        boxShadow: "0 0 30px 12px rgba(254,243,191,0.35)"
      }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 100%,rgba(255,255,255,0.5) 0%,transparent 60%)" }} />
      </div>
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-20 opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse,#fef08a 0%,transparent 70%)", filter: "blur(16px)" }} />
      <div className="absolute" style={{ width: 2, height: 88, background: "linear-gradient(180deg,#78716c,#44403c)", top: 28, left: "50%", transform: "translateX(-50%)", borderRadius: 1 }} />
      <div className="relative z-10 rounded" style={{ width: 28, height: 10, background: "linear-gradient(180deg,#57534e,#292524)", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }} />
    </div>
  );
}

function VintageGlobe() {
  return (
    <div className="relative flex flex-col items-center justify-end flex-shrink-0" style={{ width: 58, height: 120, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      <div className="absolute" style={{
        width: 52, height: 52, top: 10, left: "50%", transform: "translateX(-50%)", borderRadius: "50%",
        background: "radial-gradient(circle at 35% 30%,#854d0e 0%,#713f12 40%,#451a03 80%,#1c0a00 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.6),inset -6px -6px 12px rgba(0,0,0,0.4),0 0 16px rgba(180,100,20,0.15)"
      }}>
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "rgba(255,180,80,0.2)" }} />
        <div className="absolute" style={{ top: "25%", left: 6, right: 6, height: 1, background: "rgba(255,180,80,0.12)", borderRadius: "50%" }} />
        <div className="absolute top-0 bottom-0 left-1/2 w-px" style={{ background: "rgba(255,180,80,0.15)" }} />
        <div className="absolute" style={{ top: "18%", left: "22%", width: 18, height: 12, background: "rgba(120,160,80,0.3)", borderRadius: "30% 50% 40% 60%", transform: "rotate(-8deg)" }} />
        <div className="absolute top-2 left-3 w-5 h-5 rounded-full opacity-20" style={{ background: "radial-gradient(white,transparent)", filter: "blur(2px)" }} />
      </div>
      <div className="absolute" style={{ width: 58, height: 58, top: 6, left: "50%", transform: "translateX(-50%)", border: "2px solid rgba(180,120,30,0.5)", borderRadius: "50%" }} />
      <div style={{ width: 2, height: 30, background: "linear-gradient(180deg,#b45309,#78350f)", borderRadius: 1 }} />
      <div className="rounded-sm" style={{ width: 36, height: 8, background: "linear-gradient(180deg,#92400e,#451a03)", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }} />
    </div>
  );
}

function PlantPot() {
  return (
    <div className="relative flex flex-col items-center justify-end flex-shrink-0" style={{ width: 52, height: 120, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      {[{ x: -20, y: 10, w: 24, h: 32, r: -28, l: 140 }, { x: 18, y: 14, w: 20, h: 28, r: 25, l: 145 }, { x: -12, y: 4, w: 18, h: 26, r: 15, l: 138 }, { x: 10, y: 6, w: 22, h: 30, r: -10, l: 142 }, { x: 0, y: 0, w: 16, h: 22, r: 3, l: 150 }].map((lf, i) => (
        <div key={i} className="absolute" style={{ width: lf.w, height: lf.h, left: `calc(50% + ${lf.x}px)`, top: lf.y, borderRadius: "50% 10% 50% 10%", background: `hsl(${lf.l},50%,${22 + i * 3}%)`, transform: `rotate(${lf.r}deg)`, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.25)" }} />
      ))}
      <div className="rounded-t-sm relative z-10" style={{ width: 36, height: 6, background: "#292524" }} />
      <div className="relative z-10" style={{ width: 38, height: 28, background: "linear-gradient(180deg,#7c2d12,#431407)", clipPath: "polygon(5% 0%,95% 0%,85% 100%,15% 100%)", boxShadow: "2px 4px 12px rgba(0,0,0,0.5)" }}>
        <div className="absolute top-0 left-0 right-0 h-3" style={{ background: "#92400e" }} />
      </div>
    </div>
  );
}

function Candle() {
  return (
    <div className="relative flex flex-col items-center flex-shrink-0" style={{ width: 30, height: 110, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      <div className="flex flex-col items-center">
        <div style={{
          width: 11, height: 18, borderRadius: "50% 50% 25% 25%",
          background: "radial-gradient(ellipse at 50% 70%,#fef9c3 0%,#fde047 30%,#f97316 70%,transparent 100%)",
          boxShadow: "0 0 10px 4px rgba(249,115,22,0.6),0 0 22px 8px rgba(249,115,22,0.3)",
          animation: "candle-flicker 1.6s ease-in-out infinite", filter: "blur(0.3px)"
        }} />
        <div style={{ width: 1, height: 4, background: "#292524" }} />
      </div>
      <div className="relative flex-1" style={{ width: 22, background: "linear-gradient(90deg,#e4e4e7 0%,#fafafa 40%,#d4d4d8 100%)", boxShadow: "3px 0 8px rgba(0,0,0,0.3)", borderRadius: 1 }}>
        <div className="absolute -right-0.5 top-3" style={{ width: 5, height: 14, background: "#e4e4e7", borderRadius: "0 0 50% 50%" }} />
        <div className="absolute left-1 top-5" style={{ width: 4, height: 10, background: "#f4f4f5", borderRadius: "0 0 50% 50%" }} />
        <div className="absolute inset-y-0 left-0 w-2" style={{ background: "rgba(0,0,0,0.12)" }} />
      </div>
      <div style={{ width: 30, height: 6, background: "linear-gradient(180deg,#b45309,#78350f)", borderRadius: 2, boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }} />
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 pointer-events-none opacity-35" style={{ background: "radial-gradient(#f97316,transparent)", filter: "blur(6px)" }} />
    </div>
  );
}

function CoffeeMug() {
  return (
    <div className="relative flex flex-col items-center justify-end flex-shrink-0" style={{ width: 40, height: 60, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      {[{ x: -4, d: "0s" }, { x: 4, d: "0.6s" }, { x: 0, d: "1.2s" }].map((s, i) => (
        <div key={i} className="absolute" style={{ width: 2, height: 10, top: 2, left: `calc(50% + ${s.x}px)`, background: "rgba(200,200,200,0.5)", borderRadius: 2, animation: `steam-rise 1.8s ${s.d} ease-out infinite` }} />
      ))}
      <div className="relative" style={{ width: 36, height: 38, background: "linear-gradient(135deg,#292524 0%,#1c1917 60%,#0c0a09 100%)", borderRadius: "3px 3px 8px 8px", boxShadow: "2px 4px 12px rgba(0,0,0,0.5)" }}>
        <div className="absolute top-2 left-2 right-2 h-5 rounded-sm" style={{ background: "radial-gradient(ellipse,#5c3317 0%,#3a1f0d 100%)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.4)" }} />
        <div className="absolute -top-1 left-0 right-0 h-3" style={{ background: "linear-gradient(180deg,#44403c,#292524)", borderRadius: "3px 3px 0 0" }} />
      </div>
      <div className="absolute right-0.5 top-4" style={{ width: 8, height: 18, border: "2.5px solid #44403c", borderRadius: "0 6px 6px 0", borderLeft: "none" }} />
      <div style={{ width: 40, height: 5, background: "linear-gradient(180deg,#44403c,#1c1917)", borderRadius: "50%", marginTop: 2 }} />
    </div>
  );
}

function ReadingGlasses() {
  return (
    <div className="relative flex-shrink-0" style={{ width: 62, height: 24, alignSelf: "center", marginTop: 30, marginLeft: 6, transform: "scale(0.8)", transformOrigin: "center" }}>
      <div className="absolute" style={{ width: 22, height: 16, left: 2, top: 4, border: "2px solid #a16207", borderRadius: "40%", background: "rgba(56,189,248,0.06)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)" }} />
      <div className="absolute" style={{ width: 14, height: 2, left: "50%", top: 12, transform: "translateX(-50%)", background: "#92400e", borderRadius: 1 }} />
      <div className="absolute" style={{ width: 22, height: 16, right: 2, top: 4, border: "2px solid #a16207", borderRadius: "40%", background: "rgba(56,189,248,0.06)", boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)" }} />
      <div className="absolute" style={{ width: 6, height: 2, left: 0, top: 12, background: "#92400e", borderRadius: 1 }} />
      <div className="absolute" style={{ width: 6, height: 2, right: 0, top: 12, background: "#92400e", borderRadius: 1 }} />
    </div>
  );
}

function StackedBooks({ count = 4 }: { count?: number }) {
  const pal = ["#1e1b4b", "#14532d", "#7c2d12", "#1e3a5f", "#3b1f0d", "#1c2b1a"];
  const tit = ["SAPIENS", "DEEP WORK", "THINKING", "MEDITATIONS", "THINK AGAIN", "STOICISM"];
  return (
    <div className="relative flex flex-col justify-end flex-shrink-0" style={{ width: 52, height: count * 18 + 8, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      {Array.from({ length: count }).map((_, i) => {
        const w = 44 + (i % 2) * 6; return (
          <div key={i} className="relative rounded-sm" style={{ height: 16, width: w, background: pal[i % pal.length], marginBottom: 1, marginLeft: (52 - w) / 2 + (i % 3 - 1), boxShadow: "0 2px 6px rgba(0,0,0,0.5),inset 2px 0 4px rgba(0,0,0,0.3)" }}>
            <div className="absolute top-0 left-0 w-1.5 h-full" style={{ background: "rgba(0,0,0,0.35)", borderRadius: "1px 0 0 1px" }} />
            <span className="absolute inset-0 flex items-center justify-center text-[4.5px] font-bold tracking-widest text-white/40 uppercase">{tit[i % tit.length]}</span>
          </div>
        );
      })}
    </div>
  );
}

function AstrolabeDecor() {
  return (
    <div className="relative flex flex-col items-center justify-end flex-shrink-0" style={{ width: 46, height: 80, transform: "scale(0.8)", transformOrigin: "bottom" }}>
      <div className="absolute" style={{ width: 46, height: 46, top: 4, left: 0, border: "3px solid #b45309", borderRadius: "50%", boxShadow: "0 0 12px rgba(180,83,9,0.3)" }} />
      <div className="absolute" style={{ width: 38, height: 38, top: 8, left: 4, border: "2px solid #92400e", borderRadius: "50%", transform: "rotate(45deg)" }} />
      <div className="absolute" style={{ width: 6, height: 6, top: 24, left: 20, borderRadius: "50%", background: "#fbbf24", boxShadow: "0 0 6px rgba(251,191,36,0.5)" }} />
      <div style={{ width: 2, height: 20, background: "#b45309", marginTop: 6 }} />
      <div className="rounded-sm" style={{ width: 24, height: 6, background: "linear-gradient(180deg,#b45309,#78350f)", boxShadow: "0 3px 8px rgba(0,0,0,0.4)" }} />
    </div>
  );
}

function BookSpine({ book, isHighlighted, onClick }: { book: any; isHighlighted: boolean; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  const [imgFail, setImgFail] = useState(false);
  const cv = book.cover;
  const fb = book.fallback || ["#18181b", "#27272a"];
  const sc = SCFG[book.status as keyof typeof SCFG] || SCFG.TO_READ;
  const act = hov || isHighlighted;

  const handleAmazonBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (book.amazonUrl) {
      window.open(book.amazonUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none flex-shrink-0 group"
      style={{ width: 84 }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="relative overflow-hidden rounded-sm"
        style={{
          width: 76,
          height: 110,
          transform: act ? "translateY(-12px) scale(1.05) rotateY(6deg)" : "translateY(0) scale(1) rotateY(0deg)",
          boxShadow: act ? "0 24px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(235,110,0,0.6),0 0 24px rgba(235,110,0,0.3)" : "0 4px 16px rgba(0,0,0,0.6)",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.3s ease",
          transformStyle: "preserve-3d"
        }}
      >
        {cv && !imgFail && (
          <img src={cv} alt={book.title} className="absolute inset-0 w-full h-full object-cover" onError={() => setImgFail(true)} />
        )}
        <div className="absolute inset-0 flex flex-col justify-between p-1.5" style={{ background: `linear-gradient(150deg,${fb[0]},${fb[1]})`, opacity: (cv && !imgFail) ? 0 : 1 }}>
          <span className="text-[5.5px] font-mono text-[#eb6e00] tracking-widest uppercase">{book.category}</span>
          <div>
            <p className="text-[7.5px] font-extrabold text-white leading-tight uppercase tracking-tight line-clamp-3">{book.title}</p>
            <p className="text-[5.5px] text-zinc-400 mt-1">{book.author}</p>
          </div>
          <div className="absolute top-0 left-0 w-2 h-full" style={{ background: "rgba(0,0,0,0.45)" }} />
        </div>
        <div className="absolute top-0 left-0 w-1.5 h-full" style={{ background: "rgba(0,0,0,0.4)" }} />
        <div className="absolute top-0 right-0 w-1 h-full" style={{ background: "linear-gradient(270deg,rgba(250,250,250,0.18),transparent)" }} />

        {/* Hover overlay with Buy on Amazon button */}
        <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleAmazonBuy}
            className="w-full py-1.5 px-2 rounded bg-[#ff9900] hover:bg-[#e68a00] text-black font-extrabold text-[8px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-2.5 h-2.5" />
            <span>Buy Amazon</span>
          </button>
          <span className="text-[7px] text-zinc-400 font-mono mt-1">Click to journal</span>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: sc.dot, boxShadow: `0 0 4px ${sc.glow}` }} />
        <span className="text-[7.5px] font-mono" style={{ color: sc.dot }}>{sc.label}</span>
      </div>
    </div>
  );
}

function ShelfRow({ children, lightOpacity = 0.82 }: { children: React.ReactNode; lightOpacity?: number }) {
  return (
    <div className="relative">
      <div className="relative flex items-end gap-3 px-8 pt-2 pb-3 min-h-[136px]">{children}</div>
      <div className="relative" style={{ height: 20, background: "linear-gradient(180deg,#5c3317 0%,#3d2010 45%,#2a1509 100%)", boxShadow: "0 6px 24px rgba(0,0,0,0.7),0 2px 6px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,200,120,0.1)" }}>
        <div className="absolute top-0 left-12 right-12 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,transparent,#fbbf24,#fde68a,#fbbf24,transparent)", boxShadow: "0 0 12px 4px rgba(251,191,36,0.55),0 0 28px 8px rgba(180,100,10,0.25)", opacity: lightOpacity, animation: "shelf-glow-pulse 4s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 22px,rgba(0,0,0,0.15) 23px,transparent 24px)" }} />
      </div>
    </div>
  );
}

const CS: React.CSSProperties = {
  background: "linear-gradient(145deg, rgba(20,20,20,0.6) 0%, rgba(10,10,10,0.8) 100%)",
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 18,
  boxShadow: "0 16px 36px rgba(0,0,0,0.4)"
};

function LibrarySidebar({ books, selCat, setSelCat }: { books: any[]; selCat: string; setSelCat: (c: string) => void }) {
  const completed = books.filter(b => b.status === "COMPLETED").length;
  const totalPg = books.reduce((a, b) => a + (b.pagesRead || 0), 0);
  const avgR = books.length ? (books.reduce((a, b) => a + (b.rating || 4.8), 0) / books.length).toFixed(1) : "4.8";

  const cats = ["ALL", "Biography", "Business", "Finance", "Self-Improvement"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="h-full flex flex-col gap-4 overflow-y-auto pb-40 pr-1"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Title Header */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#eb6e00]/10 border border-[#eb6e00]/20 flex items-center justify-center shadow-inner">
            <span className="text-sm">📚</span>
          </div>
          <h1 className="text-[20px] font-extrabold tracking-widest text-white uppercase font-display">LIBRARY</h1>
        </div>
        <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">
          Books that shaped my mindset & engineering strategy.
        </p>
      </div>

      {/* Overview Card */}
      <div className="p-5 space-y-4" style={CS}>
        <span className="block text-[10px] font-mono tracking-[0.2em] text-[#eb6e00] font-bold uppercase border-b border-white/10 pb-2.5">
          OVERVIEW
        </span>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "📖", val: String(completed), sub: "Books Read" },
            { icon: "⭐", val: avgR, sub: "Avg Rating" },
            { icon: "📄", val: totalPg > 0 ? totalPg.toLocaleString() : "1,056", sub: "Pages Read" },
            { icon: "🖊", val: "42", sub: "Key Notes" }
          ].map(it => (
            <div key={it.sub} className="flex items-center gap-2.5 rounded-xl p-2.5 bg-white/[0.02] border border-white/[0.04]">
              <span className="text-base opacity-80">{it.icon}</span>
              <div>
                <span className="block text-base font-bold text-white font-display leading-none">{it.val}</span>
                <span className="block text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-mono">{it.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Categories Card */}
      <div className="p-5 space-y-3.5" style={CS}>
        <span className="block text-[10px] font-mono tracking-[0.2em] text-[#eb6e00] font-bold uppercase border-b border-white/10 pb-2.5">
          TOP CATEGORIES
        </span>
        <div className="flex flex-wrap gap-2">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setSelCat(c)}
              className="px-3.5 py-1.5 rounded-full text-[10px] font-mono border transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
              style={selCat === c ? {
                background: "#eb6e00",
                border: "1px solid #eb6e00",
                color: "white",
                boxShadow: "0 4px 12px rgba(235,110,0,0.3)"
              } : {
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#a1a1aa"
              }}
            >
              {c === "ALL" ? "All Categories" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Wishlist Card */}
      <div className="p-5 space-y-3.5" style={CS}>
        <span className="block text-[10px] font-mono tracking-[0.2em] text-[#eb6e00] font-bold uppercase border-b border-white/10 pb-2.5">
          RECOMMENDED & WISHLIST
        </span>
        <div className="space-y-2.5">
          {books.filter(b => b.status === "WISHLIST").map(b => (
            <div key={b.id} className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-7 h-9 rounded overflow-hidden flex-shrink-0 bg-black/40">
                  {b.cover && <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-white font-display truncate leading-tight">{b.title}</p>
                  <p className="text-[9px] text-zinc-400 font-mono mt-0.5 truncate">{b.author}</p>
                </div>
              </div>

              {b.amazonUrl && (
                <a
                  href={b.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#ff9900]/10 hover:bg-[#ff9900]/20 border border-[#ff9900]/30 text-[#ff9900] transition-colors shrink-0 flex items-center gap-1 text-[9px] font-mono font-bold"
                  title="Buy on Amazon"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span className="hidden sm:inline">Buy</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LibraryOverlay() {
  const {
    activeModal,
    setActiveModal,
    selectedBookId,
    setSelectedBookId,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useModal();

  const books = MY_BOOKS;
  const selBook = books.find(b => b.id === selectedBookId);

  const hi = (b: any) => !!(searchQuery && b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const filtered = books.filter(b => {
    const mc = selectedCategory === "ALL" || b.category === selectedCategory;
    const ms = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return mc && ms;
  });

  const shelfBooks = filtered.filter(b => b.status !== "WISHLIST");
  const r1 = shelfBooks.slice(0, 3), r2 = shelfBooks.slice(3, 7), r3 = shelfBooks.slice(7);

  if (activeModal !== "books") return null;

  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(18px)", scale: 0.98 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-40 flex overflow-hidden"
      style={{ fontFamily: "'Inter',sans-serif" }}
    >
      <RoomBackground />
      <div className="relative z-10 flex w-full h-full">
        {/* Left Sidebar - Hidden on mobile (< lg), full width on desktop */}
        <div className="hidden lg:flex lg:w-[28%] flex-shrink-0 flex-col px-8 pt-8 overflow-hidden">
          <LibrarySidebar books={books} selCat={selectedCategory} setSelCat={setSelectedCategory} />
        </div>

        {/* Main Bookshelf Container */}
        <div className="flex-1 flex flex-col pt-3 sm:pt-6 px-2 sm:pr-8 pb-28 sm:pb-48 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {/* Top Bar Header */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center justify-between sm:justify-end gap-2 mb-3 px-1"
          >
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial min-w-[130px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="outline-none text-[11px] text-white placeholder-zinc-500 w-full sm:w-[240px]"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "8px 12px 8px 32px"
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(235,110,0,0.5)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="outline-none appearance-none cursor-pointer text-[10px] font-mono text-zinc-300 max-w-[120px] sm:max-w-none truncate"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "8px 26px 8px 10px"
                }}
              >
                {["ALL", "Biography", "Business", "Finance", "Self-Improvement"].map(c => (
                  <option key={c} value={c} style={{ background: "#1c1917" }}>
                    {c === "ALL" ? "All Categories" : c}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => { setActiveModal(null); setSearchQuery(""); setSelectedCategory("ALL"); }}
              className="p-2 sm:p-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
              title="Close Library"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>

          {/* 3D Bookshelf */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-stretch relative min-h-[520px] sm:min-h-[650px] mb-12 sm:mb-24"
          >
            <div className="absolute inset-x-1/4 top-1/4 bottom-32 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%,rgba(180,90,10,0.22) 0%,transparent 70%)", filter: "blur(40px)" }} />
            <div className="relative flex-1 flex flex-col pb-6 sm:pb-8 rounded-2xl sm:rounded-[40px]" style={{ background: "linear-gradient(180deg,#3e2212 0%,#2d180d 25%,#1e1008 100%)", border: "1px solid rgba(255,200,80,0.1)", boxShadow: "0 60px 180px rgba(0,0,0,0.9),inset 0 1px 0 rgba(255,200,100,0.12)", overflow: "hidden" }}>
              <div className="absolute -top-4 left-4 right-4 sm:left-8 sm:right-8 h-8 pointer-events-none" style={{ background: "linear-gradient(180deg,#5c3318,#3e2212)", borderRadius: "50%", boxShadow: "0 -3px 24px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,200,100,0.18)" }} />
              {[12, 32, 52, 72, 90].map(pct => (
                <div key={pct} className="absolute pointer-events-none" style={{ top: 2, left: `${pct}%` }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#fef9c3", boxShadow: "0 0 10px 4px rgba(254,249,195,0.9),0 0 24px 8px rgba(251,191,36,0.5)" }} />
                  <div className="absolute top-2.5 -left-6 w-14 h-28 opacity-10 pointer-events-none" style={{ background: "linear-gradient(180deg,rgba(254,243,191,0.9),transparent)", clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)", filter: "blur(8px)" }} />
                </div>
              ))}
              <div className="absolute top-0 bottom-0 left-0 w-3 sm:w-10" style={{ background: "linear-gradient(90deg,#1a0c05,#2d1810)", borderRadius: "24px 0 0 28px" }} />
              <div className="absolute top-0 bottom-0 right-0 w-3 sm:w-10" style={{ background: "linear-gradient(270deg,#1a0c05,#2d1810)", borderRadius: "0 24px 28px 0" }} />

              <div className="pt-6 sm:pt-8 px-3 sm:px-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <ShelfRow lightOpacity={0.9}>
                  <PlantPot />
                  {r1.map(b => <BookSpine key={b.id} book={b} isHighlighted={hi(b)} onClick={() => setSelectedBookId(b.id)} />)}
                  {Array.from({ length: Math.max(0, 3 - r1.length) }).map((_, i) => (
                    <div key={`f1-${i}`} className="flex-shrink-0" style={{ width: 14 + i * 4, height: 96, background: `hsl(${20 + i * 15},30%,${12 + i * 3}%)`, borderRadius: 2, boxShadow: "inset 2px 0 4px rgba(0,0,0,0.4)" }} />
                  ))}
                  <div className="flex-1 min-w-[8px]" />
                  <DeskLamp /><StackedBooks count={3} />
                </ShelfRow>
              </div>

              <div className="px-3 sm:px-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <ShelfRow lightOpacity={0.80}>
                  <VintageGlobe />
                  <div className="flex items-end gap-0.5 flex-shrink-0 hidden sm:flex">
                    {[14, 16, 12, 15, 13, 16].map((w, i) => (
                      <div key={i} className="rounded-sm" style={{ width: w, height: 76 + (i % 3) * 8, background: `hsl(${20 + i * 18},25%,${10 + i * 2}%)`, boxShadow: "inset 1px 0 3px rgba(0,0,0,0.5)" }} />
                    ))}
                  </div>
                  {r2.map(b => <BookSpine key={b.id} book={b} isHighlighted={hi(b)} onClick={() => setSelectedBookId(b.id)} />)}
                  <div className="flex-1 min-w-[8px]" />
                  <Candle /><ReadingGlasses /><PlantPot />
                </ShelfRow>
              </div>

              <div className="px-3 sm:px-10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                <ShelfRow lightOpacity={0.70}>
                  <PlantPot /><StackedBooks count={3} />
                  {r3.map(b => <BookSpine key={b.id} book={b} isHighlighted={hi(b)} onClick={() => setSelectedBookId(b.id)} />)}
                  <div className="flex-1 min-w-[8px]" />
                  <CoffeeMug /><AstrolabeDecor />
                </ShelfRow>
              </div>

              <div className="mx-3 sm:mx-6 mt-1 mb-3 sm:mb-4 rounded" style={{ height: 12, background: "linear-gradient(180deg,#4a2a14,#2a1508)", boxShadow: "0 6px 20px rgba(0,0,0,0.6),inset 0 1px 0 rgba(255,180,80,0.08)" }} />
            </div>
          </motion.div>

          <div className="text-center pt-1 pb-4 pointer-events-none">
            <span className="text-[9px] font-mono text-zinc-400 tracking-[0.15em] uppercase">Click book to buy on Amazon or view notes</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedBookId && selBook && <BookReader book={selBook} onClose={() => setSelectedBookId(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
export default LibraryOverlay;
