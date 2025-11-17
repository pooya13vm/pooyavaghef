"use client";

import { FiAward } from "react-icons/fi";
import Carousel, { CarouselItem } from "../Components/Carousel/Carousel";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

const certificateItems: CarouselItem[] = [
  {
    id: 1,
    imageSrc: "/certificates/seo-specialization.webp",
    imageAlt: "Search Engine Optimization (SEO) Specialization",
    icon: <FiAward />,
  },
  {
    id: 2,
    imageSrc: "/certificates/meta-ios-developer.webp",
    imageAlt: "Meta iOS Developer Professional Certificate",
    icon: <FiAward />,
  },
  {
    id: 3,
    imageSrc: "/certificates/meta-android-developer.webp",
    imageAlt: "Meta Android Developer Professional Certificate",
    icon: <FiAward />,
  },
  {
    id: 4,
    imageSrc: "/certificates/ibm-fullstack.webp",
    imageAlt: "IBM Full Stack Software Developer Professional Certificate",
    icon: <FiAward />,
  },
  {
    id: 5,
    imageSrc: "/certificates/ibm-devops.webp",
    imageAlt: "IBM DevOps and Software Engineering Professional Certificate",
    icon: <FiAward />,
  },
  {
    id: 6,
    imageSrc: "/certificates/AWS.webp",
    imageAlt: "AWS Cloud Solutions Architect Professional Certificate",
    icon: <FiAward />,
  },
];

export function CertificatesCarousel() {
  const isSmall = useMediaQuery("(max-width: 600px)");
  const baseWidth = isSmall ? 380 : 520;
  return <Carousel items={certificateItems} baseWidth={baseWidth} />;
}
