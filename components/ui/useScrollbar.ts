"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Desktop detection (permanently mounted on fine-pointer desktop displays)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsDesktop(true);
    }

    const updateScrollProgress = () => {
      const scrollY = (window as any).__lenisScrollY ?? window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }

      const progress = Math.min(1, Math.max(0, scrollY / totalHeight));
      setScrollProgress(progress);
    };

    // 60 FPS requestAnimationFrame scroll listener for non-blocking performance
    const onScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    // ResizeObserver: Automatically adapts scrollbar when page height changes (modals, async data loading)
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        updateScrollProgress();
      });
      resizeObserver.observe(document.documentElement);
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return {
    scrollProgress,
    isHovered,
    setIsHovered,
    isDesktop
  };
}

export default useScrollbar;
