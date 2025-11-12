"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroScrambledText } from "@/app/TextAnimations/ScrambledText/HeroScrambledText";

export function HeroTextBlock() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        x: 120,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        delay: 2, // دیلی کمی بیشتر برای ورود نرم‌تر
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="max-w-lg space-y-4">
      <h1
        className="
          text-3xl md:text-4xl font-semibold tracking-tight
          text-white dark:text-black
        "
      >
        Pooya Vaghef
      </h1>

      <div
        className="
          text-sm leading-relaxed md:pl-1
          text-neutral-300 dark:text-neutral-600
        "
      >
        <HeroScrambledText text="I design and build minimal, performance-focused websites & web apps with playful motion for brands, products, and studios." />{" "}
        {/* <HeroScrambledText text="Frontend & full-stack developer focused on clean, minimal interfaces with playful motion and memorable details." /> */}
      </div>
    </div>
  );
}
