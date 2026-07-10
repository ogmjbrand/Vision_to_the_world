import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/site-chrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vision To The World | Your Journey. Your Choice. Your World.",
    template: "%s | Vision To The World",
  },
  description:
    "Vision To The World is a next-generation self-service travel technology platform to search, compare, book, and manage flights, hotels, car rentals, airport transfers, travel packages, visa assistance, and travel insurance — all in one place.",
  keywords: [
    "flight booking",
    "hotel booking",
    "car rental",
    "airport transfers",
    "travel packages",
    "visa assistance",
    "travel insurance",
    "self-service travel platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
