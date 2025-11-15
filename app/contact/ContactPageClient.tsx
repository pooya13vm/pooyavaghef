"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SocialPill, type SocialLink } from "./SocialPill";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";
import { SubmitButton } from "./SubmitButton";

// ───────────────────────────────── socials
const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com/pooya13vm", Icon: FaGithub },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/pooya-vaghef",
    Icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/pooya-vaghef",
    Icon: FaInstagram,
  },
  { name: "X (Twitter)", href: "https://x.com/", Icon: SiX },
  { name: "Facebook", href: "https://facebook.com/", Icon: FaFacebookF },
];

export default function ContactPageClient() {
  const headerRef = useRef<HTMLElement | null>(null);
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const socialCardRef = useRef<HTMLDivElement | null>(null);
  const directCardRef = useRef<HTMLDivElement | null>(null);

  // انیمیشن ورود (GSAP + matchMedia) — سازگار با Safari/Chrome
  useLayoutEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) return;

    const mm = gsap.matchMedia();

    // دسکتاپ (≥1024px)
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set(headerRef.current, { y: -24, autoAlpha: 0, force3D: true });
      gsap.set(formCardRef.current, { x: 80, autoAlpha: 0, force3D: true });
      gsap.set(socialCardRef.current, { x: -80, autoAlpha: 0, force3D: true });
      gsap.set(directCardRef.current, { y: 80, autoAlpha: 0, force3D: true });

      tl.to(headerRef.current, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.3)
        .to(formCardRef.current, { x: 0, autoAlpha: 1, duration: 0.9 }, 0.08)
        .to(socialCardRef.current, { x: 0, autoAlpha: 1, duration: 0.9 }, 0.12)
        .to(directCardRef.current, { y: 0, autoAlpha: 1, duration: 0.9 }, 0.19)
        .add(() => {
          gsap.set(
            [
              headerRef.current,
              formCardRef.current,
              socialCardRef.current,
              directCardRef.current,
            ],
            { clearProps: "will-change" }
          );
        });

      return () => tl.kill();
    });

    // موبایل/تبلت (<1024px) — فرم نمایش داده نمی‌شود
    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set(headerRef.current, { y: -20, autoAlpha: 0, force3D: true });
      gsap.set(socialCardRef.current, { x: -64, autoAlpha: 0, force3D: true });
      gsap.set(directCardRef.current, { y: 64, autoAlpha: 0, force3D: true });

      tl.to(headerRef.current, { y: 0, autoAlpha: 1, duration: 0.65 }, 0.0)
        .to(socialCardRef.current, { x: 0, autoAlpha: 1, duration: 0.55 }, 0.06)
        .to(
          directCardRef.current,
          { y: 0, autoAlpha: 1, duration: 0.55 },
          0.12
        );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, []);

  const email = "vaghef.pooya@gmail.com";
  const whatsappNumber = "+905368146944";
  const initial: ContactState = { ok: false };
  const [state, formAction] = useActionState(sendContact, initial);

  return (
    <section className="flex min-h-screen w-full flex-col items-center px-6 pt-14 pb-16 gap-10 lg:gap-14">
      {/* Header */}
      <header
        ref={headerRef}
        className="max-w-3xl text-center space-y-4 will-change-transform"
      >
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white dark:text-black">
          Contact
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300 dark:text-neutral-600">
          Tell me about your product, idea, or team – I love collaborating on
          thoughtful frontend, ecommerce, and web experiences.
        </p>
      </header>

      {/* Grid */}
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="relative flex flex-col gap-4 lg:h-full min-h-0">
          {/* Social card */}
          <div
            ref={socialCardRef}
            className="
              relative flex-1 overflow-hidden rounded-3xl will-change-transform
              border border-white/10 dark:border-black/10
              bg-black/60 dark:bg-white/70 backdrop-blur-xl
              px-6 py-6
              flex-none lg:flex-1
            "
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(96,165,250,0.18), transparent 60%)",
              }}
            />
            <div className="relative flex h-full flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-base font-medium text-white/90 dark:text-black/90">
                  Social
                </h2>
                <p className="text-xs text-neutral-400 dark:text-neutral-600 max-w-sm">
                  Find me on your favorite platforms.
                </p>
              </div>
              <div className="relative z-10 mt-1 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <SocialPill key={link.name} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Direct contact card */}
          <div
            ref={directCardRef}
            className="
              relative flex-1 overflow-hidden rounded-3xl will-change-transform
              border border-white/10 dark:border-black/10
              bg-black/60 dark:bg-white/70 backdrop-blur-xl
              px-6 py-6
            "
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at bottom, rgba(52,211,153,0.16), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="mb-4 space-y-1">
                <h2 className="text-base font-medium text-white/90 dark:text-black/90">
                  Direct contact
                </h2>
                <p className="text-xs text-neutral-400 dark:text-neutral-600">
                  Prefer something more direct? Email or message me on WhatsApp.
                </p>
              </div>

              <div className="relative flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <a
                  href={`mailto:${email}`}
                  className="
                    group flex-1 rounded-2xl border border-white/10 dark:border-black/10
                    bg-black/40 dark:bg:white/60 px-4 py-3
                    flex flex-col justify-center gap-1
                    hover:border-sky-400 dark:hover:border-sky-500
                    hover:bg-black/55 dark:hover:bg-white/70 transition
                  "
                >
                  <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
                    Email
                  </span>
                  <span className="text-xs text-sky-300 dark:text-sky-600 group-hover:brightness-110 break-all">
                    {email}
                  </span>
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group flex-1 rounded-2xl border border-white/10 dark:border-black/10
                    bg-black/40 dark:bg-white/60 px-4 py-3
                    flex flex-col justify-center gap-1
                    hover:border-emerald-400 dark:hover:border-emerald-500
                    hover:bg-black/55 dark:hover:bg-white/70 transition
                  "
                >
                  <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600">
                    WhatsApp
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs text-emerald-300 dark:text-emerald-600 group-hover:brightness-110">
                    <FaWhatsapp className="text-sm" />
                    <span>Chat with me</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: form card — فقط از lg به بالا */}
        <div
          ref={formCardRef}
          className="
            hidden lg:block
            relative h-full overflow-hidden rounded-3xl will-change-transform
            border border-white/10 dark:border-black/10
            bg-black/60 dark:bg-white/70 backdrop-blur-xl
            px-6 py-6
          "
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at bottom right, rgba(52,211,153,0.16), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-white/90 dark:text-black/90">
                Contact form
              </h2>
              <p className="text-xs text-neutral-400 dark:text-neutral-600">
                Share a bit about your project and how I can help.
              </p>
            </div>

            <FormContents formAction={formAction} />
          </div>
        </div>
      </div>

      {/* پیام موفق/خطا */}
      <div className="min-h-0">
        {state?.ok && (
          <p className="text-xs text-emerald-400">
            Thanks! I’ll get back to you shortly.
          </p>
        )}
        {!state?.ok && state?.error && (
          <p className="text-xs text-rose-400">{state.error}</p>
        )}
      </div>
    </section>
  );
}

