// /*
// 	Installed from https://reactbits.dev/ts/tailwind/
// */

// import { useEffect, useState, useRef } from "react";
// import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
// import React, { JSX } from "react";
// import type { Transition } from "motion/react";
// import Image from "next/image";

// // replace icons with your own if needed
// import {
//   FiCircle,
//   FiCode,
//   FiFileText,
//   FiLayers,
//   FiLayout,
// } from "react-icons/fi";
// // export interface CarouselItem {
// //   title: string;
// //   description: string;
// //   id: number;
// //   icon: React.ReactNode;
// // }
// export interface CarouselItem {
//   id: number;
//   icon?: React.ReactNode;
//   title?: string;
//   description?: string;
//   imageSrc?: string;
//   imageAlt?: string;
// }

// export interface CarouselProps {
//   items?: CarouselItem[];
//   baseWidth?: number;
//   autoplay?: boolean;
//   autoplayDelay?: number;
//   pauseOnHover?: boolean;
//   loop?: boolean;
//   round?: boolean;
// }

// const DEFAULT_ITEMS: CarouselItem[] = [
//   {
//     title: "Text Animations",
//     description: "Cool text animations for your projects.",
//     id: 1,
//     icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
//   },
//   {
//     title: "Animations",
//     description: "Smooth animations for your projects.",
//     id: 2,
//     icon: <FiCircle className="h-[16px] w-[16px] text-white" />,
//   },
//   {
//     title: "Components",
//     description: "Reusable components for your projects.",
//     id: 3,
//     icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
//   },
//   {
//     title: "Backgrounds",
//     description: "Beautiful backgrounds and patterns for your projects.",
//     id: 4,
//     icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
//   },
//   {
//     title: "Common UI",
//     description: "Common UI components are coming soon!",
//     id: 5,
//     icon: <FiCode className="h-[16px] w-[16px] text-white" />,
//   },
// ];

// const DRAG_BUFFER = 0;
// const VELOCITY_THRESHOLD = 500;
// const GAP = 16;
// // const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };
// const SPRING_OPTIONS: Transition = {
//   type: "spring",
//   stiffness: 300,
//   damping: 30,
// };

// export default function Carousel({
//   items = DEFAULT_ITEMS,
//   baseWidth = 300,
//   autoplay = false,
//   autoplayDelay = 3000,
//   pauseOnHover = false,
//   loop = false,
//   round = false,
// }: CarouselProps): JSX.Element {
//   const containerPadding = 16;
//   const itemWidth = baseWidth - containerPadding * 2;
//   const trackItemOffset = itemWidth + GAP;

//   const carouselItems = loop ? [...items, items[0]] : items;
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
//   const x = useMotionValue(0);
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const [isResetting, setIsResetting] = useState<boolean>(false);

//   const containerRef = useRef<HTMLDivElement>(null);
//   useEffect(() => {
//     if (pauseOnHover && containerRef.current) {
//       const container = containerRef.current;
//       const handleMouseEnter = () => setIsHovered(true);
//       const handleMouseLeave = () => setIsHovered(false);
//       container.addEventListener("mouseenter", handleMouseEnter);
//       container.addEventListener("mouseleave", handleMouseLeave);
//       return () => {
//         container.removeEventListener("mouseenter", handleMouseEnter);
//         container.removeEventListener("mouseleave", handleMouseLeave);
//       };
//     }
//   }, [pauseOnHover]);

//   useEffect(() => {
//     if (autoplay && (!pauseOnHover || !isHovered)) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prev) => {
//           if (prev === items.length - 1 && loop) {
//             return prev + 1;
//           }
//           if (prev === carouselItems.length - 1) {
//             return loop ? 0 : prev;
//           }
//           return prev + 1;
//         });
//       }, autoplayDelay);
//       return () => clearInterval(timer);
//     }
//   }, [
//     autoplay,
//     autoplayDelay,
//     isHovered,
//     loop,
//     items.length,
//     carouselItems.length,
//     pauseOnHover,
//   ]);

//   // const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

//   const effectiveTransition: Transition = isResetting
//     ? { duration: 0 }
//     : SPRING_OPTIONS;

