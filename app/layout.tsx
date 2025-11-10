import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "./Components/SiteShell";

export const metadata: Metadata = {
  title: "Pooya Vaghef – Portfolio",
  description: "Minimal full-screen portfolio with React Bits background.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
