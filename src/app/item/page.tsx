"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductView } from "@/components/ProductView";

function ItemInner() {
  const sp = useSearchParams();
  const slug = sp.get("slug") || "";
  if (!slug) {
    return (
      <div className="wrap py-20">
        <p className="text-lg font-semibold">Товар не выбран</p>
      </div>
    );
  }
  return <ProductView slug={slug} />;
}

export default function ItemPage() {
  return (
    <div className="pt-[72px]">
      <Suspense fallback={<div className="wrap py-20 text-[var(--mute)]">Загрузка…</div>}>
        <ItemInner />
      </Suspense>
    </div>
  );
}
