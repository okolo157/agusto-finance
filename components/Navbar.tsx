"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();

  if (path !== "/" && path !== "/dashboard" && path !== "/sample") {
    return null;
  }

  return (
    <div className="bg-white flex justify-between rounded-b-3xl p-10">
      <div>
        <Image
          src="/images/agusto-logo.webp"
          alt="agusto logo"
          width={140}
          height={100}
        />
      </div>
      {path === "/" && (
        <Link
          href={"/auth/register"}
          className="rounded-2xl bg-cyan-700 text-white shadow-md px-7 py-3 text-base font-bold hover:bg-cyan-800 transition-colors duration-300"
        >
          Get Started
        </Link>
      )}
      {path === "/dashboard" && (
        <Link href={"/"} className="text-red-600 hover:text-red-400">
          Log out
        </Link>
      )}
      {path === "/sample" && (
        <Link href={"/dashboard"} className="text-cyan-700 hover:text-red-400 flex items-center justify-center">
          Go back
        </Link>
      )}
    </div>
  );
}
