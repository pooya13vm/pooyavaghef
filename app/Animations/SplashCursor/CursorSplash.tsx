"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";

export function CursorSplash() {
  const pathname = usePathname();
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <SplashCursor
        key={`${pathname}-${isSmall ? "small" : "large"}`}
        COLOR_UPDATE_SPEED={1}
        SIM_RESOLUTION={isSmall ? 72 : 120}
        DYE_RESOLUTION={isSmall ? 512 : 1024}
        CAPTURE_RESOLUTION={isSmall ? 256 : 512}
        PRESSURE_ITERATIONS={isSmall ? 10 : 20}
        PIXEL_RATIO={isSmall ? 1 : 1.5}
        MAX_FPS={isSmall ? 30 : 60}
      />
    </div>
  );
}
