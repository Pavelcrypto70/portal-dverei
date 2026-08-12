# PORTAL — сайт продаж дверей

Демо-сайт салона дверей (Тюмень): шапка мультисалон, hero-слайдер, каталог, PDP с kit-price, замер, квиз, акции.

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Контент

Все тексты и демо-товары: `src/content/site.ts`.  
Правите бренд, салоны, акции, отзывы и карточки там — UI подхватит автоматически.

## Страницы

- `/` — главная
- `/catalog/[category]` — interior | entrance | hardware
- `/product/[slug]` — карточка с комплектом
- `/measure` — замер
- `/promotions` `/services` `/about` `/contacts`

Временный бренд **PORTAL** — заменить под заказчика точечно.
