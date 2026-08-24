/** Фасеты каталога ШИКАРДОРС.РФ */

export type FacetOption = { value: string; label: string };
export type FacetDef = {
  key: string;
  label: string;
  /** price = диапазон по product.price */
  kind?: "enum" | "price" | "stock";
  options: FacetOption[];
};

const all = { value: "all", label: "Все" };

export const priceFacet: FacetDef = {
  key: "price",
  label: "Цена",
  kind: "price",
  /** UI: от/до + ползунок; options не используются */
  options: [],
};

export const stockFacet: FacetDef = {
  key: "stock",
  label: "Наличие",
  kind: "stock",
  options: [
    all,
    { value: "in_stock", label: "В наличии" },
    { value: "order", label: "Под заказ" },
  ],
};

export const interiorFacets: FacetDef[] = [
  priceFacet,
  stockFacet,
  {
    key: "coating",
    label: "Покрытия",
    options: [
      all,
      { value: "enamel", label: "Эмаль" },
      { value: "veneer", label: "Натуральный шпон" },
      { value: "solid", label: "Массив" },
      { value: "pp", label: "Полипропилен" },
      { value: "aluminum", label: "Алюминиевые" },
      { value: "pvc", label: "ПВХ" },
    ],
  },
  {
    key: "color",
    label: "Цвета",
    options: [
      all,
      { value: "white", label: "Белый" },
      { value: "cream", label: "Кремовый" },
      { value: "light_gray", label: "Светло-серый" },
      { value: "dark_gray", label: "Тёмно-серый" },
      { value: "pistachio", label: "Фисташковый" },
      { value: "burgundy", label: "Бордовый" },
      { value: "green", label: "Зелёный" },
      { value: "wood", label: "Под дерево" },
      { value: "concrete", label: "Под бетон" },
    ],
  },
  {
    key: "style",
    label: "Стиль",
    options: [
      all,
      { value: "classic", label: "Классика" },
      { value: "neoclassic", label: "Неоклассика" },
      { value: "modern", label: "Современные" },
    ],
  },
  {
    key: "hidden",
    label: "Скрытые двери",
    options: [
      all,
      { value: "paint", label: "Под отделку" },
      { value: "enamel", label: "Эмаль" },
      { value: "veneer", label: "Натуральный шпон" },
      { value: "pp", label: "Полипропилен" },
      { value: "aluminum", label: "Алюминиевые" },
    ],
  },
  {
    key: "aluminum_system",
    label: "Алюминиевые системы",
    options: [
      all,
      { value: "sliding", label: "Раздвижные перегородки" },
      { value: "fixed", label: "Стационарные перегородки" },
      { value: "swing", label: "Распашные двери" },
    ],
  },
  {
    key: "transom",
    label: "Двери с фрамугами",
    options: [
      all,
      { value: "enamel", label: "Эмаль" },
      { value: "veneer", label: "Натуральный шпон" },
      { value: "pp", label: "Полипропилен" },
    ],
  },
  {
    key: "construct",
    label: "Конструктив",
    options: [
      all,
      { value: "frame_solid", label: "Каркасно-щитовые глухие" },
      { value: "frame_glass", label: "Каркасно-щитовые со стеклом" },
      { value: "tsarga_glass", label: "Царговые глухие со стеклом" },
      { value: "tsarga", label: "Царговые" },
      { value: "aluminum", label: "Алюминиевые" },
    ],
  },
  {
    key: "brand",
    label: "Производители",
    options: [
      all,
      { value: "shikardors", label: "Шикардорс" },
      { value: "entro", label: "Энтро" },
      { value: "garmonia", label: "Гармония" },
      { value: "questdoors", label: "Квестдорс" },
      { value: "okean", label: "Океан" },
      { value: "perfecto", label: "Перфекто порте" },
      { value: "milyana", label: "Мильяна" },
      { value: "dveri_regionov", label: "Двери регионов" },
      { value: "portika", label: "Портика" },
      { value: "flydoors", label: "Флайдорс" },
      { value: "vfd", label: "ВФД" },
      { value: "veldoris", label: "Велдорис" },
      { value: "horoshie", label: "Хорошие двери" },
    ],
  },
];

