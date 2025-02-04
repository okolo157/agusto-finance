import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={openSans.className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-h-screen p-8 pb-20 sm:p-20">
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold">Revenue</h1>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold">Expenses</h1>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold">Profit</h1>
        </div>
        <div className="rounded-lg shadow-lg bg-white p-6 text-black">
          <h1 className="text-xl font-bold">Customer Count</h1>
        </div>
      </div>
    </div>
  );
}
