import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseProxy } from "@/lib/supabase-proxy";

export async function proxy(request: NextRequest) {
  const { supabase, response } = createSupabaseProxy(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect /dashboard and /onboarding routes — redirect to /login if not authenticated
  if ((pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) && !user) {
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

  // Check onboarding status for authenticated users
  if ((pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) && user) {
    try {
      const { data: att } = await supabase
        .from("attivita")
        .select("onboarding_completato")
        .eq("user_id", user.id)
        .single();

      // Redirect to onboarding if not completed
      if (pathname.startsWith("/dashboard") && att && att.onboarding_completato === false) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }

      // Redirect to dashboard if onboarding already done
      if (pathname.startsWith("/onboarding") && att?.onboarding_completato === true) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
    } catch {
      // If query fails (column doesn't exist yet), skip onboarding check
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/onboarding/:path*"],
};
