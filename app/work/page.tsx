import { WorkGrid } from "./WorkGrid";

export default function WorkPage() {
  return (
    <section
      className="
        flex h-full w-full flex-col items-center
        px-6 pt-16 pb-6 gap-8
        lg:gap-10
      "
    >
      <header className="max-w-3xl text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
          Work
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300">
          Selected projects across web, ecommerce, and mobile – from Shopify
          stores and marketing sites to custom Next.js products and native apps.
        </p>
      </header>

      <WorkGrid />
    </section>
  );
}