// ───────────────────────── form
function FormContents({
  formAction,
}: {
  formAction: (formData: FormData) => void;
}) {
  return (
    <form
      className="relative z-10 mt-3 space-y-3"
      action={formAction}
      aria-live="polite"
    >
      <div className="space-y-1">
        <label
          htmlFor="name"
          className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl border border-white/10 dark:border-black/10
                     bg-black/40 dark:bg-white/60 px-3 py-2 text-sm
                     text-white dark:text-black outline-none ring-0
                     focus:border-sky-400 dark:focus:border-sky-500
                     placeholder:text-neutral-500 dark:placeholder:text-neutral-500"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full rounded-xl border border-white/10 dark:border-black/10
                     bg-black/40 dark:bg-white/60 px-3 py-2 text-sm
                     text-white dark:text-black outline-none ring-0
                     focus:border-sky-400 dark:focus:border-sky-500
                     placeholder:text-neutral-500 dark:placeholder:text-neutral-500"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="message"
          className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-600"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          name="message"
          required
          className="w-full rounded-xl border border-white/10 dark:border-black/10
                     bg-black/40 dark:bg-white/60 px-3 py-2 text-sm
                     text-white dark:text-black outline-none ring-0
                     focus:border-sky-400 dark:focus:border-sky-500
                     placeholder:text-neutral-500 dark:placeholder:text-neutral-500
                     resize-none"
          placeholder="Tell me a bit about what you have in mind…"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
