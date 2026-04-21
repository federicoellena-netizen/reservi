import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseProxy } from "@/lib/supabase-proxy";

export async function proxy(request: NextRequest) {
  const { supabase, response } = createSupabaseProxy(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /dashboard routes — redirect to /login if not authenticated
  if (pathname.startsWith("/dashboard") && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect /login to /dashboard if already authenticated
  if (pathname === "/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
