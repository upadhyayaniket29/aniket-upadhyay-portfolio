import { Request, Response, NextFunction } from "express";
import { SpotifyService } from "../services/spotifyService";

export class SpotifyController {
  static async getNowPlaying(req: Request, res: Response, next: NextFunction) {
    try {
      const nowPlaying = await SpotifyService.getNowPlaying();
      res.json(nowPlaying);
    } catch (err) {
      next(err);
    }
  }

  static getAuthUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const url = SpotifyService.getAuthUrl();
      if (!url) {
        return res.status(500).json({ error: "Spotify Client ID or Redirect URI not configured." });
      }
      res.json({ url });
    } catch (err) {
      next(err);
    }
  }

  static async handleCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      if (!code || typeof code !== "string") {
        return res.status(400).json({ error: "OAuth authorization code is required." });
      }

      await SpotifyService.linkSpotifyAccount(code);
      res.send(`
        <html>
          <body style="font-family: sans-serif; background: #050505; color: #fff; text-align: center; padding-top: 100px;">
            <h1 style="color: #22C55E;">Spotify Account Linked!</h1>
            <p>You can close this tab and return to your portfolio terminal.</p>
          </body>
        </html>
      `);
    } catch (err: any) {
      res.status(500).send(`
        <html>
          <body style="font-family: sans-serif; background: #050505; color: #fff; text-align: center; padding-top: 100px;">
            <h1 style="color: #EF4444;">Connection Failed</h1>
            <p>${err.message || err}</p>
          </body>
        </html>
      `);
    }
  }
}
