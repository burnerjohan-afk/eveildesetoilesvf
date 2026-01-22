import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("session");

  // Routes publiques
  const publicRoutes = [
    "/",
    "/mon-accompagnement",
    "/offres-tarifs",
    "/grille-comparative",
    "/faq",
    "/contact",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/api/contact",
    "/api/files",
    "/api/checkout",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Routes admin
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
    }
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login?redirect=/admin", request.url));
    }
  }

  // Routes portail client
  if (pathname.startsWith("/portail")) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login?redirect=/portail", request.url));
    }
    try {
      const session = JSON.parse(sessionCookie.value);
      if (session.role !== "CLIENT") {
        return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
      }
      if (!session.structureId) {
        return NextResponse.redirect(new URL("/login?error=no-structure", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login?redirect=/portail", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/portail/:path*",
    "/api/admin/:path*",
    "/api/portail/:path*",
  ],
};
