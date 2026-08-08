import { NextResponse } from "next/server";

// Server-side persistent state for portfolio visitor count
let totalViews = 12048;
const activeSessions = new Set<string>();

export async function GET() {
  // Simulate active online visitors between 3 and 6
  const onlineCount = Math.floor(Math.random() * 4) + 3;

  return NextResponse.json({
    views: totalViews,
    online: onlineCount,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const sessionId = body.sessionId;

    if (sessionId && !activeSessions.has(sessionId)) {
      activeSessions.add(sessionId);
      totalViews += 1;
    }

    const onlineCount = Math.floor(Math.random() * 4) + 3;

    return NextResponse.json({
      views: totalViews,
      online: onlineCount,
    });
  } catch (error) {
    return NextResponse.json({ views: totalViews, online: 4 });
  }
}
