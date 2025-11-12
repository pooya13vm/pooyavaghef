"use client";

import React from "react";
import { ThemeToggler, type ThemeSelection } from "./theme-toggler";
import { FiSun, FiMoon } from "react-icons/fi";
import { gsap } from "gsap";

// فقط این تابع مسئول HTML کلاس و data-theme است
function applyThemeToDocument(theme: ThemeSelection) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "light");
  // دقت کن: چون body در حالت معمولی دارکه،
  // وقتی می‌خواهیم لایت بشه، کلاس dark رو روشن می‌کنیم.
  root.dataset.theme = theme;
}

export function ThemeToggleButton() {
  const [theme, setTheme] = React.useState<ThemeSelection>("dark");

  // مقدار اولیه + localStorage
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(
      "theme"
    ) as ThemeSelection | null;

    const initial: ThemeSelection =
      stored === "light" || stored === "dark" ? stored : "dark";

    setTheme(initial);
    applyThemeToDocument(initial);
  }, []);

  const handleSetTheme = React.useCallback((next: ThemeSelection) => {
    setTheme(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", next);
    }
    applyThemeToDocument(next);
  }, []);

  return (
    <ThemeToggler theme={theme} setTheme={handleSetTheme} direction="ttb">
      {({ theme: effective, toggleTheme }) => (
        <AnimatedToggle
          effective={effective}
          onToggle={() => toggleTheme(effective === "dark" ? "light" : "dark")}
        />
      )}
    </ThemeToggler>
  );
}

// —————————— دکمه‌ی انیمیشنی با GSAP ——————————

type AnimatedToggleProps = {
  effective: ThemeSelection;
  onToggle: () => void;
};

const AnimatedToggle: React.FC<AnimatedToggleProps> = ({
  effective,
  onToggle,
}) => {
  const knobRef = React.useRef<HTMLDivElement | null>(null);
  const moonRef = React.useRef<HTMLDivElement | null>(null);
  const sunRef = React.useRef<HTMLDivElement | null>(null);

  const initialX = effective === "dark" ? 2 : 26;

  React.useEffect(() => {
    if (!knobRef.current) return;

    const isDark = effective === "dark";
    const x = isDark ? 2 : 26;

    gsap.to(knobRef.current, {
      x,
      duration: 0.4,
      ease: "power3.out",
    });

    if (moonRef.current && sunRef.current) {
      gsap.to(moonRef.current, {
        opacity: isDark ? 1 : 0.3,
        scale: isDark ? 1 : 0.8,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(sunRef.current, {
        opacity: isDark ? 0.3 : 1,
        scale: isDark ? 0.8 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [effective]);

  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        relative inline-flex h-8 w-14 items-center
        rounded-full border border-white/15
        bg-white/5 dark:bg-black/40
        shadow-sm backdrop-blur-sm
        hover:bg-white/10 dark:hover:bg-black/60
        transition-colors
      "
      aria-label="Toggle theme"
    >
      {/* آیکون‌های ثابت کنار ریل */}
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[11px] pointer-events-none">
        <div ref={moonRef} className="h-3 w-3 flex items-center justify-center">
          <FiMoon className="h-3 w-3" />
        </div>

        <div ref={sunRef} className="h-3 w-3 flex items-center justify-center">
          <FiSun className="h-3 w-3" />
        </div>
      </div>

      {/* توپک متحرک */}
      <div
        ref={knobRef}
        className="
          relative z-10 h-6 w-6 rounded-full
          bg-white text-black
          flex items-center justify-center
          shadow-lg
        "
        style={{ transform: `translateX(${initialX}px)` }}
      >
        {effective === "dark" ? (
          <FiMoon className="h-3 w-3" />
        ) : (
          <FiSun className="h-3 w-3" />
        )}
      </div>
    </button>
  );
};
