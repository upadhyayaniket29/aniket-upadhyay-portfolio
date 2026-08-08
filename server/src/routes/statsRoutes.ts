import { Router } from "express";
import { StatsController } from "../controllers/statsController";
import { apiLimiter } from "../middlewares/rateLimiter";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes (Rate limited to protect resources)
router.get("/github", apiLimiter, StatsController.getGitHub);
router.get("/leetcode", apiLimiter, StatsController.getLeetCode);
router.post("/visitor/log", apiLimiter, StatsController.logVisitor);
router.post("/ai/ask", apiLimiter, StatsController.askAI);

// Admin-only stats route
router.get("/visitor/stats", authMiddleware, StatsController.getVisitorStats);

export default router;
