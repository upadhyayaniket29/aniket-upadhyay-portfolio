import { prisma } from "../config/database";
import { Prisma } from "@prisma/client";

export class StatsRepository {
  // GitHub stats cache operations
  static async getGitHubStats() {
    return prisma.gitHubStats.findUnique({
      where: { id: "github" },
    });
  }

  static async upsertGitHubStats(data: Prisma.GitHubStatsCreateInput) {
    return prisma.gitHubStats.upsert({
      where: { id: "github" },
      update: data,
      create: { ...data, id: "github" },
    });
  }

  // LeetCode stats cache operations
  static async getLeetCodeStats() {
    return prisma.leetCodeStats.findUnique({
      where: { id: "leetcode" },
    });
  }

  static async upsertLeetCodeStats(data: Prisma.LeetCodeStatsCreateInput) {
    return prisma.leetCodeStats.upsert({
      where: { id: "leetcode" },
      update: data,
      create: { ...data, id: "leetcode" },
    });
  }

  // Unique visitor operations
  static async getVisitorByHash(ipHash: string) {
    return prisma.visitor.findUnique({
      where: { ipHash },
    });
  }

  static async incrementVisitorCount(ipHash: string) {
    return prisma.visitor.upsert({
      where: { ipHash },
      update: {
        count: { increment: 1 },
        lastVisit: new Date(),
      },
      create: {
        ipHash,
        count: 1,
      },
    });
  }

  static async getTotalUniqueVisitors() {
    const aggregate = await prisma.visitor.aggregate({
      _sum: {
        count: true,
      },
      _count: {
        id: true,
      },
    });
    return {
      uniqueCount: aggregate._count.id || 0,
      totalHits: aggregate._sum.count || 0,
    };
  }
}
