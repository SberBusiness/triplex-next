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

## TPX-G-10 — Конвенция имён слоёв макета

Имена слоёв несут семантику для чтения макета: префикс `_` — служебный
слой, игнорируется вместе с поддеревом (мишени прототипных переходов,
черновики); префикс `#` — слот шаблона (контейнер контента); префикс `@` —
иконка, подменяется иконкой из `@sberbusiness/icons-next`; суффиксы
`_text`/`_label`/`_placeholder` указывают, какому текстовому prop
компонента принадлежит текст ноды. Остальные имена — осмысленные; мусорные
имена (`Frame 427`, `Rectangle 12`) деградируют именной фолбэк маппинга.

## TPX-G-11 — TableBasic: ячейка рендерится только при наличии fieldKey в rowData

Каждая колонка `TableBasic` обязана иметь соответствующий ключ в `rowData`
КАЖДОЙ строки — ячейку без ключа компонент молча пропускает. Колонкам, чей
контент даёт `renderCell` (кнопки, статусы, чекбоксы), в `rowData` кладётся
значение-заглушка. Таким колонкам также обязателен
`cellType: ECellType.COMPONENTS` (чекбоксам — `CHECKBOX`): при дефолтном
`TEXT` контент оборачивается в `Text B3`, ломая отступы и семантику.

```tsx
// колонка: {fieldKey: "sign", cellType: ECellType.COMPONENTS, renderCell: () => <Button …>Подписать</Button>}
// строка:  rowData: {…, sign: true}  // без ключа sign ячейка не отрендерится
```

## TPX-G-12 — отменено

Id зарезервирован и отменён до публикации (конвенция оформления импортов —
стиль потребителя, на кодогенерацию из макета не влияет). Id не
переиспользуется.

## TPX-G-13 — Вес Typography — из суффикса текст-стиля макета

Суффикс имени текст-стиля макета задаёт начертание. Для `Title`
(`EFontWeightTitle`: REGULAR / MEDIUM / SEMIBOLD / BOLD, дефолт —
semibold): `-M` (`Header/H3-M`) → `weight={EFontWeightTitle.MEDIUM}` —
без явного `weight` текст будет жирнее макета; `-S` (`Header/H1-S`) →
semibold, `weight` не пишется (дефолт). Для `Text` (`EFontWeightText`)
доступны только REGULAR (дефолт) и SEMIBOLD — веса MEDIUM у `Text` нет:
стили с суффиксом полужирного начертания (`-S`/`-Sb`) →
`weight={EFontWeightText.SEMIBOLD}`, прочие — дефолт REGULAR, `weight`
не пишется. Проверять текст-стиль узла макета, а не полагаться на
визуальную оценку.

```tsx
<Title size={ETitleSize.H3} weight={EFontWeightTitle.MEDIUM}>…</Title> // стиль макета Header/H3-M
<Title tag="h1" size={ETitleSize.H1}>…</Title> // стиль Header/H1-S: semibold — дефолт
<Text size={ETextSize.B3} weight={EFontWeightText.SEMIBOLD}>…</Text> // полужирный Body-стиль
<Text size={ETextSize.B3}>…</Text> // обычный Body-стиль: REGULAR — дефолт
```

## TPX-G-14 — HelpBox и тултипы — без preferPlace

У `HelpBox` (и тултипов) `preferPlace`, как правило, не указывается — логики
компонента хватает, чтобы позиционировать тултип правильно; явный prop
ничего не ломает, но избыточен. Вариант `Position=Top/Left/…` из макета в
prop не переносится.

```tsx
<HelpBox tooltipSize={ETooltipSize.SM}>Текст подсказки</HelpBox>
// НЕВЕРНО: <HelpBox tooltipSize={ETooltipSize.SM} preferPlace={ETooltipPreferPlace.ABOVE}>…</HelpBox>
```

## TPX-G-15 — Инлайн-стили в коде на компонентах ДС запрещены

