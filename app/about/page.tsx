// app/about/page.tsx
import { CertificatesCarousel } from "./ CertificatesCarousel";

export default function AboutPage() {
  return (
    <section
      className="mt-12 md:mt-16       
        flex h-full w-full flex-col items-center justify-center gap-10 px-6
        lg:mt-10            
        lg:flex-row lg:items-center lg:justify-between"
    >
      {/* ستون متن About */}
      <div className="max-w-xl space-y-4 text-center lg:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          About
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300">
          Frontend & full-stack developer with a strong focus on modern web
          stacks, motion, and delightful UX. I enjoy combining clean systems
          thinking with playful details and thoughtful micro-interactions.
        </p>
      </div>

      {/* ستون سرتیفیکیت‌ها */}
      <div className="flex flex-1 justify-center lg:justify-end">
        <CertificatesCarousel />
      </div>
    </section>
  );
}
