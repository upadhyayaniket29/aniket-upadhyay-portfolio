import { Request, Response, NextFunction } from "express";
import { ContentRepository } from "../repositories/contentRepository";
import { z } from "zod";

const contactMessageSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("A valid email address is required."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

export class ContentController {
  static async getExperiences(req: Request, res: Response, next: NextFunction) {
    try {
      const exp = await ContentRepository.getExperiences();
      res.json(exp);
    } catch (err) {
      next(err);
    }
  }

  static async getSkills(req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await ContentRepository.getSkills();
      res.json(skills);
    } catch (err) {
      next(err);
    }
  }

  static async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await ContentRepository.getBooks();
      res.json(books);
    } catch (err) {
      next(err);
    }
  }

  static async getInspirations(req: Request, res: Response, next: NextFunction) {
    try {
      const inspirations = await ContentRepository.getInspirations();
      res.json(inspirations);
    } catch (err) {
      next(err);
    }
  }

  static async getQuotes(req: Request, res: Response, next: NextFunction) {
    try {
      const quotes = await ContentRepository.getQuotes();
      res.json(quotes);
    } catch (err) {
      next(err);
    }
  }

  static async getUses(req: Request, res: Response, next: NextFunction) {
    try {
      const uses = await ContentRepository.getUses();
      res.json(uses);
    } catch (err) {
      next(err);
    }
  }

  static async getNow(req: Request, res: Response, next: NextFunction) {
    try {
      const now = await ContentRepository.getNow();
      res.json(now);
    } catch (err) {
      next(err);
    }
  }

  static async postContactMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = contactMessageSchema.parse(req.body);
      const message = await ContentRepository.createContactMessage(parsed);
      res.status(201).json({ success: true, data: message });
    } catch (err) {
      next(err);
    }
  }

  static async getSEO(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = req.query;
      if (!page || typeof page !== "string") {
        return res.status(400).json({ error: "Page route parameter is required." });
      }
      const seo = await ContentRepository.getSEO(page);
      res.json(seo);
    } catch (err) {
      next(err);
    }
  }
}
