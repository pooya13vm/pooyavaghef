// app/GA.tsx
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export default function GA() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // در dev ممکن است افزونه‌های بلاکر اسکریپت را ببندند؛ چک کنیم
    if (typeof window === "undefined" || typeof window.gtag !== "function")
      return;

    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
