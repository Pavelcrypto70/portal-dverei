/** Центральный контент сайта — правьте тексты здесь под заказчика */

export const brand = {
  name: "PORTAL",
  tagline: "Двери. Замер. Монтаж под ключ",
  city: "Тюмень",
  description: "Салон межкомнатных и входных дверей с установкой",
  email: "hello@portal-dverei.ru",
  whatsapp: "https://wa.me/79199000001",
  telegram: "https://t.me/portal_dverei",
  phoneMain: "+7 (3452) 91-92-00",
  phoneMainHref: "tel:+73452919200",
};

export const salons = [
  {
    id: "zarechnaya",
    name: "ТЦ Заречная · Блошинка",
    address: "ул. Ю.-Р.Г. Эрвье, 22",
    phone: "+7 (3452) 91-92-00",
    phoneHref: "tel:+73452919200",
    hours: "Ежедневно 09:00–20:00",
  },
  {
    id: "moskovsky",
    name: "Московский тракт",
    address: "Московский тракт, 120с2, оф. 255",
    phone: "+7 (958) 260-44-54",
    phoneHref: "tel:+79582604454",
    hours: "Ежедневно 09:00–18:30",
  },
  {
    id: "permyakova",
    name: "ТЦ Перестрой-ка",
    address: "ул. Пермякова, 1а",
    phone: "+7 (992) 305-60-61",
    phoneHref: "tel:+79923056061",
    hours: "Ежедневно 09:00–19:00",
  },
];

