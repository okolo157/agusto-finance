import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // If no token is found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // If token is found, continue with the request
  return NextResponse.next();
}

// Define which routes should use the middleware
export const config = {
  matcher: ["/dashboard", "/upload", "/sample"],
};
