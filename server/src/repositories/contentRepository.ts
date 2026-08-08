import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

export class ContentRepository {
  // Experience
  static async getExperiences() {
    return prisma.experience.findMany({
      orderBy: { orderIndex: "asc" },
    });
  }

  static async createExperience(data: Prisma.ExperienceCreateInput) {
    return prisma.experience.create({ data });
  }

  // Skills
  static async getSkills() {
    return prisma.skill.findMany({
      orderBy: { orderIndex: "asc" },
    });
  }

  static async createSkill(data: Prisma.SkillCreateInput) {
    return prisma.skill.create({ data });
  }

  // Books
  static async getBooks() {
    return prisma.book.findMany({
      include: {
        chapters: {
          orderBy: { orderIndex: "asc" },
        },
        bookmarks: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async createBook(data: Prisma.BookCreateInput) {
    return prisma.book.create({ data });
  }

  // Inspiration
  static async getInspirations() {
    return prisma.inspiration.findMany({
      orderBy: { orderIndex: "asc" },
    });
  }

  // Quotes
  static async getQuotes() {
    return prisma.quote.findMany({
      where: { active: true },
    });
  }

  // Uses
  static async getUses() {
    return prisma.uses.findMany({
      orderBy: { orderIndex: "asc" },
    });
  }

  // Now
  static async getNow() {
    return prisma.now.findFirst({
      orderBy: { updatedAt: "desc" },
    });
  }

  // Knowledge Base
  static async getKnowledgeBase(query?: string) {
    if (query) {
      // Basic keyword search inside database content/keywords
      return prisma.knowledgeBase.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { content: { contains: query } },
            { keywords: { contains: query } },
          ],
        },
        orderBy: { priority: "desc" },
      });
    }
    return prisma.knowledgeBase.findMany({
      orderBy: { priority: "desc" },
    });
  }

  // Contact Messages
  static async createContactMessage(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({ data });
  }

  static async getContactMessages() {
    return prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async markMessageRead(id: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  // SEO
  static async getSEO(page: string) {
    return prisma.sEO.findUnique({
      where: { page },
    });
  }

  static async createSEO(data: Prisma.SEOCreateInput) {
    return prisma.sEO.create({ data });
  }
}
