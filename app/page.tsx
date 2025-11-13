import Lanyard from "./Components/Lanyard/Lanyard";
import { HeroTextBlock } from "./Components/HeroTextBlock";
import { StartProjectButton } from "./Components/StartProjectButton";

export default function HomePage() {
  return (
    <section
      className="
        relative flex h-full w-full items-center justify-center
        -mt-6 md:-mt-16
      "
    >
      <div className="absolute inset-0 z-0">
        <Lanyard position={[0, 0, 20]} gravity={[0, -22, 0]} />
      </div>

      <div
        className="
          relative z-10 flex w-full max-w-5xl flex-col items-center gap-8
          px-6 text-center
          lg:flex-row lg:items-center lg:justify-start lg:gap-10 lg:text-left
           pointer-events-none mt-52 lg:mt-0
        "
      >
        {/* اسپیس خالی کنار لنیارد توی دسکتاپ */}
        <div className="hidden lg:block w-[420px]" aria-hidden="true" />

        <div className="flex flex-col items-center lg:items-start gap-4">
          <HeroTextBlock />

          {/* CTA باید قابل کلیک باشه، پس اینجا pointer-events-auto */}
          <div className="">
            <StartProjectButton />
          </div>
        </div>
      </div>
    </section>
  );
}
