import { BackLink } from "@/components/BackLink";
import { MeasureForm } from "@/components/MeasureForm";
import { measurePage, salons } from "@/content/site";

export default function MeasurePage() {
  return (
    <div className="pt-[72px]">
      <div className="wrap grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <BackLink className="text-sm font-semibold text-[var(--accent)]" label="← Назад в каталог" />
          <p className="kicker mt-4">Сервис</p>
          <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">{measurePage.title}</h1>
          <p className="mt-4 text-lg text-[var(--ink-2)]">{measurePage.lead}</p>
          <p className="mt-3 text-sm text-[var(--accent)]">{measurePage.sla}</p>
          <div className="mt-10 space-y-4">
            {salons.map((s) => (
              <div key={s.id} className="border-t border-[var(--line)] pt-4">
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-[var(--mute)]">{s.address}</p>
                <a href={s.phoneHref} className="mt-1 inline-block text-sm font-medium">
                  {s.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
        <MeasureForm />
      </div>
    </div>
  );
}
