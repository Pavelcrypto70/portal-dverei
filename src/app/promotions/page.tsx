import Link from "next/link";
import { promos } from "@/content/site";

export default function PromotionsPage() {
  return (
    <div className="pt-[72px]">
      <div className="wrap py-12">
        <p className="kicker">Сейчас</p>
        <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">Акции</h1>
        <div className="mt-10 grid gap-px bg-[var(--line)] md:grid-cols-2">
          {promos.map((p) => (
            <article key={p.id} className="bg-[var(--bg)] p-8">
              <p className="kicker">{p.badge}</p>
              <h2 className="mt-4 text-2xl font-semibold">{p.title}</h2>
              <p className="mt-3 text-sm text-[var(--mute)]">{p.text}</p>
              <Link href="/measure" className="btn btn-solid mt-6">Уточнить на замере</Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
