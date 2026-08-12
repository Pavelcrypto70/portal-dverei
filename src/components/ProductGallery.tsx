"use client";

import Image from "next/image";
import { useState } from "react";
import { productGalleries, productImages } from "@/content/site";

export function ProductGallery({ productId, name }: { productId: string; name: string }) {
  const images =
    productGalleries[productId] ??
    [productImages[productId]].filter(Boolean).concat([
      "/media/fork-interior.png",
      "/media/finish-oak.png",
    ]);
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative min-h-[420px] overflow-hidden bg-[#d7dbe3] md:min-h-[560px]">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          className="object-cover transition duration-500"
          sizes="50vw"
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[4/3] overflow-hidden ${
              i === active ? "ring-2 ring-[var(--accent)]" : "opacity-80 hover:opacity-100"
            }`}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="160px" />
          </button>
        ))}
      </div>
    </div>
  );
}
