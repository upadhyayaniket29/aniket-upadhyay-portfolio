"use client";

import { useState, useEffect } from "react";

interface SpotifyData {
  isPlaying: boolean;
  offline: boolean;
  track: {
    name: string;
    artist: string;
    album: string;
    albumArt: string | null;
    url: string;
  } | null;
}

const FALLBACK: SpotifyData = {
  isPlaying: false,
  offline: true,
  track: null,
};

function SpotifyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  );
}

function WaveformBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "14px" }}>
      {[0.6, 1, 0.5, 0.9, 0.7, 1, 0.4].map((h, i) => (
        <div key={i} style={{
          width: "2.5px",
          borderRadius: "999px",
          background: "#1DB954",
          height: `${h * 100}%`,
          animationName: `wave${i % 4}`,
          animationDuration: `${0.55 + i * 0.1}s`,
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
        }} />
      ))}
      <style>{`
        @keyframes wave0{from{height:15%}to{height:100%}}
        @keyframes wave1{from{height:40%}to{height:70%}}
        @keyframes wave2{from{height:60%}to{height:30%}}
        @keyframes wave3{from{height:20%}to{height:90%}}
      `}</style>
    </div>
  );
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData>(FALLBACK);
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/spotify");
        if (res.ok) {
          const json: SpotifyData = await res.json();
          setData(json);
        }
      } catch {
        // keep fallback
      }
    };
    load();
    const t = setInterval(load, 30000);
    return () => clearInterval(t);
  }, []);

  const { isPlaying, track } = data;

  return (
    <div style={{
      position: "absolute",
      left: "28px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 50,
      width: "252px",
      pointerEvents: "auto",
    }}>
      <a
        href={track?.url || "https://open.spotify.com"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{
          background: "rgba(0,0,0,0.60)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: `1px solid ${hovered ? "rgba(29,185,84,0.4)" : "rgba(255,255,255,0.09)"}`,
          borderRadius: "18px",
          padding: "15px 16px",
          boxShadow: hovered
            ? "0 8px 40px rgba(0,0,0,0.7), 0 0 24px rgba(29,185,84,0.12)"
            : "0 8px 40px rgba(0,0,0,0.65)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "12px" }}>
            <SpotifyIcon size={15} />
            <span style={{
              fontSize: "9px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.45)",
              textTransform: "uppercase",
            }}>
              WHAT I AM HEARING
            </span>
            {isPlaying && (
              <span style={{
                marginLeft: "auto",
                width: "7px", height: "7px",
                borderRadius: "50%",
                background: "#1DB954",
                boxShadow: "0 0 8px rgba(29,185,84,0.9)",
                flexShrink: 0,
                animation: "pulse 1.5s ease-in-out infinite",
              }} />
            )}
          </div>

          {/* Track or empty state */}
          {track ? (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Album art */}
              <div style={{
                flexShrink: 0,
                width: "54px", height: "54px",
                borderRadius: "10px",
                overflow: "hidden",
                background: "rgba(29,185,84,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {track.albumArt && !imgError ? (
                  <img
                    src={track.albumArt}
                    alt="album"
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <SpotifyIcon size={22} />
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: "0 0 3px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.92)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.3,
                }}>
                  {track.name}
                </p>
                <p style={{
                  margin: "0 0 8px",
                  fontSize: "10.5px",
                  color: "rgba(255,255,255,0.4)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "monospace",
                  lineHeight: 1.3,
                }}>
                  {track.artist}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {isPlaying ? (
                    <>
                      <WaveformBars />
                      <span style={{ fontSize: "8.5px", color: "#1DB954", fontFamily: "monospace", letterSpacing: "0.12em" }}>LIVE</span>
                    </>
                  ) : (
                    <span style={{ fontSize: "8.5px", color: "rgba(255,255,255,0.28)", fontFamily: "monospace", letterSpacing: "0.12em" }}>LAST PLAYED</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Empty / not playing */
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "38px", height: "38px",
                borderRadius: "9px",
                background: "rgba(29,185,84,0.07)",
                border: "1px solid rgba(29,185,84,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SpotifyIcon size={18} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>not playing</p>
                <p style={{ margin: 0, fontSize: "9px", color: "rgba(255,255,255,0.2)", fontFamily: "monospace", letterSpacing: "0.08em" }}>SPOTIFY</p>
              </div>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
