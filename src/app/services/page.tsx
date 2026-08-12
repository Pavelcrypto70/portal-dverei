import Link from "next/link";
import { servicesPage } from "@/content/site";

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <div className="wrap py-12">
        <p className="kicker">Под ключ</p>
        <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">{servicesPage.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-2)]">{servicesPage.lead}</p>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {servicesPage.items.map((item) => (
            <article key={item.id} id={item.id} className="border-t border-[var(--line)] pt-5">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-[var(--mute)]">{item.text}</p>
              {item.id === "measure" ? (
                <Link href="/measure" className="btn btn-accent mt-5">Заказать замер</Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
