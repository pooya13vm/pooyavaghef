// app/not-found.tsx
import Link from "next/link";
import AnimatedNotFound from "./Components/NotFound/AnimatedNotFound";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-16">
      {/* پس‌زمینهٔ گرادیان لطیف */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 10%, rgba(56,189,248,0.12), transparent), radial-gradient(1000px 700px at 80% 90%, rgba(99,102,241,0.12), transparent)",
        }}
      />

      <div className="grid w-full max-w-5xl items-center gap-8 lg:grid-cols-2">
        <div className="text-center lg:text-left space-y-4">
          <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-white dark:text-black">
            Page not found
          </h1>
          <p className="text-sm leading-relaxed text-neutral-300 dark:text-neutral-600 max-w-md mx-auto lg:mx-0">
            The page you’re looking for doesn’t exist or moved. Use the links
            below to get back on track.
          </p>

          <div className="mt-4 flex items-center justify-center lg:justify-start gap-3">
            <Link
              href="/"
              className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 dark:bg-black/10 border border-white/15 dark:border-black/10 hover:brightness-110 transition"
            >
              ← Back to Home
            </Link>
            <Link
              href="/work"
              className="rounded-2xl px-4 py-2 text-sm font-medium bg-sky-500/90 text-white hover:bg-sky-400 transition"
            >
              View my Work
            </Link>
          </div>
        </div>

        {/* ناحیهٔ انیمیشن GSAP */}
        <AnimatedNotFound />
      </div>
    </section>
  );
}