В коде приложений на компонентах Triplex НИКОГДА не писать `style={{…}}`
для раскладки, отступов и выравнивания — их дают сами компоненты (`Gap`,
`Row`/`Col`, штатные подкомпоненты). Если базовый компонент не умеет
раскладку, которую рисует макет (пример: право-выровненный футер есть у
`IslandWidget`/`IslandAccordion`, у базового `Island` — нет), это ошибка
макета: контент кладётся в компонент как есть, расхождение фиксируется
диагностикой. Исключение — фреймы без компонентов ДС (absolute-витрины),
где штатной раскладки не существует.

```tsx
// НЕВЕРНО: <Island.Footer style={{display: "flex", justifyContent: "flex-end", gap: 16}}>
<Island.Footer><Button …>Отмена</Button><Button …>Сохранить</Button></Island.Footer>
```

## TPX-G-16 — Описание и постфикс полевых компонентов — через targetProps

У полевых компонентов, чей `targetProps` наследует TextFieldBase
(`DateField` через MaskedField и т.п.), описание под полем и постфикс
(в т.ч. `HelpBox`) передаются через `targetProps.description` /
`targetProps.postfix` — постфикс НЕ перетирает встроенные иконки (календарь
`DateField`). У `SelectField` prop `description` отсутствует — там описание
строится паттерном `FormGroup` + `SelectField` + `FormFieldDescription`.
Перед выбором паттерна сверяться с примером `get_component`.

```tsx
<DateField … targetProps={{postfix: <HelpBox tooltipSize={ETooltipSize.SM} />, description: <Text …>…</Text>}} />
<FormGroup><SelectField … /><FormFieldDescription>…</FormFieldDescription></FormGroup>
```

## TPX-G-17 — Композиция MasterTable: ChipPanel и порядок панелей

Чипы-фильтры таблицы кладутся в `MasterTable.ChipPanel` (`ChipGroup`
size SM `oneLine`), правая часть строки чипов — `MasterTable.ChipPanel.Links`
(туда же — `TableBasicSettings` со ссылкой настроек), а не в `FilterPanel`.
Порядок панелей: `ChipPanel` → `TableBasic` → `TableFooter` (появляется при
выборе строк) → `PaginationPanel`. Варианты чипов макета: `Chip/DatePicker` →
`ChipDatePicker`, `Chip/Select` → `ChipSelect`, `Chip/Multiselect` →
`ChipMultiselect`, `Chip/Suggest` → `ChipSuggest`; `Chip/MonthYearPicker`
аналога не имеет → `ChipSelect`.

## TPX-G-18 — Кнопка-иконка: Button с icon vs ButtonIcon

Варианты кнопок макета `Type=Icon*` (`IconSecondary`, `IconSecondaryLight`,
…) — это `Button` с prop `icon` и соответствующей темой, БЕЗ children (плюс
`aria-label`). `ButtonIcon` — только для «голой» иконки-кнопки без подложки;
это нативный `<button>` без видимого текста, поэтому `aria-label` для него
обязателен так же, как для icon-`Button`.
В ячейках таблиц и шапках страниц кнопки с серой/светлой подложкой —
`Button` с `icon`. Размер иконки — из макета (MD-кнопка → 20, LG → 24).

```tsx
<Button icon={<DefaulticonStrokePrdIcon20 paletteIndex={0} />} theme={EButtonTheme.SECONDARY} size={EComponentSize.MD} aria-label="Действие" />
```

## TPX-G-19 — columns TableBasic — стабильная ссылка

Массив `columns` для `TableBasic` должен быть стабильным по ссылке между
рендерами (`useMemo`/константа модуля): `TableBasic` пишет columns в
`MasterTableContext` через `useEffect` с проверкой `isEqual`, а `isEqual`
сравнивает функции (`renderCell`) по ссылке — пересоздаваемый каждый рендер
массив крутит бесконечную петлю записи в контекст. Симптомы: лишние
ре-рендеры, нестабильный список в `ColumnSettings`.

