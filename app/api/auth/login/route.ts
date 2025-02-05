import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

const prisma = new PrismaClient();

interface LoginRequestBody {
  email: string;
  password: string;
}

//the goal here is to handle graceful session handling without bulking up the code base
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password }: LoginRequestBody = await request.json();

    // Validate input
    if (!email || !password) {
      console.warn("Login failed: Missing email or password");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.warn(`Login failed: User not found (${email})`);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.warn(`Login failed: Invalid password for user (${email})`);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    console.log(`User logged in: ${user.email} (ID: ${user.id})`);

    // Generate a session token
    const sessionToken = Math.random().toString(36).substring(2);

    // Store session token in database
    await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
      },
    });

    console.log(`Session created for user ID: ${user.id}`);

    // Set session cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.headers.append(
      "Set-Cookie",
      serialize("token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
