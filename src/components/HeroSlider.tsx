"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { heroSlides, home } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";
import { MediaImage } from "@/components/MediaImage";
import { useQuiz } from "@/components/QuizModal";

export function HeroSlider() {
  const { openQuiz } = useQuiz();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const slide = heroSlides[index] ?? heroSlides[0];

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[var(--ink)]">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((s, i) => (
            <div key={s.id} className="relative min-w-0 flex-[0_0_100%]">
              <MediaImage
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover ${i === index ? "hero-media" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,10,14,0.78)_0%,rgba(8,10,14,0.45)_48%,rgba(8,10,14,0.2)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.45)_0%,transparent_28%,rgba(8,10,14,0.55)_100%)]" />

      <div className="relative z-[1] flex h-full flex-col justify-end pb-28 pt-[88px] sm:pb-16 sm:pt-[96px]">
        <div className="wrap">
          <p className="anim-up max-w-full text-[clamp(1.85rem,8.4vw,7.8rem)] leading-[0.88] drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
            <BrandMark
              variant="hero"
              mainClassName="text-[var(--brand)]"
              tldClassName="text-[#9aa0a8]"
            />
          </p>
          <h1 className="anim-up anim-up-2 mt-4 max-w-[16ch] whitespace-pre-line text-[clamp(1.35rem,4.2vw,2.6rem)] font-semibold leading-[1.15] text-white sm:mt-5">
            {home.h1}
          </h1>
          <p className="anim-up anim-up-3 mt-3 max-w-md text-sm text-white/75 sm:mt-4 sm:text-base md:text-lg">
            {home.h1Support}
          </p>
          <div className="anim-up anim-up-3 mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
            <Link href={slide.href} className="btn bg-white text-[var(--ink)]">
              {slide.cta}
            </Link>
            <Link href="/measure" className="btn btn-line-light">
              Бесплатный замер
            </Link>
            <button type="button" onClick={openQuiz} className="btn btn-line-light">
              Подобрать
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="max-w-sm text-sm text-white/60">{slide.text}</p>
            <div className="flex shrink-0 items-center gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Слайд ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-[3px] transition-all ${
                    i === index ? "w-10 bg-[var(--accent-2)] pulse-line" : "w-5 bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
