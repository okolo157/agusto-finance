import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FinancialData = {
  id: number;
  date: Date;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
};

type Metrics = {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
};

export async function GET() {
  try {
    // Fetch the data from the database
    const financialData: FinancialData[] =
      await prisma.financialRecord.findMany();

    // Calculate the metrics (profit = revenue-expenses)
    const metrics: Metrics = {
      totalRevenue: financialData.reduce((sum, item) => sum + item.revenue, 0),
      totalExpenses: financialData.reduce(
        (sum, item) => sum + item.expenses,
        0
      ),
      totalProfit: financialData.reduce(
        (sum, item) => sum + (item.revenue - item.expenses),
        0
      ),
    };

    // Return the data and metrics as JSON
    return NextResponse.json({ data: financialData, metrics });
  } catch (error) {
    // Return an error response in case of failure
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
