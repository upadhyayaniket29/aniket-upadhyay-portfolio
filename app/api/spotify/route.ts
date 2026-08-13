import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN || "",
    }),
    next: { revalidate: 0 },
  });
  return res.json();
}

export async function GET() {
  // If no credentials configured, return offline
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return NextResponse.json({
      isPlaying: false,
      offline: true,
      track: {
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt: null,
        url: "https://open.spotify.com",
      },
    });
  }

  try {
    const { access_token } = await getAccessToken();

    // Try currently playing first
    const nowRes = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 },
    });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      if (data?.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          offline: false,
          track: {
            name: data.item.name,
            artist: data.item.artists.map((a: { name: string }) => a.name).join(", "),
            album: data.item.album.name,
            albumArt: data.item.album.images?.[0]?.url ?? null,
            url: data.item.external_urls.spotify,
          },
        });
      }
    }

    // Fallback: recently played
    const recentRes = await fetch(RECENTLY_PLAYED_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 0 },
    });

    if (recentRes.status === 200) {
      const recentData = await recentRes.json();
      const item = recentData?.items?.[0]?.track;
      if (item) {
        return NextResponse.json({
          isPlaying: false,
          offline: false,
          track: {
            name: item.name,
            artist: item.artists.map((a: { name: string }) => a.name).join(", "),
            album: item.album.name,
            albumArt: item.album.images?.[0]?.url ?? null,
            url: item.external_urls.spotify,
          },
        });
      }
    }

    return NextResponse.json({ isPlaying: false, offline: false, track: null });
  } catch {
    return NextResponse.json({ isPlaying: false, offline: true, track: null });
  }
}
