"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandMarquee } from "@/components/BrandMarquee";
import { GalleryMasonry } from "@/components/GalleryMasonry";
import { HeroSlider } from "@/components/HeroSlider";
import { MeasureForm } from "@/components/MeasureForm";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { VisualRails } from "@/components/VisualRails";
import { useQuiz } from "@/components/QuizModal";
import { home, homeMedia, products, promos, reviews } from "@/content/site";

export default function HomePage() {
  const { openQuiz } = useQuiz();
  const hits = products.filter((p) => p.category !== "hardware").slice(0, 8);

  return (
    <>
      <HeroSlider />
      <BrandMarquee />
      <VisualRails />

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">{home.categoryForkTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-2">
            {home.categoryFork.map((c, i) => (
              <Reveal key={c.href} delay={i * 0.08}>
                <Link href={c.href} className="group relative block min-h-[380px] overflow-hidden md:min-h-[460px]">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.1),rgba(8,10,14,0.78))]" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                    <p className="text-sm text-white/70">{c.priceFrom}</p>
                    <h3 className="display mt-1 text-4xl font-bold md:text-6xl">{c.title}</h3>
                    <p className="mt-3 max-w-sm text-sm text-white/80 md:text-base">{c.text}</p>
                    <span className="mt-5 inline-block text-sm font-semibold underline-offset-4 group-hover:underline">
                      Перейти →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper)] py-12">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {home.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <p className="display text-4xl font-bold tracking-tight md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-[var(--mute)]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">{home.hitsTitle}</h2>
              <p>{home.hitsSupport}</p>
            </div>
          </Reveal>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {hits.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/catalog/interior" className="btn btn-solid">
              Весь каталог
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[var(--ink)] text-white">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold text-white">{home.benefitsTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {home.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <p className="text-sm font-bold text-[var(--accent-2)]">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid md:grid-cols-2">
          {promos.slice(0, 2).map((p, i) => (
            <Link
              key={p.id}
              href="/promotions"
              className="group relative min-h-[320px] overflow-hidden"
            >
              <Image
                src={i === 0 ? homeMedia.promoA : homeMedia.promoB}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-[rgba(8,10,14,0.62)]" />
              <div className="relative z-[1] flex h-full flex-col justify-end p-8 text-white md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--accent-2)]">
                  {p.badge}
                </p>
                <h3 className="mt-3 max-w-md text-3xl font-semibold leading-tight">{p.title}</h3>
                <p className="mt-3 max-w-md text-sm text-white/70">{p.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">{home.promosTitle}</h2>
              <Link href="/promotions" className="text-sm font-semibold text-[var(--accent)]">
                Все акции
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-px bg-[var(--line)] md:grid-cols-3">
            {promos.slice(2, 5).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <Link href="/promotions" className="block bg-[var(--bg)] p-7 transition hover:bg-[var(--paper)]">
                  <p className="kicker">{p.badge}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{p.title}</h3>
                  <p className="mt-3 text-sm text-[var(--mute)]">{p.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">{home.howTitle}</h2>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-4">
            {home.howSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="border-t border-[var(--ink)] pt-5">
                  <p className="display text-3xl font-bold text-[var(--accent)]">{s.n}</p>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-[var(--mute)]">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[480px] overflow-hidden">
        <Image
          src={homeMedia.help}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(8,10,14,0.72)]" />
        <div className="relative z-[1] flex min-h-[480px] items-center">
          <div className="wrap py-16 text-white">
            <Reveal>
              <h2 className="display max-w-[14ch] text-4xl font-bold md:text-6xl">{home.helpTitle}</h2>
              <p className="mt-4 max-w-md text-white/75">{home.helpText}</p>
              <button type="button" onClick={openQuiz} className="btn mt-8 bg-white text-[var(--ink)]">
                {home.helpCta}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-head">
              <h2 className="display font-bold">{home.reviewsTitle}</h2>
              <p>{home.reviewsSupport}</p>
            </div>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.05}>
                <figure className="border-t border-[var(--line)] pt-6">
                  <blockquote className="text-lg leading-relaxed text-[var(--ink-2)]">{r.text}</blockquote>
                  <figcaption className="mt-5 text-sm font-bold">{r.name}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GalleryMasonry title={home.galleryTitle} support={home.gallerySupport} />

      <section className="section bg-[var(--paper)]">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="kicker">Сервис</p>
            <h2 className="display mt-3 text-4xl font-bold md:text-5xl">{home.measureBannerTitle}</h2>
            <p className="mt-4 max-w-md text-[var(--mute)]">{home.measureBannerText}</p>
            <div className="mt-8 grid grid-cols-3 gap-2">
              {homeMedia.measure.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden">
                  <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <MeasureForm compact />
          </Reveal>
        </div>
      </section>
    </>
  );
}
