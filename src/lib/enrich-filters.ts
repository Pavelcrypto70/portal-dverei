import type { Product } from "@/content/site";

/** Дополняет старые ключи фильтров до новой схемы каталога. */
export function enrichFilters(p: Product): Record<string, string> {
  const f: Record<string, string> = { ...(p.filters ?? {}) };

  if (!f.stock) f.stock = "in_stock";

  if (p.category === "interior") {
    if (!f.coating && f.finish) {
      const map: Record<string, string> = {
        eco: "pp",
        enamel: "enamel",
        paint: "enamel",
        glass: "aluminum",
        veneer: "veneer",
      };
      if (map[f.finish]) f.coating = map[f.finish];
    }
    if (f.type === "hidden" && !f.hidden) {
      f.hidden = f.coating === "aluminum" ? "aluminum" : f.finish === "paint" ? "paint" : "enamel";
    }
    if ((f.type === "partition" || f.finish === "glass") && !f.aluminum_system) {
      f.aluminum_system = f.type === "sliding" ? "sliding" : "swing";
      if (!f.coating) f.coating = "aluminum";
    }
    if (!f.construct) {
      if (f.coating === "aluminum" || f.finish === "glass") f.construct = "aluminum";
      else if (f.type === "sliding") f.construct = "tsarga";
      else f.construct = "frame_solid";
    }
    if (!f.color) {
      if (/бел|white|эмаль/i.test(p.finish + p.name)) f.color = "white";
      else if (/граф|чёрн|черн|black/i.test(p.finish + p.name)) f.color = "dark_gray";
      else if (/дуб|ясен|wood|экошпон/i.test(p.finish + p.name)) f.color = "wood";
      else f.color = "light_gray";
    }
    if (!f.brand) f.brand = "shikardors";
    if (f.style === "loft") f.style = "modern";
    if (f.style === "Купе" || f.style === "coupe") f.style = "modern";
  }

  if (p.category === "entrance") {
    if (f.purpose === "house" || f.feature === "thermo") {
      if (!f.thermo_house) {
        f.thermo_house =
          f.feature === "mirror" ? "mirror" : f.feature === "thermo" ? "modern" : "classic";
      }
    }
    if (f.purpose === "flat" || f.purpose === "economy" || !f.thermo_house) {
      if (!f.flat) {
        f.flat =
          f.feature === "mirror"
            ? "mirror"
            : f.feature === "elock"
              ? "elock"
              : f.style?.includes("Эконом")
                ? "classic"
                : "modern";
      }
    }
    if (!f.brand) {
      if (/grand|гранд/i.test(p.id + p.name)) f.brand = "grand";
      else if (/sibir|сибирь/i.test(p.id + p.name)) f.brand = "portalle";
      else f.brand = "vfd";
    }
  }

  if (p.category === "flooring") {
    if (!f.coating) {
      if (f.type === "spc") f.coating = "spc";
      else if (f.type === "engineered") f.coating = "engineered";
      else if (f.type === "parquet") f.coating = "parquet";
      else f.coating = "laminate";
    }
    if (!f.decor) {
      if (f.tone === "dark") f.decor = "wood";
      else if (/stone|камен|mint|grey|gray/i.test(p.finish + p.name)) f.decor = "stone";
      else f.decor = "wood";
    }
    if (!f.brand) {
      if (/spc|alpine/i.test(p.id)) f.brand = "alpine";
      else if (/engineered|parquet/i.test(f.coating)) f.brand = "tarkett";
      else f.brand = "norland";
    }
  }

  if (p.category === "panels") {
    if (!f.coating) {
      if (/bamboo|бамбук/i.test(p.id + p.name)) f.coating = "bamboo";
      else if (/мрамор|marble/i.test(p.name)) f.coating = "flex_marble";
      else f.coating = "veneer";
    }
    if (!f.decor) {
      if (/carbon|smoke|dark|бетон/i.test(p.id + p.finish)) f.decor = "concrete";
      else if (/bleach|white|эмаль/i.test(p.id + p.finish)) f.decor = "enamel";
      else f.decor = "wood";
    }
  }

  if (p.category === "hardware") {
    if (!f.cat) {
      if (/квадрат|square/i.test(p.name + p.style)) f.cat = "square_rosette";
      else if (/раздвиж|sliding/i.test(p.name + p.style)) f.cat = "sliding_handles";
      else if (/бабочк|butterfly/i.test(p.name + p.style + p.id)) f.cat = "butterfly_hinges";
      else if (/скрыт.*петл|concealed.*hinge/i.test(p.name + p.style)) f.cat = "concealed_hinges";
      else if (/карточн|card/i.test(p.name + p.style)) f.cat = "card_hinges";
      else if (/защелк|latch|магнит/i.test(p.name + p.style)) f.cat = "magnetic_latches";
      else if (/порог|threshold/i.test(p.name + p.style)) f.cat = "auto_thresholds";
      else if (/огранич|stop/i.test(p.name + p.style)) f.cat = "concealed_stops";
      else if (/ручка|handle/i.test(p.name + p.id)) f.cat = "round_rosette";
      else f.cat = "round_rosette";
    }
    if (!f.color) {
      if (/матов.*золот|matte.?gold/i.test(p.finish)) f.color = "matte_gold";
      else if (/глянц.*золот|gloss.?gold/i.test(p.finish)) f.color = "gloss_gold";
      else if (/матов.*хром|matte.?chrome/i.test(p.finish)) f.color = "matte_chrome";
      else if (/глянц.*хром|gloss.?chrome/i.test(p.finish)) f.color = "gloss_chrome";
      else if (/графит|graphite/i.test(p.finish)) f.color = "graphite";
      else if (/бронз|bronze/i.test(p.finish)) f.color = "bronze";
      else if (/бел|white/i.test(p.finish)) f.color = "white";
      else if (/чёрн|черн|black/i.test(p.finish)) f.color = "black";
      else f.color = "matte_chrome";
    }
    if (!f.brand) f.brand = "morelli";
    if (!f.stock) f.stock = "in_stock";
  }

  return f;
}
