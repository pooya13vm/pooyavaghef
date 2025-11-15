// app/Components/NotFound/AnimatedNotFound.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";

/**
 * انیمیشن سبک و روان برای 404:
 * - عدد 404 با افکت پارالاکس آرام
 * - هالهٔ نور با تعقیب ماوس (quickSetter)
 * - پالس حلقه‌ای دور نور (بدون فشار سنگین به GPU)
 */
export default function AnimatedNotFound() {
  const root = useRef<HTMLDivElement | null>(null);
  const light = useRef<HTMLDivElement | null>(null);
  const digits = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      gsap.set(digits.current, {
        y: 30,
        autoAlpha: 0,
        rotateX: -15,
        transformPerspective: 800,
        force3D: true,
      });

      gsap.to(digits.current, {
        y: 0,
        autoAlpha: 1,
        rotateX: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      // پالس نرم روی لایهٔ نور
      gsap.fromTo(
        light.current,
        { opacity: 0.35, scale: 0.9 },
        {
          opacity: 0.65,
          scale: 1.05,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          force3D: true,
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!root.current) return;

    // تعقیب ماوس با quickSetter (بدون ساخت tween جدید در هر move)
    const setX = gsap.quickSetter(root.current, "--x", "px");
    const setY = gsap.quickSetter(root.current, "--y", "px");

    const onMove = (e: PointerEvent) => {
      const r = root.current!.getBoundingClientRect();
      setX(e.clientX - r.left);
      setY(e.clientY - r.top);
    };

    root.current.addEventListener("pointermove", onMove);
    return () => root.current?.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={root}
      className="relative isolate aspect-square w-full max-w-[420px] mx-auto select-none"
      style={
        {
          "--x": "50%",
          "--y": "50%",
        } as CSSProperties
      }
    >
      {/* نور پویا */}
      <div
        ref={light}
        aria-hidden="true"
        className="absolute inset-0 rounded-[32px] -z-10"
        style={
          {
            background:
              "radial-gradient(400px 300px at var(--x) var(--y), rgba(56,189,248,0.22), transparent 70%)",
            filter: "blur(12px)",
            willChange: "transform, opacity",
          } as CSSProperties
        }
      />

      {/* ارقام 404 با لایه‌های ظریف */}
      <div
        ref={digits}
        className="relative grid place-items-center h-full w-full"
      >
        <div className="relative">
          {/* سایهٔ محوِ پشت ارقام */}
          <div
            aria-hidden="true"
            className="absolute inset-0 blur-2xl"
            style={
              {
                background:
                  "radial-gradient(circle at 40% 40%, rgba(99,102,241,0.4), transparent 50%), radial-gradient(circle at 60% 60%, rgba(56,189,248,0.35), transparent 55%)",
                maskImage:
                  "radial-gradient(80% 80% at 50% 50%, black 40%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(80% 80% at 50% 50%, black 40%, transparent 100%)",
              } as CSSProperties
            }
          />

          <h2
            className="text-[120px] leading-none font-extrabold tracking-tight text-white/90 dark:text-black/90 text-center"
            style={{
              textShadow:
                "0 10px 30px rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.06)",
              willChange: "transform, opacity",
            }}
          >
            404
          </h2>

          <p className="mt-2 text-center text-sm text-neutral-300 dark:text-neutral-600">
            Sorry, we couldn’t find that page.
          </p>
        </div>
      </div>
    </div>
  );
}
