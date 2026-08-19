"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { brand, nav, salons } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enter = (label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(label);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobile
          ? "border-b border-[var(--line)] bg-[rgba(244,245,247,0.92)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[72px] items-center gap-4">
        <Link
          href="/"
          className={`display text-[1.55rem] font-extrabold tracking-tight ${
            scrolled || mobile ? "text-[var(--ink)]" : "text-white"
          }`}
        >
          {brand.name}
        </Link>

        <nav className="relative ml-4 hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => ("columns" in item ? enter(item.label) : setOpen(null))}
              onMouseLeave={leave}
            >
              <Link
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition ${
                  scrolled
                    ? "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
              {"columns" in item && open === item.label && item.columns ? (
                <div
                  className="absolute left-0 top-full z-50 mt-3 w-[min(560px,90vw)] border border-[var(--line)] bg-[var(--paper)] p-6"
                  onMouseEnter={() => enter(item.label)}
                  onMouseLeave={leave}
                >
                  <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">
                          {col.title}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map((l) => (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                className="text-sm text-[var(--ink-2)] hover:text-[var(--accent)]"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right xl:block">
            <a
              href={brand.phoneMainHref}
              className={`block text-sm font-bold ${scrolled || mobile ? "text-[var(--ink)]" : "text-white"}`}
            >
              {brand.phoneMain}
            </a>
            <p className={`text-[11px] ${scrolled || mobile ? "text-[var(--mute)]" : "text-white/65"}`}>
              {salons.length} салона · {brand.city}
            </p>
          </div>
          <Link
            href="/measure"
            className={`btn hidden sm:inline-flex ${scrolled || mobile ? "btn-accent" : "bg-white text-[var(--ink)]"}`}
          >
            Замер
          </Link>
          <button
            type="button"
            className={`btn !min-h-10 !px-3 lg:hidden ${
              scrolled || mobile ? "btn-line" : "btn-line-light"
            }`}
            onClick={() => setMobile((v) => !v)}
          >
            Меню
          </button>
        </div>
      </div>

      {mobile ? (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] px-4 py-4 lg:hidden">
          <div className="mb-4 space-y-1">
            {salons.map((s) => (
              <a key={s.id} href={s.phoneHref} className="block text-sm">
                <span className="font-semibold">{s.phone}</span>
                <span className="text-[var(--mute)]"> — {s.name}</span>
              </a>
            ))}
          </div>
          <div className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-[var(--line)] py-3 text-base font-medium"
                onClick={() => setMobile(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/measure" className="btn btn-accent mt-4 w-full" onClick={() => setMobile(false)}>
            Вызвать замерщика
          </Link>
        </div>
      ) : null}
    </header>
  );
}
