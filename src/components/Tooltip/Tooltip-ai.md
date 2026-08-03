---
component: Tooltip
category: Tooltip
related: [HelpBox, SMSField, Dropdown, DropdownMobile, Portal, MobileView, ThemeProvider, ButtonIcon]
tokens:
  - --triplex-next-Tooltip-Background
  - --triplex-next-Tooltip-Color
  - --triplex-next-Tooltip-Link_Desktop_Color_Default
  - --triplex-next-Tooltip-Link_Desktop_Color_Hover
  - --triplex-next-Tooltip-Link_Desktop_Color_Active
  - --triplex-next-Tooltip-Link_Desktop_Shadow_Focus
  - --triplex-next-Tooltip-Link_Mobile_Color_Default
  - --triplex-next-Tooltip-Link_Mobile_Color_Hover
  - --triplex-next-Tooltip-Link_Mobile_Color_Active
  - --triplex-next-Tooltip-Link_Mobile_Shadow_Focus
stories: stories/Tooltip/Tooltip.stories.tsx
version: "1.0"
---

# Tooltip

## Назначение

Всплывающая подсказка, привязанная к целевому элементу. Рендерится через `Portal` — по умолчанию в `document.body`, либо в контейнер из `renderContainer` — и позиционируется относительно `targetRef`. На мобильной ширине экрана (<768px) вместо всплывающей подсказки открывается полноэкранный оверлей снизу на базе `DropdownMobile`.

Используй когда: нужно пояснить элемент интерфейса коротким текстом, при необходимости со ссылкой на подробное описание.
Не используй когда:

- нужна готовая иконка-вопрос с подсказкой и мобильным заголовком — используй `HelpBox` (обёртка над `Tooltip`);
- нужно выпадающее меню или произвольный интерактивный блок — используй `Dropdown` / `ButtonDropdownExtended`;
- содержимое подсказки требует фокусируемых элементов кроме `Tooltip.Link`: компонент не перехватывает фокус и не строит focus trap.

---

## Состав (compound-компонент)

Состав задаётся субкомпонентами внутри `children`. Компонент разбирает `children` **по типу элемента**, поэтому порядок в разметке не важен, а произвольные узлы (текст, `<div>`, фрагменты) просто игнорируются.

| Субкомпонент | Обязателен | Что делает |
|---|---|---|
| `Tooltip.Target` | Да | Клонирует единственный дочерний элемент, навешивая обработчики открытия. Собственной разметки не рендерит |
| `Tooltip.Body` | Практически всегда | Текст подсказки. На десктопе — `<div>`, в мобильной версии — `Text` (`ETextSize.B3`) |
| `Tooltip.Link` | Нет | Гиперссылка под текстом. При `target="_blank"` сам подставляет `rel="noopener"` |
| `Tooltip.XButton` | Нет | Кнопка закрытия. Её наличие добавляет корню класс `closable` (отступ справа у контента) |
| `Tooltip.MobileHeader` | Нет | Заголовок мобильной версии. На десктопе не рендерится |

---

## Варианты и props

