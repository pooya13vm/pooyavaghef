// actions.ts
"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const Schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  message: z.string().min(4, "Message is too short").max(2000),
});

export type ContactState = { ok: boolean; error?: string };

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = Object.fromEntries(formData);
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const FROM = process.env.CONTACT_FROM;
  const TO = process.env.CONTACT_TO;
  const KEY = process.env.RESEND_API_KEY;

  if (!KEY) return { ok: false, error: "Missing RESEND_API_KEY env" };
  if (!FROM) return { ok: false, error: "Missing CONTACT_FROM env" };
  if (!TO) return { ok: false, error: "Missing CONTACT_TO env" };

  const { name, email, message } = parsed.data;

  try {
    const res = await resend.emails.send({
      from: FROM, // مثلا: "Pooya <noreply@yourdomain.com>"
      to: [TO], // آرایه یا رشته هر دو OK
      replyTo: email,
      subject: `New message from ${name}`,
      html: `<h2>New message</h2>
             <p><b>Name:</b> ${escape(name)}</p>
             <p><b>Email:</b> ${escape(email)}</p>
             <p style="white-space:pre-wrap">${escape(message)}</p>`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    // کمک برای دیباگ: آی‌دی ایمیل را لاگ کن (تو لاگ‌های فانکشن Vercel می‌بینی)
    // @ts-ignore
    console.log("Resend id:", res?.data?.id ?? res);

    return { ok: true };
  } catch (err: any) {
    console.error("Resend error:", err);
    return { ok: false, error: err?.message ?? "Sending failed" };
  }
}

function escape(s: string) {
  return s.replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ]!)
  );
}
