import type { FacetOption } from "@/content/filters";
import type { ProductCategory } from "@/content/site";

export const CUSTOM_BRANDS_KEY = "portal:custom-brands-v1";

export type CustomBrandsMap = Partial<Record<ProductCategory, FacetOption[]>>;

export function slugifyBrand(label: string): string {
  const base = label
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9а-я_]+/gi, "")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  return base || `brand_${Date.now()}`;
}

export function readCustomBrands(): CustomBrandsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CUSTOM_BRANDS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CustomBrandsMap;
  } catch {
    return {};
  }
}

export function writeCustomBrands(map: CustomBrandsMap) {
  localStorage.setItem(CUSTOM_BRANDS_KEY, JSON.stringify(map));
}

export function addCustomBrand(
  map: CustomBrandsMap,
  category: ProductCategory,
  label: string,
): { map: CustomBrandsMap; option: FacetOption } {
  const option: FacetOption = { value: slugifyBrand(label), label: label.trim() };
  const list = map[category] ?? [];
  if (list.some((o) => o.value === option.value)) {
    return { map, option: list.find((o) => o.value === option.value)! };
  }
  const next = { ...map, [category]: [...list, option] };
  return { map: next, option };
}
