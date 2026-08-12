import { aboutPage } from "@/content/site";

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <div className="wrap py-12">
        <p className="kicker">Компания</p>
        <h1 className="display mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">{aboutPage.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-[var(--ink-2)]">{aboutPage.lead}</p>
        <p className="mt-8 max-w-2xl border-l-2 border-[var(--accent)] pl-5 text-[var(--mute)]">{aboutPage.mission}</p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {aboutPage.points.map((p) => (
            <li key={p} className="border-t border-[var(--line)] pt-4 text-[var(--ink-2)]">{p}</li>
          ))}
        </ul>
        <div id="designers" className="mt-16 border border-[var(--line)] bg-[var(--paper)] p-8">
          <h2 className="display text-3xl font-bold">Для дизайнеров</h2>
          <p className="mt-3 max-w-xl text-sm text-[var(--mute)]">
            Подбор отделок под проект, образцы в салоне, сроки поставки. Напишите в WhatsApp или оставьте заявку на замер.
          </p>
        </div>
      </div>
    </div>
  );
}
