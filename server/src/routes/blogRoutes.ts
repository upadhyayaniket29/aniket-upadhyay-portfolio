import { Router } from "express";
import { BlogController } from "../controllers/blogController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", BlogController.getAll);
router.get("/:slug", BlogController.getBySlug);

// Admin-only routes
router.post("/", authMiddleware, BlogController.create);
router.put("/:id", authMiddleware, BlogController.update);
router.delete("/:id", authMiddleware, BlogController.delete);

export default router;
