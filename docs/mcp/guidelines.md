# Guidelines кодогенерации на Triplex

Правила для ИИ-агентов, генерирующих React-код на дизайн-системе Triplex по
макетам. Документ отдаётся инструментом `get_guidelines` MCP-сервера
[`@sberbusiness/triplex-next-mcp-server`](https://github.com/SberBusiness/triplex-next-mcp-server)
и попадает туда через `mcp-data.json` (см. `scripts/generateMcpData.ts`).

Аудитория — потребители дизайн-системы (агенты и разработчики, пишущие код
*на* Triplex), а не контрибьюторы пакета: гайды для контрибьюторов живут в
`docs/ai/`.

Формат: каждое правило — секция со стабильным id `TPX-G-NN`. Id не
переиспользуются и не меняются; на них можно ссылаться в коде, ревью и
инструментах. Устаревшее правило помечается словом «отменено» с причиной,
но секция остаётся.

---

## TPX-G-01 — Тексты: только компоненты Typography

Для текстов из макета подбирается подходящий компонент Typography: `Title`
(H1 28px / H2 24px / H3 20px) или `Text` (B1 18px / B2 16px / B3 14px /
B4 12px); начертание `SEMIBOLD` — по шрифту в макете. Голые `span`/`div`
с текстом — дефект.

## TPX-G-02 — Сетка: компоненты Row и Col

Горизонтальная раскладка контейнеров реализуется 12-колоночной сеткой
`Row`/`Col` (`size` из пропорций ширин), а не произвольными flex-обёртками.

## TPX-G-03 — Скрытые слои не попадают в кодогенерацию

Узлы макета с `visible=false` и их поддеревья исключаются из дерева для
генерации кода.

## TPX-G-04 — Иконки: только из @sberbusiness/icons-next

Имена иконок не угадываются — они подбираются через инструмент `list_icons`
MCP-сервера. Иконки импортируются ТОЛЬКО из пакета
`@sberbusiness/icons-next`, не из `@sberbusiness/triplex-next`.

```tsx
import {CrossStrokeSrvIcon24, PlusStrokeSrvIcon16} from "@sberbusiness/icons-next";
// НЕВЕРНО: import {CrossStrokeSrvIcon24} from "@sberbusiness/triplex-next";
```

## TPX-G-05 — Хардкод цвета — дефект

Литералы цветов и значения, скопированные из стилей макета, в
сгенерированном коде недопустимы — цвета элементам дают сами компоненты
дизайн-системы и их темы.

Как устроены токены: они заводятся в TS-объекте пакета
(`src/components/DesignTokens/`), из него генерируются css-переменные,
которыми пользуются стили самой дизайн-системы — в исходниках less это
`color: var(--triplex-next-Link-Text_Color_Default)`, а при сборке
npm-пакета к имени дописывается версия
(`--triplex-next-Link-Text_Color_Default-1-44-0`).

Из-за версионного суффикса в сгенерированном коде приложения на эти
css-переменные не ссылаются — имя меняется каждый релиз (см.
`ThemeProvider-ai.md`). Вместо этого:

- значение токена в JS — хук `useToken` из `@sberbusiness/triplex-next`;
- переопределение оформления — prop `tokens` у `ThemeProvider` с путём
  `Группа.Токен`; объект `tokens` выносить из рендера или мемоизировать,
  иначе стили пересобираются на каждый рендер;
- список существующих токенов — `get_tokens` MCP-сервера.

## TPX-G-06 — Перед использованием компонента — сверяться с документацией

Использовать компонент, для которого не смотрел документацию, ЗАПРЕЩЕНО:
перед КАЖДЫМ компонентом вызови `get_component` MCP-сервера и возьми оттуда
обязательные props и инварианты структуры — они не выводятся из имён.
Сгенерированный код обязан компилироваться: обязательные props без значения
заполняй заглушками из документации.

## TPX-G-07 — Каркас содержимого страницы — Page

Внутри `LightBox.Content` (и вообще как каркас страницы) используется
`Page`, а в нём — только `Page.Header`, `Page.Body` и `Page.Footer`
(типы `FIRST`/`SECOND` задают наличие обёртки-Island).

## TPX-G-08 — Обязательная обвязка приложения на Triplex

Приложение на Triplex подключает три обязательных куска; без любого из них
рендер тихо деградирует:

1. стили дизайн-системы `@sberbusiness/triplex-next/styles/triplex-next.css`;
2. стили иконок `@sberbusiness/icons-next/styles/icons.css` (fill-цвета и
   состояния hoverable/active/disabled);
3. `@font-face` для шрифтов SBSans* из
   `@sberbusiness/triplex-next/assets/fonts` — пакет поставляет woff2,
   но face объявляет потребитель (с `font-weight`/`font-style` по
   инструкции).

Контент оборачивается в `ThemeProvider` со `scopeRef` на элемент-контейнер.
Базовый шрифт приложения задаётся явно:
`body { font-family: SBSansText, Arial, sans-serif; }` — текст вне
компонентов Typography не должен падать на системный шрифт.

Официальная инструкция подключения:
https://triplex-design.ru/storybook/main/?path=/docs/introduction--docs
(там же соответствие версий: 0.x — React 17, 1.x — React 18).

```tsx
import {Button, Island, Page} from "@sberbusiness/triplex-next"; // компоненты и enum'ы — отсюда
import {CrossStrokeSrvIcon24} from "@sberbusiness/icons-next";   // иконки — только отсюда
import "@sberbusiness/triplex-next/styles/triplex-next.css";
import "@sberbusiness/icons-next/styles/icons.css";
```

## TPX-G-09 — Вертикальные внешние отступы — компонент Gap

Вертикальные отступы между блоками (айлендами, панелями, секциями) задаются
компонентом `Gap` с размером из шкалы, а не `margin` или пустыми
контейнерами.
