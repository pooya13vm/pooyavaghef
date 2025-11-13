"use client";

import { useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Lanyard from "./Components/Lanyard/Lanyard"; // ✅ استاتیک و مطمئن
import { HeroTextBlock } from "./Components/HeroTextBlock";
import { StartProjectButton } from "./Components/StartProjectButton";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  // فقط برای جلوگیری از SSR mismatch و تضمین اندازه‌ی درست کانتینر
  const [mounted, setMounted] = useState(false);
  const [playText, setPlayText] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      heroRef.current &&
        Object.assign(heroRef.current.style, {
          opacity: "1",
          transform: "none",
        });
      ctaRef.current &&
        Object.assign(ctaRef.current.style, {
          opacity: "1",
          transform: "none",
        });
      setPlayText(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, {
        x: 120,
        autoAlpha: 0,
        force3D: true,
        willChange: "transform,opacity",
      });
      gsap.set(ctaRef.current, {
        y: 24,
        autoAlpha: 0,
        force3D: true,
        willChange: "transform,opacity",
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(heroRef.current, { x: 0, autoAlpha: 1, duration: 0.9 })
        .to(ctaRef.current, { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.15")
        .add(() => {
          setPlayText(true);
          gsap.set([heroRef.current, ctaRef.current], {
            clearProps: "will-change",
          });
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="
        relative flex min-h-screen w-full items-center justify-center   /* ✅ ارتفاع تضمینی */
        -mt-6 md:-mt-16
      "
    >
      {/* لایهٔ پس‌زمینه برای لنیارد */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {mounted && (
          <Lanyard
            key="lanyard" /* ✅ ریمونت امن بعد از هیدریشن */
            position={[0, 0, 20]}
            gravity={[0, -22, 0]}
          />
        )}
      </div>

      {/* محتوای رو */}
      <div
        className="
          relative z-10 flex w-full max-w-5xl flex-col items-center gap-8
          px-6 text-center lg:flex-row lg:items-center lg:justify-start
          lg:gap-10 lg:text-left pointer-events-none mt-52 lg:mt-0
        "
      >
        {/* فضای خالی کنار لنیارد در دسکتاپ */}
        <div className="hidden lg:block w-[420px]" aria-hidden="true" />

        <div className="flex flex-col items-center lg:items-start gap-4">
          <div ref={heroRef} className="opacity-0">
            {/* اگه HeroTextBlock از prop استفاده می‌کنه نگهش دار */}
            <HeroTextBlock playText={playText} />
          </div>

          <div ref={ctaRef} className="opacity-0 pointer-events-auto">
            <StartProjectButton />
          </div>
        </div>
      </div>
    </section>
  );
}
