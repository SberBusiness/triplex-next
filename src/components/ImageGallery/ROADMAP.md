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
- **Видимость нижней панели:** два независимых булевых —
  `showThumbnails` (десктоп: лента миниатюр) и `showDots` (мобильный:
  кликабельные тики-индикаторы).
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
  настройками (`showDots`, без миниатюр и т.д.).
- **Keyboard:** `ArrowLeft` / `ArrowRight` переключают активный индекс при
  фокусе на контейнере галереи.
- **Тач-детекция стрелок:** скрываем кнопки prev/next крупной картинки
  через `@media (max-width: @screen-sm-max)`.
- **Дизайн-токены:** используем существующие neutral-токены (background,
  text). Специфичные ImageGallery-токены — отдельным тикетом по
  согласованию с дизайнером.
- **Тики (мобильный)** — кликабельные индикаторы вместо ленты миниатюр.
  Максимум 4 тика, минимум 0:
  - `ticksCount = items.length === 1 ? 0 : Math.min(items.length, 4)`;
  - картинки распределяются по тикам бакетами равного размера
    `bucketSize = Math.floor(items.length / ticksCount)`; остаток (если
    `items.length % ticksCount !== 0`) уходит в последний бакет;
  - клик по тику с индексом `t` → `onChange(t * bucketSize)` (переход к
    первой картинке бакета);
  - активный тик для текущего индекса `i`:
    `Math.min(Math.floor(i / bucketSize), ticksCount - 1)`.

---

## План работ

### 1. Заготовка структуры
- [x] `ImageGallery.tsx` — корневой `forwardRef`, composition `.Item`,
      uncontrolled/controlled state, `onChange`, `onImageClick`,
      keyboard handler.
- [x] `ImageGalleryItem.tsx` — типовой компонент-маркер
      (`IImageGalleryItemProps`: `src`, `alt?`, `thumbSrc?`).
- [x] `ImageGalleryMain.tsx` — крупное изображение, слой блюра,
      кнопки prev/next. Картинка оборачивается в `MobileView`: на
      мобильном (`children`) — `SwipeableArea` со свайпом prev/next,
      на десктопе (`fallback`) — без обёртки.
- [x] `ImageGalleryThumbnails.tsx` — лента миниатюр на `CarouselExtended`
      с авто-центрированием активной (паттерн как в `Stepper.alignStep`).
- [x] `ImageGalleryDots.tsx` — ряд из 0..4 кликабельных тиков-пилюль
      (см. алгоритм бакетов в разделе «Контекст»). Рендерится только в
      мобильной ветке `MobileView` и при `showDots !== false`.
- [x] `types.ts` — `IImageGalleryProps`, `IImageGalleryItemProps`.
- [x] `index.ts` — barrel exports.
- [x] Подключение в `src/components/index.ts`.
- [x] **Доп.:** в `SwipeableArea` добавлены backwards-compatible
      `onSwipeLeft`/`onSwipeRight` колбэки — точка подписки на
      завершённый свайп (нужно для переключения картинки в
      `ImageGalleryMain`). Упомянуть в release notes (Раздел 7).

### 2. Стили
- [x] `styles/ImageGallery.module.less` — корневой layout, режимы высоты.
- [x] `styles/ImageGalleryMain.module.less` — крупная картинка, блюр-слой,
      hover-стрелки, media-query на скрытие стрелок:
      `@media (max-width: @screen-sm-max) { ... }`. Высота `auto` →
      `640px` десктоп / `164px` мобильный реализована через CSS-default,
      inline-style для числовых значений перетирает default.
- [x] `styles/ImageGalleryThumbnails.module.less` — лента, активная
      миниатюра, hover-стрелки prev/next. **Fade-оверлеи на краях не
      сделаны** — `overflow:hidden` карусели визуально обрезает контент;
      вернёмся, если в визуальном ревью будет «утечка» миниатюр.
- [x] `styles/ImageGalleryDots.module.less` — ряд пилюль-тиков,
      активный/неактивный стейт, hover/focus.
- [x] **Дизайн-токены компонента** — создан
      `src/components/DesignTokens/components/ImageGallery.ts` с 9 ключами
      (`Container_Background_Default`, `Arrow_Background_Default/Hover/Disabled`,
      `ThumbCarouselButton_Background_Default`,
      `Dot_Background_Default/Hover/Active`, `Accent_Color`).
      Зарегистрирован в `DesignTokensComponents.ts`,
      `DesignTokensComponentsThemeDark.ts`, `types/DesignTokensTypes.ts`
      и `components/index.ts`. В `.less` токены используются без
      версионного суффикса — версия подставляется vite-плагином
      `replaceDesignTokenVersion` при сборке.

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
      `WithDots` (мобильный preset с тиками), `WithoutBlur`,
      `InsideLightBox`, `InsideLightBoxMobile`.
- [ ] `examples/` с `?raw` source файлами для каждого примера.

### 5. Unit-тесты `__tests__/ImageGallery.test.tsx`
- [ ] Рендер крупной картинки и ленты миниатюр.
- [ ] Клик по миниатюре переключает большую картинку (uncontrolled).
- [ ] Controlled-режим через `selectedIndex` + `onChange`.
- [ ] `ArrowLeft` / `ArrowRight` переключают активный индекс.
- [ ] `showThumbnails={false}` скрывает ленту.
- [ ] На мобильном (`MobileView` ветка) рендерятся тики; их количество
      равно `Math.min(items.length, 4)`, а при `items.length === 1` —
      ноль.
- [ ] Клик по тику переключает индекс на первую картинку бакета
      (`onChange(t * bucketSize)`); активный тик соответствует текущему
      `selectedIndex` по правилу из «Контекста».
- [ ] `showDots={false}` скрывает ряд тиков на мобильном.
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
      `WithDots`).
- [ ] **mobile** — стрелки prev/next крупной картинки не отображаются;
      виден ряд тиков, клик по тику переключает картинку на первую в
      соответствующем бакете.

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
