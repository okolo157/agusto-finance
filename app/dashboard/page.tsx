import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="font-bold text-3xl p-10">
        Transform your datasets into comprehensive metrics
      </h1>
      <div className="flex gap-8 max-w-1/2">
        <Link
          href="/sample"
          className="p-20 bg-white rounded-lg shadow-lg text-black"
        >
          <h2>Click to test with sample dataset</h2>
        </Link>
        <div className="p-20 bg-white rounded-lg shadow-lg text-black flex flex-col cursor-pointer">
          Upload your dataset to view metrics <br />
          <i className="self-center text-gray-500 ">(CSV format)</i>
        </div>
      </div>
    </div>
  );
}
