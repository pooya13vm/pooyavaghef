// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./Components/SiteShell";
import GA from "./GA";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pooyavaghef.com";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        {/* gtag.js */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                // چون SPA هستیم، خودمان page_view می‌فرستیم:
                gtag('config', '${GA_ID}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className="
          min-h-screen
          bg-black text-white
          dark:bg-white dark:text-black
          transition-colors duration-500
        "
      >
        {GA_ID && <GA />}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
