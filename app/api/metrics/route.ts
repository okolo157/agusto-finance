import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Type for individual financial data
type FinancialData = {
  id: number;
  date: Date;
  revenue: number;
  expenses: number;
  profit: number;
  customerCount: number;
};

// Type for the metrics
type Metrics = {
  totalRevenue: number;
  totalExpenses: number;
  totalProfit: number;
};

// Define the GET function for the API route
export async function GET() {
  try {
    // Fetch the financial data from the database
    const financialData: FinancialData[] =
      await prisma.financialRecord.findMany();

    // Calculate the metrics
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
      { error: "Failed to fetch financial data" },
      { status: 500 }
    );
  }
}
