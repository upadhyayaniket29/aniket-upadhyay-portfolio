import { Router } from "express";
import { ContentController } from "../controllers/contentController";
import { contactLimiter } from "../middlewares/rateLimiter";

const router = Router();

// Public read operations
router.get("/experience", ContentController.getExperiences);
router.get("/skills", ContentController.getSkills);
router.get("/books", ContentController.getBooks);
router.get("/inspirations", ContentController.getInspirations);
router.get("/quotes", ContentController.getQuotes);
router.get("/uses", ContentController.getUses);
router.get("/now", ContentController.getNow);
router.get("/seo", ContentController.getSEO);

// Public rate-limited submission
router.post("/contact", contactLimiter, ContentController.postContactMessage);

export default router;
