"use client";

import { useState } from "react";
import { galleryImages } from "@/content/site";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";

export function GalleryMasonry({
  title,
  support,
}: {
  title: string;
  support: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="section pt-0">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <h2 className="display font-bold">{title}</h2>
            <p>{support}</p>
          </div>
        </Reveal>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
        {galleryImages.map((src, i) => (
          <Reveal
            key={src}
            delay={i * 0.03}
            className={`relative overflow-hidden ${
              i === 0 || i === 5
                ? "md:col-span-2 md:row-span-2 min-h-[240px] md:min-h-[480px]"
                : "min-h-[160px] md:min-h-[230px]"
            }`}
          >
            <button
              type="button"
              className="group absolute inset-0"
              onClick={() => setActive(src)}
              aria-label="Открыть фото"
            >
              <MediaImage
                src={src}
                alt=""
                fill
                sizes="40vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </button>
          </Reveal>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal
        >
          <button
            type="button"
            className="absolute right-5 top-5 text-sm font-semibold text-white"
            onClick={() => setActive(null)}
          >
            Закрыть
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <MediaImage src={active} alt="" fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      ) : null}
    </section>
  );
}
