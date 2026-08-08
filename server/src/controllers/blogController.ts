import { Request, Response, NextFunction } from "express";
import { BlogService } from "../services/blogService";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  coverImage: z.string().optional().nullable(),
  tags: z.string(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  readingTime: z.number().int().optional(),
});

export class BlogController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const publishedOnly = req.query.admin !== "true";
      const blogs = await BlogService.getAllBlogs(publishedOnly);
      res.json(blogs);
    } catch (err) {
      next(err);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = req.params.slug as string;
      const blog = await BlogService.getBlogBySlug(slug);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found." });
      }
      res.json(blog);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = blogSchema.parse(req.body);
      const blog = await BlogService.createBlog(parsed);
      res.status(201).json(blog);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const parsed = blogSchema.partial().parse(req.body);
      const blog = await BlogService.updateBlog(id, parsed);
      res.json(blog);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      await BlogService.deleteBlog(id);
      res.json({ success: true, message: "Blog deleted." });
    } catch (err) {
      next(err);
    }
  }
}
