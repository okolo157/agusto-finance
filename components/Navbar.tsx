import Image from "next/image";
import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white flex justify-between rounded-b-3xl p-10">
      <div>
        <Image
          src="/images/agusto-logo.webp"
          alt="agusto logo"
          width={240}
          height={100}
        />
      </div>
      <button className="rounded-lg bg-[#38a5ff] text-white shadow-md px-10 font-bold">
        Sign in
      </button>
    </div>
  );
}
