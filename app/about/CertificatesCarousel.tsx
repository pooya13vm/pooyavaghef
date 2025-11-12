"use client";

import { FiAward } from "react-icons/fi";
import Carousel, { CarouselItem } from "../Components/Carousel/Carousel";

const certificateItems: CarouselItem[] = [
  {
    id: 1,
    imageSrc: "/certificates/seo-specialization.png",
    imageAlt: "Search Engine Optimization (SEO) Specialization",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 2,
    imageSrc: "/certificates/meta-ios-developer.png",
    imageAlt: "Meta iOS Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 3,
    imageSrc: "/certificates/meta-android-developer.png",
    imageAlt: "Meta Android Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 4,
    imageSrc: "/certificates/ibm-fullstack.png",
    imageAlt: "IBM Full Stack Software Developer Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 5,
    imageSrc: "/certificates/ibm-devops.png",
    imageAlt: "IBM DevOps and Software Engineering Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
  {
    id: 6,
    imageSrc: "/certificates/aws-cloud-solutions-architect.png",
    imageAlt: "AWS Cloud Solutions Architect Professional Certificate",
    icon: <FiAward className="h-[16px] w-[16px] text-white" />,
  },
];

export function CertificatesCarousel() {
  return <Carousel items={certificateItems} />;
}
