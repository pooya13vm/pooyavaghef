// app/contact/page.tsx
"use client";

import React from "react";
import { SocialPill, SocialLink } from "./SocialPill";

import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/your-username",
    Icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/your-handle",
    Icon: FaLinkedinIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/your-handle",
    Icon: FaInstagram,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/your-handle",
    Icon: SiX,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/your-handle",
    Icon: FaFacebookF,
  },
];

export default function ContactPage() {
  const email = "hello@yourdomain.com"; // اینو بذار ایمیل خودت
  const whatsappNumber = "1234567890"; // اینو بدون + و فاصله بذار

  return (
    <section
      className="
        flex min-h-screen w-full flex-col items-center
        px-6 pt-14 pb-16 gap-10
        lg:gap-14
      "
    >
      {/* Intro بالا */}
      <header className="max-w-3xl text-center space-y-4">
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white">
          Contact
        </h1>
        <p className="text-sm leading-relaxed text-neutral-300">
          Tell me about your product, idea, or team – I love collaborating on
          thoughtful frontend, ecommerce, and web experiences.
        </p>
      </header>

      {/* دو ستون مساوی */}
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
        {/* ستون چپ: بالا سوشال، پایین ایمیل + واتس‌اپ */}
        <div className="relative flex flex-col gap-4 lg:h-full">
          {/* کارت بالا: Social */}
          <div
            className="
              relative flex-1 overflow-hidden rounded-3xl border border-white/10
              bg-[#050814]/80 px-6 py-6 flex flex-col gap-4
            "
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(96,165,250,0.2), transparent 60%)",
              }}
            />

            <div className="relative space-y-2">
              <h2 className="text-base font-medium text-white/90">Social</h2>
              <p className="text-xs text-neutral-400 max-w-sm">
                Find me on your favorite platforms.
              </p>
            </div>

            <div className="relative z-10 mt-3 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <SocialPill key={link.name} link={link} />
              ))}
            </div>
          </div>

          {/* کارت پایین: Email + WhatsApp */}
          <div
            className="
              relative flex-1 overflow-hidden rounded-3xl border border-white/10
              bg-[#050814]/80 px-6 py-6 flex flex-col
            "
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(circle at bottom, rgba(52,211,153,0.18), transparent 60%)",
              }}
            />

            <div className="relative mb-4 space-y-1">
              <h2 className="text-base font-medium text-white/90">
                Direct contact
              </h2>
              <p className="text-xs text-neutral-400">
                Prefer something more direct? Email or message me on WhatsApp.
              </p>
            </div>

            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-stretch h-full">
              {/* Email card */}
              <a
                href={`mailto:${email}`}
                className="
                  group flex-1 rounded-2xl border border-white/10
                  bg-black/40 px-4 py-3
                  flex flex-col justify-center gap-1
                  hover:border-sky-400 hover:bg-black/60
                  transition
                "
              >
                <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                  Email
                </span>
                <span className="text-xs text-sky-300 group-hover:text-sky-200 break-all">
                  {email}
                </span>
              </a>

              {/* WhatsApp card */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex-1 rounded-2xl border border-white/10
                  bg-black/40 px-4 py-3
                  flex flex-col justify-center gap-1
                  hover:border-emerald-400 hover:bg-black/60
                  transition
                "
              >
                <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-400">
                  WhatsApp
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-emerald-300 group-hover:text-emerald-200">
                  <FaWhatsapp className="text-sm" />
                  <span>Chat with me</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ستون راست: فرم تماس */}
        <div
          className="
            relative h-full overflow-hidden rounded-3xl border border-white/10
            bg-[#050814]/80 px-6 py-6 flex flex-col gap-4
          "
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at bottom right, rgba(52,211,153,0.18), transparent 60%)",
            }}
          />

          <div className="relative space-y-1">
            <h2 className="text-base font-medium text-white/90">
              Contact form
            </h2>
            <p className="text-xs text-neutral-400">
              Share a bit about your project and how I can help.
            </p>
          </div>

          <form
            className="relative z-10 mt-3 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              // بعداً اگر خواستی Formspree / API خودت رو اینجا وصل کن
            }}
          >
            {/* Name */}
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="
                  w-full rounded-xl border border-white/10 bg-black/40
                  px-3 py-2 text-sm text-white
                  outline-none ring-0 focus:border-sky-400
                  placeholder:text-neutral-500
                "
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="
                  w-full rounded-xl border border-white/10 bg-black/40
                  px-3 py-2 text-sm text-white
                  outline-none ring-0 focus:border-sky-400
                  placeholder:text-neutral-500
                "
                placeholder="you@example.com"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label
                htmlFor="message"
                className="block text-[11px] uppercase tracking-[0.12em] text-neutral-400"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="
                  w-full rounded-xl border border-white/10 bg-black/40
                  px-3 py-2 text-sm text-white
                  outline-none ring-0 focus:border-sky-400
                  placeholder:text-neutral-500
                  resize-none
                "
                placeholder="Tell me a bit about what you have in mind…"
              />
            </div>

            <button
              type="submit"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-4 py-2
                text-sm font-medium text-white
                bg-gradient-to-r from-sky-500 to-emerald-400
                hover:brightness-110
                active:scale-95
                transition
              "
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
