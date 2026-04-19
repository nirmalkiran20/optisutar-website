import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://optisutar.com"),
  title: {
    default: "Optisutar | SEO, AI SEO & Digital Marketing Agency in Pune",
    template: "%s | Optisutar",
  },
  description:
    "Optisutar is a Pune-based digital marketing agency specialising in SEO, AI SEO, GEO, AEO, PPC, Google My Business and Reputation Management. Get a free audit today.",
  keywords: [
    "SEO agency Pune",
    "AI SEO",
    "GEO optimisation",
    "AEO",
    "digital marketing agency Pune",
    "PPC management",
    "Google My Business",
    "reputation management",
    "local SEO Pune",
    "Optisutar",
  ],
  authors: [{ name: "Optisutar", url: "https://optisutar.com" }],
  creator: "Optisutar",
  publisher: "Optisutar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://optisutar.com",
    siteName: "Optisutar",
    title: "Optisutar | SEO, AI SEO & Digital Marketing Agency in Pune",
    description:
      "Optisutar is a Pune-based digital marketing agency specialising in SEO, AI SEO, GEO, AEO, PPC and more. Get a free audit today.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Optisutar Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optisutar | SEO, AI SEO & Digital Marketing Agency in Pune",
    description:
      "Pune-based SEO & AI marketing agency. We help businesses rank higher and grow faster.",
    images: ["/android-chrome-512x512.png"],
    creator: "@optisutar",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://optisutar.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}