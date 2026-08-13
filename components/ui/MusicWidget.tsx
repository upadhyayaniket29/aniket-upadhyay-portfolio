"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Curated playlist – popular SoundCloud tracks for coding/focus
const PLAYLIST = [
  {
    title: "Hope",
    artist: "NEFFEX",
    url: "https://soundcloud.com/neffex/hope",
    color: "#f97316",
  },
  {
    title: "Rivalry",
    artist: "NEFFEX",
    url: "https://soundcloud.com/neffex/rivalry",
    color: "#fb923c",
  },
  {
    title: "Fight Back",
    artist: "NEFFEX",
    url: "https://soundcloud.com/neffex/fight-back",
    color: "#fbbf24",
  },
  {
    title: "Soldier",
    artist: "NEFFEX",
    url: "https://soundcloud.com/neffex/soldier",
    color: "#f97316",
  },
  {
    title: "Grateful",
    artist: "NEFFEX",
    url: "https://soundcloud.com/neffex/grateful",
    color: "#fb923c",
  },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SC: any;
  }
}

function WaveBar({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "18px" }}>
      {[0.7, 1, 0.4, 0.85, 0.55, 1, 0.3, 0.9].map((h, i) => (
        <div key={i} style={{
          width: "2px",
          borderRadius: "999px",
          background: active ? "#f97316" : "rgba(255,255,255,0.2)",
          height: `${h * 100}%`,
          ...(active ? {
            animationName: `waveB${i % 4}`,
            animationDuration: `${0.5 + i * 0.08}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          } : {}),
        }} />
      ))}
      <style>{`
        @keyframes waveB0{from{height:15%}to{height:100%}}
        @keyframes waveB1{from{height:35%}to{height:70%}}
        @keyframes waveB2{from{height:55%}to{height:30%}}
        @keyframes waveB3{from{height:20%}to{height:85%}}
      `}</style>
    </div>
  );
}

export default function MusicWidget() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<unknown>(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentTrack = PLAYLIST[trackIdx];

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  const loadTrack = useCallback((idx: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = widgetRef.current as any;
    if (!w) return;
    const encodedUrl = encodeURIComponent(PLAYLIST[idx].url);
    w.load(`https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23f97316&auto_play=true`, {
      callback: () => {
        setTrackIdx(idx);
        setIsPlaying(true);
        setProgress(0);
        setPosition(0);
      },
    });
  }, []);

  useEffect(() => {
    // Load SC Widget API script
    if (window.SC) {
      initWidget();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initWidget() {
    if (!iframeRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const widget = (window.SC as any).Widget(iframeRef.current);
    widgetRef.current = widget;

    widget.bind(window.SC.Widget.Events.READY, () => {
      setReady(true);
      widget.getDuration((d: number) => setDuration(d));
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
      widget.getDuration((d: number) => setDuration(d));
      progressInterval.current = setInterval(() => {
        widget.getPosition((p: number) => {
          setPosition(p);
          widget.getDuration((d: number) => {
            setDuration(d);
            setProgress(d > 0 ? (p / d) * 100 : 0);
          });
        });
      }, 500);
    });

    widget.bind(window.SC.Widget.Events.PAUSE, () => {
      setIsPlaying(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
    });

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      setIsPlaying(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
      // Auto next
      const next = (trackIdx + 1) % PLAYLIST.length;
      loadTrack(next);
    });
  }

  const togglePlay = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = widgetRef.current as any;
    if (!w || !ready) return;
    if (isPlaying) w.pause();
    else w.play();
  };

  const playNext = () => {
    const next = (trackIdx + 1) % PLAYLIST.length;
    loadTrack(next);
  };

  const playPrev = () => {
    const prev = (trackIdx - 1 + PLAYLIST.length) % PLAYLIST.length;
    loadTrack(prev);
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = widgetRef.current as any;
    if (!w || !ready || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    w.seekTo(pct * duration);
  };

  return (
    <>
      {/* Hidden SC iframe */}
      <iframe
        ref={iframeRef}
        id="sc-music-widget"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack.url)}&color=%23f97316&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
        allow="autoplay"
        style={{ width: 0, height: 0, border: "none", position: "absolute", visibility: "hidden" }}
      />

      {/* Music Player UI */}
      <div
        style={{
          position: "absolute",
          bottom: "90px",
          left: "28px",
          zIndex: 50,
          pointerEvents: "auto",
          width: expanded ? "280px" : "220px",
          transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: `1px solid ${isPlaying ? "rgba(249,115,22,0.35)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "20px",
            padding: "14px 16px",
            boxShadow: isPlaying
              ? "0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(249,115,22,0.12)"
              : "0 8px 40px rgba(0,0,0,0.65)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            {/* Music icon */}
            <div style={{
              width: "22px", height: "22px",
              borderRadius: "6px",
              background: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px",
            }}>
              ♫
            </div>
            <span style={{
              fontSize: "9px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              flex: 1,
            }}>
              NOW PLAYING
            </span>
            {/* Expand toggle */}
            <button
              onClick={() => setExpanded((e) => !e)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(255,255,255,0.3)", fontSize: "12px",
                padding: "2px 4px", lineHeight: 1,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {expanded ? "↙" : "↗"}
            </button>
          </div>

          {/* Track info + waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            {/* Animated art box */}
            <div style={{
              flexShrink: 0,
              width: "44px", height: "44px",
              borderRadius: "10px",
              background: `linear-gradient(135deg, rgba(249,115,22,0.25), rgba(0,0,0,0.5))`,
              border: "1px solid rgba(249,115,22,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
              boxShadow: isPlaying ? "0 0 16px rgba(249,115,22,0.25)" : "none",
              transition: "box-shadow 0.4s",
            }}>
              🎵
            </div>

            {/* Title + artist + waveform */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                margin: "0 0 2px",
                fontSize: "12px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.9)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {currentTrack.title}
              </p>
              <p style={{
                margin: "0 0 6px",
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {currentTrack.artist}
              </p>
              <WaveBar active={isPlaying} />
            </div>
          </div>

          {/* Progress bar (click to seek) */}
          <div
            onClick={seekTo}
            style={{
              height: "3px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.1)",
              marginBottom: "12px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              top: 0, left: 0,
              height: "100%",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #f97316, #fbbf24)",
              width: `${progress}%`,
              transition: "width 0.5s linear",
            }} />
          </div>

          {/* Time */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
              {formatTime(position)}
            </span>
            <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            {/* Prev */}
            <button onClick={playPrev} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1,
              transition: "color 0.2s, transform 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "scale(1.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = "scale(1)"; }}
            >⏮</button>

            {/* Play / Pause */}
            <button onClick={togglePlay} style={{
              width: "38px", height: "38px",
              borderRadius: "50%",
              background: isPlaying
                ? "linear-gradient(135deg, #f97316, #fbbf24)"
                : "rgba(249,115,22,0.2)",
              border: `1.5px solid ${isPlaying ? "transparent" : "rgba(249,115,22,0.4)"}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px",
              color: "white",
              boxShadow: isPlaying ? "0 0 20px rgba(249,115,22,0.5)" : "none",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            {/* Next */}
            <button onClick={playNext} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(255,255,255,0.5)", fontSize: "14px", lineHeight: 1,
              transition: "color 0.2s, transform 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "white"; e.currentTarget.style.transform = "scale(1.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.transform = "scale(1)"; }}
            >⏭</button>
          </div>

          {/* Playlist dots (expanded only) */}
          {expanded && (
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "6px" }} />
              {PLAYLIST.map((t, i) => (
                <button
                  key={i}
                  onClick={() => loadTrack(i)}
                  style={{
                    background: i === trackIdx ? "rgba(249,115,22,0.12)" : "none",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    textAlign: "left",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(249,115,22,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = i === trackIdx ? "rgba(249,115,22,0.12)" : "none"}
                >
                  <span style={{ fontSize: "9px", color: i === trackIdx ? "#f97316" : "rgba(255,255,255,0.3)", fontFamily: "monospace", width: "12px" }}>
                    {i === trackIdx && isPlaying ? "▶" : `${i + 1}`}
                  </span>
                  <span style={{ fontSize: "11px", color: i === trackIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)", fontWeight: i === trackIdx ? 600 : 400 }}>
                    {t.title}
                  </span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginLeft: "auto" }}>
                    {t.artist}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
