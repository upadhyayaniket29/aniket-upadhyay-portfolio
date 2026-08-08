"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { useModal } from "../ModalProvider";

interface ModalWindowProps {
  id: string;
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export function ModalWindow({ id, title, size = "lg", children }: ModalWindowProps) {
  const { activeModal, setActiveModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  const isOpen = activeModal === id;

  // Handle scroll lock, escape key, and focus return
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element
    const previousFocus = document.activeElement as HTMLElement | null;
    
    // Lock body scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      // If clicking directly on the backdrop (not on the modal content)
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setActiveModal(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => document.addEventListener("click", handleOutsideClick), 100);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleOutsideClick);
      clearTimeout(timer);
      
      // Return focus
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  }, [isOpen, setActiveModal]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  const handleBackdropWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += e.deltaY;
    }
  };

  const isFullScreenOnMobile = ["resume", "books", "certificates"].includes(id);

  const containerResponsiveClasses = isFullScreenOnMobile
    ? "sm:relative fixed inset-0 sm:inset-auto max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:max-h-none sm:max-h-[90vh] sm:rounded-2xl"
    : "max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:max-h-[85vh] max-sm:rounded-b-none max-sm:rounded-t-2xl sm:max-h-[90vh] sm:rounded-2xl";

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-40 overflow-hidden flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 select-none">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onWheel={handleBackdropWheel}
            className="absolute inset-0 bg-[#050505]/75 backdrop-blur-md pointer-events-auto cursor-default"
          />

          {/* Premium Adaptive Window Panel */}
          <motion.div
            ref={(node) => {
              // @ts-ignore
              modalRef.current = node;
              // @ts-ignore
              scrollRef.current = node;
            }}
            initial={{ opacity: 0, scale: 0.97, y: isFullScreenOnMobile ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: isFullScreenOnMobile ? 0 : 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full ${sizeClasses[size]} ${containerResponsiveClasses} border border-white/10 bg-[#0a0a0a] shadow-2xl flex flex-col overflow-y-auto custom-scrollbar pointer-events-auto scroll-smooth pb-44 sm:pb-36`}
          >
            {/* Window Header Top Bar */}
            <div className="sticky top-0 z-50 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 border-b border-white/5 bg-[#050505] select-none shadow-sm pt-[calc(0.75rem+env(safe-area-inset-top))]">
                {/* macOS window control orbs */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-4 h-4 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/85 transition-colors flex items-center justify-center cursor-pointer group"
                    aria-label="Close modal"
                  >
                    <X className="w-2.5 h-2.5 sm:w-1.5 sm:h-1.5 text-black/60 sm:text-black/40 group-hover:block" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hidden sm:block" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] hidden sm:block" />
                </div>

                {/* Tiny Title */}
                <span className="text-[10px] sm:text-xs text-zinc-400 font-mono font-semibold uppercase tracking-wider truncate px-1 max-w-[130px] sm:max-w-none">
                  {title}
                </span>

                {/* Top Action / Download PDF for Resume */}
                {id === "resume" ? (
                  <a
                    href="/resume.pdf"
                    download="Aniket_Upadhyay_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded bg-[#eb6e00] hover:bg-[#ff8a1c] text-white text-[9px] sm:text-[10px] font-mono font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(235,110,0,0.3)] active:scale-95 whitespace-nowrap"
                  >
                    <Download className="w-3 h-3 text-white" />
                    <span>Download</span>
                  </a>
                ) : (
                  <div className="w-4 sm:w-12" />
                )}
              </div>

              {/* Content Workspace */}
              <div className="p-4 sm:p-6 md:p-8">
                {children}
              </div>
            </motion.div>
          </div>
      )}
    </AnimatePresence>
  );
}
export default ModalWindow;
