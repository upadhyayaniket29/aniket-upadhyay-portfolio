import { NextResponse } from "next/server";

// Server-side persistent state starting from default 101
let totalViews = 101;
const activeSessions = new Set<string>();

export async function GET() {
  const onlineCount = Math.floor(Math.random() * 3) + 2;

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
    } else if (!sessionId) {
      totalViews += 1;
    }

    const onlineCount = Math.floor(Math.random() * 3) + 2;

    return NextResponse.json({
      views: totalViews,
      online: onlineCount,
    });
  } catch (error) {
    return NextResponse.json({ views: totalViews, online: 2 });
  }
}
