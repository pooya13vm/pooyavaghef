"use client";

/*
  Based on https://reactbits.dev/components/chroma-grid
  نسخه‌ی اصلاح‌شده برای نمایش کارت‌ها به‌صورت آرک / بادبزن
*/

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number; // برای ماسک نور
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // فقط برای دمو، اگر آیتم نداشتی
  const demo: ChromaItem[] = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg,#4F46E5,#000)",
      url: "https://github.com/",
    },
  ];

  const data = items?.length ? items : demo;
  const total = data.length;

  // ---------- جلوگیری از hydration mismatch ----------
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // --------- انیمیشن ورود کارت‌ها (پخش ورق) ----------
  useEffect(() => {
    if (!mounted || !rootRef.current) return;

    // همه کارت‌هایی که data-card دارند
    const cards = rootRef.current.querySelectorAll<HTMLElement>("[data-card]");

    if (!cards.length) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
    });

    tl.from(cards, {
      y: 180, // از پایین بیاد بالا
      opacity: 0, // از محو به ظاهر
      stagger: 0.5, // حدود 180ms بین هر کارت
    });

    // اگر دوست داشتی روی cleanup هم kill کنی
    return () => {
      tl.kill();
    };
  }, [mounted, data.length]);

  // spotlight فقط بعد از mount
  useEffect(() => {
    if (!mounted) return;
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
    setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, [mounted, damping, ease]);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    if (!mounted || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, {
      opacity: 0,
      duration: 0.25,
      overwrite: true,
    });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  // اگر هنوز mount نشده‌ایم → فقط کانتینر خالی (برای SSR)
  if (!mounted) {
    return (
      <div
        ref={rootRef}
        className={`relative w-full h-[420px] flex items-center justify-center overflow-hidden ${className}`}
        style={
          {
            "--r": `${radius}px`,
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      />
    );
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-[420px] flex items-center justify-center overflow-hidden ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--x": "50%",
          "--y": "50%",
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => {
        // --- محاسبه‌ی جای کارت روی قوس ---
        const centerIndex = (total - 1) / 2; // مرکز آرایه
        const maxArcAngle = Math.PI / 1.2; // زاویه کل قوس (تقریباً 140 درجه)
        const radiusArc = 320; // شعاع قوس

        const offset = i - centerIndex; // منفی = چپ، مثبت = راست

        // اگر فقط ۱ کارت داریم، زاویه صفر باشد
        const ratio = centerIndex === 0 ? 0 : offset / centerIndex; // بین -۱ تا +۱
        const angle = (maxArcAngle / 3) * ratio; // زاویه هر کارت روی قوس

        // مختصات مرکز کارت روی قوس دایره
        const x = radiusArc * Math.sin(angle);
        const y = radiusArc * (0.9 - Math.cos(angle)); // قوس رو به پایین

        // کارت وسط بزرگ‌تر، کناری‌ها کوچک‌تر
        const depth = Math.cos(angle); // نزدیک ۱ در وسط، کوچک‌تر در کناره‌ها
        const scale = 0.75 + depth * 0.25; // بین ~۰.۵ تا ۱

        // زاویه‌ی چرخش کارت (برای حس فن/نیم‌دایره)
        const rotation = angle * 1;

        return (
          <article
            key={i}
            data-card
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            className="group relative flex flex-col w-[140px] rounded-[20px] overflow-hidden border-2 border-transparent cursor-pointer transition-transform duration-300"
            style={
              {
                "--card-border": c.borderColor || "transparent",
                background: c.gradient,
                "--spotlight-color": "rgba(255,255,255,0.3)",
                position: "absolute",
                left: "50%",
                top: "52%", // کمی پایین‌تر تا قوس دقیقاً روی موجت بشینه
                transformOrigin: "50% 90%", // ***کلید کار: چرخش نزدیک ته کارت***
                transform: `translate(-50%, -50%) translate(${x}px, ${
                  y - 120
                }px) rotate(${rotation * 0.8}rad) scale(${scale})`,
                zIndex: Math.round(depth * 10) + 1,
              } as React.CSSProperties
            }
          >
            {/* لایه نور روی کارت */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 20%)",
              }}
            />

            {/* تصویر */}
            <div className="relative z-10 flex-1 p-[10px] box-border">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>

            {/* متن پایین کارت */}
            <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
              <h3 className="m-0 text-[0.7rem] font-semibold">{c.title}</h3>
              {c.handle && (
                <span className="text-[0.5rem] opacity-80 text-right">
                  {c.handle}
                </span>
              )}
              <p className="m-0 text-[0.55rem] opacity-85">{c.subtitle}</p>
              {c.location && (
                <span className="text-[0.65rem] opacity-85 text-right">
                  {c.location}
                </span>
              )}
            </footer>
          </article>
        );
      })}

      {/* ماسک خاکستری/روشن */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          borderRadius: 32,
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />

      {/* لایه fade برگشتی */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
