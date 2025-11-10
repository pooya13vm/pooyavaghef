"use client";

import React, { memo } from "react";
import ThreadsOriginal from "./Threads";

const THREADS_COLOR: [number, number, number] = [0.25, 0.6, 1.0];

const ThreadsStatic = memo(ThreadsOriginal);

export function BackgroundThreads() {
  return (
    <div className="absolute inset-0 -z-10">
      <ThreadsStatic
        color={THREADS_COLOR}
        amplitude={1.4}
        distance={0.6}
        enableMouseInteraction={true}
      />
    </div>
  );
}
