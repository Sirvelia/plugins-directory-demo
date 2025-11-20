import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "WordPress Plugins",
  description: "WordPress Plugins Directoy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen bg-white`}>
        {children}
      </body>
    </html>
  );
}
