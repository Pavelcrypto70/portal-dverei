"use client";

import { useState } from "react";
import { productGalleries, productImages, type Product } from "@/content/site";
import { MediaImage } from "@/components/MediaImage";
import { productCover } from "@/lib/product-media";

export function ProductGallery({ product }: { product: Product }) {
  const cover = productCover(product);
  const images =
    product.imageUrl
      ? [cover, ...(productGalleries[product.id] ?? []).filter((s) => s !== cover)].slice(0, 3)
      : productGalleries[product.id] ??
        [productImages[product.id]].filter(Boolean).concat([
          "/media/fork-interior.png",
          "/media/finish-oak.png",
        ]);
  const [active, setActive] = useState(0);
  const safe = images.length ? images : [cover];

  return (
    <div>
      <div className="relative min-h-[420px] overflow-hidden bg-[#d7dbe3] md:min-h-[560px]">
        <MediaImage
          src={safe[active] ?? cover}
          alt={product.name}
          fill
          priority
          className="object-cover transition duration-500"
          sizes="50vw"
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {safe.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden ${
              i === active ? "ring-2 ring-[var(--accent)]" : "opacity-80 hover:opacity-100"
            }`}
          >
            <MediaImage src={src} alt="" fill className="object-cover" sizes="160px" />
          </button>
        ))}
      </div>
    </div>
  );
}
