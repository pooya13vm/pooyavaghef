// app/work/page.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { WorkGrid } from "./WorkGrid";

export default function WorkPage() {
  const headerBlockRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      if (headerBlockRef.current) {
        headerBlockRef.current.style.opacity = "1";
        headerBlockRef.current.style.transform = "none";
      }
      return;
    }

    const ctx = gsap.context(() => {
      // مثل Contact: کمی از بالا + فیداین
      gsap.set(headerBlockRef.current, { y: -28, opacity: 0, force3D: true });
      gsap.to(headerBlockRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
      });
    }, headerBlockRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="
        flex h-full w-full flex-col items-center
        px-6 pt-16 pb-6 gap-8
        lg:gap-10
      "
    >
      <header
        ref={headerBlockRef}
        className="max-w-3xl text-center space-y-4 will-change-transform"
      >
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white dark:text-black">
          Work
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300 dark:text-neutral-600">
          Selected projects across web, ecommerce, and mobile – from Shopify
          stores and marketing sites to custom Next.js products and native apps.
        </p>
      </header>

      <WorkGrid />
    </section>
  );
}
