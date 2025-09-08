import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define protected routes that require authentication
const protectedRoutes = ["/admin", "/teacher", "/parent", "/settings"]

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register", "/about", "/contact", "/programs", "/gallery", "/apply"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route))

  // Get user session from localStorage (this would be from cookies in production)
  const userCookie = request.cookies.get("educonnect_user")
  const isAuthenticated = !!userCookie

  // If trying to access protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated user tries to access login page, redirect to dashboard
  if (isAuthenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