//   const handleAnimationComplete = () => {
//     if (loop && currentIndex === carouselItems.length - 1) {
//       setIsResetting(true);
//       x.set(0);
//       setCurrentIndex(0);
//       setTimeout(() => setIsResetting(false), 50);
//     }
//   };

//   const handleDragEnd = (
//     _: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ): void => {
//     const offset = info.offset.x;
//     const velocity = info.velocity.x;
//     if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
//       if (loop && currentIndex === items.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
//       }
//     } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
//       if (loop && currentIndex === 0) {
//         setCurrentIndex(items.length - 1);
//       } else {
//         setCurrentIndex((prev) => Math.max(prev - 1, 0));
//       }
//     }
//   };

//   const dragProps = loop
//     ? {}
//     : {
//         dragConstraints: {
//           left: -trackItemOffset * (carouselItems.length - 1),
//           right: 0,
//         },
//       };

//   return (
//     <div
//       ref={containerRef}
//       className={`relative overflow-hidden p-4 ${
//         round
//           ? "rounded-full border border-white"
//           : "rounded-[24px] border border-[#222]"
//       }`}
//       style={{
//         width: `${baseWidth}px`,
//         ...(round && { height: `${baseWidth}px` }),
//       }}
//     >
//       {/* <motion.div
//         className="flex"
//         drag="x"
//         {...dragProps}
//         style={{
//           width: itemWidth,
//           gap: `${GAP}px`,
//           perspective: 1000,
//           perspectiveOrigin: `${
//             currentIndex * trackItemOffset + itemWidth / 2
//           }px 50%`,
//           x,
//         }}
//         onDragEnd={handleDragEnd}
//         animate={{ x: -(currentIndex * trackItemOffset) }}
//         transition={effectiveTransition}
//         onAnimationComplete={handleAnimationComplete}
//       >
//         {carouselItems.map((item, index) => {
//           const range = [
//             -(index + 1) * trackItemOffset,
//             -index * trackItemOffset,
//             -(index - 1) * trackItemOffset,
//           ];
//           const outputRange = [90, 0, -90];
//           const rotateY = useTransform(x, range, outputRange, { clamp: false });
//           return (
//             <motion.div
//               key={index}
//               className={`relative shrink-0 flex flex-col ${
//                 round
//                   ? "items-center justify-center text-center bg-[#060010] border-0"
//                   : "items-start justify-between bg-[#222] border border-[#222] rounded-[12px]"
//               } overflow-hidden cursor-grab active:cursor-grabbing`}
//               style={{
//                 width: itemWidth,
//                 height: round ? itemWidth : "100%",
//                 rotateY: rotateY,
//                 ...(round && { borderRadius: "50%" }),
//               }}
//               transition={effectiveTransition}
//             >

//               <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
//                 <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">
//                   {item.icon}
//                 </span>
//               </div>

//               {item.imageSrc ? (
//                 <div className="p-5">
//                   <Image
//                     src={item.imageSrc}
//                     alt={item.imageAlt ?? item.title ?? "Certificate"}
//                     width={400}
//                     height={260}
//                     className="w-full h-auto rounded-lg object-contain"
//                   />
//                 </div>
//               ) : (
//                 <div className="p-5">
//                   <div className="mb-1 font-black text-lg text-white">
//                     {item.title}
//                   </div>
//                   <p className="text-sm text-white">{item.description}</p>
//                 </div>
//               )}
//             </motion.div>
//           );
//         })}
//       </motion.div> */}
//       <motion.div
//         className="flex"
//         drag="x"
//         {...dragProps}
//         style={{
//           width: itemWidth,
//           gap: `${GAP}px`,
//           perspective: 1000,
//           perspectiveOrigin: `${
//             currentIndex * trackItemOffset + itemWidth / 2
//           }px 50%`,
//           x,
//         }}
//         onDragEnd={handleDragEnd}
//         animate={{ x: -(currentIndex * trackItemOffset) }}
//         transition={effectiveTransition}
//         onAnimationComplete={handleAnimationComplete}
//       >
//         {carouselItems.map((item, index) => {
//           const range = [
//             -(index + 1) * trackItemOffset,
//             -index * trackItemOffset,
//             -(index - 1) * trackItemOffset,
//           ];
//           const outputRange = [90, 0, -90];
//           const rotateY = useTransform(x, range, outputRange, { clamp: false });

