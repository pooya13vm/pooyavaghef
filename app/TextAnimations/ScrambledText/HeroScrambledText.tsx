// app/TextAnimations/ScrambledText/HeroScrambledText.tsx
"use client";

import ScrambledText from "./ScrambledText";

interface HeroScrambledTextProps {
  text: string;
  className?: string;
}

export function HeroScrambledText({ text, className }: HeroScrambledTextProps) {
  return (
    <ScrambledText
      className={className}
      radius={40}
      duration={2}
      speed={0.1}
      scrambleChars="01"
    >
      {text}
    </ScrambledText>
  );
}
