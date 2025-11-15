"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import type { ChromaItem } from "@/app/Components/ChromaGrid/ChromaGrid";

type Props = {
  items: ChromaItem[];
  height?: number; // ارتفاع ثابت ویترین (بدون اسکرول)
  aspect?: number; // نسبت تصویر کارت (w/h)
  gap?: number; // فاصله بین کارت‌ها (px)
  autoPlay?: boolean; // اتوپلی لوپی
  autoDelay?: number; // مکث بین اسلایدها (ثانیه)
};

export default function MobileWorkShowcase({
  items,
  height = 360,
  aspect = 4 / 3,
  gap = 12,
  autoPlay = true,
  autoDelay = 2.4,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const setCardRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = useMemo(() => items ?? [], [items]);
  const total = Math.max(1, data.length);

  // ابعاد کارت/اسلاید
  const containerW = useRef(0);
  const cardW = useRef(200);
  const cardH = useRef(150);
  const slide = useRef(212); // فاصله مؤثر = cardW + gap

  // پیشرفت حلقه‌ای (می‌تونه اعشاری باشه)
  const prog = useRef({ value: 0 });
  const qProg = useRef<((v: number) => void) | null>(null);

  // درگ
  const dragging = useRef(false);
  const startX = useRef(0);
  const startProg = useRef(0);
  const moved = useRef(0);
  const lastDX = useRef(0);

  // کاهش موشن
  const reduce = useRef(false);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      reduce.current =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ??
        false;
    }
  }, []);

  // اندازه‌گیری
  useEffect(() => {
    if (!mounted || !rootRef.current) return;

    const measure = () => {
      const r = rootRef.current!.getBoundingClientRect();
      containerW.current = r.width;

      const caption = 70; // فضای متن پایین
      const maxCardH = Math.max(120, height - caption);
      const byHeightW = maxCardH * aspect;
      const byWidthW = containerW.current * 0.8;

      cardW.current = Math.max(
        140,
        Math.min(260, Math.min(byHeightW, byWidthW))
      );
      cardH.current = Math.round(cardW.current / aspect);
      slide.current = Math.round(cardW.current + gap);

      render(); // رندر فوری بعد از اندازه‌گیری
    };

    const ro = new ResizeObserver(measure);
    ro.observe(rootRef.current);
    measure();
    return () => ro.disconnect();
  }, [mounted, height, aspect, gap]);

  // انیمیشن نرم برای prog
  useEffect(() => {
    if (!mounted) return;
    qProg.current = gsap.quickTo(prog.current, "value", {
      duration: reduce.current ? 0 : 0.65,
      ease: "power3.out",
      onUpdate: render,
      overwrite: "auto",
    });
    return () => {
      qProg.current = null;
    };
  }, [mounted]);

  // رندر جای کارت‌ها و افکت‌ها
  const render = () => {
    const N = total;
    const s = slide.current;
    // نرمال‌سازی برای جلوگیری از خطای تجمیع ممیز شناور
    const pNorm = ((prog.current.value % N) + N) % N;

    for (let i = 0; i < N; i++) {
      const el = cardsRef.current[i];
      if (!el) continue;

      // کوتاه‌ترین فاصله حلقه‌ای به بازه (-N/2..N/2]
      const diff = wrapDiff(i - pNorm, N);
      const x = diff * s;

      // افکت‌های زیباسازی: وسط = بزرگ/واضح
      const dist = Math.abs(diff);
      const t = Math.min(1, dist); // 0=مرکز، 1=کناره
      const scale = 0.88 + (1 - t) * 0.24; // مرکز ≈ 1.12
      const rot = gsap.utils.clamp(-12, 12, -diff * 6);
      const blur = 2.2 * t; // مرکز واضح‌تر
      const opacity = 1 - 0.45 * t;
      const z = 1000 - Math.round(t * 100);

      el.style.zIndex = String(z);
      // ⬇️ مرکز دقیق: translate(-50%,-50%) + حرکت X
      el.style.transform = `translate(-50%,-50%) translateX(${Math.round(
        x
      )}px) rotateZ(${rot}deg) scale(${scale}) translateZ(0)`;
      el.style.opacity = String(opacity);
      (el.style as any).filter = blur ? `blur(${blur}px)` : "none";
    }
  };

  // کنترل درگ/سوییپ
  const onDown: React.PointerEventHandler = (e) => {
    dragging.current = true;
    moved.current = 0;
    lastDX.current = 0;
    startX.current = e.clientX;
    startProg.current = prog.current.value;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove: React.PointerEventHandler = (e) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    lastDX.current = dx;
    moved.current = Math.max(moved.current, Math.abs(dx));

    prog.current.value = startProg.current + dx / -slide.current; // لحظه‌ای
    render();
  };
  const onUp: React.PointerEventHandler = (e) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);

    const dx = lastDX.current;
    const velocityPick = Math.abs(dx) > 18;
    const direction = dx < 0 ? 1 : -1;

    let target: number;
    if (moved.current > 40 || velocityPick) {
      target = Math.round(prog.current.value + 0.25 * direction);
    } else {
      target = Math.round(prog.current.value);
    }
    qProg.current?.(target);
  };

  useEffect(() => {
    if (!mounted || !autoPlay) return;

    let killed = false;
    let timer: ReturnType<typeof gsap.delayedCall> | null = null;

    const step = () => {
      if (killed) return;
      const next = Math.floor(prog.current.value) + 1;
      qProg.current?.(next);
      timer = gsap.delayedCall(autoDelay, step); // ✅ درست: gsap.delayedCall
    };

    timer = gsap.delayedCall(autoDelay, step);

    const pause = () => {
      timer?.kill();
      timer = null;
    };
    const resume = () => {
      if (killed) return;
      timer?.kill();
      timer = gsap.delayedCall(autoDelay, step);
    };

    const el = rootRef.current;
    el?.addEventListener("pointerdown", pause);
    el?.addEventListener("pointerup", resume);
    el?.addEventListener("pointercancel", resume);

    return () => {
      killed = true;
      timer?.kill();
      el?.removeEventListener("pointerdown", pause);
      el?.removeEventListener("pointerup", resume);
      el?.removeEventListener("pointercancel", resume);
    };
  }, [mounted, autoPlay, autoDelay]);

  if (!mounted) {
    return (
      <div
        ref={rootRef}
        className="relative w-full overflow-hidden"
        style={{ height }}
      />
    );
  }

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        height,
        perspective: "900px",
        WebkitPerspective: "900px",
        touchAction: "pan-y",
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {/* سکوی مرکزی؛ هر کارت absolute از مرکز چیده می‌شود */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        {data.map((c, i) => (
          <div
            key={i}
            ref={(el) => setCardRef(el, i)}
            className="absolute rounded-2xl overflow-hidden shadow-xl border border-white/10 dark:border-black/10 cursor-pointer"
            style={{
              left: "50%",
              top: "50%",
              width: `${cardW.current}px`,
              height: `${cardH.current + 70}px`,
              background: c.gradient,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translate(-50%,-50%)",
            }}
            onClick={() => {
              if (moved.current > 8) return; // جلوگیری از کلیک حین درگ
              if (c.url) window.open(c.url, "_blank", "noopener,noreferrer");
            }}
          >
            {/* تصویر */}
            <div className="p-2">
              <div
                className="w-full overflow-hidden rounded-xl"
                style={{ height: `${cardH.current}px` }}
              >
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{ transform: "translateZ(0)" }}
                />
              </div>
            </div>

            {/* کپشن */}
            <footer className="px-3 pb-3 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-white">
              <h3 className="m-0 text-[12px] font-semibold">{c.title}</h3>
              <span className="text-[10px] opacity-80" />
              <p className="m-0 text-[11px] opacity-85 col-span-2">
                {c.subtitle}
              </p>
            </footer>
          </div>
        ))}
      </div>

      {/* دات‌ها */}
      <Dots
        count={total}
        getIndex={() => ((prog.current.value % total) + total) % total}
        onJump={(i) =>
          qProg.current?.(nearestJump(prog.current.value, i, total))
        }
      />
    </div>
  );
}

/* ---------- helpers ---------- */
function wrapDiff(v: number, N: number) {
  const r = ((v % N) + N) % N; // [0..N)
  return r > N / 2 ? r - N : r; // (-N/2..N/2]
}
function nearestJump(from: number, toIndex: number, N: number) {
  const cur = ((from % N) + N) % N;
  let forward = toIndex - cur;
  let backward = forward - N;
  if (Math.abs(backward) < Math.abs(forward)) return from + backward;
  return from + forward;
}
function Dots({
  count,
  getIndex,
  onJump,
}: {
  count: number;
  getIndex: () => number;
  onJump: (i: number) => void;
}) {
  const [, force] = useState(0);
  useEffect(() => {
    const id = setInterval(() => force((n) => n + 1), 200);
    return () => clearInterval(id);
  }, []);
  const active = Math.round(getIndex()) % count;

  return (
    <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
      {new Array(count).fill(0).map((_, i) => (
        <button
          key={i}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onJump(i)}
          className="h-2 w-2 rounded-full transition-transform"
          style={{
            background: "currentColor",
            color: "white",
            opacity: i === active ? 1 : 0.35,
            transform: i === active ? "scale(1.2)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}
