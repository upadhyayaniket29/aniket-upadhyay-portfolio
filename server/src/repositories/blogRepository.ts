import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

export class BlogRepository {
  static async getAll(publishedOnly = true) {
    return prisma.blog.findMany({
      where: publishedOnly ? { published: true } : {},
      orderBy: { createdAt: "desc" },
    });
  }

  static async getBySlug(slug: string) {
    return prisma.blog.findUnique({
      where: { slug },
    });
  }

  static async create(data: Prisma.BlogCreateInput) {
    return prisma.blog.create({ data });
  }

  static async update(id: string, data: Prisma.BlogUpdateInput) {
    return prisma.blog.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.blog.delete({
      where: { id },
    });
  }
}