export const entranceFacets: FacetDef[] = [
  priceFacet,
  stockFacet,
  {
    key: "thermo_house",
    label: "Термодвери для домов",
    options: [
      all,
      { value: "classic", label: "Классические" },
      { value: "modern", label: "Современные" },
      { value: "glass", label: "С стеклопакетом" },
      { value: "mirror", label: "С зеркалом" },
    ],
  },
  {
    key: "flat",
    label: "Двери для квартир",
    options: [
      all,
      { value: "classic", label: "Классические" },
      { value: "modern", label: "Современные" },
      { value: "elock", label: "С электронными замками" },
      { value: "mirror", label: "С зеркалом" },
    ],
  },
  {
    key: "brand",
    label: "Производители",
    options: [
      all,
      { value: "portalle", label: "Порталле" },
      { value: "stal_portie", label: "Стальной портье" },
      { value: "grand", label: "Гранд" },
      { value: "vfd", label: "ВФД" },
      { value: "flydoors", label: "Флайдорс" },
      { value: "promet", label: "Промет" },
      { value: "alex_doors", label: "Алекс дорс" },
      { value: "dveri_regionov", label: "Двери регионов" },
    ],
  },
];

export const flooringFacets: FacetDef[] = [
  priceFacet,
  stockFacet,
  {
    key: "coating",
    label: "Покрытия",
    options: [
      all,
      { value: "spc", label: "Каменно-полимерный ламинат SPC" },
      { value: "wpc", label: "Инженерный кварцвиниловый ламинат WPC" },
      { value: "lvt", label: "Кварцвиниловая плитка LVT" },
      { value: "art_vinyl_pvc", label: "ПВХ-плитка Art Vinyl" },
      { value: "art_vinyl_spc", label: "SPC плитка Art Vinyl" },
      { value: "laminate", label: "Ламинат" },
      { value: "mspc", label: "Минерально-полимерный ламинат MSPC PRO" },
      { value: "vspc", label: "Каменный паркет с натуральным шпоном VSPC" },
      { value: "engineered", label: "Инженерная доска" },
      { value: "parquet", label: "Паркетная доска" },
      { value: "carpet_tile", label: "Ковровая плитка" },
    ],
  },
  {
    key: "decor",
    label: "Декор",
    options: [
      all,
      { value: "wood", label: "Декор под дерево" },
      { value: "stone", label: "Декор под камень" },
      { value: "concrete", label: "Декор под бетон" },
    ],
  },
  {
    key: "brand",
    label: "Производители",
    options: [
      all,
      { value: "tarkett", label: "Tarkett" },
      { value: "alpine", label: "Alpine Floor" },
      { value: "norland", label: "NORLAND" },
      { value: "tulesna", label: "TULESNA" },
    ],
  },
];

export const panelsFacets: FacetDef[] = [
  priceFacet,
  stockFacet,
  {
    key: "coating",
    label: "Покрытия",
    options: [
      all,
      { value: "veneer", label: "Натуральный шпон" },
      { value: "bamboo", label: "Бамбуковые панели" },
      { value: "flex_marble", label: "Гибкий мрамор" },
    ],
  },
  {
    key: "decor",
    label: "Декор",
    options: [
      all,
      { value: "wood", label: "Декор под дерево" },
      { value: "concrete", label: "Декор под бетон" },
      { value: "stone", label: "Декор под камень" },
      { value: "enamel", label: "Декор под эмаль" },
      { value: "fabric", label: "Декор под ткань" },
      { value: "design", label: "Дизайнерский декор" },
    ],
  },
];

export const hardwareFacets: FacetDef[] = [
  priceFacet,
  stockFacet,
  {
    key: "cat",
    label: "Категория",
    options: [
      all,
      { value: "handles", label: "Ручки" },
      { value: "locks", label: "Замки" },
      { value: "hinges", label: "Петли" },
      { value: "closers", label: "Доводчики" },
    ],
  },
];

export function matchPrice(price: number, range: string): boolean {
  if (!range || range === "all") return true;
  if (range.endsWith("+")) {
    const min = Number(range.slice(0, -1));
    return price >= min;
  }
  const [a, b] = range.split("-").map(Number);
  return price >= a && price <= b;
}

export function matchProductFilters(
  product: { price: number; filters?: Record<string, string> },
  selected: Record<string, string>,
): boolean {
  return Object.entries(selected).every(([key, value]) => {
    if (!value || value === "all") return true;
    if (key === "price") return matchPrice(product.price, value);
    const field = product.filters?.[key] ?? "";
    if (!field) return false;
    return field === value || field.split("|").includes(value);
  });
}
