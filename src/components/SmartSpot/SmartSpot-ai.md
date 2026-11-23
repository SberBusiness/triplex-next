---
component: SmartSpot
category: SmartSpot
related: []
tokens:
  - SmartSpot.Success_Spot1_Color
  - SmartSpot.Success_Spot2_Color
  - SmartSpot.Success_Spot3_Color
  - SmartSpot.Success_Spot4_Color
  - SmartSpot.Warning_Spot1_Color
  - SmartSpot.Warning_Spot2_Color
  - SmartSpot.Warning_Spot3_Color
  - SmartSpot.Warning_Spot4_Color
  - SmartSpot.Error_Spot1_Color
  - SmartSpot.Error_Spot2_Color
  - SmartSpot.Error_Spot3_Color
  - SmartSpot.Error_Spot4_Color
  - SmartSpot.Waiting_Spot1_Color
  - SmartSpot.Waiting_Spot2_Color
  - SmartSpot.Waiting_Spot3_Color
  - SmartSpot.Waiting_Spot4_Color
stories: stories/SmartSpot/SmartSpot.stories.tsx
version: "1.0"
---

# SmartSpot

## Назначение

Декоративная анимированная подложка статуса. Рисует на прозрачном фоне четыре пятна в цветах статуса; сплошной заливки у компонента нет — фон под пятнами задаёт родитель. Слой пятен размыт гауссом (`filter: blur()`) и медленно двигается по выбранному пресету. Компонент заполняет родителя (`width/height: 100%`, `overflow: hidden`), а `children` выводит поверх подложки.

Используй когда: нужен выразительный фон для экрана или карточки с результатом операции — успех, предупреждение, ошибка, ожидание. Например, итоговый экран платежа или промо-блок со статусом.

Не используй когда:

- Нужен компактный индикатор статуса — возьми `Marker`, `MarkerStatus` или `Badge`.
- Нужно сообщение, которое читает пользователь, — используй `AlertProcess` или `AlertContext`. SmartSpot ничего не сообщает сам: это только фон.
- Нужна обычная статичная заливка — задай `background` контейнеру. SmartSpot тратит ресурсы на `filter: blur()` большого радиуса и rAF-анимацию.

---

## Варианты и props

### Обязательные props

| Prop   | Тип              | Описание                                |
| ------ | ---------------- | --------------------------------------- |
| `type` | `ESmartSpotType` | Тип: задаёт цвета пятен и их геометрию. |

### Опциональные props

| Prop        | Тип                   | По умолчанию | Описание                                                                                                              |
| ----------- | --------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `animation` | `ESmartSpotAnimation` | `DRIFT`      | Пресет анимации.                                                                                                      |
| `blur`      | `number`              | `60`         | Радиус размытия слоя пятен в CSS px, передаётся в `filter: blur()` как есть.                                          |
| `distance`  | `number`              | `50`         | Радиус эллипса движения по горизонтали, px. Вертикальный радиус — половина горизонтального. Влияет только на `DRIFT`. |
| `duration`  | `number`              | `6000`       | Длительность одного цикла, мс. Для `NONE` игнорируется.                                                               |
| `shape`     | `ESmartSpotShape`     | `CIRCLE`     | Форма пятен.                                                                                                          |

Компонент расширяет `React.HTMLAttributes<HTMLDivElement>`: `className`, `style`, `aria-*`, `data-*` и остальные атрибуты уходят на корневой `<div>`. Переданный `style` сливается с inline-переменной размытия.

### Значения enum'ов

- `ESmartSpotType`: `SUCCESS` (`"success"`), `WARNING` (`"warning"`), `ERROR` (`"error"`), `WAITING` (`"waiting"`, системный статус ожидания).
- `ESmartSpotAnimation`:
    - `DRIFT` (`"drift"`) — весь слой пятен движется по эллипсу против часовой стрелки;
    - `BREATHING` (`"breathing"`) — каждое пятно пульсирует масштабом 0.9 → 1.1 → 0.9 за цикл, слой стоит на месте;
    - `NONE` (`"none"`) — один статичный кадр без `requestAnimationFrame`.
