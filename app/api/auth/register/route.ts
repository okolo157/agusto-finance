import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";

const prisma = new PrismaClient();

interface SignupRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password }: SignupRequestBody = await request.json();

    // Validate input
    if (!email || !password) {
      console.warn("Signup failed: Missing email or password");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      console.warn(`Signup failed: User already exists (${email})`);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log(`User created: ${user.email} (ID: ${user.id})`);

    // Generate a session token
    const sessionToken = Math.random().toString(36).substring(2);

    // Store token in database
    await prisma.session.create({
      data: {
        userId: user.id,
        token: sessionToken,
      },
    });

    console.log(`Session created for user ID: ${user.id}`);

    // Set session cookie
    const response = NextResponse.json({ message: "Signup successful" });
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
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
