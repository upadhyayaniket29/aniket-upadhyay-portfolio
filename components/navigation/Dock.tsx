"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Home,
  Briefcase,
  History,
  BookOpen,
  Clock,
  Monitor,
  FileText,
  Mail,
  Terminal as TerminalIcon,
  Settings,
  FileDown,
  Award,
} from "lucide-react";
import { useModal } from "../ModalProvider";

interface DockItemProps {
  id: string | null;
  label: string;
  icon: React.ReactNode;
  mouseX: any;
}

function DockItem({ id, label, icon, mouseX }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { activeModal, setActiveModal, openLibraryWithPreloader } = useModal();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  // Classic macOS Dock magnification (Subtle curve: 48px to 56px)
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-100, 0, 100], [48, 56, 48]);
  const heightTransform = useTransform(distance, [-100, 0, 100], [48, 56, 48]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 180,
    damping: 15,
  });

  const isActive = activeModal === id;

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (id === "books") {
      openLibraryWithPreloader();
    } else {
      setActiveModal(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  };

  // CAP mouse pull at 4px for magnetic offset
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const pullX = (deltaX / (rect.width / 2)) * 4;
    const pullY = (deltaY / (rect.height / 2)) * 4;

    setMagneticPos({ x: pullX, y: pullY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setShowTooltip(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticPos({ x: 0, y: 0 });
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      tabIndex={0}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      className="relative flex-shrink-0 flex items-center justify-center rounded-full cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#eb6e00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] select-none pointer-events-auto"
      style={{ cursor: "pointer" }}
    >
      {/* Main icon boundary containing spring translations */}
      <motion.div
        style={{ width, height }}
        animate={{
          x: magneticPos.x,
          y: magneticPos.y + (isHovered ? -2 : 0),
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className={`flex items-center justify-center rounded-full border transition-colors duration-200 relative ${
          isActive
            ? "border-[#eb6e00]/30 bg-gradient-to-b from-[#eb6e00]/10 to-[#eb6e00]/5 text-[#eb6e00] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_2px_8px_rgba(235,110,0,0.15)]"
            : isHovered
              ? "border-white/10 bg-white/[0.04] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
              : "border-transparent bg-transparent text-[#a1a1aa]"
        }`}
      >
        {icon}

        {/* Dynamic sliding Active Indicator Dot below */}
        {isActive && (
          <motion.div
            layoutId="activeIndicatorDot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#eb6e00] shadow-[0_0_6px_rgba(235,110,0,0.6)]"
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 20,
              mass: 0.8,
            }}
          />
        )}
      </motion.div>

      {/* Floating minimal text label with micro accent dot (Apple/Linear style) */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ bottom: "100%", marginBottom: "16px", left: "50%", x: "-50%" }}
            className="absolute z-50 flex flex-col items-center pointer-events-none select-none"
          >
            <span className="font-mono text-[10px] font-semibold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {label}
            </span>
            <span
              className={`text-[8px] leading-none mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                isActive ? "text-[#eb6e00]" : "text-zinc-500"
              }`}
            >
              ●
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Dock() {
  const { activeModal } = useModal();
  const mouseX = useMotionValue(Infinity);
  const [reflectionStyle, setReflectionStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    mouseX.set(e.clientX);

    // Liquid Glass specular highlight
    setReflectionStyle({
      backgroundImage: `radial-gradient(circle at ${x}px 0%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 30%, transparent 60%)`,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    setReflectionStyle({});
  };

  const items = [
    { id: null, label: "Home", icon: <Home className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "experience", label: "Experience", icon: <History className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "resume", label: "Resume", icon: <FileDown className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "certificates", label: "Certificates", icon: <Award className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "books", label: "Library", icon: <BookOpen className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "now", label: "Now", icon: <Clock className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "uses", label: "Uses", icon: <Monitor className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "contact", label: "Contact", icon: <Mail className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
    { id: "terminal", label: "Terminal", icon: <TerminalIcon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none px-2 sm:px-4 pb-[env(safe-area-inset-bottom)]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          delay: 0.4,
        }}
        className="relative flex items-end gap-1 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-3 rounded-[20px] sm:rounded-[24px] pointer-events-auto max-w-[calc(100vw-16px)] sm:max-w-full overflow-x-auto sm:overflow-visible shadow-[0_4px_12px_rgba(0,0,0,0.1),0_24px_48px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.4)]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Layer 1: Subtle Backdrop Blur */}
        <div className="absolute inset-0 rounded-[24px] backdrop-blur-[18px] -z-10" />
        
        {/* Layer 2: Low Opacity Frosted Tint */}
        <div className="absolute inset-0 rounded-[24px] bg-[#050505]/30 -z-10" />

        {/* Layer 3: Inner Light Diffusion */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-white/[0.04] to-transparent -z-10" />

        {/* Layer 4: Extremely Faint Noise Texture */}
        <div className="absolute inset-0 rounded-[24px] opacity-[0.012] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] -z-10" />

        {/* Layer 5: Soft Highlight Reflection (Mouse tracking) */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none -z-10 transition-opacity duration-200" style={reflectionStyle} />

        {/* Layer 6: Soft Multi-Layer Border (Outer border + Inner highlight) */}
        <div className="absolute inset-0 rounded-[24px] border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04),inset_0_-1px_1px_rgba(0,0,0,0.2)] pointer-events-none -z-10" />

        {items.map((item) => (
          <DockItem
            key={item.label}
            id={item.id}
            label={item.label}
            icon={item.icon}
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </div>
  );
}
export default Dock;
