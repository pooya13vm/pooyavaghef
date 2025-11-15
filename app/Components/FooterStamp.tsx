"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface FooterStampProps {
  size?: number;
}

export function FooterStamp({ size = 120 }: FooterStampProps) {
  const groupRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    // فقط چرخش آرام و بی‌نهایت متن دایره‌ای
    if (groupRef.current) {
      gsap.to(groupRef.current, {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }
  }, []);

  const radius = 42;
  const text = ` ★ 2025 · ALL RIGHTS RESERVED   ★   DESIGNED BY POOYA VAGHEF ·  `;

  return (
    <div
      className="
        relative flex items-center justify-center
        text-neutral-600 dark:text-neutral-400
      "
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className="w-full h-full"
      >
        <defs>
          <path
            id="footer-circle-path"
            d={`
              M 60,60
              m -${radius},0
              a ${radius},${radius} 0 1,1 ${radius * 2},0
              a ${radius},${radius} 0 1,1 -${radius * 2},0
            `}
          />
        </defs>

        <g ref={groupRef}>
          <text
            fontSize="12"
            letterSpacing="4"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
            fill="currentColor"
          >
            <textPath
              xlinkHref="#footer-circle-path"
              startOffset="0%"
              textLength={Math.PI * 2 * radius}
            >
              {text}
            </textPath>
          </text>
        </g>

        <circle cx="60" cy="60" r="3" fill="currentColor" />
      </svg>
    </div>
  );
}
