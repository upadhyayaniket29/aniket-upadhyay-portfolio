import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = "upadhyayaniket29";
  try {
    // Attempt fetching from public LeetCode stats API
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        return NextResponse.json({
          status: "success",
          username,
          totalSolved: data.totalSolved || 185,
          totalQuestions: data.totalQuestions || 3300,
          easySolved: data.easySolved || 72,
          totalEasy: data.totalEasy || 820,
          mediumSolved: data.mediumSolved || 98,
          totalMedium: data.totalMedium || 1700,
          hardSolved: data.hardSolved || 15,
          totalHard: data.totalHard || 750,
          acceptanceRate: data.acceptanceRate || 64.2,
          ranking: data.ranking || 142500,
          contributionPoints: data.contributionPoints || 450,
          submissionCalendar: data.submissionCalendar || {},
        });
      }
    }

    // Secondary attempt: direct LeetCode GraphQL endpoint
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
          }
        }
      }
    `;

    const gqlRes = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      cache: "no-store",
    });

    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const user = gqlData?.data?.matchedUser;
      if (user) {
        const acStats = user.submitStats?.acSubmissionNum || [];
        const total = acStats.find((s: any) => s.difficulty === "All")?.count || 185;
        const easy = acStats.find((s: any) => s.difficulty === "Easy")?.count || 72;
        const medium = acStats.find((s: any) => s.difficulty === "Medium")?.count || 98;
        const hard = acStats.find((s: any) => s.difficulty === "Hard")?.count || 15;

        return NextResponse.json({
          status: "success",
          username,
          totalSolved: total,
          totalQuestions: 3300,
          easySolved: easy,
          totalEasy: 820,
          mediumSolved: medium,
          totalMedium: 1700,
          hardSolved: hard,
          totalHard: 750,
          acceptanceRate: 64.2,
          ranking: user.profile?.ranking || 142500,
          contributionPoints: user.profile?.reputation || 450,
          submissionCalendar: {},
        });
      }
    }

    // Fallback response if LeetCode API is rate-limited
    return NextResponse.json({
      status: "fallback",
      username,
      totalSolved: 185,
      totalQuestions: 3300,
      easySolved: 72,
      totalEasy: 820,
      mediumSolved: 98,
      totalMedium: 1700,
      hardSolved: 15,
      totalHard: 750,
      acceptanceRate: 64.2,
      ranking: 142500,
      contributionPoints: 450,
      submissionCalendar: {},
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "fallback",
      username,
      totalSolved: 185,
      totalQuestions: 3300,
      easySolved: 72,
      totalEasy: 820,
      mediumSolved: 98,
      totalMedium: 1700,
      hardSolved: 15,
      totalHard: 750,
      acceptanceRate: 64.2,
      ranking: 142500,
      contributionPoints: 450,
      submissionCalendar: {},
    });
  }
}
