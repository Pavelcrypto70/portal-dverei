"use client";

import Link from "next/link";
import { useQuiz } from "@/components/QuizModal";

export function StickyActions() {
  const { openQuiz } = useQuiz();
  return (
    <div className="fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:right-4 sm:bottom-4 md:right-6 md:bottom-6">
      <button
        type="button"
        onClick={openQuiz}
        className="border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-xs font-semibold shadow-[0_12px_40px_rgba(12,15,20,0.14)] transition hover:-translate-y-0.5 sm:px-4 sm:py-3 sm:text-sm"
      >
        Подобрать дверь
      </button>
      <Link
        href="/measure"
        className="btn btn-accent !min-h-10 !px-4 text-sm shadow-[0_12px_40px_rgba(251,190,7,0.4)] sm:!min-h-12"
      >
        Замер
      </Link>
    </div>
  );
}
