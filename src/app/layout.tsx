import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dealzios | Verified Promo Codes, Coupons & Deals",
  description: "Discover verified promo codes, exclusive deals, and discount vouchers from thousands of popular online stores.",
  openGraph: {
    title: "Dealzios | Verified Promo Codes, Coupons & Deals",
    description: "Discover verified promo codes, exclusive deals, and discount vouchers from thousands of popular online stores.",
    url: "https://dealzios.com",
    siteName: "Dealzios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dealzios | Verified Promo Codes, Coupons & Deals",
    description: "Discover verified promo codes, exclusive deals, and discount vouchers from thousands of popular online stores.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
