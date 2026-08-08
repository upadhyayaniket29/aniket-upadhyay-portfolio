"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const heroLightRef = useRef<HTMLDivElement>(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // 1. Touch Device Detection - Disable completely on coarse pointers
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    // Motion variables (Zero allocations inside rAF)
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let ringX = -100;
    let ringY = -100;

    let currentState: "default" | "link" | "button" | "image" | "text" | "dragging" | "hidden" = "default";
    let isMouseDown = false;
    let isHeroVisible = true;

    // Magnetic variables
    let magneticTarget: HTMLElement | null = null;
    let magneticX = 0;
    let magneticY = 0;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Element Inspector Helper (Called ONLY on native pointer event triggers, NEVER inside rAF)
    const checkHoverState = (target: HTMLElement | null): "default" | "link" | "button" | "image" | "text" | "dragging" | "hidden" => {
      if (!target) return "default";

      // 1. Native Input Caret Protection
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest("input, textarea, [contenteditable='true']")
      ) {
        return "hidden";
      }

      // 2. Buttons & Magnetic elements
      const button = target.closest("button, [role='button'], .magnetic-button");
      if (button) {
        if (magneticTarget !== button) {
          if (magneticTarget) magneticTarget.style.transform = "";
          magneticTarget = button as HTMLElement;
        }
        return "button";
      } else if (magneticTarget) {
        magneticTarget.style.transform = "";
        magneticTarget = null;
      }

      // 3. Links
      if (target.closest("a, [role='link']")) return "link";

      // 4. Interactive Images / Media
      if (target.closest("img, svg, [data-cursor='image']")) return "image";

      // 5. Typography/Text
      if (target.closest("h1, h2, h3, h4, p, span, code")) return "text";

      return "default";
    };

    // Global Pointer Listeners (Event-driven, 0 reflow overhead)
    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      currentState = checkHoverState(target);
    };

    const onMouseDown = () => { isMouseDown = true; };
    const onMouseUp = () => { isMouseDown = false; };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onMouseDown, { passive: true });
    window.addEventListener("pointerup", onMouseUp, { passive: true });

    // IntersectionObserver to pause Hero light/tilt when offscreen
    const heroElement = document.querySelector("section");
    let heroObserver: IntersectionObserver | null = null;
    if (heroElement) {
      heroObserver = new IntersectionObserver(
        (entries) => {
          isHeroVisible = entries[0]?.isIntersecting ?? true;
        },
        { threshold: 0.1 }
      );
      heroObserver.observe(heroElement);
    }

    let animationFrameId: number;

    // High-Performance 60/120 FPS requestAnimationFrame Loop (Zero Layout Queries)
    const loop = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      // Smooth Lerp calculation (120-180ms delay)
      const ease = prefersReducedMotion ? 1 : 0.18;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;

      const ringEase = prefersReducedMotion ? 1 : 0.12;
      ringX += (mouseX - ringX) * ringEase;
      ringY += (mouseY - ringY) * ringEase;

      // Handle Magnetic pull (Max 4px)
      if (magneticTarget && !prefersReducedMotion) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (mouseX - centerX) * 0.15;
        const deltaY = (mouseY - centerY) * 0.15;
        magneticX = Math.max(-4, Math.min(4, deltaX));
        magneticY = Math.max(-4, Math.min(4, deltaY));
        magneticTarget.style.transform = `translate3d(${magneticX}px, ${magneticY}px, 0px)`;
      }

      // Update Cursor Dot
      if (dotRef.current) {
        if (currentState === "hidden") {
          dotRef.current.style.opacity = "0";
        } else {
          dotRef.current.style.opacity = "1";
          const scale = isMouseDown ? 0.75 : currentState === "text" ? 1.15 : 1;
          dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) translate(-50%, -50%) scale(${scale})`;
        }
      }

      // Update Cursor Ring / Capsule
      if (ringRef.current) {
        if (currentState === "hidden" || currentState === "default") {
          ringRef.current.style.opacity = "0";
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0px) translate(-50%, -50%) scale(0.5)`;
        } else {
          ringRef.current.style.opacity = "1";
          let scale = 1;
          let borderColor = "rgba(255, 255, 255, 0.25)";
          let bgColor = "transparent";
          let shadow = "none";

          if (currentState === "link") {
            scale = 1.3;
            borderColor = "rgba(255, 255, 255, 0.4)";
          } else if (currentState === "button") {
            scale = 1.5;
            borderColor = "rgba(235, 110, 0, 0.4)";
            bgColor = "rgba(235, 110, 0, 0.08)";
            shadow = "0 0 12px rgba(235, 110, 0, 0.25)";
          } else if (currentState === "image") {
            scale = 1.6;
            borderColor = "rgba(235, 110, 0, 0.6)";
            shadow = "0 0 16px rgba(235, 110, 0, 0.35)";
          } else if (currentState === "text") {
            scale = 1.1;
            borderColor = "rgba(255, 255, 255, 0.15)";
          }

          if (isMouseDown) scale *= 0.85;

          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0px) translate(-50%, -50%) scale(${scale})`;
          ringRef.current.style.borderColor = borderColor;
          ringRef.current.style.backgroundColor = bgColor;
          ringRef.current.style.boxShadow = shadow;
        }
      }

      // Update Hero Ambient Cursor Light (250-350px radius, 5-8% opacity warm orange)
      if (heroLightRef.current) {
        if (isHeroVisible && mouseX >= 0 && mouseY >= 0 && mouseY <= window.innerHeight) {
          heroLightRef.current.style.opacity = "1";
          heroLightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0px) translate(-50%, -50%)`;
        } else {
          heroLightRef.current.style.opacity = "0";
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onMouseDown);
      window.removeEventListener("pointerup", onMouseUp);
      if (heroObserver) heroObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (magneticTarget) magneticTarget.style.transform = "";
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Hero Ambient Warm Orange Cursor Light Overlay */}
      <div
        ref={heroLightRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, rgba(235, 110, 0, 0.07) 0%, rgba(235, 110, 0, 0.02) 45%, transparent 70%)",
          mixBlendMode: "screen",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Outer Context-Aware Ring/Capsule */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Central 4px Solid White Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] pointer-events-none z-50"
        style={{
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

export default CustomCursor;
