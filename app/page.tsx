import Link from "next/link";
import React from "react";

export default function Page() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 gap-6 md:gap-8 lg:gap-10">
      <p className="font-bold text-4xl md:text-3xl lg:text-4xl text-center text-white">
        Track your finances with ease.
      </p>
      <Link
        className="bg-cyan-700 text-white p-3 md:p-4 lg:p-5 rounded-2xl shadow-lg hover:bg-cyan-800 transition-colors duration-300 text-sm md:text-base lg:text-lg"
        href={"/auth/register"}
      >
        Get Started
      </Link>
    </div>
  );
}
