import { Router } from "express";
import projectRoutes from "./projectRoutes";
import blogRoutes from "./blogRoutes";
import spotifyRoutes from "./spotifyRoutes";
import statsRoutes from "./statsRoutes";
import contentRoutes from "./contentRoutes";
import { AuthController } from "../controllers/authController";

const router = Router();

// Health check endpoint
router.get("/status", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Auth route
router.post("/auth/login", AuthController.login);


// Mounting domain routes
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/spotify", spotifyRoutes);
router.use("/stats", statsRoutes);
router.use("/", contentRoutes);

export default router;
