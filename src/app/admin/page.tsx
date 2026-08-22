"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalogStore } from "@/components/CatalogStore";
import {
  catalogCategories,
  categoryMeta,
  type Product,
  type ProductCategory,
} from "@/content/site";
import { enrichFilters } from "@/lib/enrich-filters";

type Tab = "products" | "promos";

const emptyProduct = (): Product => ({
  id: `new-${Date.now()}`,
  slug: `tovar-${Date.now()}`,
  category: "interior",
  name: "Новый товар",
  price: 0,
  finish: "",
  style: "",
  short: "",
  filters: {},
  relatedIds: [],
  kit: { leaf: 0, frame: 0, casings: 0, hardwareBase: 0 },
});

export default function AdminPage() {
  const router = useRouter();
  const {
    ready,
    isAuthed,
    products,
    promos,
    logout,
    upsertProduct,
    deleteProduct,
    upsertPromo,
    deletePromo,
    resetCatalog,
  } = useCatalogStore();
  const [tab, setTab] = useState<Tab>("products");
  const [filterCat, setFilterCat] = useState<ProductCategory | "all">("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [promoEdit, setPromoEdit] = useState<(typeof promos)[0] | null>(null);

  useEffect(() => {
    if (ready && !isAuthed) router.replace("/admin/login");
  }, [ready, isAuthed, router]);

  const list = useMemo(
    () => (filterCat === "all" ? products : products.filter((p) => p.category === filterCat)),
    [products, filterCat],
  );

  if (!ready || !isAuthed) {
    return <div className="p-10 text-[var(--mute)]">Проверка доступа…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">Админ</p>
          <h1 className="display text-3xl font-bold">Каталог и акции</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="btn btn-line">
            На сайт
          </Link>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              if (confirm("Сбросить каталог и акции к демо-данным?")) resetCatalog();
            }}
          >
            Сброс
          </button>
          <button
            type="button"
            className="btn btn-solid"
            onClick={() => {
              logout();
              router.replace("/admin/login");
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-[var(--mute)]">
        Изменения сохраняются в этом браузере (localStorage). Для общей базы сотрудников позже
        подключим сервер/CMS — интерфейс тот же.
      </p>

      <div className="mt-8 flex gap-2 border-b border-[var(--line)]">
        {(
          [
            ["products", "Товары"],
            ["promos", "Акции"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-3 text-sm font-semibold ${
              tab === id ? "border-b-2 border-[var(--accent)] text-[var(--ink)]" : "text-[var(--mute)]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value as ProductCategory | "all")}
                className="border border-[var(--line)] bg-white px-3 py-2 text-sm"
              >
                <option value="all">Все категории</option>
                {catalogCategories.map((c) => (
                  <option key={c} value={c}>
                    {categoryMeta[c].title}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-accent"
                onClick={() => setEditing(emptyProduct())}
              >
                + Товар
              </button>
            </div>
            <div className="mt-4 divide-y divide-[var(--line)] border border-[var(--line)]">
              {list.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-xs text-[var(--mute)]">
                      {categoryMeta[p.category].title} · {p.price.toLocaleString("ru-RU")} ₽ · /{p.slug}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-line !min-h-9 !px-3" onClick={() => setEditing({ ...p })}>
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="btn btn-line !min-h-9 !px-3"
                      onClick={() => {
                        if (confirm(`Удалить «${p.name}»?`)) deleteProduct(p.id);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {editing ? (
            <ProductEditor
              product={editing}
              allProducts={products}
              onChange={setEditing}
              onSave={() => {
                const slug = editing.slug.trim() || editing.id;
                upsertProduct({ ...editing, slug });
                setEditing(null);
              }}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <p className="text-sm text-[var(--mute)]">Выберите товар или создайте новый.</p>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <button
              type="button"
              className="btn btn-accent"
              onClick={() =>
                setPromoEdit({
                  id: `promo-${Date.now()}`,
                  title: "Новая акция",
                  text: "",
                  badge: "Акция",
                })
              }
            >
              + Акция
            </button>
            <div className="mt-4 divide-y divide-[var(--line)] border border-[var(--line)]">
              {promos.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--mute)]">{p.badge}</p>
                    <p className="font-semibold">{p.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-line !min-h-9 !px-3" onClick={() => setPromoEdit({ ...p })}>
                      Изменить
                    </button>
                    <button
                      type="button"
                      className="btn btn-line !min-h-9 !px-3"
                      onClick={() => {
                        if (confirm(`Удалить акцию «${p.title}»?`)) deletePromo(p.id);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {promoEdit ? (
            <div className="h-fit border border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="text-sm font-bold">Редактор акции</p>
              <div className="mt-3 grid gap-2">
                <input
                  className="border border-[var(--line)] px-3 py-2 text-sm"
                  value={promoEdit.badge}
                  onChange={(e) => setPromoEdit({ ...promoEdit, badge: e.target.value })}
                  placeholder="Бейдж"
                />
                <input
                  className="border border-[var(--line)] px-3 py-2 text-sm"
                  value={promoEdit.title}
                  onChange={(e) => setPromoEdit({ ...promoEdit, title: e.target.value })}
                  placeholder="Заголовок"
                />
                <textarea
                  className="min-h-28 border border-[var(--line)] px-3 py-2 text-sm"
                  value={promoEdit.text}
                  onChange={(e) => setPromoEdit({ ...promoEdit, text: e.target.value })}
                  placeholder="Текст"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="btn btn-solid"
                  onClick={() => {
                    upsertPromo(promoEdit);
                    setPromoEdit(null);
                  }}
                >
                  Сохранить
                </button>
                <button type="button" className="btn btn-line" onClick={() => setPromoEdit(null)}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-[var(--mute)]">Выберите акцию или создайте новую.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ProductEditor({
  product,
  allProducts,
  onChange,
  onSave,
  onCancel,
}: {
  product: Product;
  allProducts: Product[];
  onChange: (p: Product) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    onChange({ ...product, [key]: value });

  const setKit = (key: keyof Product["kit"], value: number) =>
    onChange({ ...product, kit: { ...product.kit, [key]: value }, price: key === "leaf" ? value : product.price });

  const related = new Set(product.relatedIds ?? []);
  const facets = categoryMeta[product.category]?.facets ?? [];
  const currentFilters = { ...enrichFilters(product), ...(product.filters ?? {}) };

  const setFilter = (key: string, value: string) => {
    const next = { ...(product.filters ?? {}), [key]: value };
    if (value === "all" || value === "") delete next[key];
    onChange({ ...product, filters: next });
  };

  return (
    <div className="h-fit max-h-[80vh] overflow-y-auto border border-[var(--line)] bg-[var(--paper)] p-4">
      <p className="text-sm font-bold">Редактор товара</p>
      <div className="mt-3 grid gap-2">
        <input
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Название"
        />
        <input
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.slug}
          onChange={(e) => set("slug", e.target.value)}
          placeholder="slug-url"
        />
        <select
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.category}
          onChange={(e) =>
            onChange({
              ...product,
              category: e.target.value as ProductCategory,
              filters: {},
            })
          }
        >
          {catalogCategories.map((c) => (
            <option key={c} value={c}>
              {categoryMeta[c].title}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="border border-[var(--line)] px-3 py-2 text-sm"
            value={product.price}
            onChange={(e) => {
              const n = Number(e.target.value) || 0;
              onChange({ ...product, price: n, kit: { ...product.kit, leaf: n } });
            }}
            placeholder="Цена"
          />
          <input
            type="number"
            className="border border-[var(--line)] px-3 py-2 text-sm"
            value={product.oldPrice ?? ""}
            onChange={(e) =>
              set("oldPrice", e.target.value === "" ? undefined : Number(e.target.value) || 0)
            }
            placeholder="Старая цена"
          />
        </div>
        <input
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.badge ?? ""}
          onChange={(e) => set("badge", e.target.value || undefined)}
          placeholder="Бейдж (Хит / Новинка)"
        />
        <input
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.finish}
          onChange={(e) => set("finish", e.target.value)}
          placeholder="Отделка (текст на карточке)"
        />
        <input
          className="border border-[var(--line)] px-3 py-2 text-sm"
          value={product.style}
          onChange={(e) => set("style", e.target.value)}
          placeholder="Стиль (текст на карточке)"
        />
        <textarea
          className="min-h-20 border border-[var(--line)] px-3 py-2 text-sm"
          value={product.short}
          onChange={(e) => set("short", e.target.value)}
          placeholder="Короткое описание"
        />

        <p className="pt-3 text-xs font-bold uppercase tracking-wide text-[var(--mute)]">
          Фильтры каталога
        </p>
        <p className="text-[11px] text-[var(--mute)]">
          Отметьте, в какие фильтры попадает товар. Цена считается автоматически.
        </p>
        <div className="space-y-3 rounded border border-[var(--line)] p-3">
          {facets
            .filter((f) => f.key !== "price")
            .map((facet) => (
              <label key={facet.key} className="grid gap-1 text-xs">
                <span className="font-semibold text-[var(--ink)]">{facet.label}</span>
                <select
                  className="border border-[var(--line)] px-2 py-1.5 text-sm"
                  value={currentFilters[facet.key] || "all"}
                  onChange={(e) => setFilter(facet.key, e.target.value)}
                >
                  {facet.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
        </div>

        <p className="pt-2 text-xs font-bold uppercase tracking-wide text-[var(--mute)]">Комплект</p>
        {(
          [
            ["leaf", "Основная позиция"],
            ["frame", "Доп. 1"],
            ["casings", "Доп. 2"],
            ["hardwareBase", "Доп. 3"],
            ["installFrom", "Монтаж от"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="grid grid-cols-[1fr_100px] items-center gap-2 text-xs">
            <span>{label}</span>
            <input
              type="number"
              className="border border-[var(--line)] px-2 py-1"
              value={product.kit[key] ?? ""}
              onChange={(e) => {
                const n = e.target.value === "" ? undefined : Number(e.target.value) || 0;
                if (key === "installFrom") {
                  onChange({ ...product, kit: { ...product.kit, installFrom: n } });
                } else {
                  setKit(key, Number(e.target.value) || 0);
                }
              }}
            />
          </label>
        ))}

        <p className="pt-2 text-xs font-bold uppercase tracking-wide text-[var(--mute)]">Похожие</p>
        <div className="max-h-40 space-y-1 overflow-y-auto border border-[var(--line)] p-2">
          {allProducts
            .filter((p) => p.id !== product.id)
            .map((p) => {
              const on = related.has(p.id);
              return (
                <label key={p.id} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => {
                      const next = new Set(related);
                      if (on) next.delete(p.id);
                      else next.add(p.id);
                      set("relatedIds", [...next]);
                    }}
                  />
                  <span>
                    {p.name} <span className="text-[var(--mute)]">({p.category})</span>
                  </span>
                </label>
              );
            })}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="button" className="btn btn-solid" onClick={onSave}>
          Сохранить
        </button>
        <button type="button" className="btn btn-line" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </div>
  );
}
