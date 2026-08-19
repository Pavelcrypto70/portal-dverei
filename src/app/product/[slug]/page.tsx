import { products } from "@/content/site";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="pt-[72px]">
      <ProductView slug={slug} />
    </div>
  );
}
