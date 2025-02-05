import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out" });

  response.headers.append(
    "Set-Cookie",
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, 
    })
  );

  return response;
}
