"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { brand, footer, salons } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function IconVk({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12.785 16.241s.338-.038.511-.23c.16-.175.155-.503.155-.503s-.022-1.534.69-1.76c.701-.223 1.602 1.482 2.556 2.137.722.495 1.269.386 1.269.386l2.547-.035s1.331-.083.7-1.129c-.052-.085-.37-.777-1.902-2.196-1.602-1.483-1.388-1.242.542-3.803.1-.156 1.957-2.754 1.957-2.754s.182-.352-.01-.574c-.186-.215-.7-.142-.7-.142l-2.707.017s-.2-.027-.35.062c-.145.086-.237.286-.237.286s-.425 1.13-1.01 2.09c-1.234 2.027-1.727 2.134-1.93 2.01-.47-.288-.353-1.157-.353-1.775 0-1.93.292-2.734-.57-2.942-.286-.068-.496-.113-1.226-.12-.937-.01-1.73.003-2.18.22-.3.144-.531.465-.39.483.175.022.57.107.78.371.27.34.26 1.104.26 1.104s.155 2.01-.362 2.26c-.354.17-.84-.177-1.886-1.768-.535-.812-.94-1.71-.94-1.71s-.078-.19-.217-.292c-.168-.124-.403-.163-.403-.163l-2.57.017s-.386.011-.528.18c-.126.15-.01.46-.01.46s2.0 4.68 4.26 7.04c2.07 2.16 4.42 2.02 4.42 2.02h1.06z" />
    </svg>
  );
}

function IconInstagram({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
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
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={brand.vk}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded border border-white/15 bg-white/[0.04] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-[var(--ink)]"
            >
              <IconVk className="h-5 w-5 opacity-90 transition group-hover:opacity-100" />
              ВКонтакте
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded border border-[var(--brand)]/70 bg-[var(--brand)] px-4 text-sm font-semibold text-[var(--ink)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-deep)]"
            >
              <IconInstagram className="h-5 w-5" />
              Instagram
            </a>
          </div>
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
          <p className="text-lg font-bold tracking-wide text-[var(--brand)] sm:text-xl">
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
