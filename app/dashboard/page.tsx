"use client";
import React, { useState, useEffect } from "react";
import MainDisplay from "@/components/MainDisplay";

interface FinancialData {
  id: number;
  month: string;
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
}

export default function Dashboard() {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/metrics", { cache: "no-store" });
        const text = await response.text(); // Read response as text first
        console.log("Raw API Response:", text);

        const data = JSON.parse(text); // Now attempt JSON parsing
        setFinancialData(data.data);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <MainDisplay data={financialData} />
    </div>
  );
}
