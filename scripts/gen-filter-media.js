const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "media");
const items = [
  ["f-enamel", "#f4f1ea", "Эмаль"],
  ["f-veneer", "#c4a574", "Шпон"],
  ["f-solid", "#8b5a2b", "Массив"],
  ["f-pp", "#d9dde3", "ПП"],
  ["f-alu", "#9aa3ad", "Алюминий"],
  ["f-pvc", "#e8e0d5", "ПВХ"],
  ["c-white", "#f7f7f5", "Белый"],
  ["c-cream", "#f0e6d2", "Крем"],
  ["c-gray", "#b8bec6", "Серый"],
  ["c-dark", "#4a5058", "Тёмный"],
  ["c-pistachio", "#c5d5b8", "Фисташка"],
  ["c-burgundy", "#7a2e3a", "Бордо"],
  ["c-green", "#3f6b4f", "Зелёный"],
  ["c-wood", "#b08a5a", "Дерево"],
  ["c-concrete", "#8d9096", "Бетон"],
  ["floor-spc", "#6e737a", "SPC"],
  ["floor-wpc", "#a89078", "WPC"],
  ["floor-lvt", "#d4c4b0", "LVT"],
  ["floor-carpet", "#5c6b7a", "Ковёр"],
  ["panel-veneer", "#c9a66b", "Шпон"],
  ["panel-bamboo", "#d2b48c", "Бамбук"],
  ["panel-marble", "#e6e2dc", "Мрамор"],
  ["enter-thermo", "#2c3036", "Термо"],
  ["enter-flat", "#3a3f46", "Квартира"],
];

for (const [name, color, label] of items) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="#0c0f14" stop-opacity="0.35"/></linearGradient></defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <rect x="90" y="120" width="620" height="760" rx="8" fill="#0c0f14" fill-opacity="0.18"/>
  <rect x="140" y="180" width="520" height="640" rx="4" fill="${color}" stroke="#0c0f14" stroke-opacity="0.25" stroke-width="3"/>
  <text x="400" y="920" text-anchor="middle" font-family="Arial, sans-serif" font-size="42" font-weight="700" fill="#0c0f14">${label}</text>
  <text x="400" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="700" fill="#fbbe07">ШИКАРДОРС</text>
</svg>`;
  fs.writeFileSync(path.join(dir, `${name}.svg`), svg);
}

console.log("wrote", items.length, "svgs");
