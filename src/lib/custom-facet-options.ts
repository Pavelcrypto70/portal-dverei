import type { FacetOption } from "@/content/filters";
import type { ProductCategory } from "@/content/site";

export const CUSTOM_FACETS_KEY = "portal:custom-facets-v1";
/** Старый ключ — мигрируем в brand */
export const CUSTOM_BRANDS_KEY = "portal:custom-brands-v1";

/** category → facetKey → options */
export type CustomFacetsMap = Partial<
  Record<ProductCategory, Partial<Record<string, FacetOption[]>>>
>;

/** Фасеты, куда менеджер может добавить своё значение */
export const EXTENDABLE_FACET_KEYS = new Set(["brand", "color", "decor"]);

export function slugifyFacetValue(label: string): string {
  const base = label
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9а-я_]+/gi, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  return base || `opt_${Date.now()}`;
}

export function readCustomFacets(): CustomFacetsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CUSTOM_FACETS_KEY);
    if (raw) return JSON.parse(raw) as CustomFacetsMap;

    // миграция старых производителей
    const legacy = localStorage.getItem(CUSTOM_BRANDS_KEY);
    if (!legacy) return {};
    const brands = JSON.parse(legacy) as Partial<Record<ProductCategory, FacetOption[]>>;
    const migrated: CustomFacetsMap = {};
    for (const [cat, list] of Object.entries(brands)) {
      if (list?.length) migrated[cat as ProductCategory] = { brand: list };
    }
    writeCustomFacets(migrated);
    return migrated;
  } catch {
    return {};
  }
}

export function writeCustomFacets(map: CustomFacetsMap) {
  localStorage.setItem(CUSTOM_FACETS_KEY, JSON.stringify(map));
}

export function addCustomFacetOption(
  map: CustomFacetsMap,
  category: ProductCategory,
  facetKey: string,
  label: string,
): { map: CustomFacetsMap; option: FacetOption } {
  const option: FacetOption = { value: slugifyFacetValue(label), label: label.trim() };
  const byCat = map[category] ?? {};
  const list = byCat[facetKey] ?? [];
  const existing = list.find((o) => o.value === option.value);
  if (existing) return { map, option: existing };
  const next: CustomFacetsMap = {
    ...map,
    [category]: {
      ...byCat,
      [facetKey]: [...list, option],
    },
  };
  return { map: next, option };
}
