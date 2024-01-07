import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { notFound } from "next/navigation";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(500, "6 h"),
});

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    await supabase.auth.getSession();

    if (request.nextUrl.pathname.startsWith("/link")) {
      const ip = request.ip ?? "127.0.1";
      const { success, remaining } = await ratelimit.limit(ip);

      if (success) {
        return response;
      }

      if (remaining < 1) {
        return NextResponse.json(
          { error: "Too Many Requests" },
          { status: 429 },
        );
      }
    }

    return notFound();
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/link/",
  ],
};
