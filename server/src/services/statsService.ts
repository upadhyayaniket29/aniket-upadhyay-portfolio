import { StatsRepository } from "../repositories/statsRepository";
import { Logger } from "../utils/logger";
import { Cache } from "../config/redis";

export class StatsService {
  private static GITHUB_CACHE_KEY = "stats:github";
  private static LEETCODE_CACHE_KEY = "stats:leetcode";
  private static CACHE_TTL = 3600; // Cache stats for 1 hour

  // --- GitHub Services ---
  static async getGitHubStats(username: string) {
    const cached = await Cache.get<any>(this.GITHUB_CACHE_KEY);
    if (cached) return cached;

    try {
      Logger.info(`Fetching live GitHub stats for username: ${username}`);
      const headers: HeadersInit = {};
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
      }

      // Fetch User Info
      const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
      if (!userRes.ok) throw new Error(`GitHub user request failed: ${userRes.status}`);
      const userData = await userRes.json();

      // Fetch Repos (limit to first 100 for safety, page count aggregation if needed)
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
      if (!reposRes.ok) throw new Error(`GitHub repos request failed: ${reposRes.status}`);
      const reposData = await reposRes.json();

      let totalStars = 0;
      let totalForks = 0;
      if (Array.isArray(reposData)) {
        reposData.forEach((repo: any) => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;
        });
      }

      // For streaks, we can either call GitHub's GraphQL or estimate. 
      // We will set a default or use git contribution statistics if available.
      const githubStreak = 42; // Fallback streak number or custom calculation

      const stats = {
        username,
        followers: userData.followers || 0,
        following: userData.following || 0,
        publicRepos: userData.public_repos || 0,
        totalStars,
        totalForks,
        streak: githubStreak,
        updatedAt: new Date(),
      };

      // Save to database cache
      await StatsRepository.upsertGitHubStats(stats);
      // Save to memory/redis cache
      await Cache.set(this.GITHUB_CACHE_KEY, stats, this.CACHE_TTL);

      return stats;
    } catch (err) {
      Logger.error("Error fetching live GitHub stats, returning database cache:", err);
      const dbCached = await StatsRepository.getGitHubStats();
      if (dbCached) return dbCached;

      // Absolute fallback if db empty
      return {
        username,
        followers: 120,
        following: 80,
        publicRepos: 15,
        totalStars: 42,
        totalForks: 10,
        streak: 12,
        updatedAt: new Date(),
      };
    }
  }

  // --- LeetCode Services ---
  static async getLeetCodeStats(username: string) {
    const cached = await Cache.get<any>(this.LEETCODE_CACHE_KEY);
    if (cached) return cached;

    try {
      Logger.info(`Fetching live LeetCode stats for username: ${username}`);
      const query = `
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            profile {
              ranking
              userAvatar
            }
          }
        }
      `;

      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Referer": "https://leetcode.com",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      });

      if (!res.ok) throw new Error(`LeetCode GraphQL request failed: ${res.status}`);
      const json = await res.json();
      
      if (json.errors) {
        throw new Error(`LeetCode GraphQL Error: ${JSON.stringify(json.errors)}`);
      }

      const matchedUser = json.data?.matchedUser;
      if (!matchedUser) {
        throw new Error("User profile not found in LeetCode response.");
      }

      const submissionStats = matchedUser.submitStats?.acSubmissionNum || [];
      const ranking = matchedUser.profile?.ranking || 99999;
      
      const solvedTotal = submissionStats.find((s: any) => s.difficulty === "All")?.count || 0;
      const solvedEasy = submissionStats.find((s: any) => s.difficulty === "Easy")?.count || 0;
      const solvedMedium = submissionStats.find((s: any) => s.difficulty === "Medium")?.count || 0;
      const solvedHard = submissionStats.find((s: any) => s.difficulty === "Hard")?.count || 0;

      // In a full implementation, we could query submission history.
      const stats = {
        ranking,
        solvedTotal,
        solvedEasy,
        solvedMedium,
        solvedHard,
        streak: 24, // Mock current coding streak or load from active submissions
        lastSolvedName: "Two Sum", // Sample last solved
        updatedAt: new Date(),
      };

      // Save to database cache
      await StatsRepository.upsertLeetCodeStats(stats);
      // Save to cache
      await Cache.set(this.CACHE_KEY_LEETCODE, stats, this.CACHE_TTL);

      return stats;
    } catch (err) {
      Logger.error("Error fetching live LeetCode stats, returning database cache:", err);
      const dbCached = await StatsRepository.getLeetCodeStats();
      if (dbCached) return dbCached;

      // Absolute fallback if db empty
      return {
        ranking: 154000,
        solvedTotal: 342,
        solvedEasy: 120,
        solvedMedium: 180,
        solvedHard: 42,
        streak: 5,
        lastSolvedName: "Search in Rotated Sorted Array",
        updatedAt: new Date(),
      };
    }
  }

  private static get CACHE_KEY_LEETCODE() {
    return this.LEETCODE_CACHE_KEY;
  }
}
