"use client";

import { FiAward } from "react-icons/fi";
import Carousel, { CarouselItem } from "../Components/Carousel/Carousel";

const certificateItems: CarouselItem[] = [
  {
    id: 1,
    imageSrc: "/certificates/seo-specialization.webp",
    imageAlt: "Search Engine Optimization (SEO) Specialization",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 2,
    imageSrc: "/certificates/meta-ios-developer.webp",
    imageAlt: "Meta iOS Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 3,
    imageSrc: "/certificates/meta-android-developer.webp",
    imageAlt: "Meta Android Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 4,
    imageSrc: "/certificates/ibm-fullstack.webp",
    imageAlt: "IBM Full Stack Software Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 5,
    imageSrc: "/certificates/ibm-devops.webp",
    imageAlt: "IBM DevOps and Software Engineering Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 6,
    imageSrc: "/certificates/AWS.webp",
    imageAlt: "AWS Cloud Solutions Architect Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
];

export function CertificatesCarousel() {
  return <Carousel items={certificateItems} />;
}
