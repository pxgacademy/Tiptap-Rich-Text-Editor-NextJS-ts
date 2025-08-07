import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/protected/:path*"],
};
