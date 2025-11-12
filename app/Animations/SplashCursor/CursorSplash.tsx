"use client";

import SplashCursor from "./SplashCursor";

export function CursorSplash() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <SplashCursor
        COLOR_UPDATE_SPEED={1}
        SIM_RESOLUTION={120}
        CAPTURE_RESOLUTION={512}
      />
    </div>
  );
}
