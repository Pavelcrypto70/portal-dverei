"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { brand, heroSlides, home } from "@/content/site";
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
              <Image
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

      <div className="relative z-[1] flex h-full flex-col justify-end pb-16 pt-[96px]">
        <div className="wrap">
          <p className="anim-up display text-[clamp(3.4rem,12vw,8.5rem)] font-extrabold leading-[0.85] text-white">
            {brand.name}
          </p>
          <h1 className="anim-up anim-up-2 mt-5 max-w-[16ch] whitespace-pre-line text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-[1.1] text-white">
            {home.h1}
          </h1>
          <p className="anim-up anim-up-3 mt-4 max-w-md text-base text-white/75 md:text-lg">
            {home.h1Support}
          </p>
          <div className="anim-up anim-up-3 mt-8 flex flex-wrap gap-3">
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

          <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
            <p className="max-w-sm text-sm text-white/60">{slide.text}</p>
            <div className="flex items-center gap-2">
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
