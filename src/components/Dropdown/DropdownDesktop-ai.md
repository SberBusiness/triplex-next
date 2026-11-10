---
component: DropdownDesktop
category: Dropdown
related: [Dropdown]
tokens:
  - Dropdown.Background
  - Dropdown.Shadow
stories: stories/Dropdown/Dropdown.stories.tsx
version: "1.0"
---

# DropdownDesktop

## Назначение

`DropdownDesktop` размещает произвольное содержимое рядом с управляющим элементом и блокирует прокрутку страницы, пока меню открыто. Компонент доступен из `@sberbusiness/triplex-next` как самостоятельный экспорт.

Используй напрямую, когда нужен десктопный контейнер и место монтирования уже выбрано. Для портала в `document.body`, колбэков открытия и закрытия или адаптивной шторки используй `Dropdown`. Для готовой кнопки с выпадающим блоком подойдёт `ButtonDropdownExtended`.

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `opened` | `boolean` | Потребитель управляет монтированием меню. При `false` компонент возвращает `null` |
| `targetRef` | `React.RefObject<HTMLElement>` | Ссылка на смонтированный управляющий элемент. Его `getBoundingClientRect()` служит опорой для расчёта позиции |
| `setOpened` | `(opened: boolean) => void` | Обязателен по общему контракту с `Dropdown`. Вызов колбэка предусмотрен в мобильной ветке `Dropdown`; `DropdownDesktop` управляется через `opened` |

### Опциональные props

| Prop | Тип | По умолчанию | Описание |
|---|---|---|---|
| `size` | `EComponentSize` | `MD` | Задаёт скругление контейнера. Размер списка задаётся его собственным prop |
| `direction` | `EDropdownDirection` | `AUTO` | `TOP` и `BOTTOM` задают сторону явно. В `AUTO` меню предпочитает низ, переключается наверх при достаточном месте и остаётся снизу, если места мало с обеих сторон |
| `alignment` | `EDropdownAlignment` | `LEFT` | Привязка к левому или правому краю управляющего элемента. При нехватке места позиция пересчитывается с учётом противоположного края и ширины области просмотра |
| `width` | `EDropdownWidth` | `CONTENT` | `CONTENT` определяет ширину по содержимому, `TARGET` задаёт ширину управляющего элемента, `MIN_TARGET` задаёт её как минимум |
| `children` | `React.ReactNode` | — | Список опций, форма или другой блок |
| `className`, `style` | HTML-атрибуты | — | Дополняют базовый класс и вычисленные стили. Пользовательский `style` имеет приоритет и может переопределить позицию и ширину |

Меню имеет `position: fixed` и зазор 4 px от управляющего элемента. Координаты пересчитываются при прокрутке, изменении размеров окна, меню и управляющего элемента. До первого расчёта меню отрисовано с `opacity: 0`, поэтому `targetRef.current` должен быть доступен при открытии.

Пример прямого подключения для одного меню:

```tsx
import { useRef, useState } from "react";
import { DropdownDesktop } from "@sberbusiness/triplex-next";

export const DesktopSettings = () => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [opened, setOpened] = useState(false);

    return (
        <>
            <button
                ref={targetRef}
                type="button"
                aria-expanded={opened}
                aria-controls={opened ? "desktop-settings" : undefined}
                onClick={() => setOpened((value) => !value)}
            >
                Настройки
            </button>
            <DropdownDesktop id="desktop-settings" targetRef={targetRef} opened={opened} setOpened={setOpened}>
                Настройки отображения
            </DropdownDesktop>
        </>
    );
};
```

---

## Дизайн-токены

Токены переопределяются через `ThemeProvider` (prop `tokens`). Значения по умолчанию заданы в `src/components/DesignTokens/components/Dropdown.ts`.

```text
Dropdown.Background
Dropdown.Shadow
```

---

## Инварианты

- `forwardRef` передаёт ссылку на корневой `HTMLDivElement`. После закрытия или размонтирования ссылка очищается.
- Открытость приходит через `opened`, а вычисленные стили относятся только к позиционированию. Стандартные HTML-атрибуты передаются на корневой `div`.
- `ResizeObserver` следит за контейнером меню и управляющим элементом, пока меню открыто. Подписки и блокировка прокрутки снимаются при закрытии или размонтировании.
- Блокировку `document.body` ведёт `lockBodyScroll`: класс снимается после закрытия последнего экземпляра с этим классом. Каждый открытый экземпляр отдельно проверяет границу своего меню для события `wheel`.
- Имена публичных props, enum и barrel-экспорты входят в контракт компонента.

---

## Accessibility

- Контейнер представляет собой обычный `div`. Роли, доступное имя и атрибуты управляющего элемента выбирает потребитель по смыслу содержимого. Например, `aria-expanded` сообщает об открытии, а `aria-controls` связывает триггер с контейнером.
- Потребитель управляет фокусом и закрытием по Escape, Tab или клику вне меню. Навигация по опциям относится к контракту `DropdownList`.
- При открытом меню `wheel` за его пределами гасится. Блокировка клавиш прокрутки (Space, PageUp, PageDown, Home, End и стрелки) действует для событий с целью `document.body`.

---

## Связанные компоненты

- [Dropdown](Dropdown-ai.md) монтирует `DropdownDesktop` через портал и может переключаться на `Puller` на мобильной ширине.
- `DropdownList` и `DropdownList.Item` предоставляют список опций с ролями и клавиатурным управлением.

---

## Stories

Основные истории: `stories/Dropdown/Dropdown.stories.tsx`
Файлы примеров: `stories/Dropdown/examples/`

В этих примерах `Dropdown` рендерит `DropdownDesktop` через портал.

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Управление размером, направлением, выравниванием и шириной |
| `Default` | `Default.tsx` | Управляемое открытие рядом с кнопкой |
| `Sizes` | `Sizes.tsx` | Скругления меню для SM, MD и LG |
| `Directions` | `Directions.tsx` | Явное открытие вверх и вниз |
| `Alignments` | `Alignments.tsx` | Выравнивание по обоим краям |
| `Widths` | `Widths.tsx` | Режимы CONTENT, TARGET и MIN_TARGET |
| `VisualTests` | `VisualTests.tsx` | Прокручиваемый список и произвольный контент |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-11-10 | Создан документ. Уточнены публичные JSDoc и передача ref через общий хелпер (TRI-189). |
