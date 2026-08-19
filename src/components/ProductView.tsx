"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryMeta,
  formatPrice,
  kitTotal,
  products as seedProducts,
} from "@/content/site";
import { BackLink } from "@/components/BackLink";
import { OneClickForm } from "@/components/OneClickForm";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { useLiveProducts } from "@/components/CatalogStore";

export function ProductView({ slug }: { slug: string }) {
  const { products, ready } = useLiveProducts();
  const list = ready ? products : seedProducts;
  const product = list.find((p) => p.slug === slug);

  if (ready && !product) {
    notFound();
  }
  if (!product) {
    return <div className="wrap py-20 text-[var(--mute)]">Загрузка…</div>;
  }

  const total = kitTotal(product);
  const labels = categoryMeta[product.category].kitLabels;
  const related = (
    product.relatedIds?.length
      ? product.relatedIds.map((id) => list.find((p) => p.id === id)).filter(Boolean)
      : list.filter((p) => p.category === product.category && p.id !== product.id)
  )
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  return (
    <div className="wrap py-10">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--mute)]">
        <BackLink categoryFallback={product.category} />
        <span aria-hidden>·</span>
        <Link href={`/catalog/${product.category}`}>{categoryMeta[product.category].title}</Link>
        <span aria-hidden>/</span>
        <span className="text-[var(--ink)]">{product.name}</span>
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <ProductGallery productId={product.id} name={product.name} />
        <div>
          {product.badge ? (
            <span className="bg-[var(--ink)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          ) : null}
          <h1 className="display mt-4 text-4xl font-extrabold md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-[var(--ink-2)]">{product.short}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--mute)]">
            <span>{product.finish}</span>
            <span>{product.style}</span>
          </div>

          <div className="mt-8 border border-[var(--line)] bg-[var(--paper)] p-5">
            <p className="text-sm text-[var(--mute)]">{labels[0]}</p>
            <p className="display text-4xl font-bold">{formatPrice(product.price)}</p>
            {product.oldPrice ? (
              <p className="text-sm text-[var(--mute)] line-through">{formatPrice(product.oldPrice)}</p>
            ) : null}
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em]">Комплект</p>
            <ul className="mt-3 space-y-2 text-sm">
              {(
                [
                  [labels[0], product.kit.leaf],
                  [labels[1], product.kit.frame],
                  [labels[2], product.kit.casings],
                  [labels[3], product.kit.hardwareBase],
                ] as const
              )
                .filter(([, n]) => n > 0)
                .map(([label, n]) => (
                  <li key={label} className="flex justify-between">
                    <span>{label}</span>
                    <span>{formatPrice(n)}</span>
                  </li>
                ))}
              <li className="flex justify-between border-t border-[var(--line)] pt-2 font-bold">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
              </li>
              {product.kit.installFrom != null ? (
                <li className="flex justify-between text-[var(--mute)]">
                  <span>Монтаж / укладка от</span>
                  <span>{formatPrice(product.kit.installFrom)}</span>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/measure" className="btn btn-accent">
              Замер
            </Link>
            <a href="#one-click" className="btn btn-solid">
              1 клик
            </a>
            <BackLink
              categoryFallback={product.category}
              label="К фильтрам"
              className="btn btn-line"
            />
          </div>
          <div id="one-click" className="mt-8">
            <OneClickForm productName={product.name} formId={`buy-${product.id}`} />
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-20">
          <h2 className="display text-3xl font-bold">Похожие модели</h2>
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
