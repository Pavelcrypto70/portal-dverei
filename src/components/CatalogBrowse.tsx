"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categoryMeta, type ProductCategory } from "@/content/site";
import { saveCatalogReturn } from "@/lib/session-state";
import { useLiveProducts } from "@/components/CatalogStore";

const PAGE_SIZE = 6;

function matchesFilters(
  p: { filters?: Record<string, string>; finish: string; style: string },
  filters: Record<string, string>,
) {
  return Object.entries(filters).every(([key, value]) => {
    if (!value || value === "all") return true;
    const field = p.filters?.[key] ?? "";
    if (field) return field === value || field.split("|").includes(value);
    if (key === "finish") return p.finish.toLowerCase().includes(value.toLowerCase());
    if (key === "style") return p.style.toLowerCase().includes(value.toLowerCase());
    return true;
  });
}

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

  const list = useMemo(
    () => products.filter((p) => p.category === category && matchesFilters(p, filters)),
    [category, filters],
  );

  const shown = list.slice(0, visible);
  const hasMore = visible < list.length;
  const meta = categoryMeta[category];

  const setFacet = (key: string, value: string) => {
    const next = { ...filters };
    if (value === "all") delete next[key];
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

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit border-t border-[var(--ink)] pt-5">
          <p className="text-sm font-bold">Фильтры</p>
          <div className="mt-5 space-y-5">
            {facets.map((f) => (
              <div key={f.key}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--mute)]">
                  {f.label}
                </p>
                <div className="mt-2 space-y-2">
                  {f.options.map((opt) => {
                    const active = (filters[f.key] || "all") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFacet(f.key, opt.value)}
                        className={`block text-left text-sm transition ${
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
                {shown.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {hasMore ? (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    className="btn btn-line"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    Ещё · +{Math.min(PAGE_SIZE, list.length - visible)}
                  </button>
                </div>
              ) : null}
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
