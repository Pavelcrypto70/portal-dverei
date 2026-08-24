"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { brand, footer, salons } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-block text-4xl font-extrabold transition hover:opacity-90"
            onClick={(e) => {
              if (pathname === "/" || pathname === "") {
                e.preventDefault();
                goTop();
                return;
              }
              router.push("/");
              requestAnimationFrame(goTop);
            }}
          >
            <BrandMark
              variant="header"
              mainClassName="text-[var(--brand)]"
              tldClassName="text-[#9aa0a8]"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{footer.about}</p>
          <a href={brand.phoneMainHref} className="mt-6 inline-block text-xl font-bold">
            {brand.phoneMain}
          </a>
        </div>
        {footer.cols.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-2)]">
              {col.title}
            </p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="wrap py-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
            {brand.city}
          </p>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {salons.map((s) => (
              <div key={s.id}>
                <p className="font-semibold">{s.name}</p>
                {s.address && s.address !== s.name ? (
                  <p className="mt-1 text-sm text-white/55">{s.address}</p>
                ) : null}
                <a href={s.phoneHref} className="mt-2 inline-block text-sm text-white/80">
                  {s.phone}
                </a>
                {s.hours ? <p className="mt-1 text-sm text-white/45">{s.hours}</p> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="wrap flex items-center justify-end gap-4 pb-8 text-xs text-white/45">
          <Link
            href="/admin/login"
            className="shrink-0 text-white/50 underline-offset-2 hover:text-white hover:underline"
          >
            Вход
          </Link>
        </div>
      </div>
    </footer>
  );
}