- `ESmartSpotShape`: `CIRCLE` (`"circle"`), `OVAL` (`"oval"`, высота 60% от диаметра), `SQUARE` (`"square"`), `TRIANGLE` (`"triangle"`, через `clip-path`).

### Ограничения

- **Собственного размера нет.** Размер и скругление задаёт обёртка. Без высоты у родителя подложка схлопнется.
- **Геометрия пятен фиксирована** в абсолютных px от центра верхней грани (приватный `SPOTS_BY_TYPE` в `consts.ts`). На контейнерах сильно меньше или больше макета (~240px) видимая картинка меняется. Пятна не масштабируются под размер контейнера.
- **Смена `distance` и `duration` не перезапускает анимацию.** Значения читаются в каждом кадре через `useLatestRef`. Прогресс цикла накапливается, поэтому при смене `duration` движение продолжается с текущей точки. Смена `animation` перезапускает rAF с начала цикла.
- Кадр пишется напрямую в `style` слоя `.move` (runtime-переменные `--triplex-next-runtime-SmartSpot-Move_X`, `Move_Y`, `Spot_Scale`), ререндеров на каждом кадре нет.
- `children` оборачиваются в `div.content` (`position: relative`, 100% × 100%) только если значение truthy. Числовой `0` попадёт прямо в корень без обёртки.

---

## Дизайн-токены

Переопределяются через `ThemeProvider` (prop `tokens`) — см. `ThemeProvider-ai.md` → «Как переопределять токены». Значения по умолчанию — `src/components/DesignTokens/components/SmartSpot.ts`.

Группа `SmartSpot`: по токену на каждое пятно каждого типа (`{Type}_Spot{N}_Color`, N = 1…4). Значения ссылаются на core-палитру; в тёмной теме сейчас те же ссылки, что и в светлой — тёмные значения согласуются с дизайнером.

```text
SmartSpot.Success_Spot1_Color   — ColorSuccess.80
SmartSpot.Success_Spot2_Color   — ColorSuccess.50
SmartSpot.Success_Spot3_Color   — ColorBrand.60
SmartSpot.Success_Spot4_Color   — ColorSuccess.80
SmartSpot.Warning_Spot1_Color   — ColorWarning.30
SmartSpot.Warning_Spot2_Color   — ColorWarning.70
SmartSpot.Warning_Spot3_Color   — ColorWarning.50
SmartSpot.Warning_Spot4_Color   — ColorWarning.80
SmartSpot.Error_Spot1_Color     — ColorWarning.30
SmartSpot.Error_Spot2_Color     — ColorWarning.30
SmartSpot.Error_Spot3_Color     — ColorWarning.50
SmartSpot.Error_Spot4_Color     — ColorError.70
SmartSpot.Waiting_Spot1_Color   — ColorSystem.100
SmartSpot.Waiting_Spot2_Color   — ColorSystem.60
SmartSpot.Waiting_Spot3_Color   — ColorSystem.90
SmartSpot.Waiting_Spot4_Color   — ColorSystem.90
```

Цвет пятна привязан к его порядковому номеру: `.spot:nth-child(N)` соответствует N-му элементу `SPOTS_BY_TYPE[type]` и токену `{Type}_Spot{N}_Color`.

Runtime-переменные (не токены, выставляются компонентом):

- `--triplex-next-runtime-SmartSpot-Blur_Sigma` — на корне;
- `Spot_X`, `Spot_Y`, `Spot_Size`, `Spot_Opacity` — на каждом пятне;
- `Move_X`, `Move_Y`, `Spot_Scale` — на слое `.move`.

---

## Инварианты

