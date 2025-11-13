"use client";

import { HeroScrambledText } from "@/app/TextAnimations/ScrambledText/HeroScrambledText";

export function HeroTextBlock({ playText = false }: { playText?: boolean }) {
  return (
    <div className="max-w-lg space-y-4 pointer-events-none">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white dark:text-black">
        Pooya Vaghef
      </h1>

      <div
        className="
          text-sm leading-relaxed md:pl-1
          text-neutral-300 dark:text-neutral-600
        "
        // کانتِینمنت تا بازپخش متن روی بقیه‌ی لایه‌ها اثر نذاره
        style={{ contain: "content" as any }}
      >
        {playText ? (
          <HeroScrambledText text="I design and build minimal, performance-focused websites & web apps with playful motion for brands, products, and studios." />
        ) : (
          // فالو‌-بک سبک تا شروع اسکرَمل
          "I design and build minimal, performance-focused websites & web apps with playful motion for brands, products, and studios."
        )}
      </div>
    </div>
  );
}
