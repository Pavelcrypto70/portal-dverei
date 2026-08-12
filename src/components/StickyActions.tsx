"use client";

import Link from "next/link";
import { brand } from "@/content/site";
import { useQuiz } from "@/components/QuizModal";

export function StickyActions() {
  const { openQuiz } = useQuiz();
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      <button
        type="button"
        onClick={openQuiz}
        className="border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold shadow-[0_12px_40px_rgba(12,15,20,0.14)] transition hover:-translate-y-0.5"
      >
        Подобрать дверь
      </button>
      <Link
        href="/measure"
        className="btn btn-accent shadow-[0_12px_40px_rgba(15,118,110,0.35)]"
      >
        Замер
      </Link>
      <a
        href={brand.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="btn btn-solid !min-h-11"
      >
        WhatsApp
      </a>
    </div>
  );
}
