"use client";
import React, { useState, useEffect } from "react";
import MainDisplay from "@/components/MainDisplay";

interface FinancialData {
  id: number;
  month: string;
  date: Date;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
}

export default function Dashboard() {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/metrics", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid JSON response");
        }

        if (!data || !Array.isArray(data.data)) {
          throw new Error("Invalid data structure");
        }

        setFinancialData(data.data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <MainDisplay data={financialData} />
    </div>
  );
}
