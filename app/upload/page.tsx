"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataRecord = Record<string, unknown>;


const colorPalette = [
  "#2563eb", 
  "#db2777", 
  "#16a34a", 
  "#ea580c", 
  "#6d28d9",
  "#0891b2", 
  "#be123c", 
  "#854d0e", 
  "#5b21b6", 
  "#059669", 
];

const DatasetBarChart = () => {
  const [chartData, setChartData] = useState<DataRecord[]>([]);
  const [xKey, setXKey] = useState<string | null>(null);
  const [numericKeys, setNumericKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const rawDataset = localStorage.getItem("uploadedDataset");
    if (!rawDataset) {
      console.warn("Dataset not found");
      return;
    }

    try {
      const dataset: DataRecord[] = JSON.parse(rawDataset);
      if (!Array.isArray(dataset) || dataset.length === 0) {
        throw new Error("Invalid dataset format");
      }

      // Process dataset
      const firstRow = dataset[0];
      const keys = Object.keys(firstRow);
      const numKeys: string[] = [];
      let categoryKey: string | null = null;

      keys.forEach((key) => {
        const value = firstRow[key];
        if (typeof value === "number") {
          numKeys.push(key);
        } else if (!categoryKey && typeof value === "string") {
          categoryKey = key;
        }
      });

      // Use index if no string key is found
      if (!categoryKey) {
        categoryKey = "index";
        dataset.forEach((row, index) => {
          row.index = index + 1;
        });
      }

      setXKey(categoryKey);
      setNumericKeys(numKeys);
      setSelectedKeys(numKeys.slice(0, 3)); // Initially show first 3 numeric fields
      setChartData(dataset);
    } catch (error) {
      console.error("Error processing dataset:", error);
    }
  }, []);

  const handleMetricToggle = (key: string) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  if (chartData.length === 0 || !xKey) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No data available for visualization</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="p-4">
        <h1 className="text-2xl self-center">Dataset Visualization</h1>
        <div className="flex flex-wrap gap-2 mt-4">
          {numericKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleMetricToggle(key)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedKeys.includes(key)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xKey}
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "6px",
                  padding: "10px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
              {selectedKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colorPalette[index % colorPalette.length]}
                  name={key}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DatasetBarChart;
