// app/work/page.tsx
import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects across Next.js apps, Shopify stores, and WordPress sites — quick snapshots of outcomes, stack, and UI.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description:
      "Selected projects across Next.js apps, Shopify stores, and WordPress sites — quick snapshots of outcomes, stack, and UI.",
    url: "/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work",
    description:
      "Selected projects across Next.js apps, Shopify stores, and WordPress sites — quick snapshots of outcomes, stack, and UI.",
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
