"use client";

import { brands } from "@/content/site";

export function BrandMarquee() {
  const row = [...brands, ...brands];
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--paper)] py-5">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((b, i) => (
          <span
            key={`${b}-${i}`}
            className="display text-2xl font-semibold tracking-tight text-[var(--ink)]/35 md:text-3xl"
          >
            {b}
            <span className="mx-10 text-[var(--accent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
