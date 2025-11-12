"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FooterStamp } from "../Components/FooterStamp";
import { ThemeToggleButton } from "../Components/ThemeToggleButton";
import { BackgroundThreads } from "../Backgrounds/Threads/BackgroundThreads";
import { CursorSplash } from "../Animations/SplashCursor/CursorSplash";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const themeRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.7 },
      });

      // هدر از بالا
      tl.from(headerRef.current, {
        y: -48,
        opacity: 0,
        duration: 0.75,
      });

      // لینک‌ها با استگر
      if (linkRefs.current.length) {
        tl.from(
          linkRefs.current,
          {
            y: -24,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
          },
          "-=0.3"
        );
      }

      if (themeRef.current) {
        tl.from(
          themeRef.current,
          {
            x: 32,
            opacity: 0,
            duration: 1.2,
            // delay: 0.8,
          },
          ">-0.2"
        );
      }

      if (footerRef.current) {
        tl.from(
          footerRef.current,
          {
            x: -32,
            opacity: 0,
            duration: 1,
          },
          "<" // دقیقا هم‌زمان با تم‌تاگل
        );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <BackgroundThreads />
      <CursorSplash />

      <header
        ref={headerRef}
        className="
          relative z-50 flex items-center px-8 py-4
          text-xs md:text-sm

        "
      >
        <div className="flex-1" />

        <nav
          className="flex gap-6 justify-center  bg-black/30 dark:bg-white/60
          border border-white/10 dark:border-black/10
          backdrop-blur-md p-2 rounded-4xl px-18 z-50"
        >
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                if (el) {
                  linkRefs.current[idx] = el;
                }
              }}
              className={
                "transition-colors " +
                (pathname === item.href
                  ? // Active
                    "text-white dark:text-black"
                  : // Inactive
                    "text-neutral-400 hover:text-white dark:text-neutral-500 dark:hover:text-black")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div ref={themeRef} className="flex-1 flex justify-end">
          <ThemeToggleButton />
        </div>
      </header>

      {/* محتوای وسط صفحه */}
      <main
        className="
          z-10 flex flex-1 px-4
          items-start justify-center
          md:px-8 md:items-center
        "
      >
        {children}
      </main>

      <div
        ref={footerRef}
        className="pointer-events-none fixed bottom-6 left-6 z-30"
      >
        <FooterStamp size={80} />
      </div>
    </div>
  );
}
