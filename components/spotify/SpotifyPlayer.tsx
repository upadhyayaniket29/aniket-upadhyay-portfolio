"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, ExternalLink, Library, Disc } from "lucide-react";

export function SpotifyPlayer() {
  const [track, setTrack] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/spotify/now-playing");
        if (res.ok) {
          const data = await res.json();
          setTrack(data);
        }
      } catch (err) {
        console.error("Failed to load Spotify playing status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000); // Check status every 15 seconds
    return () => clearInterval(interval);
  }, []);

  const dummyPlaylists = [
    { name: "Focus Synthwave", count: "120 tracks", url: "https://open.spotify.com/playlist/37i9dQZF1DX8Ueb7mYrHGg" },
    { name: "Deep Focus Ambient", count: "85 tracks", url: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
    { name: "Coding Beats", count: "150 tracks", url: "https://open.spotify.com/playlist/37i9dQZF1DX5treJu4LIUr" },
  ];

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-5 rounded-2xl border border-white/5 bg-[#111111]/70 backdrop-blur-md animate-pulse h-[140px]" />
    );
  }

  const isPlaying = track?.isPlaying;

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-white/5 bg-[#111111]/60 backdrop-blur-md overflow-hidden relative glass-card p-5">
      {/* Background Ambient Glow */}
      {isPlaying && track?.albumArt && (
        <div
          className="absolute inset-0 opacity-15 filter blur-3xl pointer-events-none scale-125 transition-transform duration-1000"
          style={{
            backgroundImage: `url(${track.albumArt})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-4">
        {/* Animated Vinyl Disc Container */}
        <div className="relative w-16 h-16 flex-shrink-0">
          {isPlaying && track?.albumArt ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="w-full h-full rounded-full border-2 border-zinc-800 shadow-xl overflow-hidden relative flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={track.albumArt}
                alt={track.album || "Album Art"}
                className="w-full h-full object-cover"
              />
              <div className="absolute w-4 h-4 bg-[#050505] rounded-full border border-zinc-700 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full rounded-full bg-zinc-900/80 border border-white/5 flex items-center justify-center text-zinc-600 relative">
              <Disc className="w-8 h-8 animate-spin-slow" />
              <div className="absolute w-3 h-3 bg-[#111111] rounded-full" />
            </div>
          )}

          {/* Miniature Equalizer Waveform Overlay */}
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 flex gap-0.5 bg-[#eb6e00] px-1.5 py-1 rounded-full border border-black shadow-lg">
              <motion.div
                animate={{ height: [4, 10, 4] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                className="w-[2px] bg-white rounded-full"
              />
              <motion.div
                animate={{ height: [6, 14, 6] }}
                transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 }}
                className="w-[2px] bg-white rounded-full"
              />
              <motion.div
                animate={{ height: [4, 8, 4] }}
                transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.2 }}
                className="w-[2px] bg-white rounded-full"
              />
            </div>
          )}
        </div>

        {/* Track Title and Artist Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono mb-1">
            <Music className="w-3 h-3 text-[#eb6e00]" />
            <span>{isPlaying ? "CURRENTLY PLAYING" : "LAST PLAYED TRACK"}</span>
          </div>

          <h4 className="text-sm font-semibold text-white truncate font-sans">
            {track?.title || "Not Listening"}
          </h4>
          <p className="text-xs text-[#a1a1aa] truncate font-sans mt-0.5">
            {track?.artist || "Spotify Integration Active"}
          </p>

          {track?.spotifyUrl && (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors font-mono mt-2"
            >
              <span>Open on Spotify</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>

      {/* Coding Playlist targets */}
      <div className="mt-5 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono mb-3">
          <Library className="w-3.5 h-3.5" />
          <span>ANIKET&apos;S CODING PLAYLISTS</span>
        </div>
        <div className="space-y-2">
          {dummyPlaylists.map((playlist, i) => (
            <a
              key={i}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors text-xs text-zinc-300 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <Play className="w-3 h-3 text-[#eb6e00] fill-[#eb6e00]" />
                <span className="font-sans font-medium">{playlist.name}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">{playlist.count}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SpotifyPlayer;
