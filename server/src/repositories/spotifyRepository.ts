import { prisma } from "../config/database";

export class SpotifyRepository {
  static async getTokens() {
    return prisma.spotifyToken.findUnique({
      where: { id: "spotify" },
    });
  }

  static async saveTokens(accessToken: string, refreshToken: string, expiresAt: Date) {
    return prisma.spotifyToken.upsert({
      where: { id: "spotify" },
      update: {
        accessToken,
        refreshToken,
        expiresAt,
        updatedAt: new Date(),
      },
      create: {
        id: "spotify",
        accessToken,
        refreshToken,
        expiresAt,
      },
    });
  }
}
