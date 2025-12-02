"use client";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/app/(frontend)/_components/_navbar/Navbar";
import Logout from "@/app/(frontend)/_components/_navbar/Logout";

const geistSans = Geist({
  variable: "--font-geist-sans",

  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",

  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Logout />
        {children}
        <Navbar />
      </body>
    </html>
  );
}