`ITooltipProps` расширяет `React.HTMLAttributes<HTMLDivElement>`. Неизвестные компоненту атрибуты уходят на корневой `<div>` десктопной подсказки (и на контейнер мобильного оверлея в адаптивном режиме).

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `size` | `ETooltipSize` | Ширина тела подсказки в десктопной версии: `SM` — 192px, `LG` — 384px. В мобильной версии не влияет ни на что |
| `targetRef` | `React.MutableRefObject<HTMLElement \| null>` | Ссылка на целевой элемент. От его `getBoundingClientRect()` считается положение подсказки и на него вешаются hover-обработчики. Тот же ref нужно передать и в сам элемент внутри `Tooltip.Target` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `toggleType` | `"hover" \| "click"` | — | Способ открытия. Без значения подсказка сама не открывается — состоянием управляет потребитель через `isOpen` |
| `preferPlace` | `ETooltipPreferPlace` | — | Предпочитаемое место. Если подсказка туда не помещается, выбирается зона, где помещается. Без значения зона выбирается автоматически |
| `alignTip` | `ETooltipAlign` | — | Принудительное выравнивание указателя (стрелочки): `START` / `END`. Без значения указатель центрируется по целевому элементу |
| `isOpen` | `boolean` | — | Управляемый режим. Пока prop задан (в том числе `false`), внутреннее состояние открытости игнорируется |
| `toggle` | `(open: boolean) => void` | — | Запрос на смену состояния. Вызывается всегда — и в управляемом, и в неуправляемом режиме |
| `onShow` | `(node: HTMLDivElement) => void` | — | Вызывается при открытии, аргумент — DOM-нода подсказки (десктоп) или контентная нода оверлея (мобильная версия) |
| `renderContainer` | `Element` | `document.body` | Контейнер портала для десктопной версии. Мобильная версия всегда рендерится в `document.body` |
| `disableAdaptiveMode` | `boolean` | `false` | Отключает мобильную версию: подсказка остаётся всплывающей на любой ширине экрана |
| `className` | `string` | — | Дополнительный класс на корневом элементе подсказки |

### Ограничения

- **`Tooltip` — не `forwardRef`-компонент.** Это провайдер контекста без собственной разметки: ссылка на подсказку отдаётся через `onShow`, ссылка на целевой элемент — это `targetRef` потребителя. `forwardRef` есть у `Tooltip.Body`, `Tooltip.Link` и внутреннего `TooltipDesktopTip`.
- `Tooltip.Target` принимает **ровно один** React-элемент, который умеет принимать `onClick` / `onKeyDown`.
- `Tooltip.XButton` не принимает `children` (`children?: never`) — иконка крестика внутри фиксированная.
- `size`, `preferPlace`, `alignTip` и `renderContainer` действуют только в десктопной версии.
- `Tooltip.MobileHeader` подставляет кнопку закрытия сам, но слот `controlButtons` при этом остаётся открытым: переданное потребителем значение спредится **после** значения по умолчанию и молча заменяет кнопку закрытия. Сузить тип нельзя без breaking change — на это рассчитывать не стоит.
- Компонент не хардкодит текст: `aria-label` для целевого элемента и для `Tooltip.XButton` передаёт потребитель (библиотека мультиязычная).

---

## Дизайн-токены

```text
--triplex-next-Tooltip-Background
--triplex-next-Tooltip-Color
--triplex-next-Tooltip-Link_Desktop_Color_Default
--triplex-next-Tooltip-Link_Desktop_Color_Hover
--triplex-next-Tooltip-Link_Desktop_Color_Active
--triplex-next-Tooltip-Link_Desktop_Shadow_Focus
--triplex-next-Tooltip-Link_Mobile_Color_Default
--triplex-next-Tooltip-Link_Mobile_Color_Hover
--triplex-next-Tooltip-Link_Mobile_Color_Active
--triplex-next-Tooltip-Link_Mobile_Shadow_Focus
```

Мобильная версия дополнительно наследует токены `DropdownMobile` (`--triplex-next-DropdownMobile-*`), так как построена на его субкомпонентах.

---

## Инварианты

