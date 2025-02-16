import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FinancialData = {
  id: number;
  date: string; 
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
    const rawFinancialData = await prisma.financialRecord.findMany();

    
    const financialData: FinancialData[] = rawFinancialData.map((item) => ({
      id: item.id,
      date: new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        new Date(item.date)
      ),
      revenue: item.revenue,
      expenses: item.expenses,
      profit: item.profit,
      customerCount: item.customerCount,
    }));

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

    return NextResponse.json({ data: financialData, metrics });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
