"use client";

import * as React from "react";
import { flushSync } from "react-dom";

export type ThemeSelection = "light" | "dark";
export type Direction = "btt" | "ttb" | "ltr" | "rtl";

type ChildrenRender =
  | React.ReactNode
  | ((state: {
      theme: ThemeSelection;
      toggleTheme: (theme: ThemeSelection) => void;
    }) => React.ReactNode);

function getClipKeyframes(direction: Direction): [string, string] {
  switch (direction) {
    case "ltr":
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
    case "rtl":
      return ["inset(0 0 0 100%)", "inset(0 0 0 0)"];
    case "ttb":
      return ["inset(0 0 100% 0)", "inset(0 0 0 0)"];
    case "btt":
      return ["inset(100% 0 0 0)", "inset(0 0 0 0)"];
    default:
      return ["inset(0 100% 0 0)", "inset(0 0 0 0)"];
  }
}

export type ThemeTogglerProps = {
  theme: ThemeSelection;
  setTheme: (theme: ThemeSelection) => void; // فقط استیت + DOM + localStorage
  direction?: Direction;
  children?: ChildrenRender;
};

export function ThemeToggler({
  theme,
  setTheme,
  direction = "ltr",
  children,
}: ThemeTogglerProps) {
  const [fromClip, toClip] = getClipKeyframes(direction);

  const handleToggle = React.useCallback(
    async (next: ThemeSelection) => {
      if (typeof document === "undefined") {
        setTheme(next);
        return;
      }

      // اگر ViewTransition نیست، خیلی ساده ست کن
      if (!document.startViewTransition) {
        flushSync(() => {
          setTheme(next);
        });
        return;
      }

      // با ViewTransition
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
        });
      }).ready;

      document.documentElement
        .animate(
          { clipPath: [fromClip, toClip] },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
        .finished.catch(() => {});
    },
    [setTheme, fromClip, toClip]
  );

  return (
    <>
      {typeof children === "function"
        ? children({ theme, toggleTheme: handleToggle })
        : children}
      <style>{`::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal;}`}</style>
    </>
  );
}
