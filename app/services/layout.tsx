import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | SEO, AI SEO, GEO, AEO, PPC & More",
  description:
    "Explore Optisutar's full range of digital marketing services — AIO, GEO, AEO, AI SEO, PPC, Google My Business, Reputation Management, Web Design and Social Media Marketing.",
  alternates: { canonical: "https://optisutar.com/services" },
  openGraph: {
    title: "Digital Marketing Services | Optisutar",
    description:
      "From traditional SEO to AI Optimisation — every service your business needs to dominate online in 2025 and beyond.",
    url: "https://optisutar.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}