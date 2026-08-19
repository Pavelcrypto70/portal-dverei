import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogBrowse } from "@/components/CatalogBrowse";
import { catalogCategories, type ProductCategory } from "@/content/site";

export function generateStaticParams() {
  return catalogCategories.map((category) => ({ category }));
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!catalogCategories.includes(category as ProductCategory)) notFound();

  return (
    <div className="pt-[72px]">
      <Suspense fallback={<div className="wrap py-20 text-[var(--mute)]">Загрузка каталога…</div>}>
        <CatalogBrowse category={category as ProductCategory} />
      </Suspense>
    </div>
  );
}
