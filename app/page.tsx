"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6 md:gap-8 lg:gap-10">
      <p className="font-bold text-2xl md:text-3xl lg:text-4xl text-center">
        Track your finances with ease.
      </p>
      <button
        className="bg-cyan-700 text-white p-3 md:p-4 lg:p-5 rounded-lg shadow-lg hover:bg-cyan-800 transition-colors duration-300 text-sm md:text-base lg:text-lg"
        onClick={() => router.push("/auth/register")}
      >
        Get Started
      </button>
    </div>
  );
}