export const nav = [
  {
    label: "Межкомнатные",
    href: "/catalog/interior",
    columns: [
      {
        title: "По конструкции",
        links: [
          { label: "Распашные", href: "/catalog/interior?type=swing" },
          { label: "Раздвижные / купе", href: "/catalog/interior?type=sliding" },
          { label: "Складные", href: "/catalog/interior?type=folding" },
          { label: "Скрытые", href: "/catalog/interior?type=hidden" },
          { label: "Перегородки", href: "/catalog/interior?type=partition" },
        ],
      },
      {
        title: "По стилю",
        links: [
          { label: "Современные", href: "/catalog/interior?style=modern" },
          { label: "Неоклассика", href: "/catalog/interior?style=neoclassic" },
          { label: "Лофт", href: "/catalog/interior?style=loft" },
          { label: "Классика", href: "/catalog/interior?style=classic" },
        ],
      },
      {
        title: "По отделке",
        links: [
          { label: "Экошпон", href: "/catalog/interior?finish=eco" },
          { label: "Натуральный шпон", href: "/catalog/interior?finish=veneer" },
          { label: "Эмаль", href: "/catalog/interior?finish=enamel" },
          { label: "Под покраску", href: "/catalog/interior?finish=paint" },
        ],
      },
    ],
  },
  {
    label: "Входные",
    href: "/catalog/entrance",
    columns: [
      {
        title: "По назначению",
        links: [
          { label: "В квартиру", href: "/catalog/entrance?purpose=flat" },
          { label: "В дом / коттедж", href: "/catalog/entrance?purpose=house" },
          { label: "Для дачи", href: "/catalog/entrance?purpose=dacha" },
          { label: "Противопожарные", href: "/catalog/entrance?purpose=fire" },
        ],
      },
      {
        title: "По конструкции",
        links: [
          { label: "С терморазрывом", href: "/catalog/entrance?feature=thermo" },
          { label: "С зеркалом", href: "/catalog/entrance?feature=mirror" },
          { label: "С шумоизоляцией", href: "/catalog/entrance?feature=noise" },
          { label: "Двустворчатые", href: "/catalog/entrance?feature=double" },
        ],
      },
      {
        title: "По бюджету",
        links: [
          { label: "До 25 000 ₽", href: "/catalog/entrance?price=0-25000" },
          { label: "25–50 000 ₽", href: "/catalog/entrance?price=25000-50000" },
          { label: "от 50 000 ₽", href: "/catalog/entrance?price=50000+" },
        ],
      },
    ],
  },
  {
    label: "Фурнитура",
    href: "/catalog/hardware",
    columns: [
      {
        title: "Категории",
        links: [
          { label: "Ручки", href: "/catalog/hardware?cat=handles" },
          { label: "Замки", href: "/catalog/hardware?cat=locks" },
          { label: "Петли", href: "/catalog/hardware?cat=hinges" },
          { label: "Доводчики", href: "/catalog/hardware?cat=closers" },
        ],
      },
    ],
  },
  {
    label: "Услуги",
    href: "/services",
    columns: [
      {
        title: "Под ключ",
        links: [
          { label: "Бесплатный замер", href: "/measure" },
          { label: "Установка дверей", href: "/services#install" },
          { label: "Доставка и оплата", href: "/services#delivery" },
          { label: "Гарантия", href: "/services#warranty" },
        ],
      },
    ],
  },
  { label: "Акции", href: "/promotions" },
  { label: "О магазине", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

export const categoryRow = [
  { label: "Межкомнатные", href: "/catalog/interior", icon: "interior" },
  { label: "Входные", href: "/catalog/entrance", icon: "entrance" },
  { label: "Перегородки", href: "/catalog/interior?type=partition", icon: "partition" },
  { label: "Фурнитура", href: "/catalog/hardware", icon: "hardware" },
  { label: "Замерщик", href: "/measure", icon: "measure" },
  { label: "Акции", href: "/promotions", icon: "promo" },
];

export const heroSlides = [
  {
    id: "hidden",
    title: "Дверь как часть архитектуры",
    text: "Скрытые системы и чистые линии — полный комплект от 25 000 ₽.",
    cta: "Смотреть скрытые",
    href: "/catalog/interior?type=hidden",
    image: "/media/hero-hidden.png",
  },
  {
    id: "finishes",
    title: "Оттенок, который совпадёт с интерьером",
    text: "Живые образцы в трёх салонах Тюмени — не угадывание по экрану.",
    cta: "Открыть каталог",
    href: "/catalog/interior",
    image: "/media/hero-finish.png",
  },
  {
    id: "entrance",
    title: "Входные двери с понятной сметой",
    text: "Терморазрыв, шум, безопасность — считаем комплект и монтаж до договора.",
    cta: "Входные двери",
    href: "/catalog/entrance",
    image: "/media/hero-entrance.png",
  },
  {
    id: "install",
    title: "Монтаж, после которого не стыдно принимать работу",
    text: "Свои бригады, облагораживание проёма, сроки в договоре.",
    cta: "Вызвать замерщика",
    href: "/measure",
    image: "/media/hero-install.png",
  },
  {
    id: "showroom",
    title: "Три салона — потрогать цвет до покупки",
    text: "Экошпон, эмаль, шпон и фурнитура вживую при нормальном свете.",
    cta: "Адреса салонов",
    href: "/contacts",
    image: "/media/hero-showroom.png",
  },
];

export const brands = [
  "Optima Porte",
  "ProfilDoors",
  "Владимирская фабрика",
  "Стальная линия",
  "Torex",
  "Браво",
  "Дверной континент",
  "LA STELLA",
];

export const finishes = [
  { name: "Белый ясень", hex: "#e8e4dc", image: "/media/finish-white.png" },
  { name: "Графит", hex: "#3a3f46", image: "/media/finish-graphite.png" },
  { name: "Дуб натуральный", hex: "#b08a5a", image: "/media/finish-oak.png" },
  { name: "Чёрный мат", hex: "#1a1c1f", image: "/media/finish-black.png" },
  { name: "Капучино", hex: "#a89078", image: "/media/finish-cappuccino.png" },
  { name: "Эмаль мята", hex: "#c5d5cb", image: "/media/finish-mint.png" },
];

export const galleryImages = [
  "/media/g-extra-1.png",
  "/media/fork-interior.png",
  "/media/promo-1.png",
  "/media/p-rome.png",
  "/media/hero-install.png",
  "/media/g-extra-2.png",
  "/media/p-grand.png",
  "/media/promo-2.png",
];

export const visualCategories = [
  { label: "Скрытые", href: "/catalog/interior?type=hidden", image: "/media/cat-hidden.png" },
  { label: "Купе", href: "/catalog/interior?type=sliding", image: "/media/cat-coupe.png" },
  { label: "Эмаль", href: "/catalog/interior?finish=enamel", image: "/media/cat-enamel.png" },
  { label: "Терморазрыв", href: "/catalog/entrance?feature=thermo", image: "/media/cat-thermo.png" },
  { label: "С зеркалом", href: "/catalog/entrance?feature=mirror", image: "/media/cat-mirror.png" },
  { label: "Перегородки", href: "/catalog/interior?type=partition", image: "/media/cat-partition.png" },
];

export const productImages: Record<string, string> = {
  "turin-507": "/media/p-turin.png",
  symphony: "/media/p-symphony.png",
  "hidden-line": "/media/p-hidden.png",
  rome: "/media/p-rome.png",
  loft: "/media/p-loft.png",
  coupe: "/media/p-coupe.png",
  "sibir-sb3": "/media/p-sibir.png",
  "grand-ash": "/media/p-grand.png",
  stroygost: "/media/p-stroy.png",
  "thermo-elite": "/media/p-thermo.png",
  handle: "/media/finish-graphite.png",
  lock: "/media/cat-mirror.png",
};

export const productGalleries: Record<string, string[]> = {
  "turin-507": ["/media/p-turin.png", "/media/fork-interior.png", "/media/finish-oak.png"],
  symphony: ["/media/p-symphony.png", "/media/hero-finish.png", "/media/finish-cappuccino.png"],
  "hidden-line": ["/media/p-hidden.png", "/media/cat-hidden.png", "/media/hero-hidden.png"],
  rome: ["/media/p-rome.png", "/media/cat-enamel.png", "/media/finish-white.png"],
  loft: ["/media/p-loft.png", "/media/cat-partition.png", "/media/cat-coupe.png"],
  coupe: ["/media/p-coupe.png", "/media/cat-coupe.png", "/media/fork-interior.png"],
  "sibir-sb3": ["/media/p-sibir.png", "/media/fork-entrance.png", "/media/cat-mirror.png"],
  "grand-ash": ["/media/p-grand.png", "/media/finish-oak.png", "/media/promo-2.png"],
  stroygost: ["/media/p-stroy.png", "/media/fork-entrance.png", "/media/hero-entrance.png"],
  "thermo-elite": ["/media/p-thermo.png", "/media/cat-thermo.png", "/media/hero-entrance.png"],
};

export const homeMedia = {
  promoA: "/media/promo-1.png",
  promoB: "/media/promo-2.png",
  help: "/media/help-banner.png",
  measure: ["/media/measure-1.png", "/media/p-turin.png", "/media/fork-interior.png"],
};

export const home = {
  h1: "Двери для дома,\nкоторый уже почти готов",
  h1Support: "Каталог, бесплатный замер и монтаж под ключ в Тюмени.",
  categoryForkTitle: "Выберите направление",
  categoryFork: [
    {
      title: "Входные",
      text: "Квартира и дом — с терморазрывом и ясной сметой монтажа.",
      href: "/catalog/entrance",
      priceFrom: "от 11 500 ₽",
      image: "/media/fork-entrance.png",
    },
    {
      title: "Межкомнатные",
      text: "Распашные, купе, скрытые — под стиль и бюджет ремонта.",
      href: "/catalog/interior",
      priceFrom: "от 5 400 ₽",
      image: "/media/fork-interior.png",
    },
  ],
  benefitsTitle: "Как мы закрываем покупку",
  benefits: [
    {
      title: "Бесплатный замер",
      text: "Проём, открывание и комплект — без скрытых доплат в разговоре.",
    },
    {
      title: "Своя доставка",
      text: "Привозим полотна и фурнитуру аккуратно, в согласованный день.",
    },
    {
      title: "Три салона",
      text: "Смотрите цвет и ручки вживую при нормальном свете.",
    },
    {
      title: "Монтаж под ключ",
      text: "Установка и облагораживание проёма одной бригадой.",
    },
  ],
  hitsTitle: "Сейчас берут чаще всего",
  hitsSupport: "Цена полотна на витрине — полный комплект внутри карточки.",
  promosTitle: "Условия, которые двигают сделку",
  howTitle: "Четыре шага без хаоса",
  howSteps: [
    { n: "01", title: "Замер", text: "Окно визита и перезвон за 10 минут." },
    { n: "02", title: "Подбор", text: "В салоне или онлайн — под стиль и бюджет." },
    { n: "03", title: "Договор", text: "Комплект, монтаж и сроки до оплаты." },
    { n: "04", title: "Установка", text: "Доставка, монтаж, приёмка работ." },
  ],
  helpTitle: "Нужен короткий путь к модели",
  helpText: "4 вопроса — подборка и купон 3 000 ₽ на комплект.",
  helpCta: "Подобрать за 2 минуты",
  reviewsTitle: "После монтажа",
  reviewsSupport: "Черновик отзывов — заменим на свежие с карт.",
  galleryTitle: "Как выглядит результат",
  gallerySupport: "Интерьеры вместо студийных вырезок.",
  measureBannerTitle: "Замерщик на объект",
  measureBannerText: "Ориентир по смете уже на визите.",
  stats: [
    { value: "12 000+", label: "установок в год" },
    { value: "11 лет", label: "на рынке" },
    { value: "3 салона", label: "с образцами" },
    { value: "96%", label: "рекомендуют" },
  ],
};

export const promos = [
  {
    id: "third",
    title: "Третье полотно в подарок",
    text: "На коллекции Optima Porte и LA STELLA — до конца месяца. Условия уточняйте у менеджера.",
    badge: "Хит акции",
  },
  {
    id: "install",
    title: "Установка каждой третьей двери — 0 ₽",
    text: "При заказе комплекта межкомнатных дверей с монтажом нашей бригадой.",
    badge: "Монтаж",
  },
  {
    id: "delivery",
    title: "Доставка по городу в подарок",
    text: "При покупке от 50 000 ₽. За город — по тарифу логистики.",
    badge: "Доставка",
  },
  {
    id: "credit",
    title: "Рассрочка 0–0–6",
    text: "Без первоначального взноса и переплаты на 6 месяцев — по одобрению банка.",
    badge: "Оплата",
  },
  {
    id: "pension",
    title: "Скидки новоселам и пенсионерам до 15%",
    text: "При предъявлении документов. Не суммируется с отдельными спецпредложениями.",
    badge: "Скидка",
  },
  {
    id: "hidden",
    title: "Скрытая дверь — спеццена",
    text: "Полный комплект скрытой системы от 25 000 ₽. Замер и консультация бесплатно.",
    badge: "Новинка",
  },
];

export const reviews = [
  {
    name: "Елена Тиунова",
    text: "Менеджер показала варианты от эконома до премиума. Входную поставили на следующий день, пять межкомнатных — за один день к нужной дате. Квартира сразу «собралась».",
    rating: 5,
  },
  {
    name: "Сергей Перескоков",
    text: "Грамотно объяснили комплектацию. Двери без косяков, монтажники быстро и аккуратно. Буду рекомендовать.",
    rating: 5,
  },
  {
    name: "Валерия Меркель",
    text: "Привезли быстро, поставили за четыре часа. Консультанты чёткие — без воды. Осталась довольна.",
    rating: 5,
  },
  {
    name: "Олег Харин",
    text: "В новостройке стояла «фольга». Подобрали входную под бюджет и объяснили, от чего зависит безопасность. Монтаж с позитивом.",
    rating: 5,
  },
];

export type Product = {
  id: string;
  slug: string;
  category: "interior" | "entrance" | "hardware";
  name: string;
  badge?: string;
  colorsExtra?: number;
  price: number;
  oldPrice?: number;
  finish: string;
  style: string;
  short: string;
  kit: {
    leaf: number;
    frame: number;
    casings: number;
    hardwareBase: number;
    installFrom?: number;
  };
};

export const products: Product[] = [
  {
    id: "turin-507",
    slug: "turin-507-12",
    category: "interior",
    name: "Турин 507.12",
    badge: "Хит",
    colorsExtra: 6,
    price: 5400,
    oldPrice: 7714,
    finish: "Экошпон",
    style: "Современный",
    short: "Лёгкая межкомнатная модель для массовых проёмов. Часто берут комплектом на квартиру.",
    kit: { leaf: 5400, frame: 2100, casings: 1800, hardwareBase: 1200, installFrom: 2500 },
  },
  {
    id: "symphony",
    slug: "simfoniya-pg",
    category: "interior",
    name: "Симфония ПГ",
    badge: "−30%",
    price: 5885,
    oldPrice: 8407,
    finish: "Экошпон",
    style: "Неоклассика",
    short: "Глухое полотно с мягкой геометрией — спокойный фон для гостиной и спальни.",
    kit: { leaf: 5885, frame: 2300, casings: 1900, hardwareBase: 1400, installFrom: 2500 },
  },
  {
    id: "hidden-line",
    slug: "skrytaya-linea",
    category: "interior",
    name: "Скрытая Linea Invisible",
    badge: "Новинка",
    price: 25000,
    finish: "Под покраску",
    style: "Минимализм",
    short: "Скрытый короб, полотно в плоскости стены. Полный комплект по спеццене.",
    kit: { leaf: 16800, frame: 5200, casings: 0, hardwareBase: 3000, installFrom: 4500 },
  },
  {
    id: "rome",
    slug: "rim-pg",
    category: "interior",
    name: "Рим ПГ",
    colorsExtra: 1,
    price: 9268,
    oldPrice: 13240,
    finish: "Эмаль",
    style: "Классика",
    short: "Эмалевое покрытие для интерьеров, где важна «чистая» поверхность и цвет.",
    kit: { leaf: 9268, frame: 2800, casings: 2400, hardwareBase: 1800, installFrom: 2800 },
  },
  {
    id: "loft",
    slug: "loft-glass",
    category: "interior",
    name: "Лофт Glass",
    badge: "Новинка",
    colorsExtra: 4,
    price: 18900,
    finish: "Алюминий / стекло",
    style: "Лофт",
    short: "Стеклянная перегородка-дверь для зонирования без потери света.",
    kit: { leaf: 18900, frame: 4200, casings: 0, hardwareBase: 2600, installFrom: 4000 },
  },
  {
    id: "coupe",
    slug: "turin-coupe",
    category: "interior",
    name: "Турин 521.22 купе",
    colorsExtra: 5,
    price: 7425,
    oldPrice: 10607,
    finish: "Экошпон",
    style: "Купе",
    short: "Раздвижная система для узких коридоров и смежных комнат.",
    kit: { leaf: 7425, frame: 0, casings: 0, hardwareBase: 5200, installFrom: 3500 },
  },
  {
    id: "sibir-sb3",
    slug: "sibir-sb-3",
    category: "entrance",
    name: "Сибирь СБ-3",
    badge: "Хит",
    price: 27500,
    finish: "МДФ / металл",
    style: "Квартира",
    short: "Надёжная входная для квартиры: понятная комплектация и быстрый монтаж.",
    kit: { leaf: 27500, frame: 0, casings: 3500, hardwareBase: 0, installFrom: 4500 },
  },
  {
    id: "grand-ash",
    slug: "grand-yasen",
    category: "entrance",
    name: "Гранд ясень",
    badge: "Хит",
    price: 28990,
    finish: "МДФ ясень",
    style: "Квартира",
    short: "Тёплая фактура ясеня на панели — частый выбор для новостроек.",
    kit: { leaf: 28990, frame: 0, casings: 3800, hardwareBase: 0, installFrom: 4500 },
  },
  {
    id: "stroygost",
    slug: "stroygost-5",
    category: "entrance",
    name: "Стройгост 5 РФ",
    badge: "−15%",
    price: 11500,
    oldPrice: 13529,
    finish: "Металл",
    style: "Эконом",
    short: "Бюджетный входной контур для стройки и аренды без потери базовой безопасности.",
    kit: { leaf: 11500, frame: 0, casings: 2500, hardwareBase: 0, installFrom: 4000 },
  },
  {
    id: "thermo-elite",
    slug: "elit-termo",
    category: "entrance",
    name: "Элит Термо",
    price: 126690,
    oldPrice: 149047,
    finish: "Терморазрыв",
    style: "Дом",
    short: "Уличная дверь с терморазрывом для частного дома — когда важны тепло и тишина.",
    kit: { leaf: 126690, frame: 0, casings: 0, hardwareBase: 0, installFrom: 8000 },
  },
  {
    id: "handle",
    slug: "ruchka-linea",
    category: "hardware",
    name: "Ручка Linea Soft",
    badge: "Фурнитура",
    price: 2890,
    finish: "Матовый хром",
    style: "Универсальная",
    short: "Тихая ручка с мягким ходом — ставят в комплекте с эмалью и экошпоном.",
    kit: { leaf: 2890, frame: 0, casings: 0, hardwareBase: 0 },
  },
  {
    id: "lock",
    slug: "zamok-secure",
    category: "hardware",
    name: "Замок Secure Pro",
    price: 4590,
    finish: "Сталь",
    style: "Входные",
    short: "Цилиндровый замок для входных дверей с защитой от высверливания.",
    kit: { leaf: 4590, frame: 0, casings: 0, hardwareBase: 0 },
  },
];
export const quiz = {
  title: "Подберём двери за 4 шага",
  subtitle: "В конце — подборка моделей и купон 3 000 ₽ на комплект.",
  couponLeft: 22,
  steps: [
    {
      id: "type",
      question: "Что выбираете?",
      options: ["Межкомнатные", "Входные", "И то и другое"],
    },
    {
      id: "style",
      question: "Какой характер интерьера?",
      options: ["Современный / минимализм", "Классика / неоклассика", "Лофт", "Пока не решили"],
    },
    {
      id: "budget",
      question: "Бюджет на одну дверь (комплект)?",
      options: ["до 15 000 ₽", "15–30 000 ₽", "30–60 000 ₽", "от 60 000 ₽"],
    },
    {
      id: "measure",
      question: "Размеры проёмов уже известны?",
      options: ["Да, есть замеры", "Нужен замерщик", "Только присматриваюсь"],
    },
  ],
  successTitle: "Подборка почти готова",
  successText:
    "Оставьте телефон — менеджер пришлёт 3–6 моделей под ваши ответы и активирует купон.",
};

export const measurePage = {
  title: "Бесплатный замер дверей",
  lead: "Инженер замерит проёмы, подскажет по открыванию и соберёт смету комплекта с монтажом.",
  sla: "Перезвоним в течение 10 минут в рабочее время салона.",
  fieldsNote: "Поля можно уточнить под CRM заказчика — сейчас черновик для демо.",
};

export const aboutPage = {
  title: "О магазине PORTAL",
  lead: "Мы продаём не «полотно с витрины», а готовое решение: дверь + комплектация + монтаж с ответственностью.",
  mission:
    "Помогаем сделать дом тише, аккуратнее и законченнее — без сюрпризов в смете и срывов сроков установки.",
  points: [
    "Собственные бригады монтажа и обучение стандартам компании",
    "Три точки с образцами цвета и фурнитуры",
    "Прозрачная цена комплекта до договора",
    "Сопровождение от замера до приёмки работ",
  ],
};

export const servicesPage = {
  title: "Услуги",
  lead: "Всё, что нужно после выбора модели — в одном контуре.",
  items: [
    {
      id: "measure",
      title: "Бесплатный замер",
      text: "Выезд, консультация по открыванию, предварительный расчёт монтажа и доборов.",
    },
    {
      id: "install",
      title: "Установка дверей",
      text: "Межкомнатные и входные, облагораживание проёма, расширение и сужение.",
    },
    {
      id: "delivery",
      title: "Доставка и оплата",
      text: "Доставка по городу и за город, оплата картой, наличными, рассрочка 0–0–6.",
    },
    {
      id: "warranty",
      title: "Гарантия",
      text: "Гарантия производителя на изделия и гарантия на монтажные работы по договору.",
    },
  ],
};

export const contactsPage = {
  title: "Контакты",
  lead: "Приезжайте в удобный салон или вызовите замерщика на объект.",
};

export const footer = {
  about:
    "PORTAL — салон дверей в Тюмени. Каталог, замер, доставка и установка под ключ.",
  legal: "© PORTAL. Демо-контент для согласования с заказчиком.",
  cols: [
    {
      title: "Покупателям",
      links: [
        { label: "Каталог", href: "/catalog/interior" },
        { label: "Акции", href: "/promotions" },
        { label: "Замер", href: "/measure" },
        { label: "Услуги", href: "/services" },
      ],
    },
    {
      title: "Компания",
      links: [
        { label: "О магазине", href: "/about" },
        { label: "Контакты", href: "/contacts" },
        { label: "Для дизайнеров", href: "/about#designers" },
      ],
    },
  ],
};

export function formatPrice(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
}

export function kitTotal(p: Product) {
  const k = p.kit;
  return k.leaf + k.frame + k.casings + k.hardwareBase;
}
