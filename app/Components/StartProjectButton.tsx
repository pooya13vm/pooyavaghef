"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiArrowRight } from "react-icons/fi";

export function StartProjectButton() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // فقط انیمیشن هاور
  useEffect(() => {
    if (!pillRef.current) return;

    const pill = pillRef.current;

    const tl = gsap.timeline({ paused: true });

    tl.to(pill, {
      width: "calc(100% + 1rem)",
      ease: "elastic.out(0.25, 0.5)",
      duration: 0.4,
    });

    tl.to(pill, {
      width: "2.25rem",
      left: "calc(100% - 1.7rem)",
      ease: "elastic.out(0.5, 0.5)",
      duration: 0.6,
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseEnter = () => tlRef.current?.play();
  const handleMouseLeave = () => tlRef.current?.reverse();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = "mailto:vaghef.pooya@gmail.com";
  };

  return (
    <a
      ref={buttonRef}
      href="mailto:vaghef.pooya@gmail.com"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        relative inline-flex items-center
        font-semibold tracking-tight text-sm md:text-base
        text-white dark:text-black
        select-none transition-transform duration-200
        active:scale-[0.97] cursor-pointer pointer-events-auto
      "
    >
      <div
        ref={pillRef}
        className="
          absolute top-1/2 -translate-y-1/2
          rounded-full bg-[rgba(64,152,255,0.20)]
          border border-white/40
          shadow-[0_0_30px_rgba(64,152,255,0.55)]
          backdrop-blur-xl
        "
        style={{ width: "2.25rem", height: "2.25rem", left: "-0.1rem" }}
      />
      <span className="relative pl-4 pr-2">Start a project</span>
      <FiArrowRight className="relative ml-1 h-4 w-4" />
    </a>
  );
}
