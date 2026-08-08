import { Router } from "express";
import { ProjectController } from "../controllers/projectController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Public routes
router.get("/", ProjectController.getAll);
router.get("/:slug", ProjectController.getBySlug);

// Admin-only routes
router.post("/", authMiddleware, ProjectController.create);
router.put("/:id", authMiddleware, ProjectController.update);
router.delete("/:id", authMiddleware, ProjectController.delete);

export default router;
