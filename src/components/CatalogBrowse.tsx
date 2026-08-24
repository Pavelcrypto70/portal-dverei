"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PriceRangeFilter } from "@/components/PriceRangeFilter";
import { matchProductFilters } from "@/content/filters";
import { categoryMeta, type Product, type ProductCategory } from "@/content/site";
import { enrichFilters } from "@/lib/enrich-filters";
import { saveCatalogReturn } from "@/lib/session-state";
import { useLiveProducts } from "@/components/CatalogStore";

const PAGE_SIZE = 6;

function queryToFilters(sp: URLSearchParams) {
  const next: Record<string, string> = {};
  sp.forEach((v, k) => {
    if (v) next[k] = v;
  });
  return next;
}

export function CatalogBrowse({ category }: { category: ProductCategory }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { products } = useLiveProducts();
  const [filters, setFilters] = useState<Record<string, string>>(() =>
    queryToFilters(new URLSearchParams(searchParams.toString())),
  );
  const [visible, setVisible] = useState(PAGE_SIZE);
  const facets = categoryMeta[category].facets;

  useEffect(() => {
    setFilters(queryToFilters(new URLSearchParams(searchParams.toString())));
    setVisible(PAGE_SIZE);
  }, [category, searchParams]);

  const persistUrl = useCallback(
    (next: Record<string, string>) => {
      const params = new URLSearchParams();
      Object.entries(next).forEach(([k, v]) => {
        if (v && v !== "all") params.set(k, v);
      });
      const qs = params.toString();
      const path = `${pathname}${qs ? `?${qs}` : ""}`;
      saveCatalogReturn(path);
      router.replace(path, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
    });
    const qs = params.toString();
    saveCatalogReturn(`${pathname}${qs ? `?${qs}` : ""}`);
  }, [filters, pathname]);

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === category),
    [products, category],
  );

  const priceBounds = useMemo(() => {
    if (!categoryProducts.length) return { min: 0, max: 100000 };
    const prices = categoryProducts.map((p) => p.price);
    const min = Math.floor(Math.min(...prices) / 100) * 100;
    const max = Math.ceil(Math.max(...prices) / 100) * 100;
    return { min, max: Math.max(min + 100, max) };
  }, [categoryProducts]);

  const list = useMemo(() => {
    return categoryProducts.filter((p) => {
      const enriched = { ...p, filters: enrichFilters(p) };
      return matchProductFilters(enriched, filters);
    });
  }, [categoryProducts, filters]);

  const shown = list.slice(0, visible);
  const hasMore = visible < list.length;
  const meta = categoryMeta[category];

  const setFacet = (key: string, value: string | undefined) => {
    const next = { ...filters };
    if (!value || value === "all") delete next[key];
    else next[key] = value;
    setFilters(next);
    setVisible(PAGE_SIZE);
    persistUrl(next);
  };

  return (
    <div className="wrap py-10">
      <p className="kicker">Каталог</p>
      <h1 className="display mt-3 text-4xl font-extrabold md:text-6xl">{meta.title}</h1>
      <p className="mt-3 max-w-2xl text-[var(--mute)]">{meta.lead}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit max-h-[calc(100svh-120px)] overflow-y-auto border-t border-[var(--ink)] pt-5 pr-2">
          <p className="text-sm font-bold">Фильтры</p>
          <div className="mt-5 space-y-6">
            {facets.map((f) => (
              <div key={f.key}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">
                  {f.label}
                </p>
                {f.kind === "price" ? (
                  <PriceRangeFilter
                    minBound={priceBounds.min}
                    maxBound={priceBounds.max}
                    value={filters.price}
                    onChange={(next) => setFacet("price", next)}
                  />
                ) : (
                  <div className="mt-2 space-y-1.5">
                    {f.options.map((opt) => {
                      const active = (filters[f.key] || "all") === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFacet(f.key, opt.value)}
                          className={`block w-full text-left text-sm leading-snug transition ${
                            active
                              ? "font-semibold text-[var(--accent)]"
                              : "text-[var(--ink-2)] hover:text-[var(--accent)]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 text-sm font-semibold text-[var(--mute)] underline-offset-4 hover:underline"
            onClick={() => {
              setFilters({});
              setVisible(PAGE_SIZE);
              persistUrl({});
            }}
          >
            Сбросить фильтры
          </button>
          <Link href="/measure" className="btn btn-accent mt-8 w-full">
            Нужен замер
          </Link>
        </aside>

        <div>
          <p className="mb-6 text-sm text-[var(--mute)]">
            Найдено: {list.length}
            {list.length > PAGE_SIZE ? ` · показано ${shown.length}` : ""}
          </p>
          {shown.length ? (
            <>
              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((p: Product) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {hasMore ? (
                <div className="mt-12 flex flex-col items-center gap-3">
                  <p className="text-sm text-[var(--mute)]">
                    Показано {shown.length} из {list.length}
                  </p>
                  <button
                    type="button"
                    className="btn btn-solid min-w-[200px]"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    Ещё · показать ещё {Math.min(PAGE_SIZE, list.length - visible)}
                  </button>
                </div>
              ) : (
                <p className="mt-10 text-center text-sm text-[var(--mute)]">
                  Показаны все {list.length} товаров в выборке
                </p>
              )}
            </>
          ) : (
            <div className="border border-[var(--line)] p-8 text-center">
              <p className="text-lg font-semibold">Ничего не нашли по фильтрам</p>
              <button
                type="button"
                className="btn btn-solid mt-5"
                onClick={() => {
                  setFilters({});
                  persistUrl({});
                }}
              >
                Сбросить фильтры
              </button>
              <Link href="/measure" className="btn btn-accent mt-3 inline-flex sm:ml-3">
                Вызвать замерщика
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
