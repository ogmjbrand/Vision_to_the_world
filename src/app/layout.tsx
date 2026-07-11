import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/site-chrome";
import { siteConfig } from "@/lib/data/site-config";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
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

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  description:
    "Self-service travel technology platform for flights, hotels, car rentals, airport transfers, vacation packages, visa assistance, and travel insurance.",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: siteConfig.address.country,
  },
  telephone: siteConfig.phones[0],
  email: siteConfig.email,
  slogan: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[var(--foreground)]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
