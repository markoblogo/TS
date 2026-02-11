import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && isLocale(segments[0])) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
    const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
    const locale = country === "BG" || acceptLanguage.includes("bg") ? "bg" : defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