- Публичный barrel `src/components/Tooltip/index.ts` реэкспортирует `Tooltip`, `enums` и `types` целиком. Компонент используется внутри `HelpBox`, `SMSField.Tooltip` и косвенно (через типы) в `Dropdown`, поэтому удаление любого экспорта ломает библиотеку изнутри.
- `IDropdownMobileHeaderProps` объявлен **в `src/components/Tooltip/types.ts`**, но используется `DropdownMobileHeader` из семейства `Dropdown`. Переносить тип нельзя без синхронной правки `Dropdown` (и это breaking change для deep-импортов).
- Файл контекста называется `TootlipContext.ts` — опечатка в имени зафиксирована в публикуемых путях подпакета; переименование ломает deep-импорты потребителей.
- `Tooltip` — `React.FC` со статическими субкомпонентами (`Tooltip.Target` и т.д.). Набор статических свойств — часть публичного API.
- Разбор `children` по типу элемента (`child.type === TooltipTarget`) означает, что обёртка субкомпонента в собственный компонент-прокси **не сработает** — узел просто не попадёт ни в один слот. Это осознанное ограничение, на нём построен весь состав.
- Десктопная версия отслеживает положение целевого элемента опросом с интервалом 200мс (`REFRESH_INTERVAL_MS`) плюс слушатели `scroll` / `resize`. Отписка в `componentWillUnmount` и при закрытии обязательна.
- Анимации появления/исчезновения длятся 500мс (`ENTER_EXIT_TRANSITION_DURATION_MS`). На это же время завязано снятие класса темы в `useTooltipTheme` — значения нужно менять синхронно.
- `useTooltipTheme` вешает класс темы на контейнер рендера и считает количество открытых подсказок в data-атрибуте `data-tooltip-theme-{scopeClassName}-counter`. Счётчик нужен, чтобы одна закрывшаяся подсказка не сняла тему у остальных.
- `TooltipDesktop` и `TooltipDesktopBase` — классовые компоненты. Это исключение из правила «только функциональные компоненты» в `docs/ai/codestyle.md`: перевод на хуки затрагивает всю логику позиционирования и анимаций и требует отдельной задачи с визуальной регрессией.
- Внутренние утилиты (`utils/Positioning.ts`, `utils/useTooltipTheme.ts`) через barrel не экспортируются.

---

## Accessibility

- Собственных ARIA-ролей и атрибутов компонент **не выставляет** — ни `role="tooltip"`, ни `aria-describedby`. Связать целевой элемент с текстом подсказки должен потребитель (пример такой связки — `SMSField.Tooltip`, который прокидывает `id` подсказки в поле).
- Целевой элемент отвечает за собственную доступность: он должен быть фокусируемым (`ButtonIcon` в примерах) и иметь `aria-label`, так как иконка-триггер не содержит текста.
- Клавиатура: `Escape` закрывает подсказку (обработчик на `document`, пока она открыта), `Tab` с целевого элемента закрывает открытую подсказку. Собственных обработчиков `Enter` / `Space` у `Tooltip.Target` нет — открытие с клавиатуры работает через нативный клик кнопки.
- Закрытие также срабатывает по `mousedown` вне подсказки и вне целевого элемента.
- Открытие по наведению: подсказка закрывается не сразу после ухода курсора, а через 500мс — за это время курсор можно довести до самой подсказки (её нода тоже слушает `mouseenter`/`mouseleave`).
- Фокус компонент не перехватывает и не возвращает: при открытии фокус остаётся на целевом элементе. Поэтому интерактивное содержимое сложнее `Tooltip.Link` в подсказку класть не стоит.
- Мобильная версия — оверлей `DropdownMobile`; кнопке закрытия `aria-label` задаёт потребитель через props `Tooltip.XButton`.

---

## Связанные компоненты

Отдельного AI.md нет ни у одного субкомпонента семейства — они описаны здесь.
Это область задачи TRI-98 («Scope: только Tooltip»), а не вывод по критериям
`docs/ai/CONTEXT.md` → «Когда создавать `{ComponentName}-ai.md`». По этим критериям
собственного AI.md заслуживают разве что `HelpBox` (отдельная строка в ROADMAP),
остальные части семейства — внутренние и через barrel не экспортируются.

**Части составного компонента (`components/common/`, `components/mobile/`):**

- `TooltipTarget` — целевой элемент: `cloneElement` с обработчиками клика и `Tab`.
- `TooltipBody` — тело подсказки; на мобильной ширине рендерится через `Text`.
- `TooltipLink` — ссылка; защита от reverse tabnabbing через `getSafeRel`.
- `TooltipXButton` — кнопка закрытия десктопной версии (обёртка над `ButtonIcon`).
- `TooltipMobileHeader` — шапка мобильной версии; кнопку закрытия подставляет сам, наследуя props у `Tooltip.XButton`.
- `TooltipMobileCloseButton` — кнопка закрытия мобильной версии (обёртка над `DropdownMobileClose`).

