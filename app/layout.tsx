import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./Components/SiteShell";

// app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL("https://pooyavaghef.com"),
  title: {
    default: "Pooya Vaghef — Developer",
    template: "%s — Pooya Vaghef",
  },
  description:
    "Pooya Vaghef — Full-Stack Web & Mobile Developer. Portfolio of performance-driven apps and sites built with Next.js, React Native, Shopify & WordPress.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "React Native",
    "Shopify",
    "WordPress",
    "Web Developer",
    "Mobile Apps",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://pooyavaghef.com",
    title: "Pooya Vaghef — Developer",
    description:
      "Performance-driven apps & sites with Next.js, React Native, Shopify & WordPress.",
    images: ["/og.jpg"], // اگر داشتی
  },
  twitter: {
    card: "summary_large_image",
    title: "Pooya Vaghef — Full-Stack Web & Mobile Developer",
    description:
      "Selected work across Next.js, React Native, Shopify & WordPress.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-black text-white
          dark:bg-white dark:text-black
          transition-colors duration-500
        "
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
