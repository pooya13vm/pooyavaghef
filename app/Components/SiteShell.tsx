"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <div className="relative flex h-screen flex-col overflow-hidden">
      <BackgroundThreads />
      <CursorSplash />

      <header className="relative z-20 flex items-center justify-center px-8 py-4">
        <nav className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "transition-colors " +
                (pathname === item.href
                  ? "text-white"
                  : "text-neutral-400 hover:text-white")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* محتوای وسط صفحه */}
      <main
        className=" z-10 flex flex-1 px-4
          items-start justify-center
          md:px-8 md:items-center"
      >
        {children}
      </main>
    </div>
  );
}