```tsx
const columns = useMemo<ITableBasicColumn[]>(() => [...], [/* state, от которого зависят renderCell */]);
```

## TPX-G-20 — ColumnSettings.SortableList не строит пункты сам

У `ColumnSettings.SortableList` props `columns`/`onColumnsChange` — только
dnd-обвязка (порядок при перетаскивании); пункты списка рендерит потребитель
детьми: `ColumnSettings.SortableList.Item` с `id={fieldKey}` и контентом
(обычно `Checkbox` видимости колонки + label). Без детей меню настроек
открывается пустым.

```tsx
<ColumnSettings.SortableList columns={cols} onColumnsChange={setCols}>
    {cols.map((c) => (
        <ColumnSettings.SortableList.Item key={c.fieldKey} id={c.fieldKey}>
            <Checkbox checked={!c.hidden} onChange={…}>{c.label}</Checkbox>
        </ColumnSettings.SortableList.Item>
    ))}
</ColumnSettings.SortableList>
```

## TPX-G-21 — Компонент не найден в get_component: искать в типах пакета

Ответ `get_component` «Компонент не найден» не означает, что компонента нет
в пакете: документация MCP отстаёт от `@sberbusiness/triplex-next`, а
составные компоненты описаны под именем родителя — `MasterTable`,
`TableFooter`, `PaginationPanel` в `Table`/`TableBasic`; `ChipSelect`,
`ChipDatePicker`, `ChipMultiselect`, `ChipSuggest` в `Chip`/`ChipGroup`;
`FormFieldDescription` в `FormField`.

Порядок действий:

1. вызвать `get_component` для родителя из `list_components` и искать
   под-компонент в его примерах;
2. если не нашёл — взять API из типов установленного пакета:
   `node_modules/@sberbusiness/triplex-next/index.d.ts` и
   `components/<Родитель>/*.d.ts` (имена экспортов, обязательные props,
   `enum`'ы);
3. компилировать `tsc` как обычно.

Придумывать имя компонента или props по памяти ЗАПРЕЩЕНО, как и заменять
недокументированный компонент html-тегом «раз документации нет».

```tsx
// get_component('MasterTable') → «не найден» → get_component('Table') → пример MasterTable.TableBasic
// get_component('ChipSelect') → «не найден» → index.d.ts → components/Chip/ChipSelect.d.ts → props
```

## TPX-G-22 — Растры макета: ссылка по имени файла, байты передаются отдельно

Инструменты чтения макета байты изображений, как правило, не отдают: у
растровой заливки есть только hash содержимого, имя файла вида
`images/<hash>.png` и режим масштабирования (`FILL`/`FIT`). Правила для
кода:

1. растр вставляется как `<img src="/assets/<hash>.<ext>">` (или в prop
   компонента, принимающего `src`) с `alt` из имени слоя;
2. режим масштабирования переносится в `object-fit`: `FILL` → `cover`,
   `FIT` → `contain` — prop'ом или классом, не инлайн-стилем (TPX-G-15);
3. файл с тем же именем кладётся в ассеты приложения отдельным шагом
   передачи — экспортом из дизайн-инструмента или от дизайнера;
4. выдумывать URL, встраивать base64 или подменять картинку заглушкой из
   интернета ЗАПРЕЩЕНО;
5. картинки-контент (фото в галерее, аватары, превью документов) — это
   данные, а не UI: в компонент они передаются через props/items с теми же
   `src`, а сам массив помечается как демо-данные.

Отсутствующий на диске файл — не ошибка генерации, а пункт передачи
ассетов: код ссылается на него по имени и остаётся рабочим, когда файл
положат.

```tsx
<img src="/assets/ca92f04f46fa1c8c91a3d1406bc68b9ceffa7f86.png" alt="raster-fill" />
// демо-данные: [{src: "/assets/<hash>.png", alt: "…"}, …] — имя файла из макета, не выдуманное
```
