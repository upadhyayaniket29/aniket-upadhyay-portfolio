import { BlogRepository } from "../repositories/blogRepository";

export class BlogService {
  static async getAllBlogs(publishedOnly = true) {
    return BlogRepository.getAll(publishedOnly);
  }

  static async getBlogBySlug(slug: string) {
    return BlogRepository.getBySlug(slug);
  }

  static async createBlog(data: any) {
    return BlogRepository.create(data);
  }

  static async updateBlog(id: string, data: any) {
    return BlogRepository.update(id, data);
  }

  static async deleteBlog(id: string) {
    return BlogRepository.delete(id);
  }
}
