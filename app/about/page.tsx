// // app/about/page.tsx
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { CertificatesCarousel } from "./CertificatesCarousel";

// export default function AboutPage() {
//   const rootRef = useRef<HTMLElement | null>(null);
//   const textRef = useRef<HTMLDivElement | null>(null);
//   const certsRef = useRef<HTMLDivElement | null>(null);

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         defaults: { ease: "power4.out", duration: 1.2 },
//       });

//       // ستون متن: می‌تونی فید هم داشته باشه
//       if (textRef.current) {
//         tl.from(textRef.current, {
//           x: -190,
//           opacity: 0,
//           duration: 1.1,
//           immediateRender: false,
//         });
//       }

//       // ستون کاروسل: فقط ترنسلیت (بدون opacity) تا شیشه‌ای ثابت بماند
//       if (certsRef.current) {
//         tl.from(
//           certsRef.current,
//           {
//             x: 190,
//             duration: 1.15,
//             immediateRender: false,
//             force3D: true,
//           },
//           "-=0.35" // کمی هم‌پوشانی
//         );
//       }
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef}
//       className="
//         mt-12 md:mt-16
//         flex h-full w-full flex-col items-center justify-center gap-10 px-6
//         lg:mt-10
//         lg:flex-row lg:items-center lg:justify-between
//       "
//     >
//       {/* ستون متن About */}
//       <div
//         ref={textRef}
//         className="max-w-xl space-y-4 text-center lg:text-left"
//       >
//         <h1
//           className="
//             text-3xl font-semibold tracking-tight
//             text-white dark:text-black
//           "
//         >
//           About
//         </h1>
//         <p
//           className="
//             text-sm leading-relaxed
//             text-neutral-300 dark:text-neutral-600
//           "
//         >
//           Frontend & full-stack developer with a strong focus on modern web
//           stacks, motion, and delightful UX. I enjoy combining clean systems
//           thinking with playful details and thoughtful micro-interactions.
//         </p>
//       </div>

//       <div
//         ref={certsRef}
//         className="flex flex-1 justify-center lg:justify-end will-change-transform"
//       >
//         <CertificatesCarousel />
//       </div>
//     </section>
//   );
// }
// "use client";

// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { CertificatesCarousel } from "./CertificatesCarousel";

// export const metadata = {
//   title: "About",
//   description:
//     "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
// };

// export default function AboutPage() {
//   const rootRef = useRef<HTMLElement | null>(null);
//   const textWrap = useRef<HTMLDivElement | null>(null);
//   const certsWrap = useRef<HTMLDivElement | null>(null);

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       // حالت شروع را قبل از پینت قفل کن
//       if (textWrap.current)
//         gsap.set(textWrap.current, { x: -160, autoAlpha: 0 });
//       if (certsWrap.current)
//         gsap.set(certsWrap.current, { x: 160, autoAlpha: 0 });

//       // اگر جایی "opacity-0" گذاشتی، همین‌جا خارجش کن که بعد از clearProps دوباره غالب نشه
//       textWrap.current?.classList.remove("opacity-0");
//       certsWrap.current?.classList.remove("opacity-0");

//       const tl = gsap.timeline({
//         defaults: { ease: "power3.out", duration: 1.3 },
//       });
//       if (textWrap.current) {
//         tl.to(textWrap.current, {
//           x: 0,
//           autoAlpha: 1,
//           clearProps: "transform",
//         });
//       }
//       if (certsWrap.current) {
//         tl.to(
//           certsWrap.current,
//           { x: 0, autoAlpha: 1, clearProps: "transform" },
//           "-=0.35"
//         );
//       }
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef}
//       className="
//         mt-12 md:mt-16
//         flex h-full w-full flex-col items-center justify-center gap-10 px-6
//         lg:mt-10 lg:flex-row lg:items-center lg:justify-between
//       "
//     >
//       {/* ستون متن About */}
//       <div
//         ref={textWrap}
//         className="max-w-xl space-y-4 text-center lg:text-left"
//       >
//         <h1 className="text-3xl font-semibold tracking-tight text-white dark:text-black">
//           About
//         </h1>
//         <p className="text-sm leading-relaxed text-neutral-300 dark:text-neutral-600">
//           Frontend & full-stack developer with a strong focus on modern web
//           stacks, motion, and delightful UX. I enjoy combining clean systems
//           thinking with playful details and thoughtful micro-interactions.
//         </p>
//       </div>

//       {/* ستون کاروسل */}
//       <div
//         ref={certsWrap}
//         className="flex flex-1 justify-center lg:justify-end"
//       >
//         <CertificatesCarousel />
//       </div>
//     </section>
//   );
// }
// app/about/page.tsx
import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description:
      "Full-stack web & mobile developer focused on clean UX and performance. Next.js & React Native, plus Shopify and WordPress experience.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
