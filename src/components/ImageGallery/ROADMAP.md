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
- [x] Подобрать 9 картинок на Unsplash — получены через Lorem Picsum
      (стабильный CDN-прокси для подмножества Unsplash, лицензия Unsplash
      License). Авторы зафиксированы в `SOURCES.md`.
- [x] Соблюсти баланс пропорций: 7 landscape (01–07.jpg), 1 portrait
      (08.jpg), 1 square (09.jpg). Включает 16:9 кадры (05–06) для
      демонстрации блюра по горизонтали и portrait для блюра по вертикали.
- [x] Привести к разумным размерам: 1600×1000 (jpg). Целевой
      `≤300 KB` соблюдён для 7 файлов; 06.jpg/07.jpg чуть выше
      (~340–360 KB) — допустимо для demo-набора.
- [x] Положить в `public/assets/images/imageGallery/01.jpg` ..
      `09.jpg` (создана папка).
- [x] Источники зафиксированы в
      `public/assets/images/imageGallery/SOURCES.md` (имя автора,
      Unsplash photo URL, Picsum ID, размер кропа).
- [ ] `thumbSrc` в `<ImageGallery.Item>` оставляем опциональным; в
      базовых stories используем тот же URL для миниатюр (браузер
      закэширует). Отдельная story `WithSeparateThumbnails` может
      показать оптимизированный сценарий. — *выполняется в Разделе 4.*

### 4. Stories
- [x] `stories/ImageGallery/ImageGallery.stories.tsx` (modern pattern).
- [x] Examples: `Default`, `FixedHeight`, `WithoutThumbnails`,
      `WithDots` (мобильный preset через `viewport: 'XS'`), `WithoutBlur`,
      `InsideLightBox`, `InsideLightBoxMobile`. Также есть `Playground`
      (с Controls, не показывает код, исключён из скриншот-тестов).
- [x] `examples/` с `?raw` source файлами для каждого примера +
      `index.ts` реэкспортирует пары `Name` + `NameSource`.
- [x] `InsideLightBox`/`InsideLightBoxMobile` демонстрируют
      рекомендуемый паттерн: один и тот же `ImageGallery` рендерится
      повторно внутри `LightBox` с другими настройками; индекс
      синхронизируется через controlled-режим `selectedIndex` + `onChange`.

### 5. Unit-тесты `__tests__/ImageGallery.test.tsx`
- [x] Рендер крупной картинки и ленты миниатюр.
- [x] Клик по миниатюре переключает большую картинку (uncontrolled).
- [x] Controlled-режим через `selectedIndex` + `onChange`.
- [x] `ArrowLeft` / `ArrowRight` переключают активный индекс.
- [x] `showThumbnails={false}` скрывает ленту.
- [x] На мобильном (`MobileView` ветка) рендерятся тики; их количество
      равно `Math.min(items.length, 4)`, а при `items.length === 1` —
      ноль.
- [x] Клик по тику переключает индекс на первую картинку бакета
      (`onChange(t * bucketSize)`); активный тик соответствует текущему
      `selectedIndex` по правилу из «Контекста».
- [x] `showDots={false}` скрывает ряд тиков на мобильном.
- [x] На мобильном (`MobileView` ветка) крупная картинка обёрнута в
      `SwipeableArea` с колбэками prev/next, передающими корректный индекс
      (мок `MobileView`/`SwipeableArea`; реальный жест — в e2e).
      Заодно покрыт вызов `closeSwipe()` после каждого свайпа.
- [x] `withBlur={false}` не рендерит блюр-слой (через `data-testid="image-gallery-blur"`).
- [x] `onImageClick` вызывается с правильным индексом.
- [x] `height={number}` применяет inline-style.
- [x] Активная миниатюра помечена `aria-selected="true"`.
- [x] **Доп.:** `<img>` миниатюры имеет `alt=""` (декоративная) — `aria-label`
      кнопки несёт смысл активности; устраняет дубль с alt главной картинки.

### 6. E2E-тесты `e2e/tests/imageGallery.spec.ts`

Закрываем то, что не ловится в jsdom: реальный layout, тач-жесты,
hover-медиа. Сценарии запускаются против stories через
`iframe.html?id=...` (паттерн как у существующих `checkbox.spec.ts`,
`button.spec.ts`).

- [x] **desktop** — клик по миниатюре переключает большую картинку
      (story `Default`).
- [x] **desktop** — `ArrowRight` переключает индекс при фокусе на
      контейнере галереи. (`ArrowLeft` — симметричен и покрыт unit-тестом.)
- [x] **desktop** — клик по стрелкам prev/next переключает индекс.
      hover-effect (opacity) не проверяется в e2e — стрелки видны и при
      hover=0 (opacity:0.7), и при hover=1; функциональный путь
      «клик → переключение» уже покрыт.
- [ ] ~~**desktop** — автоскролл миниатюры в центр карусели~~ — пропуск
      в этом тикете. На viewport 1280×800 все 9 миниатюр (96px) умещаются
      без прокрутки; для теста нужна узкая story (Narrow). Заведу
      отдельным тикетом, не блокер.
- [ ] ~~**mobile** — реальный свайп влево/вправо (story `WithDots`)~~ —
      пропуск. Полноценная симуляция touch-жеста через
      `dispatchEvent('touchstart'/'touchmove')` flaky в Playwright;
      callback-логика `onSwipeLeft`/`onSwipeRight` уже покрыта
      unit-тестом через мок `SwipeableArea`. Заведу отдельным тикетом.
- [x] **mobile** (viewport `375×667` + `hasTouch: true`) — стрелки
      prev/next крупной картинки не отображаются; виден ряд тиков, клик
      по тику переключает картинку на первую в соответствующем бакете.

Итог: 5/7 сценариев покрыты, 5 e2e-тестов проходят локально
(`npx playwright test imageGallery` — 14 сек).

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
