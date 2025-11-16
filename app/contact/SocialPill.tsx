"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { IconType } from "react-icons";

export interface SocialLink {
  name: string;
  href: string;
  Icon: IconType;
}

interface SocialPillProps {
  link: SocialLink;
}

export const SocialPill: React.FC<SocialPillProps> = ({ link }) => {
  const pillRef = useRef<HTMLButtonElement | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = pillRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleEnter = () => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      "--blob-scale": 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const handleLeave = () => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      "--blob-scale": 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    window.open(link.href, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      ref={pillRef}
      type="button"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      aria-label={link.name}
      title={link.name}
      className={`
        relative inline-flex items-center justify-center
        rounded-full overflow-hidden cursor-pointer
        transition-transform duration-300 hover:-translate-y-1 active:scale-95
        select-none
        h-12 w-12 md:h-16 md:w-16
        [--pill-bg:rgba(5,8,20,0.80)] dark:[--pill-bg:rgba(255,255,255,0.82)]
        [--pill-border:rgba(255,255,255,0.10)] dark:[--pill-border:rgba(0,0,0,0.10)]
        [--ring:rgba(255,255,255,0.10)] dark:[--ring:rgba(0,0,0,0.12)]
        [--icon:rgba(255,255,255,0.96)] dark:[--icon:#0b0b0b]
        [--glow:rgba(56,189,248,0.40)] dark:[--glow:rgba(14,165,233,0.22)]

        bg-[var(--pill-bg)] border border-[var(--pill-border)]
      `}
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--blob-scale": 1,
        } as React.CSSProperties
      }
    >
      {/* افکت گِلو/قطره */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--glow), transparent 55%)",
          transform: "scale(var(--blob-scale))",
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* حلقه‌ی بیرونی لطیف */}
      <div className="absolute inset-[2px] rounded-full border border-[var(--ring)]" />

      {/* آیکون */}
      <span className="relative z-10 text-[var(--icon)] text-xl md:text-2xl leading-none">
        <link.Icon />
      </span>
    </button>
  );
};
