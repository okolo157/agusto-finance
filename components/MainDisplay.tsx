"use client";

import { Open_Sans } from "next/font/google";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

const openSans = Open_Sans({
  subsets: ["latin"],
});

interface DataPoint {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
}

interface HomeProps {
  data: DataPoint[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF0000",
  "#00FF00",
];

export default function MainDisplay({ data }: HomeProps) {
  const totalRevenue = data.reduce((acc, item) => acc + item.revenue, 0);
  const totalExpenses = data.reduce((acc, item) => acc + item.expenses, 0);
  const totalProfit = data.reduce((acc, item) => acc + item.profit, 0);
  const totalCustomerCount = data.reduce(
    (acc, item) => acc + item.customerCount,
    0
  );

  return (
    <div className={openSans.className}>
      {/* metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold mb-2">Total Revenue</h1>
          <p className="text-2xl">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold mb-2">Total Expenses</h1>
          <p className="text-2xl">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold mb-2">Total Profit</h1>
          <p className="text-2xl">${totalProfit.toLocaleString()}</p>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold mb-2">Total Customers</h1>
          <p className="text-2xl">{totalCustomerCount.toLocaleString()}</p>
        </div>
      </div>

      {/* bar chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4  text-black">
            Monthly Revenue
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pie chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4  text-black">
            Expense Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="expenses"
                  nameKey="date"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* customer count chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4  text-black">
            Customer Growth
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="customerCount"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Customer Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
