# ImageGallery — ROADMAP

Тикет: **TRIPLEX-877**
Ветка: `TRIPLEX-877-ImageViewer`

Файл — временный план работ для нового компонента `ImageGallery`. Каждый
пункт делается отдельным шагом; галочки проставляются по мере выполнения.
Последний пункт — удалить этот файл.

---

## Контекст и решения по API

- **Items API:** children в виде `<ImageGallery.Item src alt thumbSrc?>`
  (паттерн как у `Tabs.Tab`, `Stepper.Step`). `Item` — маркер-компонент,
  фактический рендер делает родитель через `React.Children`.
- **Выбранный индекс:** uncontrolled (`defaultIndex`) + опциональный controlled
  (`selectedIndex` + `onChange`).
- **Видимость нижней панели:** два независимых булевых — `showThumbnails`,
  `showCounter`.
- **Высота:** `height?: 'auto' | number | string`. В режиме `'auto'` —
  фиксированные значения по breakpoint: десктоп `640px`, мобильный
  (`@media (max-width: @screen-sm-max)`) `164px`.
- **Блюр:** `withBlur` по умолчанию `true`.
- **Свайп:** через существующий `SwipeableArea`. Включается только на
  мобильном устройстве — оборачиваем крупную картинку в `MobileView`
  (`src/components/MobileView`, breakpoint `<768px`), на десктопе
  (`fallback`) рендерим картинку без `SwipeableArea`.
- **LightBox:** рендерит **родитель**, не сам компонент. ImageGallery только
  отдаёт `onImageClick(index)`. Один и тот же `<ImageGallery>` затем
  используется повторно внутри родительского лайтбокса с другими
  настройками (`showCounter`, без миниатюр и т.д.).
- **Keyboard:** `ArrowLeft` / `ArrowRight` переключают активный индекс при
  фокусе на контейнере галереи.
- **Тач-детекция стрелок:** скрываем кнопки prev/next крупной картинки
  через `@media (max-width: @screen-sm-max)`.
- **Дизайн-токены:** используем существующие neutral-токены (background,
  text). Специфичные ImageGallery-токены — отдельным тикетом по
  согласованию с дизайнером.

---

## План работ

### 1. Заготовка структуры
- [ ] `ImageGallery.tsx` — корневой `forwardRef`, composition `.Item`,
      uncontrolled/controlled state, `onChange`, `onImageClick`,
      keyboard handler.
- [ ] `ImageGalleryItem.tsx` — типовой компонент-маркер
      (`IImageGalleryItemProps`: `src`, `alt?`, `thumbSrc?`).
- [ ] `ImageGalleryMain.tsx` — крупное изображение, слой блюра,
      кнопки prev/next. Картинка оборачивается в `MobileView`: на
      мобильном (`children`) — `SwipeableArea` со свайпом prev/next,
      на десктопе (`fallback`) — без обёртки.
- [ ] `ImageGalleryThumbnails.tsx` — лента миниатюр на `CarouselExtended`
      с авто-центрированием активной (паттерн как в `Stepper.alignStep`).
- [ ] `ImageGalleryCounter.tsx` — «N / M».
- [ ] `types.ts` — `IImageGalleryProps`, `IImageGalleryItemProps`.
- [ ] `index.ts` — barrel exports.
- [ ] Подключение в `src/components/index.ts`.

### 2. Стили
- [ ] `styles/ImageGallery.module.less` — корневой layout, режимы высоты.
- [ ] `styles/ImageGalleryMain.module.less` — крупная картинка, блюр-слой,
      hover-стрелки, media-query на скрытие стрелок:
      `@media (max-width: @screen-sm-max) { ... }`.
- [ ] `styles/ImageGalleryThumbnails.module.less` — лента, активная
      миниатюра, fade-оверлеи на краях (отключаются при `prev/nextDisabled`).
- [ ] `styles/ImageGalleryCounter.module.less` — пилюля каунтера.

### 3. Demo-картинки для stories
- [ ] Подобрать 9 картинок на Unsplash (Unsplash License разрешает
      коммерческое использование без атрибуции).
- [ ] Соблюсти баланс пропорций: 2–3 широких (landscape), 1–2 узких
      (portrait) — для демонстрации `withBlur=true`, 1 квадратная.
