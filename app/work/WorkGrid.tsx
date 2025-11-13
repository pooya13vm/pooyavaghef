"use client";

import ChromaGrid, {
  type ChromaItem,
} from "@/app/Components/ChromaGrid/ChromaGrid";

const workItems: ChromaItem[] = [
  {
    image: "/work/Apex.webp",
    title: "Wordpress & React.js",
    subtitle: "APEX Media",
    url: "https://apexmedia.com/",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(145deg,#1d4ed8,#020617)",
  },
  {
    image: "/work/feiz.webp",
    title: "Wordpress Elementor",
    subtitle: "Feiz church",
    url: "https://www.feiz.church/",
    borderColor: "#22c55e",
    gradient: "linear-gradient(145deg,#16a34a,#020617)",
  },
  {
    image: "/work/thinkplus.webp",
    title: "Wordpress Elementor",
    subtitle: "Think plus VC",
    url: "https://thinkplus.vc/",
    borderColor: "#eab308",
    gradient: "linear-gradient(145deg,#eab308,#020617)",
  },
  {
    image: "/work/temp-mail.webp",
    title: "Next.js",
    subtitle: "Best Temp E-mail Generator",
    url: "https://temp-mail.best/",
    borderColor: "#ec4899",
    gradient: "linear-gradient(145deg,#ec4899,#020617)",
  },
  {
    image: "/work/fitamate.webp",
    title: "Shopify",
    subtitle: "fitaminat shop",
    url: "https://fitaminat.com/",
    borderColor: "#22d3ee",
    gradient: "linear-gradient(145deg,#22d3ee,#020617)",
  },
  {
    image: "/work/dermaroller.webp",
    title: "Shopify",
    subtitle: "Dermaroller shop",
    url: "https://dermaroller.me/",
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
