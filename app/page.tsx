import Lanyard from "./Components/Lanyard/Lanyard";
import { HeroTextBlock } from "./Components/HeroTextBlock";

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
          pointer-events-none select-none mt-40 lg:mt-0
        "
      >
        {/* اسپیس خالی کنار لنیارد توی دسکتاپ */}
        <div className="hidden lg:block w-[420px]" aria-hidden="true" />

        {/* بلوک تکست با انیمیشن از راست */}
        <HeroTextBlock />
      </div>
    </section>
  );
}
