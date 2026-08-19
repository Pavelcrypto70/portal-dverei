import Link from "next/link";
import { brand, footer, salons } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-4xl font-extrabold">{brand.name}</p>
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
        <div className="wrap grid gap-6 py-8 md:grid-cols-3">
          {salons.map((s) => (
            <div key={s.id}>
              <p className="font-semibold">{s.name}</p>
              <p className="mt-1 text-sm text-white/55">{s.address}</p>
              <a href={s.phoneHref} className="mt-2 inline-block text-sm text-white/80">
                {s.phone}
              </a>
            </div>
          ))}
        </div>
        <div className="wrap flex items-center justify-between gap-4 pb-8 text-xs text-white/45">
          <span>{footer.legal}</span>
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