**Десктопная версия (`components/desktop/`):**

- `TooltipDesktop` — подписки на события документа и целевого элемента (клик вне, Escape, hover).
- `TooltipDesktopBase` — портал, расчёт положения, анимации.
- `TooltipDesktopTip` — указатель (стрелочка) подсказки.

**Инфраструктура:**

- `TooltipContext` (`TootlipContext.ts`) — разобранные слоты, состояние открытости и сеттер между частями.
- `utils/Positioning.ts` — чистые функции выбора зоны и расчёта координат.
- `utils/useTooltipTheme.ts` — класс темы на контейнере портала со счётчиком использования.
- `Portal`, `MobileView`, `DropdownMobile` — инфраструктура рендера.

**Потребители внутри библиотеки:**

- `HelpBox` — готовая иконка-подсказка поверх `Tooltip`.
- `SMSField.Tooltip` — подсказка об ошибке у поля СМС-кода.

---

## Stories

Основные истории: `stories/Tooltip/Tooltip.stories.tsx`
Файлы примеров: `stories/Tooltip/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный контроль `size`, `toggleType`, `preferPlace`, `alignTip`, адаптивного режима и состава |
| `Default` | `Default.tsx` | Минимальный состав: целевой элемент и текст, открытие по наведению |
| `Sizes` | `Sizes.tsx` | Размеры SM (192px) и LG (384px) |
| `DifferentPlaces` | `DifferentPlaces.tsx` | Все варианты `preferPlace` |
| `WithLink` | `WithLink.tsx` | Ссылка `Tooltip.Link` под текстом |
| `WithCloseButton` | `WithCloseButton.tsx` | Кнопка закрытия `Tooltip.XButton` |
| `MobileHeader` | `MobileHeader.tsx` | Заголовок адаптивной версии (виден на узком экране) |
| `RenderContainer` | `RenderContainer.tsx` | Рендер подсказки в заданный DOM-элемент |
| `VisualTests` | `VisualTests.tsx` | `alignTip: start`, широкая подсказка с длинным текстом, ссылкой и кнопкой закрытия |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-03 | Создан документ AI-ready для `Tooltip` (TRI-98). |
| 2026-08-03 | AI-рефакторинг: разбор `children` вынесен в чистую функцию и мемоизирован, значение контекста стабилизировано, дедуплицирована разметка `TooltipLink`, `switch` в `TooltipDesktopTip` заменён на маппинг, из `calcRelPos` убрано двойное приведение типов, в `useTooltipTheme` вынесен хелпер имени счётчика и добавлен guard на unmount, `displayName` `TooltipDesktopBase` приведён к имени класса, JSDoc на props и приватных методах. Исправлено: подсказка, смонтированная сразу открытой (`isOpen` в управляемом режиме), не закрывалась по действию мышью вне неё — при монтировании вешался слушатель `click`, а снимался `mousedown`. Публичный API не изменён. Добавлены unit-тесты (75 кейсов) и stories по modern pattern. |
| 2026-08-03 | Правки по ревью PR #496. Исправлено: класс темы не снимается с контейнера, если в течение задержки закрытия подсказку открыли снова или контейнер занял другой `Tooltip` (в `useTooltipTheme` появились учёт собственного инкремента и перепроверка счётчика). Исправлено: в адаптивном режиме `size` и `alignTip` больше не уходят в DOM (React предупреждал о нераспознанном атрибуте `alignTip`). Исправлено: при размонтировании открытой подсказки с `toggleType="hover"` обработчики наведения снимаются и с самой подсказки. В `collectTooltipElements` приведения через `as` заменены на typed-guard'ы. Публичный API не изменён. |
