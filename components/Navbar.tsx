"use client";

import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

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
        <button className="rounded-lg bg-cyan-700 text-white shadow-md px-7 py-3 text-base font-bold">
          Get Started
        </button>
      )}
    </div>
  );
}
