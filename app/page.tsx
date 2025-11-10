import Lanyard from "./Components/Lanyard/Lanyard";
import { HeroScrambledText } from "./TextAnimations/ScrambledText/HeroScrambledText";

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
        {/* اسپیسِر کنار کارت، یه کم باریک‌ترش کردیم */}
        <div className="hidden lg:block w-[420px]" aria-hidden="true" />

        {/* بلاک متن؛ margin-left رو برداشتیم که بیاد چسبیده‌تر به کارت */}
        <div className="max-w-lg space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Pooya Vaghef
          </h1>

          <div className="text-sm text-neutral-300 leading-relaxed md:pl-1">
            <HeroScrambledText text="Frontend & full-stack developer focused on clean, minimal interfaces with playful motion and memorable details." />
          </div>
        </div>
      </div>
    </section>
  );
}