- **`forwardRef`** обязателен. `ref` указывает на корневой `<div>`.
- **Имена публичного API**: `SmartSpot`, `ISmartSpotProps`, props (`type`, `animation`, `blur`, `distance`, `duration`, `shape`), enum'ы `ESmartSpotType`, `ESmartSpotAnimation`, `ESmartSpotShape` и их строковые значения. Значения enum'ов используются как имена CSS-классов (`styles[type]`, `styles[shape]`), поэтому переименование значения ломает стили.
- **Barrel** `src/components/SmartSpot/index.ts` экспортирует `./SmartSpot` и `./enums`. `consts.ts` и `utils.ts` приватные. Компонент подключён в `src/components/index.ts`.
- **Дефолты**: `animation = DRIFT`, `blur = 60`, `shape = CIRCLE`. Смена дефолта меняет вид у всех потребителей.
- **Ровно четыре пятна на тип.** Число пятен и их порядок в `SPOTS_BY_TYPE` связаны с `nth-child`-правилами в LESS. Добавление пятна требует правок в обоих местах и новых токенов в `SmartSpot.ts`.
- **Фон прозрачный**: корень не задаёт `background`, под пятнами виден родитель.
- **Слой пятен `aria-hidden="true"`** — проверяется тестом.
- **`displayName = "SmartSpot"`**.
- **Visual regression не покрыт.** Анимированные stories исключены из test-runner'а (`testRunner: { skip: true }`): test-runner ждёт стабилизации DOM, а rAF пишет в `style` каждый кадр.

---

## Accessibility

Компонент не интерактивный и декоративный. Слой пятен скрыт от скринридеров через `aria-hidden="true"`. Корень и `children` остаются в дереве доступности. Смысл статуса потребитель передаёт текстом в `children` (заголовок, описание): цвет подложки сам по себе не должен быть единственным носителем информации.

Ограничение: анимация не учитывает `prefers-reduced-motion`. Если это важно, передай `animation={ESmartSpotAnimation.NONE}` по медиа-запросу на стороне потребителя.

---

## Связанные компоненты

Семейства, альтернатив и контрактов по рендеру или типам нет, поэтому `related` пуст. Для компактной индикации статуса используй `Marker`, `MarkerStatus`, `Badge` (см. «Не используй когда»).

---

## Stories

Основные истории: `stories/SmartSpot/SmartSpot.stories.tsx`
Файлы примеров: `stories/SmartSpot/examples/`

| Story        | Example file     | Что демонстрирует                                     |
| ------------ | ---------------- | ----------------------------------------------------- |
| `Playground` | `Playground.tsx` | Интерактивный контроль всех props                     |
| `Default`    | `Default.tsx`    | Подложка с типом `SUCCESS` и настройками по умолчанию |
| `Types`      | `Types.tsx`      | Все четыре типа                                       |
| `Shapes`     | `Shapes.tsx`     | Все четыре формы пятен                                |
| `Animations` | `Animations.tsx` | Пресеты `DRIFT`, `BREATHING`, `NONE`                  |

---

## История изменений

| Дата       | Изменение                                                                                                                                                                                                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-23 | Геометрия пятен (`SPOTS_BY_TYPE`) уменьшена вдвое под контейнеры вроде StatusTracker, `blur` по умолчанию снижен с 200 до 60 px, длительность цикла пресетов Drift и Breathing — с 8000 до 6000 мс. Prop `status` переименован в `type`, enum `ESmartSpotStatus` — в `ESmartSpotType`, story `Statuses` — в `Types`. |
| 2026-10-22 | Цвета пятен вынесены в компонентную группу токенов `SmartSpot` (`{Type}_Spot{N}_Color`), `background` пятна берётся из токена напрямую.                                                                                                                                                                              |
| 2026-10-22 | Создан документ. Новый компонент (v1.52.0): AI-рефакторинг (`useLatestRef` вместо записи в ref во время рендера, `ref={ref}` вместо callback-ref, защита от отрицательного шага rAF), unit-тесты на компонент и утилиты, stories по modern pattern.                                                                  |
