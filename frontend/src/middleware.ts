import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";

export async function middleware(req: NextRequest) {
  const token = await getCookieServer()

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  const isValid = await validateToken(token)

  if (!isValid) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/dashboard/:path*",
};

async function validateToken(token: string) {
  if (!token) return false

  try {
    const response = await fetch("http://localhost:3333/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      return false
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}