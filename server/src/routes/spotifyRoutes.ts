import { Router } from "express";
import { SpotifyController } from "../controllers/spotifyController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/now-playing", SpotifyController.getNowPlaying);
router.get("/callback", SpotifyController.handleCallback);

// Admin-only setup routes
router.get("/auth-url", authMiddleware, SpotifyController.getAuthUrl);

export default router;
