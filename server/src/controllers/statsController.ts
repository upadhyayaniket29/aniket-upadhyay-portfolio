import { Request, Response, NextFunction } from "express";
import { StatsService } from "../services/statsService";
import { StatsRepository } from "../repositories/statsRepository";
import { AIService } from "../services/aiService";
import crypto from "crypto";

export class StatsController {
  static async getGitHub(req: Request, res: Response, next: NextFunction) {
    try {
      const username = (req.query.username as string) || "alex-mercer";
      const stats = await StatsService.getGitHubStats(username);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  static async getLeetCode(req: Request, res: Response, next: NextFunction) {
    try {
      const username = (req.query.username as string) || "alex-mercer";
      const stats = await StatsService.getLeetCodeStats(username);
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  static async logVisitor(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip || req.socket.remoteAddress || "anonymous";
      // Hash IP to protect privacy in compliance with privacy regulations
      const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

      const stats = await StatsRepository.incrementVisitorCount(ipHash);
      const total = await StatsRepository.getTotalUniqueVisitors();

      res.json({
        success: true,
        visitorHits: stats.count,
        uniqueCount: total.uniqueCount,
        totalHits: total.totalHits,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getVisitorStats(req: Request, res: Response, next: NextFunction) {
    try {
      const total = await StatsRepository.getTotalUniqueVisitors();
      res.json(total);
    } catch (err) {
      next(err);
    }
  }

  static async askAI(req: Request, res: Response, next: NextFunction) {
    try {
      const { question } = req.body;
      if (!question || typeof question !== "string") {
        return res.status(400).json({ error: "A question string is required." });
      }

      const answer = await AIService.askQuestion(question);
      res.json({ question, answer });
    } catch (err) {
      next(err);
    }
  }
}
