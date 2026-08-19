"use client";

import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import { formatPrice, productImages, type Product } from "@/content/site";
import { saveCatalogReturn } from "@/lib/session-state";

export function ProductCard({ product }: { product: Product }) {
  const img = productImages[product.id] ?? "/media/p-turin.png";
  const href = `/item?slug=${encodeURIComponent(product.slug)}`;

  const remember = () => {
    if (typeof window === "undefined") return;
    const path = `${window.location.pathname.replace(/^\/portal-dverei/, "")}${window.location.search}`;
    if (path.includes("/catalog/")) saveCatalogReturn(path || `/catalog/${product.category}`);
  };

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={href}
        onClick={remember}
        className="relative block aspect-[4/5] overflow-hidden bg-[#d7dbe3]"
      >
        <MediaImage
          src={img}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(8,10,14,0.62))] opacity-90 transition group-hover:opacity-100" />
        {product.badge ? (
          <span className="absolute left-3 top-3 bg-[var(--brand)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--ink)]">
            {product.badge}
          </span>
        ) : null}
        <div className="absolute bottom-3 left-3 right-3 translate-y-1 text-white transition duration-300 group-hover:translate-y-0">
          <p className="text-xl font-bold">{formatPrice(product.price)}</p>
          {product.oldPrice ? (
            <p className="text-xs text-white/70 line-through">{formatPrice(product.oldPrice)}</p>
          ) : (
            <p className="text-xs text-white/70">{product.finish}</p>
          )}
        </div>
      </Link>
      <div className="pt-4">
        <p className="text-xs uppercase tracking-[0.12em] text-[var(--mute)]">
          {product.style}
          {product.colorsExtra ? ` · +${product.colorsExtra} цвета` : ""}
        </p>
        <Link href={href} onClick={remember} className="mt-1 block text-lg font-semibold leading-tight">
          {product.name}
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--mute)]">{product.short}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Link href={href} onClick={remember} className="text-sm font-semibold text-[var(--accent)]">
            Комплект
          </Link>
          <Link
            href={`${href}#one-click`}
            onClick={remember}
            className="text-sm font-semibold text-[var(--ink)] underline-offset-4 hover:underline"
          >
            1 клик
          </Link>
        </div>
      </div>
    </article>
  );
}
