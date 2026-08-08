import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../services/projectService";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
  problem: z.string(),
  solution: z.string(),
  architecture: z.string(),
  github: z.string().url().optional().nullable(),
  demo: z.string().url().optional().nullable(),
  featuredImage: z.string(),
  mobileImage: z.string().optional().nullable(),
  desktopImage: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  orderIndex: z.number().int().optional(),
});

export class ProjectController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json(projects);
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const project = await ProjectService.getProjectBySlug(slug);
      if (!project) {
        return res.status(404).json({ error: "Project not found." });
      }
      res.json(project);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = projectSchema.parse(req.body);
      const project = await ProjectService.createProject(parsed);
      res.status(201).json(project);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsed = projectSchema.partial().parse(req.body);
      const project = await ProjectService.updateProject(id, parsed);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await ProjectService.deleteProject(id);
      res.json({ success: true, message: "Project deleted." });
    } catch (err) {
      next(err);
    }
  }
}
