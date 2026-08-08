import { SpotifyRepository } from "../repositories/spotifyRepository";
import { Logger } from "../utils/logger";
import { Cache } from "../config/redis";

export class SpotifyService {
  private static SPOTIFY_API_URL = "https://api.spotify.com/v1";
  private static CACHE_KEY = "spotify:now-playing";
  private static CACHE_TTL = 10; // Cache Spotify status for 10 seconds

  static async getNowPlaying() {
    // 1. Check Cache first
    const cached = await Cache.get<any>(this.CACHE_KEY);
    if (cached) return cached;

    // 2. Load Tokens from database
    const tokenRecord = await SpotifyRepository.getTokens();
    if (!tokenRecord) {
      return { isPlaying: false, message: "Spotify not configured." };
    }

    let accessToken = tokenRecord.accessToken;
    const isExpired = new Date() > new Date(tokenRecord.expiresAt);

    if (isExpired) {
      Logger.info("Spotify access token expired. Refreshing...");
      const refreshed = await this.refreshAccessToken(tokenRecord.refreshToken);
      if (refreshed) {
        accessToken = refreshed.accessToken;
      } else {
        return { isPlaying: false, message: "Spotify token refresh failed." };
      }
    }

    try {
      // 3. Request currently playing
      let res = await fetch(`${this.SPOTIFY_API_URL}/me/player/currently-playing`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status === 204 || res.status > 400) {
        // Fallback to recently played
        Logger.info("Nothing currently playing on Spotify. Fetching last played...");
        const lastPlayed = await this.getLastPlayed(accessToken);
        await Cache.set(this.CACHE_KEY, lastPlayed, this.CACHE_TTL);
        return lastPlayed;
      }

      const data = await res.json();
      if (!data || !data.item) {
        const lastPlayed = await this.getLastPlayed(accessToken);
        await Cache.set(this.CACHE_KEY, lastPlayed, this.CACHE_TTL);
        return lastPlayed;
      }

      const result = {
        isPlaying: data.is_playing,
        title: data.item.name,
        artist: data.item.artists.map((a: any) => a.name).join(", "),
        album: data.item.album.name,
        albumArt: data.item.album.images[0]?.url || "",
        duration: data.item.duration_ms,
        progress: data.progress_ms,
        spotifyUrl: data.item.external_urls.spotify,
        updatedAt: new Date(),
      };

      // Cache result
      await Cache.set(this.CACHE_KEY, result, this.CACHE_TTL);
      return result;
    } catch (err) {
      Logger.error("Spotify API Currently Playing error:", err);
      return { isPlaying: false, message: "Error communicating with Spotify." };
    }
  }

  private static async getLastPlayed(accessToken: string) {
    try {
      const res = await fetch(`${this.SPOTIFY_API_URL}/me/player/recently-played?limit=1`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        return { isPlaying: false, message: "No recently played track available." };
      }

      const data = await res.json();
      const track = data.items?.[0]?.track;
      if (!track) {
        return { isPlaying: false, message: "No recently played track history." };
      }

      return {
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: any) => a.name).join(", "),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || "",
        duration: track.duration_ms,
        progress: 0,
        spotifyUrl: track.external_urls.spotify,
        lastPlayedAt: data.items[0].played_at,
        updatedAt: new Date(),
      };
    } catch (err) {
      Logger.error("Spotify API Recently Played error:", err);
      return { isPlaying: false, message: "Error retrieving recently played." };
    }
  }

  private static async refreshAccessToken(refreshToken: string) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      Logger.warn("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET.");
      return null;
    }

    try {
      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        Logger.error(`Spotify refresh request failed: ${res.status} - ${errorText}`);
        return null;
      }

      const data = await res.json();
      const expiresAt = new Date(Date.now() + data.expires_in * 1000);

      // Save refreshed tokens
      await SpotifyRepository.saveTokens(
        data.access_token,
        data.refresh_token || refreshToken, // Spotify might not return a new refresh token
        expiresAt
      );

      return {
        accessToken: data.access_token,
        expiresAt,
      };
    } catch (err) {
      Logger.error("Spotify Token Refresh Exception:", err);
      return null;
    }
  }

  // One-time OAuth helper to link a developer profile
  static getAuthUrl() {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    if (!clientId || !redirectUri) {
      return null;
    }
    const scopes = "user-read-currently-playing user-read-recently-played";
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  }

  static async linkSpotifyAccount(code: string) {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error("Missing Spotify Credentials in environment config.");
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to authenticate Spotify authorization code: ${errText}`);
    }

    const data = await res.json();
    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    await SpotifyRepository.saveTokens(data.access_token, data.refresh_token, expiresAt);
    Logger.info("Spotify account linked and stored successfully.");
    return { success: true };
  }
}
