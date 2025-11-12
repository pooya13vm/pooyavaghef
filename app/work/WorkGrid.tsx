"use client";

import ChromaGrid, {
  type ChromaItem,
} from "@/app/Components/ChromaGrid/ChromaGrid";

const workItems: ChromaItem[] = [
  {
    image: "/work/Apex.png",
    title: "SaaS Analytics Dashboard",
    subtitle: "Next.js · Design & Frontend",
    url: "https://example.com",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(145deg,#1d4ed8,#020617)",
  },
  {
    image: "/work/Apex.png",
    title: "Lifestyle Shopify Store",
    subtitle: "Shopify · Theme customization",
    url: "https://example.com",
    borderColor: "#22c55e",
    gradient: "linear-gradient(145deg,#16a34a,#020617)",
  },
  {
    image: "/work/Apex.png",
    title: "Product Landing Page",
    subtitle: "WordPress · Custom theme",
    url: "https://example.com",
    borderColor: "#eab308",
    gradient: "linear-gradient(145deg,#eab308,#020617)",
  },
  {
    image: "/work/Apex.png",
    title: "iOS App UI",
    subtitle: "Swift / React Native",
    url: "https://example.com",
    borderColor: "#ec4899",
    gradient: "linear-gradient(145deg,#ec4899,#020617)",
  },
  {
    image: "/work/Apex.png",
    title: "Android App UI",
    subtitle: "Kotlin / React Native",
    url: "https://example.com",
    borderColor: "#22d3ee",
    gradient: "linear-gradient(145deg,#22d3ee,#020617)",
  },
  {
    image: "/work/Apex.png",
    title: "SEO Reporting Dashboard",
    subtitle: "Next.js · Data viz",
    url: "https://example.com",
    borderColor: "#a855f7",
    gradient: "linear-gradient(145deg,#a855f7,#020617)",
  },
];

export function WorkGrid() {
  return (
    <div className="w-full max-w-5xl mx-auto h-[380px]">
      <ChromaGrid
        items={workItems}
        className="py-4"
        radius={260}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
}
