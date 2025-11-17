// "use client";

// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { CertificatesCarousel } from "./CertificatesCarousel";

// export default function AboutPageClient() {
//   const rootRef = useRef<HTMLElement | null>(null);
//   const textWrap = useRef<HTMLDivElement | null>(null);
//   const certsWrap = useRef<HTMLDivElement | null>(null);

//   useLayoutEffect(() => {
//     if (!rootRef.current) return;

//     const ctx = gsap.context(() => {
//       // حالت شروع
//       if (textWrap.current)
//         gsap.set(textWrap.current, { x: -160, autoAlpha: 0, force3D: true });
//       if (certsWrap.current)
//         gsap.set(certsWrap.current, { x: 160, autoAlpha: 0, force3D: true });
//       textWrap.current?.classList.remove("opacity-0");
//       certsWrap.current?.classList.remove("opacity-0");

//       const tl = gsap.timeline({
//         defaults: { ease: "power3.out", duration: 1.2 },
//       });
//       if (textWrap.current)
//         tl.to(textWrap.current, {
//           x: 0,
//           autoAlpha: 1,
//           clearProps: "transform",
//         });
//       if (certsWrap.current)
//         tl.to(
//           certsWrap.current,
//           { x: 0, autoAlpha: 1, clearProps: "transform" },
//           "-=0.35"
//         );
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
//       {/* ستون متن */}
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

//       <div
//         ref={certsWrap}
//         className="flex flex-1 justify-center lg:justify-end"
//       >
//         <CertificatesCarousel />
//       </div>
//     </section>
//   );
// }
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { CertificatesCarousel } from "./CertificatesCarousel";

export default function AboutPageClient() {
  const rootRef = useRef<HTMLElement | null>(null);
  const textWrap = useRef<HTMLDivElement | null>(null);
  const certsWrap = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      if (textWrap.current)
        gsap.set(textWrap.current, { x: -160, autoAlpha: 0, force3D: true });
      if (certsWrap.current)
        gsap.set(certsWrap.current, { x: 160, autoAlpha: 0, force3D: true });
      textWrap.current?.classList.remove("opacity-0");
      certsWrap.current?.classList.remove("opacity-0");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 },
      });
      if (textWrap.current)
        tl.to(textWrap.current, {
          x: 0,
          autoAlpha: 1,
          clearProps: "transform",
        });
      if (certsWrap.current)
        tl.to(
          certsWrap.current,
          { x: 0, autoAlpha: 1, clearProps: "transform" },
          "-=0.35"
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="
        flex min-h-screen w-full items-center
         lg:min-h-[calc(100vh-88px)]
         mt-[-70px]
        
      "
    >
      {/* ظرف مرکزی محدود و وسط‌چین */}
      <div
        className="
          mx-auto w-full max-w-6xl
          flex flex-col lg:flex-row
          items-center 
          justify-center
          gap-10 lg:gap-16
        "
      >
        {/* ستون متن */}
        <div
          ref={textWrap}
          className="
            w-full max-w-[520px]
            space-y-4 text-center lg:text-left
            lg:self-center
          "
        >
          <h1 className="text-3xl font-semibold tracking-tight text-white dark:text-black">
            About
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 dark:text-neutral-600">
            Frontend & full-stack developer with a strong focus on modern web
            stacks, motion, and delightful UX. I enjoy combining clean systems
            thinking with playful details and thoughtful micro-interactions.
          </p>
        </div>

        {/* ستون کروسل — وسط‌چین با ارتفاع ثابت */}
        <div
          ref={certsWrap}
          className="
            w-full max-w-[520px]
            lg:self-center
          "
        >
          <div className="w-full h-[240px] sm:h-[280px] lg:h-[320px] grid place-items-center mb-16">
            <CertificatesCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