//           const isImageCard = Boolean(item.imageSrc);

//           return (
//             <motion.div
//               key={index}
//               className={`relative shrink-0 flex flex-col ${
//                 round
//                   ? "items-center justify-center text-center bg-[#060010] border-0"
//                   : "items-start justify-between bg-[#222] border border-[#222] rounded-[12px]"
//               } overflow-hidden cursor-grab active:cursor-grabbing`}
//               style={{
//                 width: itemWidth,
//                 rotateY,
//                 ...(round && { height: itemWidth, borderRadius: "50%" }),
//               }}
//               transition={effectiveTransition}
//             >
//               {/* دایره‌ی آیکن بالا */}
//               <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
//                 <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#060010]">
//                   {item.icon}
//                 </span>
//               </div>

//               {/* اگر imageSrc داشت → فقط عکس سرتیفیکیت؛ در غیر این صورت متن قدیمی */}
//               {isImageCard ? (
//                 <div className="relative w-full aspect-[4/3]">
//                   <Image
//                     src={item.imageSrc}
//                     alt={item.imageAlt ?? item.title ?? "Certificate"}
//                     fill
//                     className="object-contain rounded-lg"
//                     sizes={`${itemWidth}px`}
//                   />
//                 </div>
//               ) : (
//                 <div className="p-5">
//                   <div className="mb-1 font-black text-lg text-white">
//                     {item.title}
//                   </div>
//                   <p className="text-sm text-white">{item.description}</p>
//                 </div>
//               )}
//             </motion.div>
//           );
//         })}
//       </motion.div>
//       <div
//         className={`flex w-full justify-center ${
//           round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
//         }`}
//       >
//         <div className="mt-4 flex w-[150px] justify-between px-8">
//           {items.map((_, index) => (
//             <motion.div
//               key={index}
//               className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
//                 currentIndex % items.length === index
//                   ? round
//                     ? "bg-white"
//                     : "bg-[#333333]"
//                   : round
//                   ? "bg-[#555]"
//                   : "bg-[rgba(51,51,51,0.4)]"
//               }`}
//               animate={{
//                 scale: currentIndex % items.length === index ? 1.2 : 1,
//               }}
//               onClick={() => setCurrentIndex(index)}
//               transition={{ duration: 0.15 }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { JSX, useEffect, useRef, useState } from "react";
// import {
//   motion,
//   PanInfo,
//   useMotionValue,
//   useTransform,
//   type Transition,
// } from "motion/react";
// import Image from "next/image";

// export interface CarouselItem {
//   id: number;
//   imageSrc: string;
//   imageAlt?: string;
//   icon?: React.ReactNode; // مثلا FiAward
// }

// export interface CarouselProps {
//   items: CarouselItem[];
//   baseWidth?: number;
//   autoplay?: boolean;
//   autoplayDelay?: number;
//   pauseOnHover?: boolean;
//   loop?: boolean;
// }

// const DRAG_BUFFER = 0;
// const VELOCITY_THRESHOLD = 500;
// const GAP = 16;

// const SPRING: Transition = {
//   type: "spring",
//   stiffness: 300,
//   damping: 30,
// };

// export default function Carousel({
//   items,
//   baseWidth = 520,
//   autoplay = false,
//   autoplayDelay = 3000,
//   pauseOnHover = false,
//   loop = false,
// }: CarouselProps): JSX.Element {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const x = useMotionValue(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isResetting, setIsResetting] = useState(false);

//   const slideWidth = baseWidth;
//   const trackItemOffset = slideWidth + GAP;

//   // برای loop مثل ReactBits: آیتم اول رو کلون می‌کنیم
//   const carouselItems = loop && items.length > 0 ? [...items, items[0]] : items;

