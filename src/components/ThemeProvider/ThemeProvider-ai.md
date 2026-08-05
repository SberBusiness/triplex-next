---
component: ThemeProvider
category: ThemeProvider
related: [useToken, ETriplexNextTheme, ThemeProviderContext, DesignTokens, Portal, Dropdown, ModalWindow, LightBox, Tooltip]
tokens: []
stories: stories/ThemeProvider/ThemeProvider.stories.tsx
version: "1.0"
---

# ThemeProvider

## Назначение

Провайдер темы: рендерит css-переменные всех дизайн-токенов выбранной темы в тег `<style>`,
ограничивает их областью видимости элемента из `scopeRef` и передаёт тему и итоговые токены
дочерним компонентам через контекст (читается хуком `useToken`).

Используй когда: приложению нужна тема Triplex Next (светлая или тёмная) либо точечное
переопределение дизайн-токенов — глобально на корне приложения или локально для части дерева.

Не используй когда: нужно поменять внешний вид одного компонента — для этого есть props
компонента (`theme`, `size`, `status`) и его собственные токены, а не подмена всей темы.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `children` | `React.ReactNode` | Контент, внутри которого действуют тема и токены |
| `scopeRef` | `React.RefObject<HTMLElement>` | Ref на элемент, на который навешивается `scopeClassName`. Именно этот элемент и его потомки видят css-переменные темы |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `theme` | `ETriplexNextTheme` | `ETriplexNextTheme.LIGHT` | Дизайн-тема: `LIGHT` / `DARK` |
| `scopeClassName` | `string` | `uniqueId("triplex-next-theme-")` | Класс области видимости css-переменных. Задавай явно, если класс нужен снаружи (например, для портала, который рендерится вне `scopeRef`) |
| `tokens` | `TDesignTokensPartial` | `{}` | Частичное переопределение токенов поверх токенов темы |

### Особенности

- `scopeRef` должен указывать на элемент **внутри** `children` (или на предка, существующего
  на момент эффекта). Класс навешивается в `useEffect`, поэтому до первого эффекта переменных
  на элементе ещё нет.
- `tokens` мерджится через `defaultsDeep` в порядке «переопределения потребителя → core-токены
  темы → токены компонентов темы»: значения потребителя всегда выигрывают.
- `tokens` сравнивается по ссылке. Инлайн-литерал в JSX пересобирает `<style>` на каждый рендер —
  выноси объект в константу или мемоизируй.
- Провайдеры вкладываются: `useToken` возвращает значения ближайшего `ThemeProvider`.
- Вне `ThemeProvider` контекст отдаёт светлую тему, токены по умолчанию и пустой `scopeClassName`.

---

## Дизайн-токены

Собственных токенов у компонента нет — он **источник** css-переменных для всех остальных
компонентов. В `<style>` с ключом `triplex-next-dynamic-tokens-{scopeClassName}` выводятся все
токены выбранной темы (core + компонентные) в виде:

```
--triplex-next-{Группа}-{Токен}-{версия}: {значение};
```

Версия в имени переменной — версия пакета с точками, заменёнными на дефисы
(см. `DesignTokenUtils.getCSSVariableByTokenGroup`).

---

## Инварианты

- `ThemeProvider` не рендерит собственный DOM-элемент — `forwardRef` неприменим,
  ref на DOM передаётся потребителем через `scopeRef`.
- Публичные экспорты `src/components/ThemeProvider/index.ts` — `ThemeProvider`,
  `IThemeProviderProps`, `ThemeProviderContext`, `IThemeProviderContext`, `ETriplexNextTheme`,
  `useToken`. Ни один не удалять и не переименовывать.
- Значения `ETriplexNextTheme` (`"light"` / `"dark"`) — часть публичного API.
- Ключ тега стилей `triplex-next-dynamic-tokens-{scopeClassName}` и префикс автогенерируемого
  класса `triplex-next-theme-` менять нельзя: по ключу стили обновляются и удаляются,
  а класс попадает в разметку потребителя.
- Порядок аргументов `defaultsDeep` в `ThemeProviderView` менять нельзя — иначе токены темы
  начнут переопределять пользовательские.
- `ThemeProviderContext` должен оставаться единственным экземпляром модуля: `useToken`
  импортирует его по пути пакета (`@sberbusiness/triplex-next/components/ThemeProvider/...`).
  Дублирование модуля через разные спецификаторы разорвёт связь провайдера и потребителей.
- Компоненты, рендерящиеся в портал вне `scopeRef`, сами переносят `scopeClassName`
  из `useToken` на свой корневой узел — иначе css-переменные до них не доходят.
  Новые портальные компоненты должны делать так же, и способ зависит от контейнера:
  - **собственный контейнер** (`Dropdown`, `ModalWindow`, `LightBox`) — класс просто
    добавляется в `clsx` корневого элемента;
  - **общий контейнер, разделяемый несколькими экземплярами** (`Tooltip`,
    см. `utils/useTooltipTheme.ts`) — класс навешивается через `classList` в эффекте
    со счётчиком использований в data-атрибуте и снимается с задержкой после закрытия.
    Без счётчика соседние экземпляры на том же контейнере затирали бы тему друг другу,
    без задержки класс снимался бы до конца анимации закрытия.
- При размонтировании и при смене `scopeClassName` тег стилей удаляется, а класс снимается
  с элемента — утечка стилей на страницу недопустима.

---

## Accessibility

Компонент не рендерит DOM и не влияет на семантику, фокус и клавиатуру. Отдельных требований
нет. Контрастность цветов — ответственность значений токенов темы.

---

## Связанные компоненты

- `useToken` — хук доступа к текущей теме, токенам и `scopeClassName`. Основной способ
  прочитать тему внутри компонента.
- `ThemeProviderContext` — контекст темы; экспортируется для нестандартных сценариев,
  в обычном коде используй `useToken`.
- `ETriplexNextTheme` — enum доступных тем.
- `ThemeProviderView` — внутренний компонент (навешивает класс, собирает значение контекста),
  не экспортируется из barrel.
- `DesignTokens` (`DesignTokensCore`, `DesignTokensComponents` и их тёмные варианты) —
  источник значений токенов; `DesignTokenUtils.getStyle` формирует css-переменные.
- `Dropdown`, `ModalWindow`, `LightBox`, `Tooltip` — потребители `useToken`: переносят
  `scopeClassName` на свои портальные контейнеры.

---

## Stories

Основные истории: `stories/ThemeProvider/ThemeProvider.stories.tsx`
Файлы примеров: `stories/ThemeProvider/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Интерактивный подбор темы, `scopeClassName` и переопределяемых токенов |
| `Default` | `Default.tsx` | Минимальный пример: светлая тема по умолчанию |
| `DarkTheme` | `DarkTheme.tsx` | Тёмная тема |
| `CustomTokens` | `CustomTokens.tsx` | Переопределение токена поверх темы |
| `ThemeSwitcher` | `ThemeSwitcher.tsx` | Переключение темы на лету |
| `ScopedTheme` | `ScopedTheme.tsx` | Область действия темы: контент вне `scopeRef` её не видит |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-08-05 | Создан документ. AI-рефакторинг: JSDoc на props и экспортах, ключ тега стилей вынесен в хелпер, упрощён эффект `ThemeProviderView`, добавлены unit-тесты `ThemeProviderView` и `useToken`, stories переведены на modern pattern |
