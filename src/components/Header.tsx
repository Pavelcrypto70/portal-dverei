"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { brand, nav, salons } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";

const secondaryLabels = new Set(["О нас", "Контакты"]);

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMobile(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const enter = (label: string) => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(label);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 140);
  };

  const goHomeTop = (e: React.MouseEvent) => {
    setMobile(false);
    setOpen(null);
    if (pathname === "/" || pathname === "") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    router.push("/");
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const ink = scrolled || mobile;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        ink
          ? "border-b border-[var(--line)] bg-[rgba(246,245,241,0.94)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-[72px] items-center gap-4">
        <Link
          href="/"
          onClick={goHomeTop}
          aria-label="Наверх на главную"
          className="shrink-0 text-[0.95rem] leading-none sm:text-[1.05rem] xl:text-[1.2rem]"
        >
          <BrandMark
            variant="header"
            onLight={ink}
            mainClassName="text-[var(--brand)]"
            tldClassName="text-[var(--brand)]"
          />
        </Link>

        <nav className="relative hidden min-w-0 flex-1 items-center justify-start gap-0 overflow-hidden xl:flex">
          {nav.map((item) => {
            const secondary = secondaryLabels.has(item.label);
            return (
              <div
                key={item.label}
                className={`relative shrink-0 ${secondary ? "hidden 2xl:block" : ""}`}
                onMouseEnter={() => ("columns" in item ? enter(item.label) : setOpen(null))}
                onMouseLeave={leave}
              >
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap px-1.5 py-2 text-[12.5px] font-medium leading-none transition 2xl:px-2 2xl:text-[13px] ${
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
            );
          })}
        </nav>

        <div
          className={`relative z-10 ml-auto flex shrink-0 items-center gap-3 border-l pl-4 ${
            ink ? "border-[var(--line)]" : "border-white/20"
          }`}
        >
          <div className="hidden flex-col items-end justify-center leading-none 2xl:flex">
            <a
              href={brand.phoneMainHref}
              className={`whitespace-nowrap text-sm font-bold leading-none ${
                ink ? "text-[var(--ink)]" : "text-white"
              }`}
            >
              {brand.phoneMain}
            </a>
            <p
              className={`mt-1.5 whitespace-nowrap text-[11px] leading-none ${
                ink ? "text-[var(--mute)]" : "text-white/65"
              }`}
            >
              {salons.length} салона · {brand.city}
            </p>
          </div>
          <Link
            href="/measure"
            className={`btn !min-h-10 !px-3.5 ${
              ink ? "btn-accent" : "bg-white text-[var(--ink)]"
            } hidden sm:inline-flex`}
          >
            Замер
          </Link>
          <button
            type="button"
            className={`btn !min-h-10 !px-3 xl:hidden ${ink ? "btn-line" : "btn-line-light"}`}
            onClick={() => setMobile((v) => !v)}
            aria-expanded={mobile}
            aria-label="Открыть меню"
          >
            Меню
          </button>
        </div>
      </div>

      {mobile ? (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-t border-[var(--line)] bg-[var(--paper)] px-4 py-4 xl:hidden">
          <a
            href={brand.phoneMainHref}
            className="block text-base font-bold leading-none text-[var(--ink)]"
          >
            {brand.phoneMain}
          </a>
          <p className="mt-2 text-xs leading-none text-[var(--mute)]">
            {salons.length} салона · {brand.city}
          </p>
          <div className="mt-5 space-y-1 border-t border-[var(--line)] pt-4">
            {salons.map((s) => (
              <a key={s.id} href={s.phoneHref} className="block py-1.5 text-sm leading-snug">
                <span className="font-semibold">{s.phone}</span>
                <span className="text-[var(--mute)]"> — {s.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-2 grid gap-0">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border-b border-[var(--line)] py-3 text-base font-medium leading-snug"
                onClick={() => setMobile(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/measure"
            className="btn btn-accent mt-4 w-full"
            onClick={() => setMobile(false)}
          >
            Вызвать замерщика
          </Link>
        </div>
      ) : null}
    </header>
  );
}
