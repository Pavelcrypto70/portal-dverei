"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCatalogReturn } from "@/lib/session-state";

type Props = {
  /** Категория текущего товара — запасной путь, если нет сохранённого каталога */
  categoryFallback?: string;
  label?: string;
  className?: string;
};

/** Назад в каталог/предыдущий экран без сброса сохранённых фильтров. */
export function BackLink({
  categoryFallback = "interior",
  label = "← Назад в каталог",
  className = "text-sm font-semibold text-[var(--accent)] hover:underline",
}: Props) {
  const [href, setHref] = useState(`/catalog/${categoryFallback}`);

  useEffect(() => {
    setHref(readCatalogReturn(`/catalog/${categoryFallback}`));
  }, [categoryFallback]);

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
