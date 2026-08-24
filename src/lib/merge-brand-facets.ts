import type { FacetDef, FacetOption } from "@/content/filters";
import type { ProductCategory } from "@/content/site";
import {
  EXTENDABLE_FACET_KEYS,
  type CustomFacetsMap,
} from "@/lib/custom-facet-options";

/** Дописывает кастомные опции (бренд, цвет, декор…) в фасеты. */
export function mergeCustomFacets(
  category: ProductCategory,
  facets: FacetDef[],
  customFacets: CustomFacetsMap,
  productValuesByKey: Partial<Record<string, string[]>> = {},
): FacetDef[] {
  return facets.map((f) => {
    if (!EXTENDABLE_FACET_KEYS.has(f.key)) return f;
    const known = new Set(f.options.map((o) => o.value));
    const extra: FacetOption[] = [];

    for (const o of customFacets[category]?.[f.key] ?? []) {
      if (!known.has(o.value)) {
        known.add(o.value);
        extra.push(o);
      }
    }
    for (const value of productValuesByKey[f.key] ?? []) {
      if (!value || known.has(value)) continue;
      known.add(value);
      extra.push({ value, label: value });
    }
    if (!extra.length) return f;
    return { ...f, options: [...f.options, ...extra] };
  });
}

/** @deprecated use mergeCustomFacets */
export function mergeBrandFacets(
  category: ProductCategory,
  facets: FacetDef[],
  customBrands: Partial<Record<ProductCategory, FacetOption[]>>,
  productBrandValues: string[] = [],
): FacetDef[] {
  const asFacets: CustomFacetsMap = {};
  for (const [cat, list] of Object.entries(customBrands)) {
    if (list?.length) asFacets[cat as ProductCategory] = { brand: list };
  }
  return mergeCustomFacets(category, facets, asFacets, { brand: productBrandValues });
}
