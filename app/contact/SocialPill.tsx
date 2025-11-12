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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mouse-x", `${x}px`);
    el.style.setProperty("--mouse-y", `${y}px`);
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
      className="
        relative inline-flex items-center justify-center
        h-16 w-16 rounded-full
        bg-[#050814]/80
        border border-white/10
        overflow-hidden
        cursor-pointer
        transition-transform duration-300
        hover:-translate-y-1
        active:scale-95
      "
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--blob-scale": 1,
        } as React.CSSProperties
      }
      aria-label={link.name}
    >
      {/* افکت قطره / نور */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(96,165,250,0.45), transparent 55%)",
          transform: "scale(var(--blob-scale))",
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* حلقه‌ی بیرونی ملایم */}
      <div className="absolute inset-[2px] rounded-full border border-white/10 mix-blend-screen" />

      {/* خود آیکون */}
      <span className="relative z-10 text-2xl text-white">
        <link.Icon />
      </span>
    </button>
  );
};
