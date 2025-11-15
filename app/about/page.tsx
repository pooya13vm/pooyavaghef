// app/about/page.tsx
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description:
      "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