- [ ] Привести к разумным размерам: ~1600×1000 (jpg, q≈80, цель ≤300 KB
      на файл).
- [ ] Положить в `public/assets/images/imageGallery/01.jpg` ..
      `09.jpg` (новая папка).
- [ ] В первом коммите указать источники (Unsplash URL) в теле PR для
      аудитного следа.
- [ ] `thumbSrc` в `<ImageGallery.Item>` оставляем опциональным; в
      базовых stories используем тот же URL для миниатюр (браузер
      закэширует). Отдельная story `WithSeparateThumbnails` может
      показать оптимизированный сценарий.

### 4. Stories
- [ ] `stories/ImageGallery/ImageGallery.stories.tsx` (modern pattern).
- [ ] Examples: `Default`, `FixedHeight`, `WithoutThumbnails`,
      `WithCounter`, `WithoutBlur`, `InsideLightBox`, `InsideLightBoxMobile`.
- [ ] `examples/` с `?raw` source файлами для каждого примера.

### 5. Unit-тесты `__tests__/ImageGallery.test.tsx`
- [ ] Рендер крупной картинки и ленты миниатюр.
- [ ] Клик по миниатюре переключает большую картинку (uncontrolled).
- [ ] Controlled-режим через `selectedIndex` + `onChange`.
- [ ] `ArrowLeft` / `ArrowRight` переключают активный индекс.
- [ ] `showThumbnails={false}` скрывает ленту.
- [ ] `showCounter` рендерит «N / M».
- [ ] На мобильном (`MobileView` ветка) крупная картинка обёрнута в
      `SwipeableArea` с колбэками prev/next, передающими корректный индекс
      (мок `MobileView`/`SwipeableArea`; реальный жест — в e2e).
- [ ] `withBlur={false}` не рендерит блюр-слой.
- [ ] `onImageClick` вызывается с правильным индексом.
- [ ] `height={number}` применяет inline-style.
- [ ] Активная миниатюра помечена `aria-selected="true"`.

### 6. E2E-тесты `e2e/tests/imageGallery.spec.ts`

Закрываем то, что не ловится в jsdom: реальный layout, тач-жесты,
hover-медиа. Сценарии запускаются против stories через
`iframe.html?id=...` (паттерн как у существующих `checkbox.spec.ts`,
`button.spec.ts`).

- [ ] **desktop** — клик по миниатюре переключает большую картинку
      (story `Default`).
- [ ] **desktop** — `ArrowLeft` / `ArrowRight` переключают индекс при
      фокусе на контейнере галереи.
- [ ] **desktop** — hover на крупной картинке показывает стрелки
      prev/next, клик по стрелкам переключает индекс.
- [ ] **desktop** — при программном переключении на дальнюю миниатюру
      активная миниатюра автоскроллится в центр карусели (сверять через
      `boundingBox` миниатюры относительно карусели).
- [ ] **mobile** (`devices['iPhone 13']` или viewport `<768px` +
      `hasTouch: true`) — свайп влево/вправо листает картинку (story
      `WithCounter`).
- [ ] **mobile** — стрелки prev/next крупной картинки не отображаются;
      при `showCounter=true` виден каунтер «N / M».

### 7. Release notes
- [ ] Раздел про `ImageGallery` в
      `stories/release-notes/v1/<следующая версия>.mdx`.

### 8. Проверки
- [ ] `npx tsc --noEmit` чисто.
- [ ] Focused unit-тесты (ImageGallery) проходят.
- [ ] E2E (`npx playwright test imageGallery`) проходит локально.
- [ ] Storybook запускается, ключевые истории визуально корректны.

### 9. Финал
- [ ] **Удалить `src/components/ImageGallery/ROADMAP.md`.**

---

## Что НЕ входит в задачу

- Зум / pinch-zoom внутри лайтбокса.
- Видео в галерее.
- Lazy-loading с placeholder'ом (используем нативный `<img loading="lazy">`).
- `ImageGallery-ai.md` — отдельным проходом по `docs/ai/ROADMAP.md` (Phase 1).
- Собственные дизайн-токены `--triplex-next-ImageGallery-*` — отдельным
  тикетом после согласования с дизайнером.
