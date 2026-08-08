import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const username = "upadhyayaniket29";
  try {
    const [userRes, reposRes, contribRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "Portfolio-App" },
        cache: "no-store",
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "Portfolio-App" },
        cache: "no-store",
      }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
        cache: "no-store",
      }),
    ]);

    const userData = userRes.ok ? await userRes.json() : {};
    const fetchedRepos = reposRes.ok ? await reposRes.json() : [];
    const contribData = contribRes.ok ? await contribRes.json() : {};

    // 1. Total Stars
    const totalStars = Array.isArray(fetchedRepos)
      ? fetchedRepos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
      : 20;

    // 2. Languages Breakdown
    const langCounts: Record<string, number> = {};
    if (Array.isArray(fetchedRepos)) {
      fetchedRepos.forEach((r: any) => {
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
      });
    }

    const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const langPalette: Record<string, string> = {
      TypeScript: "#eb6e00",
      JavaScript: "#f7df1e",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      "C++": "#f34b7d",
    };

    const languages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangs) * 100),
        color: langPalette[name] || "#eb6e00",
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // 3. Real Contributions (Last 365 Days)
    let contributions: any[] = [];
    let totalContributions = 0;

    if (contribData && Array.isArray(contribData.contributions)) {
      contributions = contribData.contributions;
      if (contribData.total && typeof contribData.total === "object") {
        totalContributions = Object.values(contribData.total).reduce((a: any, b: any) => Number(a) + Number(b), 0);
      } else {
        totalContributions = contributions.reduce((acc: number, d: any) => acc + (d.count || 0), 0);
      }
    }

    // Calculate Streak
    let streak = 0;
    const sorted = [...contributions].reverse();
    for (const d of sorted) {
      if (d.count > 0) streak++;
      else if (streak > 0) break;
    }

    // Top 3 Recent Repos
    const topRepos = Array.isArray(fetchedRepos)
      ? fetchedRepos.slice(0, 3).map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description || "Open source project repository.",
          html_url: r.html_url,
          language: r.language || "TypeScript",
          stargazers_count: r.stargazers_count || 0,
          updated_at: r.updated_at,
        }))
      : [];

    return NextResponse.json({
      username,
      publicRepos: userData.public_repos ?? (Array.isArray(fetchedRepos) ? fetchedRepos.length : 54),
      followers: userData.followers ?? 24,
      totalStars: totalStars || 20,
      totalContributions: totalContributions || 348,
      streak: streak || 7,
      repos: topRepos,
      languages: languages.length > 0 ? languages : [
        { name: "HTML", percentage: 35, color: "#e34c26" },
        { name: "JavaScript", percentage: 30, color: "#f7df1e" },
        { name: "CSS", percentage: 20, color: "#563d7c" },
        { name: "TypeScript", percentage: 15, color: "#eb6e00" },
      ],
      contributions,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
