import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, kitTotal, products } from "@/content/site";
import { OneClickForm } from "@/components/OneClickForm";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const total = kitTotal(product);
  const showBuy = false;
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-[72px]">
      <div className="wrap py-10">
        <p className="text-sm text-[var(--mute)]">
          <Link href={`/catalog/${product.category}`}>Каталог</Link> / {product.name}
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <ProductGallery productId={product.id} name={product.name} />
          <div>
            {product.badge ? (
              <span className="bg-[var(--ink)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {product.badge}
              </span>
            ) : null}
            <h1 className="display mt-4 text-4xl font-extrabold md:text-5xl">{product.name}</h1>
            <p className="mt-4 text-[var(--ink-2)]">{product.short}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-[var(--mute)]">
              <span>{product.finish}</span>
              <span>{product.style}</span>
            </div>

            <div className="mt-8 border border-[var(--line)] bg-[var(--paper)] p-5">
              <p className="text-sm text-[var(--mute)]">Полотно</p>
              <p className="display text-4xl font-bold">{formatPrice(product.price)}</p>
              {product.oldPrice ? (
                <p className="text-sm text-[var(--mute)] line-through">{formatPrice(product.oldPrice)}</p>
              ) : null}
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em]">Комплект</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between"><span>Полотно</span><span>{formatPrice(product.kit.leaf)}</span></li>
                <li className="flex justify-between"><span>Коробка</span><span>{formatPrice(product.kit.frame)}</span></li>
                <li className="flex justify-between"><span>Наличники</span><span>{formatPrice(product.kit.casings)}</span></li>
                <li className="flex justify-between"><span>Базовая фурнитура</span><span>{formatPrice(product.kit.hardwareBase)}</span></li>
                <li className="flex justify-between border-t border-[var(--line)] pt-2 font-bold">
                  <span>Итого</span><span>{formatPrice(total)}</span>
                </li>
                {product.kit.installFrom != null ? (
                  <li className="flex justify-between text-[var(--mute)]">
                    <span>Монтаж от</span>
                    <span>{formatPrice(product.kit.installFrom)}</span>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/measure" className="btn btn-accent">Замер</Link>
              <a href="#one-click" className="btn btn-solid">1 клик</a>
            </div>
            <div id="one-click" className="mt-8">
              <OneClickForm productName={product.name} autoFocus={showBuy} />
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-20">
            <h2 className="display text-3xl font-bold">Похожие модели</h2>
            <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
