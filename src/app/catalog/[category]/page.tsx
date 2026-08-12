import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/content/site";

const labels: Record<string, string> = {
  interior: "Межкомнатные двери",
  entrance: "Входные двери",
  hardware: "Фурнитура",
};

export function generateStaticParams() {
  return [
    { category: "interior" },
    { category: "entrance" },
    { category: "hardware" },
  ];
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = (["interior", "entrance", "hardware"].includes(category)
    ? category
    : "interior") as "interior" | "entrance" | "hardware";

  const list = products.filter((p) => p.category === cat);

  const facets = cat === "entrance"
    ? ["Назначение", "Конструкция", "Панель", "Цена"]
    : ["Цвет", "Стиль", "Отделка", "Конструкция", "Цена"];

  return (
    <div className="pt-[72px]">
      <div className="wrap py-10">
        <p className="kicker">Каталог</p>
        <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">
          {labels[cat] ?? "Каталог"}
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="h-fit border-t border-[var(--ink)] pt-5">
            <p className="text-sm font-bold">Фильтры</p>
            <div className="mt-5 space-y-5">
              {facets.map((f) => (
                <div key={f}>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">{f}</p>
                  <div className="mt-2 space-y-2">
                    {["Все", "Вариант A", "Вариант B"].map((v) => (
                      <button key={v} type="button" className="block text-left text-sm text-[var(--ink-2)] hover:text-[var(--accent)]">
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link href="/measure" className="btn btn-accent mt-8 w-full">Нужен замер</Link>
          </aside>
          <div>
            <p className="mb-6 text-sm text-[var(--mute)]">Найдено: {list.length}</p>
            {list.length ? (
              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="border border-[var(--line)] p-8 text-center">
                <p className="text-lg font-semibold">Ничего не нашли</p>
                <Link href="/measure" className="btn btn-solid mt-5">Вызвать замерщика</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
