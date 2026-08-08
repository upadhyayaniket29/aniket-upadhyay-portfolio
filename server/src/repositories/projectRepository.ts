import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

export class ProjectRepository {
  static async getAll() {
    return prisma.project.findMany({
      orderBy: { orderIndex: "asc" },
      include: {
        images: { orderBy: { orderIndex: "asc" } },
        technologies: { include: { technology: true } },
        tags: { include: { tag: true } },
      },
    });
  }

  static async getBySlug(slug: string) {
    return prisma.project.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { orderIndex: "asc" } },
        technologies: { include: { technology: true } },
        tags: { include: { tag: true } },
      },
    });
  }

  static async create(data: Prisma.ProjectCreateInput) {
    return prisma.project.create({
      data,
      include: {
        images: true,
        technologies: { include: { technology: true } },
        tags: { include: { tag: true } },
      },
    });
  }

  static async update(id: string, data: Prisma.ProjectUpdateInput) {
    return prisma.project.update({
      where: { id },
      data,
      include: {
        images: true,
        technologies: { include: { technology: true } },
        tags: { include: { tag: true } },
      },
    });
  }

  static async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    });
  }
}
