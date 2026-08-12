"use client";

import Link from "next/link";
import { finishes, visualCategories } from "@/content/site";
import { MediaImage } from "@/components/MediaImage";
import { Reveal } from "@/components/Reveal";

export function VisualRails() {
  return (
    <>
      <section className="section pt-12 pb-4">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">Быстрый вход в каталог</h2>
              <p>Популярные сценарии выбора — сразу в нужную полку.</p>
            </div>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {visualCategories.map((c, i) => (
              <Reveal key={c.href} delay={i * 0.05} className="shrink-0">
                <Link href={c.href} className="group relative block h-[220px] w-[180px] overflow-hidden md:h-[260px] md:w-[210px]">
                  <MediaImage
                    src={c.image}
                    alt={c.label}
                    fill
                    sizes="210px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,10,14,0.75))]" />
                  <span className="absolute bottom-4 left-4 text-lg font-bold text-white">{c.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">Отделки в салоне</h2>
              <p>Цвет лучше смотреть вживую — вот ориентир палитры.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {finishes.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.04}>
                <Link href="/catalog/interior" className="group block">
                  <div className="relative aspect-square overflow-hidden">
                    <MediaImage
                      src={f.image}
                      alt={f.name}
                      fill
                      sizes="200px"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute bottom-0 left-0 h-2 w-full"
                      style={{ background: f.hex }}
                    />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{f.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
