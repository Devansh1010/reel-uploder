import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  
  const session = await auth();
  console.log("session" ,session)

  const publicPaths = ["/sign-in", "/sign-up", "/"];
  const isPublic = publicPaths.includes(req.nextUrl.pathname);

  if (!isPublic && !session) {
    // User is trying to access a protected route without auth
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/tasks/:path*",
    "/profile",
    "/admin/:path*",
  ],
};
