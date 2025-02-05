"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    console.log("Selected file:", file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) {
        console.error("File reading failed");
        return;
      }

      const text = e.target.result as string;
    //   console.log("File content:", text);

      try {
        const data = parseDataset(text, file.name);
        console.log("Parsed data:", data);

        localStorage.setItem("uploadedDataset", JSON.stringify(data));
        setTimeout(() => router.push("/upload"), 100);
      } catch (err) {
        console.error("Error parsing file:", err);
        alert("Invalid file format. Please upload a valid CSV or JSON file.");
      }
    };

    reader.onerror = (err) => {
      console.error("FileReader error:", err);
    };

    reader.readAsText(file);
  };

  const parseDataset = (text: string, fileName: string) => {
    if (fileName.endsWith(".csv")) {
      return parseCSV(text);
    } else if (fileName.endsWith(".json")) {
      return JSON.parse(text);
    } else {
      throw new Error("Unsupported file format");
    }
  };

 const parseCSV = (text: string) => {
   const lines = text.trim().split("\n");
   const headers = lines[0].split(",").map((header) => header.trim());

   return lines
     .slice(1)
     .map((line, lineIndex) => {
       const values = line.split(",").map((value) => value.trim());

       if (values.length !== headers.length) {
         console.warn(`Skipping malformed line ${lineIndex + 1}:`, line);
         return null; // Skip invalid rows
       }

       return headers.reduce((obj, header, index) => {
         const value = values[index].trim();
         obj[header] = isNaN(Number(value)) ? value : Number(value); // Convert to number if applicable
         return obj;
       }, {} as Record<string, unknown>);

     })
     .filter(Boolean); // Remove null values
 };


  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <h1 className="font-bold text-3xl text-center p-10">
        Transform your datasets into comprehensive metrics
      </h1>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full">
        <Link
          href="/sample"
          className="flex-1 p-6 md:p-10 bg-white rounded-lg shadow-lg text-black text-center"
        >
          <h2 className="text-lg md:text-xl">
            Click to test with sample dataset
          </h2>
        </Link>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 p-6 md:p-10 bg-white rounded-lg shadow-lg text-black flex flex-col items-center cursor-pointer"
        >
          <span className="text-lg md:text-xl">
            Upload your dataset to view metrics
          </span>
          <i className="self-center text-gray-500">(CSV format)</i>
          <input
            type="file"
            accept=".csv,.json"
            ref={fileInputRef}
            onChange={(event) => {
              console.log("File input change event triggered");
              handleFileUpload(event);
            }}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
