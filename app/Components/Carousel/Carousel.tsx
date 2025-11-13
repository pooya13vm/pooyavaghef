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

  const carouselItems = loop ? [...items, items[0]] : items;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // hover → pause autoplay
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
          return prev + 1;
        }
        if (prev === carouselItems.length - 1) {
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
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
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
      className="
     relative overflow-hidden rounded-[32px]
    border border-white/15 dark:border-black/10
    bg-white/10 dark:bg-black/10
    supports-[backdrop-filter]:backdrop-blur-xl
    shadow-[0_24px_60px_rgba(0,0,0,0.45)]
    transform-gpu isolate
    p-4
      "
      style={{
        width: baseWidth,
        height: baseWidth * 0.65 + 80,
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
              key={`${item.id}-${index}`}
              className="
                relative flex shrink-0 flex-col overflow-hidden
                cursor-grab active:cursor-grabbing
                rounded-[24px]
                bg-[#050505] dark:bg-white
                shadow-[0_18px_45px_rgba(0,0,0,0.75)]
                dark:shadow-[0_22px_55px_rgba(15,23,42,0.25)]
              "
              style={{
                width: itemWidth,
                height: itemWidth * 0.65,
                rotateY,
              }}
              transition={effectiveTransition}
            >
              {/* تصویر سرتیفیکیت */}
              <div className="flex h-full w-full items-center justify-center">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? "Certificate"}
                  className="
                    max-h-[90%] max-w-[90%]
                    rounded-xl object-contain
                    select-none pointer-events-none
                  "
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
              className="
                h-2 w-2 cursor-pointer rounded-full
                transition-colors duration-150
              "
              style={{
                backgroundColor:
                  currentIndex % items.length === index
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(136,136,136,0.7)",
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
