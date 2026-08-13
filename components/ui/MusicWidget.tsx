"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const PLAYLIST = [
  { title: "Hope",       artist: "NEFFEX", url: "https://soundcloud.com/neffex/hope" },
  { title: "Rivalry",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/rivalry" },
  { title: "Fight Back",artist: "NEFFEX", url: "https://soundcloud.com/neffex/fight-back" },
  { title: "Soldier",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/soldier" },
  { title: "Grateful",  artist: "NEFFEX", url: "https://soundcloud.com/neffex/grateful" },
];

declare global { interface Window { SC: any; } }

export default function RetroRadioWidget() {
  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const widgetRef   = useRef<any>(null);
  const scrollTimer = useRef<any>(null);

  const [trackIdx,   setTrackIdx]   = useState(0);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [duration,   setDuration]   = useState(0);
  const [position,   setPosition]   = useState(0);
  const [ready,      setReady]      = useState(false);
  const [scrollX,    setScrollX]    = useState(0);
  const [hovered,    setHovered]    = useState(false);

  const track = PLAYLIST[trackIdx];

  /* ── scroll display text ── */
  useEffect(() => {
    if (!isPlaying) { setScrollX(0); return; }
    const label = `${track.title}  ·  ${track.artist}  ★  `;
    const charW  = 8;
    const total  = label.length * charW;
    scrollTimer.current = setInterval(() => {
      setScrollX(x => (x + 1) % total);
    }, 60);
    return () => clearInterval(scrollTimer.current);
  }, [isPlaying, trackIdx]);

  const loadTrack = useCallback((idx: number) => {
    const w = widgetRef.current;
    if (!w) return;
    w.load(`https://w.soundcloud.com/player/?url=${encodeURIComponent(PLAYLIST[idx].url)}&color=%23f97316&auto_play=true`, {
      callback: () => { setTrackIdx(idx); setIsPlaying(true); setProgress(0); setPosition(0); },
    });
  }, []);

  useEffect(() => {
    const init = () => {
      if (!iframeRef.current) return;
      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;
      widget.bind(window.SC.Widget.Events.READY, () => {
        setReady(true);
        widget.getDuration((d: number) => setDuration(d));
      });
      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
        widget.getDuration((d: number) => setDuration(d));
        const iv = setInterval(() => {
          widget.getPosition((p: number) => {
            setPosition(p);
            widget.getDuration((d: number) => { setDuration(d); setProgress(d > 0 ? (p/d)*100 : 0); });
          });
        }, 500);
        (widgetRef.current as any)._iv = iv;
      });
      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
        clearInterval((widgetRef.current as any)?._iv);
      });
      widget.bind(window.SC.Widget.Events.FINISH, () => {
        setIsPlaying(false);
        clearInterval((widgetRef.current as any)?._iv);
        loadTrack((trackIdx + 1) % PLAYLIST.length);
      });
    };
    if (window.SC) { init(); return; }
    const s = document.createElement("script");
    s.src = "https://w.soundcloud.com/player/api.js";
    s.async = true; s.onload = init;
    document.body.appendChild(s);
  }, []);

  const togglePlay = () => {
    const w = widgetRef.current;
    if (!w || !ready) return;
    isPlaying ? w.pause() : w.play();
  };

  const fmt = (ms: number) => {
    const s = Math.floor(ms/1000);
    return `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  };

  /* ── display label marquee ── */
  const label = `${track.title}  ·  ${track.artist}  ★  `.repeat(3);

  return (
    <>
      <iframe ref={iframeRef} id="retro-radio-sc"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23f97316&auto_play=false`}
        allow="autoplay"
        style={{ width:0, height:0, border:"none", position:"absolute", visibility:"hidden" }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Orbitron:wght@700&display=swap');

        @keyframes spin  { from { transform:rotate(0deg);   } to { transform:rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:.7; } 50% { opacity:1; } }
        @keyframes glow  { 0%,100% { box-shadow:0 0 8px #f97316; } 50% { box-shadow:0 0 22px #fbbf24; } }
        @keyframes needleBob { 0%,100% { transform:rotate(-18deg); } 50% { transform:rotate(-10deg); } }

        .retro-radio { font-family:'VT323',monospace; user-select:none; }

        .vinyl {
          border-radius:50%;
          background: repeating-radial-gradient(circle, #1a1a1a 0px, #111 3px, #222 4px, #111 5px);
          position:relative; overflow:hidden;
        }
        .vinyl::after {
          content:''; position:absolute; inset:30%;
          border-radius:50%;
          background: radial-gradient(circle, #f97316 0%, #78350f 60%, #1a1a1a 100%);
        }
        .grille-ring {
          border-radius:50%;
          border:1.5px solid rgba(251,191,36,0.25);
          position:absolute;
        }
        .knob {
          border-radius:50%;
          background: radial-gradient(circle at 35% 30%, #d97706, #78350f, #1c1008);
          box-shadow: 0 3px 10px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15);
          cursor:pointer;
          transition: transform 0.2s;
        }
        .knob:hover { transform:scale(1.12) rotate(15deg); }

        .freq-display {
          background:#0a0500;
          border:1px solid rgba(249,115,22,0.4);
          border-radius:4px;
          font-family:'VT323',monospace;
          color:#f97316;
          overflow:hidden;
          position:relative;
          box-shadow: inset 0 0 12px rgba(249,115,22,0.15), 0 0 8px rgba(249,115,22,0.2);
        }
        .freq-display::before {
          content:'';
          position:absolute; inset:0;
          background: repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px);
          pointer-events:none; z-index:1;
        }
        .freq-text {
          white-space:nowrap;
          display:inline-block;
          animation: none;
        }
        .progress-track {
          height:4px; border-radius:999px;
          background: rgba(255,255,255,0.08);
          cursor:pointer; overflow:hidden;
        }
        .progress-fill {
          height:100%; border-radius:999px;
          background: linear-gradient(90deg,#f97316,#fbbf24);
          transition: width 0.4s linear;
        }
        .play-btn {
          border-radius:50%;
          background: radial-gradient(circle at 38% 32%, #f97316, #c2410c, #7c2d12);
          border: 2.5px solid rgba(251,191,36,0.5);
          cursor:pointer;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.5), 0 4px 16px rgba(249,115,22,0.4);
          display:flex; align-items:center; justify-content:center;
          transition: all 0.25s;
        }
        .play-btn:hover { transform:scale(1.08); box-shadow:0 0 0 3px rgba(0,0,0,0.5), 0 0 28px rgba(249,115,22,0.6); }
        .nav-btn {
          background: radial-gradient(circle at 35% 30%, #d97706, #78350f);
          border:1px solid rgba(251,191,36,0.3);
          border-radius:6px;
          cursor:pointer; color:#fbbf24;
          font-size:10px; font-weight:700;
          padding:4px 8px;
          box-shadow:0 2px 6px rgba(0,0,0,0.5);
          transition: all 0.2s;
        }
        .nav-btn:hover { filter:brightness(1.3); transform:translateY(-1px); }
      `}</style>

      {/* ═══════════  RETRO RADIO CABINET  ═══════════ */}
      <div
        className="retro-radio"
        style={{
          position:"fixed",
          bottom:"90px",
          left:"24px",
          zIndex:9999,
          width:"300px",
          background: "linear-gradient(145deg, #3b1e08, #1c0d02, #2d1505, #1a0900)",
          borderRadius:"18px 18px 14px 14px",
          border:"2px solid rgba(251,191,36,0.3)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(251,191,36,0.3), 0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(249,115,22,0.15)"
            : "0 0 0 1px rgba(120,53,15,0.6), 0 16px 50px rgba(0,0,0,0.85)",
          padding:"0",
          overflow:"hidden",
          transition:"box-shadow 0.3s",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Wood grain texture overlay ── */}
        <div style={{
          position:"absolute", inset:0,
          background: "repeating-linear-gradient(82deg, transparent 0px, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
          pointerEvents:"none", borderRadius:"inherit",
        }}/>

        {/* ── Top brand bar ── */}
        <div style={{
          background:"linear-gradient(90deg,rgba(249,115,22,0.12),rgba(251,191,36,0.18),rgba(249,115,22,0.12))",
          borderBottom:"1px solid rgba(251,191,36,0.25)",
          padding:"8px 16px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
        }}>
          <div>
            <div style={{ fontSize:"9px", letterSpacing:"0.35em", color:"rgba(251,191,36,0.55)", marginBottom:"1px" }}>RETRO</div>
            <div style={{ fontSize:"22px", letterSpacing:"0.15em", color:"#fbbf24", lineHeight:1, textShadow:"0 0 12px rgba(251,191,36,0.7)" }}>FM RADIO</div>
          </div>
          {/* Antenna */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
            <div style={{ width:"2px", height:"28px", background:"linear-gradient(to top,#d97706,#fbbf24)", borderRadius:"2px", boxShadow:"0 0 6px rgba(251,191,36,0.4)" }} />
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#fbbf24", boxShadow:"0 0 8px rgba(251,191,36,0.8)", animation: isPlaying ? "pulse 1.2s infinite" : "none" }} />
          </div>
        </div>

        {/* ── Main body ── */}
        <div style={{ padding:"12px 14px", display:"flex", gap:"12px", alignItems:"center" }}>

          {/* LEFT: Vinyl record */}
          <div style={{ position:"relative", flexShrink:0, width:"80px", height:"80px" }}>
            {/* Record */}
            <div className="vinyl" style={{
              width:"80px", height:"80px",
              animation: isPlaying ? "spin 3s linear infinite" : "none",
            }}/>
            {/* Needle arm */}
            <div style={{
              position:"absolute",
              top:"-4px", right:"-8px",
              width:"30px", height:"2px",
              background:"linear-gradient(90deg,#d97706,#fbbf24)",
              borderRadius:"2px",
              transformOrigin:"100% 50%",
              animation: isPlaying ? "needleBob 2s ease-in-out infinite" : "none",
              transform: isPlaying ? "rotate(-10deg)" : "rotate(-18deg)",
              transition:"transform 0.5s",
              boxShadow:"0 0 6px rgba(251,191,36,0.5)",
            }}>
              <div style={{ position:"absolute", right:"-4px", top:"-4px", width:"8px", height:"8px", borderRadius:"50%", background:"#f97316", boxShadow:"0 0 8px rgba(249,115,22,0.9)" }} />
            </div>
          </div>

          {/* RIGHT: Speaker grille */}
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ position:"relative", width:"90px", height:"80px", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {/* Grille circles */}
              {[90, 72, 54, 36, 18].map((d, i) => (
                <div key={i} className="grille-ring" style={{
                  width:`${d}px`, height:`${d}%`,
                  top:`${(100 - d)/2}%`, left:`${(90 - d)/2}px`,
                  opacity: isPlaying ? 1 : 0.4,
                  animation: isPlaying ? `pulse ${1 + i * 0.2}s infinite` : "none",
                }}/>
              ))}
              {/* Grille dot center */}
              <div style={{
                width:"18px", height:"18px", borderRadius:"50%",
                background: isPlaying
                  ? "radial-gradient(circle,#fbbf24,#f97316)"
                  : "radial-gradient(circle,#78350f,#1c0d02)",
                boxShadow: isPlaying ? "0 0 16px rgba(249,115,22,0.8)" : "none",
                animation: isPlaying ? "glow 1.5s infinite" : "none",
                transition:"all 0.4s",
                position:"absolute",
              }}/>
              {/* Grille lines */}
              {[0,30,60,90,120,150].map(angle => (
                <div key={angle} style={{
                  position:"absolute",
                  width:"88px", height:"1px",
                  background:"rgba(251,191,36,0.12)",
                  transform:`rotate(${angle}deg)`,
                  pointerEvents:"none",
                }}/>
              ))}
            </div>
          </div>
        </div>

        {/* ── Frequency / marquee display ── */}
        <div style={{ padding:"0 14px 10px" }}>
          <div className="freq-display" style={{ height:"28px", padding:"4px 8px" }}>
            <div className="freq-text" style={{
              fontSize:"18px", lineHeight:"20px",
              transform:`translateX(-${scrollX}px)`,
              color: isPlaying ? "#fbbf24" : "#f97316",
              textShadow: isPlaying ? "0 0 8px rgba(251,191,36,0.8)" : "none",
            }}>
              {isPlaying
                ? label
                : "◈ CLICK PLAY ◈ SELECT A TRACK ◈ ENJOY THE VIBE ◈"}
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div style={{ padding:"0 14px 8px", display:"flex", flexDirection:"column", gap:"4px" }}>
          <div className="progress-track" onClick={(e) => {
            const w = widgetRef.current;
            if (!w || !ready || duration === 0) return;
            const rect = e.currentTarget.getBoundingClientRect();
            w.seekTo(((e.clientX - rect.left) / rect.width) * duration);
          }}>
            <div className="progress-fill" style={{ width:`${progress}%` }}/>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:"11px", color:"rgba(251,191,36,0.4)", fontFamily:"VT323,monospace" }}>{fmt(position)}</span>
            <span style={{ fontSize:"11px", color:"rgba(251,191,36,0.4)", fontFamily:"VT323,monospace" }}>{fmt(duration)}</span>
          </div>
        </div>

        {/* ── Controls row ── */}
        <div style={{
          padding:"8px 14px 12px",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          borderTop:"1px solid rgba(251,191,36,0.1)",
          background:"rgba(0,0,0,0.3)",
        }}>
          {/* Left knob (decorative) */}
          <div className="knob" style={{ width:"28px", height:"28px" }}>
            <div style={{ width:"2px", height:"8px", background:"#fbbf24", margin:"4px auto 0", borderRadius:"1px", opacity:0.7 }}/>
          </div>

          {/* Prev + Play + Next */}
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <button className="nav-btn" onClick={() => loadTrack((trackIdx - 1 + PLAYLIST.length) % PLAYLIST.length)}>◀◀</button>

            <button className="play-btn" style={{ width:"46px", height:"46px" }} onClick={togglePlay}>
              <span style={{ fontSize:"18px", lineHeight:1, color:"white", marginLeft: isPlaying ? 0 : "3px" }}>
                {isPlaying ? "⏸" : "▶"}
              </span>
            </button>

            <button className="nav-btn" onClick={() => loadTrack((trackIdx + 1) % PLAYLIST.length)}>▶▶</button>
          </div>

          {/* Right knob (decorative) */}
          <div className="knob" style={{ width:"28px", height:"28px" }}>
            <div style={{ width:"2px", height:"8px", background:"#fbbf24", margin:"4px auto 0", borderRadius:"1px", opacity:0.7, transform:"rotate(45deg)" }}/>
          </div>
        </div>

        {/* ── Playlist strip ── */}
        <div style={{
          borderTop:"1px solid rgba(251,191,36,0.1)",
          background:"rgba(0,0,0,0.5)",
          padding:"6px 10px",
          display:"flex", gap:"6px", overflowX:"auto",
          scrollbarWidth:"none",
        }}>
          {PLAYLIST.map((t, i) => (
            <button key={i} onClick={() => loadTrack(i)} style={{
              flexShrink:0,
              background: i === trackIdx ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.04)",
              border:`1px solid ${i === trackIdx ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.08)"}`,
              borderRadius:"8px",
              padding:"4px 10px",
              color: i === trackIdx ? "#fbbf24" : "rgba(255,255,255,0.35)",
              fontSize:"11px",
              fontFamily:"VT323,monospace",
              cursor:"pointer",
              letterSpacing:"0.05em",
              transition:"all 0.2s",
              whiteSpace:"nowrap",
            }}>
              {i === trackIdx && isPlaying ? "▶ " : ""}{t.title}
            </button>
          ))}
        </div>

        {/* ── Bottom feet ── */}
        <div style={{ display:"flex", justifyContent:"space-between", padding:"4px 20px 0", background:"rgba(0,0,0,0.4)" }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width:"12px", height:"6px", background:"linear-gradient(to bottom,#1c0d02,#0a0500)", borderRadius:"0 0 4px 4px", border:"1px solid rgba(251,191,36,0.15)" }}/>
          ))}
        </div>
      </div>
    </>
  );
}
