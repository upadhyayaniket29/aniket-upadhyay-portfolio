"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbientSoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/ambience.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // Very low volume for ambience
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.play().catch(e => console.log("Audio play failed. Ensure ambience.mp3 exists in public/ directory:", e));
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-white/20 hover:bg-white/[0.08] transition-all cursor-pointer text-xs font-mono text-zinc-400 hover:text-white shadow-xl"
    >
      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
      <span className="hidden sm:inline uppercase tracking-widest">{isMuted ? "Ambient" : "Playing"}</span>
    </button>
  );
}
