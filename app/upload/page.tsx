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
} from "recharts";

type DataRecord = Record<string, unknown>;

export default function VisualizePage() {
  const [chartData, setChartData] = useState<DataRecord[]>([]);
  const [xKey, setXKey] = useState<string | null>(null);
  const [numericKeys, setNumericKeys] = useState<string[]>([]);

  useEffect(() => {
    const rawDataset = localStorage.getItem("uploadedDataset"); //later version may use an indexDB, localstorage     cannot handle larger datasets
    if (!rawDataset) {
      console.warn("dataset not found");
      return;
    }

    try {
      const dataset: DataRecord[] = JSON.parse(rawDataset);
      console.log("Retrieved dataset:", dataset);

      if (!Array.isArray(dataset) || dataset.length === 0) {
        console.error("Dataset is not an array or is empty:", dataset);
        return;
      }

      const firstRow = dataset[0];

      // Identify keys
      const keys = Object.keys(firstRow);
      const numericKeys: string[] = [];
      let xKey: string | null = null;

      keys.forEach((key) => {
        const value = firstRow[key];
        if (typeof value === "number") {
          numericKeys.push(key); // Add as a numerical field
        } else if (!xKey && typeof value === "string") {
          xKey = key; // Use the first string field as x-axis
        }
      });

      // If no suitable x-axis key is found, use an index number
      if (!xKey) {
        xKey = "index";
        dataset.forEach((row, index) => {
          row.index = index + 1;
        });
      }

      console.log("X-Axis Key:", xKey);
      console.log("Numerical Fields:", numericKeys);

      setXKey(xKey);
      setNumericKeys(numericKeys);
      setChartData(dataset);
    } catch (error) {
      console.error("Error parsing dataset:", error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="font-bold text-3xl text-center p-10">
        Dataset Visualization
      </h1>
      {chartData.length > 0 && xKey && numericKeys.length > 0 ? (
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {numericKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </BarChart>
      ) : (
        <p className="text-red-500">No valid numerical data to visualize.</p>
      )}
    </div>
  );
}
