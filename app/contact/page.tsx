// app/contact/page.tsx
import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about new projects, collaborations, or freelance work — typically Next.js, React Native, Shopify, and WordPress.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Get in touch about new projects, collaborations, or freelance work — typically Next.js, React Native, Shopify, and WordPress.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
