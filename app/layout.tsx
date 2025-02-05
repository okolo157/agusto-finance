import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agusto finance",
  description: "Generate metrics easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <div className="bg-[#002D53]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
