import type { FacetDef, FacetOption } from "@/content/filters";
import type { ProductCategory } from "@/content/site";
import type { CustomBrandsMap } from "@/lib/custom-brands";

/** Добавляет кастомных производителей в фасет brand. */
export function mergeBrandFacets(
  category: ProductCategory,
  facets: FacetDef[],
  customBrands: CustomBrandsMap,
  productBrandValues: string[] = [],
): FacetDef[] {
  return facets.map((f) => {
    if (f.key !== "brand") return f;
    const known = new Set(f.options.map((o) => o.value));
    const extra: FacetOption[] = [];
    for (const o of customBrands[category] ?? []) {
      if (!known.has(o.value)) {
        known.add(o.value);
        extra.push(o);
      }
    }
    for (const value of productBrandValues) {
      if (!value || known.has(value)) continue;
      known.add(value);
      extra.push({ value, label: value });
    }
    if (!extra.length) return f;
    return { ...f, options: [...f.options, ...extra] };
  });
}
