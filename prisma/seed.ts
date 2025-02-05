import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Data preprocessing -->
// convert MM/DD/YYYY to Date objects
function parseDate(dateString: string) {
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}

const rawData = `
Date	Revenue	Expenses	Profit	Customer Count
1/1/2023	5000	3000	2000	120
2/1/2023	6000	3500	2500	150
3/1/2023	5500	3200	2300	140
4/1/2023	7000	4000	3000	180
5/1/2023	7500	4200	3300	200
6/1/2023	8000	4500	3500	220
7/1/2023	7800	4400	3400	210
`;

async function main() {
  // Parse TSV data
  const records = rawData
    .trim()
    .split("\n")
    .slice(1) // Skip header
    .map((line) => {
      const [date, revenue, expenses, profit, customerCount] = line.split("\t");
      return {
        date: parseDate(date),
        revenue: parseInt(revenue),
        expenses: parseInt(expenses),
        profit: parseInt(profit),
        customerCount: parseInt(customerCount),
      };
    });

  // Clear existing data
  await prisma.financialRecord.deleteMany();

  // Insert new data
  await prisma.financialRecord.createMany({
    data: records,
    skipDuplicates: true,
  });

  console.log(`Seeded ${records.length} records`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