//   // توقف autoplay موقع hover
//   useEffect(() => {
//     if (!pauseOnHover || !containerRef.current) return;
//     const el = containerRef.current;
//     const enter = () => setIsHovered(true);
//     const leave = () => setIsHovered(false);
//     el.addEventListener("mouseenter", enter);
//     el.addEventListener("mouseleave", leave);
//     return () => {
//       el.removeEventListener("mouseenter", enter);
//       el.removeEventListener("mouseleave", leave);
//     };
//   }, [pauseOnHover]);

//   // autoplay با منطق خود ReactBits
//   useEffect(() => {
//     if (!autoplay) return;
//     if (pauseOnHover && isHovered) return;
//     if (carouselItems.length === 0) return;

//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => {
//         if (prev === items.length - 1 && loop) {
//           // می‌ریم روی اسلاید کلون‌شده
//           return prev + 1;
//         }
//         if (prev === carouselItems.length - 1) {
//           return loop ? 0 : prev;
//         }
//         return prev + 1;
//       });
//     }, autoplayDelay);

//     return () => clearInterval(timer);
//   }, [
//     autoplay,
//     autoplayDelay,
//     isHovered,
//     loop,
//     items.length,
//     carouselItems.length,
//     pauseOnHover,
//   ]);

//   const effectiveTransition: Transition = isResetting
//     ? { duration: 0 }
//     : SPRING;

//   const handleAnimationComplete = () => {
//     // وقتی روی آیتم کلون‌شده هستیم، برگرد به اسلاید ۰ بدون انیمیشن
//     if (loop && currentIndex === carouselItems.length - 1) {
//       setIsResetting(true);
//       x.set(0);
//       setCurrentIndex(0);
//       setTimeout(() => setIsResetting(false), 50);
//     }
//   };

//   const handleDragEnd = (
//     _: MouseEvent | TouchEvent | PointerEvent,
//     info: PanInfo
//   ) => {
//     const offset = info.offset.x;
//     const velocity = info.velocity.x;

//     if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
//       if (loop && currentIndex === items.length - 1) {
//         setCurrentIndex(currentIndex + 1);
//       } else {
//         setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
//       }
//     } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
//       if (loop && currentIndex === 0) {
//         setCurrentIndex(items.length - 1);
//       } else {
//         setCurrentIndex((prev) => Math.max(prev - 1, 0));
//       }
//     }
//   };

//   const dragProps = loop
//     ? {}
//     : {
//         dragConstraints: {
//           left: -trackItemOffset * (carouselItems.length - 1),
//           right: 0,
//         },
//       };

//   // نسبت مستطیل کارت (می‌تونی کمی کم/زیادش کنی)
//   const aspectRatio = 3 / 2; // 1.5 یعنی افقی شبیه سرتیفیکیت

//   return (
//     <div className="flex flex-col items-center">
//       <div
//         ref={containerRef}
//         className="relative overflow-hidden rounded-[24px] border border-[#222] bg-[#050505]"
//         style={{ width: slideWidth }}
//       >
//         {/* هک aspect-ratio با padding-bottom برای داشتن ارتفاع ثابت مستطیلی */}
//         <div
//           className="relative"
//           style={{ paddingBottom: `${100 / aspectRatio}%` }}
//         >
//           <motion.div
//             className="absolute inset-0 flex"
//             drag="x"
//             {...dragProps}
//             style={{
//               x,
//               gap: GAP,
//               perspective: 1000,
//               perspectiveOrigin: `${
//                 currentIndex * trackItemOffset + slideWidth / 2
//               }px 50%`,
//             }}
//             onDragEnd={handleDragEnd}
//             animate={{ x: -(currentIndex * trackItemOffset) }}
//             transition={effectiveTransition}
//             onAnimationComplete={handleAnimationComplete}
//           >
//             {carouselItems.map((item, index) => {
//               const range = [
//                 -(index + 1) * trackItemOffset,
//                 -index * trackItemOffset,
//                 -(index - 1) * trackItemOffset,
//               ];
//               const outputRange = [90, 0, -90];
//               const rotateY = useTransform(x, range, outputRange, {
//                 clamp: false,
//               });

