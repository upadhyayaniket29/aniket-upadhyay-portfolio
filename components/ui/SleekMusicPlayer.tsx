"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const PLAYLIST = [
  { title: "Hope",       artist: "NEFFEX", url: "https://soundcloud.com/neffex/hope",       tag: "MOTIVATION" },
  { title: "Rivalry",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/rivalry",    tag: "ENERGY" },
  { title: "Fight Back",artist: "NEFFEX", url: "https://soundcloud.com/neffex/fight-back", tag: "GRIND" },
  { title: "Soldier",   artist: "NEFFEX", url: "https://soundcloud.com/neffex/soldier",    tag: "FOCUS" },
  { title: "Grateful",  artist: "NEFFEX", url: "https://soundcloud.com/neffex/grateful",   tag: "VIBE" },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SC: any;
  }
}

/* Equalizer Bars */
function Equalizer({ active }: { active: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2.5px", height: "16px" }}>
      {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.35, 0.95].map((h, i) => (
        <div
          key={i}
          style={{
            width: "2px",
            borderRadius: "999px",
            background: active ? "linear-gradient(to top, #f97316, #fbbf24)" : "rgba(255,255,255,0.2)",
            height: `${h * 100}%`,
            ...(active
              ? {
                  animationName: `equalizerAnim${i % 4}`,
                  animationDuration: `${0.45 + i * 0.07}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                }
              : {}),
          }}
        />
      ))}
      <style>{`
        @keyframes equalizerAnim0 { from { height: 20%; } to { height: 100%; } }
        @keyframes equalizerAnim1 { from { height: 45%; } to { height: 75%; } }
        @keyframes equalizerAnim2 { from { height: 65%; } to { height: 35%; } }
        @keyframes equalizerAnim3 { from { height: 25%; } to { height: 90%; } }
      `}</style>
    </div>
  );
}

export default function SleekMusicPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<unknown>(null);
  const progressIv = useRef<ReturnType<typeof setInterval> | null>(null);

  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(80);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      widget.setVolume(volume);
    });

    widget.bind(window.SC.Widget.Events.PLAY, () => {
      setIsPlaying(true);
      widget.getDuration((d: number) => setDuration(d));
      if (progressIv.current) clearInterval(progressIv.current);
      progressIv.current = setInterval(() => {
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
      if (progressIv.current) clearInterval(progressIv.current);
    });

    widget.bind(window.SC.Widget.Events.FINISH, () => {
      setIsPlaying(false);
      if (progressIv.current) clearInterval(progressIv.current);
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

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = widgetRef.current as any;
    if (w && ready) {
      try {
        w.setVolume(newVol);
      } catch {}
    }
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        id="sleek-music-sc"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack.url)}&color=%23f97316&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
        allow="autoplay"
        style={{ width: 0, height: 0, border: "none", position: "absolute", visibility: "hidden" }}
      />

      <style>{`
        @keyframes vinylRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Floating Modern Music Player Widget */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          left: "28px",
          zIndex: 9999,
          pointerEvents: "auto",
          width: expanded ? "300px" : "240px",
          transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          userSelect: "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: "rgba(10, 12, 18, 0.75)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: `1px solid ${
              isPlaying
                ? "rgba(249, 115, 22, 0.4)"
                : hovered
                ? "rgba(255, 255, 255, 0.18)"
                : "rgba(255, 255, 255, 0.1)"
            }`,
            borderRadius: "22px",
            padding: "16px",
            boxShadow: isPlaying
              ? "0 12px 48px rgba(0, 0, 0, 0.8), 0 0 32px rgba(249, 115, 22, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 12px 48px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: isPlaying ? "#f97316" : "rgba(255, 255, 255, 0.3)",
                boxShadow: isPlaying ? "0 0 10px rgba(249, 115, 22, 0.9)" : "none",
                display: "block",
                animation: isPlaying ? "pulseGlow 1.5s infinite" : "none",
              }}
            />
            <span
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.22em",
                color: isPlaying ? "#fb923c" : "rgba(255, 255, 255, 0.4)",
                textTransform: "uppercase",
              }}
            >
              SOUNDWAVE · {currentTrack.tag}
            </span>
            <button
              onClick={() => setExpanded((e) => !e)}
              style={{
                marginLeft: "auto",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "11px",
                width: "22px",
                height: "22px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(249, 115, 22, 0.2)";
                e.currentTarget.style.color = "#f97316";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
              }}
            >
              {expanded ? "↙" : "↗"}
            </button>
          </div>

          {/* Track Info & Vinyl Art */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            {/* Spinning Vinyl Disk */}
            <div
              style={{
                position: "relative",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #2a2a2a 0%, #111 60%, #050505 100%)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: isPlaying ? "0 0 16px rgba(249, 115, 22, 0.3)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                animation: isPlaying ? "vinylRotate 3s linear infinite" : "none",
              }}
            >
              {/* Inner Vinyl Grooves */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px dashed rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Center Label */}
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #f97316, #fbbf24)",
                    border: "1.5px solid #111",
                  }}
                />
              </div>
            </div>

            {/* Title, Artist, Equalizer */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "rgba(255, 255, 255, 0.95)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  letterSpacing: "-0.01em",
                }}
              >
                {currentTrack.title}
              </p>
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "10.5px",
                  color: "rgba(255, 255, 255, 0.45)",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {currentTrack.artist}
              </p>
              <Equalizer active={isPlaying} />
            </div>
          </div>

          {/* Progress Bar (Click to seek) */}
          <div
            onClick={seekTo}
            style={{
              height: "4px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.1)",
              marginBottom: "6px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                borderRadius: "999px",
                background: "linear-gradient(90deg, #f97316, #fbbf24)",
                width: `${progress}%`,
                transition: "width 0.4s linear",
              }}
            />
          </div>

          {/* Timestamps */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.35)", fontFamily: "monospace" }}>
              {formatTime(position)}
            </span>
            <span style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.35)", fontFamily: "monospace" }}>
              {formatTime(duration)}
            </span>
          </div>

          {/* Controls & Volume Slider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
            {/* Prev */}
            <button
              onClick={playPrev}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
            >
              ⏮
            </button>

            {/* Main Play / Pause Button */}
            <button
              onClick={togglePlay}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: isPlaying
                  ? "linear-gradient(135deg, #f97316, #fbbf24)"
                  : "rgba(249, 115, 22, 0.15)",
                border: `1.5px solid ${isPlaying ? "transparent" : "rgba(249, 115, 22, 0.4)"}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                color: "white",
                boxShadow: isPlaying ? "0 0 24px rgba(249, 115, 22, 0.6)" : "none",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            {/* Next */}
            <button
              onClick={playNext}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "14px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
            >
              ⏭
            </button>

            {/* Sleek Volume Slider */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "auto" }}>
              <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                style={{
                  width: "55px",
                  height: "3px",
                  accentColor: "#f97316",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Expandable Playlist Drawer */}
          {expanded && (
            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", marginBottom: "6px" }} />
              {PLAYLIST.map((t, i) => (
                <button
                  key={i}
                  onClick={() => loadTrack(i)}
                  style={{
                    background: i === trackIdx ? "rgba(249, 115, 22, 0.15)" : "transparent",
                    border: `1px solid ${i === trackIdx ? "rgba(249, 115, 22, 0.3)" : "transparent"}`,
                    borderRadius: "10px",
                    padding: "6px 10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "100%",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== trackIdx) e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (i !== trackIdx) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      color: i === trackIdx ? "#f97316" : "rgba(255, 255, 255, 0.3)",
                      fontFamily: "monospace",
                      width: "12px",
                    }}
                  >
                    {i === trackIdx && isPlaying ? "▶" : `${i + 1}`}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: i === trackIdx ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                      fontWeight: i === trackIdx ? 600 : 400,
                    }}
                  >
                    {t.title}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: "rgba(255, 255, 255, 0.3)",
                      fontFamily: "monospace",
                      marginLeft: "auto",
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {t.tag}
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
