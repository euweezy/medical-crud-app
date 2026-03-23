import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Import the Link component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medical Dashboard",
  description: "AppDev Prefinals Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        {/* Navigation Bar */}
        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="max-w-5xl mx-auto flex gap-6 font-semibold">
            <Link href="/medicaltests" className="hover:text-blue-200 transition">
              Medical Tests
            </Link>
            <Link href="/uom" className="hover:text-blue-200 transition">
              Units of Measure (UOM)
            </Link>
            <Link href="/categories" className="hover:text-blue-200 transition">
              Test Categories
            </Link>
          </div>
        </nav>

        {/* This is where your individual pages load */}
        {children}
      </body>
    </html>
  );
}