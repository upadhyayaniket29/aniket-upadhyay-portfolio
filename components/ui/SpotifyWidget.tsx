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

// Animated waveform bars for "now playing" state
function WaveformBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "16px" }}>
      {[1, 0.5, 0.8, 0.4, 1, 0.6, 0.9].map((h, i) => (
        <div
          key={i}
          style={{
            width: "2.5px",
            borderRadius: "999px",
            background: "#1DB954",
            animation: `waveBar${i % 3} ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
            height: `${h * 100}%`,
          }}
        />
      ))}
      <style>{`
        @keyframes waveBar0 { from { height: 20%; } to { height: 100%; } }
        @keyframes waveBar1 { from { height: 40%; } to { height: 80%; } }
        @keyframes waveBar2 { from { height: 60%; } to { height: 40%; } }
      `}</style>
    </div>
  );
}

export default function SpotifyWidget() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json: SpotifyData = await res.json();
        setData(json);
      } catch {
        setData({ isPlaying: false, offline: true, track: null });
      }
    };
    fetch_();
    const interval = setInterval(fetch_, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  const { isPlaying, track } = data;

  return (
    <div
      style={{
        position: "absolute",
        left: "28px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        width: "260px",
        pointerEvents: "auto",
      }}
    >
      <a
        href={track?.url || "https://open.spotify.com"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.58)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "16px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
            cursor: "pointer",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(29,185,84,0.35)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.7), 0 0 20px rgba(29,185,84,0.1), inset 0 1px 0 rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)";
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            {/* Spotify logo SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              WHAT I AM HEARING
            </span>
            {/* Live dot if playing */}
            {isPlaying && (
              <span
                style={{
                  marginLeft: "auto",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#1DB954",
                  boxShadow: "0 0 8px rgba(29,185,84,0.9)",
                  display: "block",
                  animation: "pulse 1.5s infinite",
                }}
              />
            )}
          </div>

          {/* Track info */}
          {track ? (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {/* Album art */}
              <div
                style={{
                  flexShrink: 0,
                  width: "56px",
                  height: "56px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {track.albumArt && !imgError ? (
                  <img
                    src={track.albumArt}
                    alt={track.album}
                    onError={() => setImgError(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(29,185,84,0.5)">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                )}
              </div>

              {/* Text info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.92)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.3,
                    marginBottom: "4px",
                  }}
                >
                  {track.name}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.3,
                    fontFamily: "monospace",
                  }}
                >
                  {track.artist}
                </p>

                {/* Waveform if playing, else "Last played" */}
                <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  {isPlaying ? (
                    <>
                      <WaveformBars />
                      <span style={{ fontSize: "9px", color: "#1DB954", fontFamily: "monospace", letterSpacing: "0.1em" }}>NOW PLAYING</span>
                    </>
                  ) : (
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.1em" }}>LAST PLAYED</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(29,185,84,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(29,185,84,0.6)">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z"/>
                </svg>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>not playing</span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
