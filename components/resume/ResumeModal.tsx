"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Printer, Copy, X, FileCheck, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://aniketupadhyay.dev/resume.pdf");
    alert("Resume link copied to clipboard!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col glass-panel overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#050505]/95">
              <div className="flex items-center gap-2 text-[#eb6e00]">
                <FileCheck className="w-5 h-5" />
                <span className="text-sm font-semibold text-white font-sans">Aniket_Upadhyay_Resume.pdf</span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    download="Aniket_Upadhyay_Resume.pdf"
                    className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Print Resume"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy Resume Link"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="w-px h-6 bg-white/10" />

                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Frame Content */}
            <div className="flex-1 bg-zinc-950/80 relative flex items-center justify-center p-4">
              <iframe
                src="/resume.pdf#toolbar=0"
                className="w-full h-full rounded-lg border border-white/5 shadow-2xl"
                title="Aniket Upadhyay Resume"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-white/5 bg-[#050505]/95 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>SECURED ADMIN CREDENTIALS ACTIVE</span>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Open in Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
export default ResumeModal;