//               return (
//                 <motion.div
//                   key={`${item.id}-${index}`} // اینجا دیگه key تکراری نداریم
//                   className="relative h-full shrink-0"
//                   style={{
//                     width: slideWidth,
//                     rotateY,
//                   }}
//                   transition={effectiveTransition}
//                 >
//                   <div className="relative h-full w-full rounded-[16px] bg-[#050505]">
//                     <Image
//                       src={item.imageSrc}
//                       alt={item.imageAlt ?? "Certificate"}
//                       fill
//                       className="rounded-[16px] object-contain"
//                       sizes={`${slideWidth}px`}
//                       draggable={false} // مهم: تا drag مرورگر با drag motion قاطی نشه
//                     />
//                     {item.icon && (
//                       <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/70">
//                         {item.icon}
//                       </span>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </div>
//       </div>

//       {/* دات‌های پایین – مثل نسخه اصلی */}
//       {items.length > 1 && (
//         <div className="mt-4 flex w-full justify-center">
//           <div className="flex w-[150px] justify-between px-8">
//             {items.map((_, index) => (
//               <motion.button
//                 key={index}
//                 type="button"
//                 className={`h-2 w-2 rounded-full transition-colors duration-150 ${
//                   currentIndex % items.length === index
//                     ? "bg-[#ffffff]"
//                     : "bg-[rgba(51,51,51,0.4)]"
//                 }`}
//                 animate={{
//                   scale: currentIndex % items.length === index ? 1.2 : 1,
//                 }}
//                 onClick={() => setCurrentIndex(index)}
//                 transition={{ duration: 0.15 }}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
/*
  Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { JSX, useEffect, useRef, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "motion/react";
import type { Transition } from "motion/react";

export interface CarouselItem {
  id: number;
  icon?: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;

const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 140,
  damping: 26,
  mass: 0.9,
};

export default function Carousel({
  items,
  baseWidth = 520,
  autoplay = true,
  autoplayDelay = 3200,
  pauseOnHover = true,
  loop = true,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  // برای لوپ، آیتم اول رو یک بار آخر لیست تکرار می‌کنیم
  const carouselItems = loop ? [...items, items[0]] : items;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // هوور برای توقف autoplay
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;

    const container = containerRef.current;
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [pauseOnHover]);

  // autoplay
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === items.length - 1 && loop) {
          // اسلاید کپی شده
          return prev + 1;
        }
        if (prev === carouselItems.length - 1) {
          // آخر لیست رسیدیم
          return loop ? 0 : prev;
        }
        return prev + 1;
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition: Transition = isResetting
    ? { duration: 0 }
    : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    // اگر روی آیتم کپی شده (آخر لیست) هستیم، سریع برگرد اول
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  // درگ دستی
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      // به سمت چپ (اسلاید بعدی)
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      // به سمت راست (اسلاید قبلی)
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[32px] border border-[#222] bg-black/70 p-6"
      style={{
        width: baseWidth,
        // ارتفاع مستطیلی شبیه نسبت سرتیفیکیت‌ها
        height: baseWidth * 0.65 + 80, // 80 برای پدینگ و دات‌ها
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, {
            clamp: false,
          });

          return (
            <motion.div
              key={`${item.id}-${index}`} // کلید یکتا
              className="relative flex shrink-0 flex-col overflow-hidden cursor-grab active:cursor-grabbing bg-[#050505] rounded-[24px]"
              style={{
                width: itemWidth,
                height: itemWidth * 0.65,
                rotateY,
              }}
              transition={effectiveTransition}
            >
              {/* آیکن بالا */}
              {item.icon && (
                <div className="absolute left-4 top-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/70">
                  {item.icon}
                </div>
              )}

              {/* خود تصویر سرتیفیکیت */}
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? "Certificate"}
                  className="max-h-[90%] max-w-[90%] rounded-xl object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* دات‌های پایین */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 justify-center">
        <div className="flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={`dot-${index}`}
              className="h-2 w-2 cursor-pointer rounded-full transition-colors duration-150"
              style={{
                backgroundColor:
                  currentIndex % items.length === index
                    ? "#ffffff"
                    : "rgba(136,136,136,0.6)",
              }}
              animate={{
                scale: currentIndex % items.length === index ? 1.25 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
