"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-2xl px-4 py-2
                           text-sm font-medium text-white dark:text-white
                           bg-gradient-to-r from-sky-500 to-emerald-400
                           hover:brightness-110 active:scale-95 transition"
    >
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
