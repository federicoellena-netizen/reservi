import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy disabilitato per sviluppo locale — riattivare prima del deploy
export async function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/onboarding/:path*"],
};
