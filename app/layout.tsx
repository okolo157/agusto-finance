import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agusto Finance",
  description: "A financial dashboard for Agusto Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className="bg-[#002D53]"
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
