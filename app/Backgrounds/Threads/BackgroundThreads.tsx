"use client";

import React, { memo, useEffect, useState } from "react";
import ThreadsOriginal from "./Threads";

const THREADS_COLOR: [number, number, number] = [0.25, 0.6, 1.0];

const ThreadsStatic = memo(ThreadsOriginal);

export function BackgroundThreads() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <ThreadsStatic
        color={THREADS_COLOR}
        amplitude={1.4}
        distance={0.6}
        enableMouseInteraction={true}
        dpr={isSmall ? 0.75 : 1}
        maxFps={isSmall ? 30 : 60}
      />
    </div>
  );
}
