---
component: CarouselItem
category: Carousel
related: [Carousel]
tokens: []
stories: stories/Carousel/Carousel.stories.tsx
version: "1.0"
---

# CarouselItem

## Назначение

Слайд составного `Carousel`. Регистрирует свой DOM-узел по `index`, по этим
узлам родитель измеряет слайды и рассчитывает страницы и границы прокрутки.

Используй внутри `Carousel.Track`, вложенного в `Carousel.Viewport`.
Не используй вне `Carousel`: без родителя слайд не измеряется и не участвует
в навигации.

Доступен только как `Carousel.Item`: именованного экспорта `CarouselItem`
из пакета нет, `ICarouselItemProps` экспортируется.

```tsx
import { Carousel } from "@sberbusiness/triplex-next";

<Carousel style={{ width: 320, height: 180 }}>
    <Carousel.Viewport>
        <Carousel.Track>
            {items.map((item, index) => (
                <Carousel.Item key={item.id} index={index} aria-label={item.title} style={{ width: 280 }}>
                    {item.title}
                </Carousel.Item>
            ))}
        </Carousel.Track>
    </Carousel.Viewport>
</Carousel>
```

---

## Варианты и props

### Обязательные props

| Prop | Тип | Описание |
|---|---|---|
| `index` | `number` | Позиция слайда с нуля. Ключ регистрации для геометрии, не HTML-атрибут |

Остальные props — атрибуты `<div>`, передаются на корень слайда.

### Индексы

- Индексы уникальны, идут подряд (`0, 1, 2, …`) и совпадают с DOM-порядком.
  Пропуск, дубликат или несовпадение с порядком ломают расчёт страниц;
  компонент такой ввод не проверяет.
- `index` берётся из позиции в `map`, `key` — из стабильного id данных. После
  удаления, вставки или перестановки потребитель пересчитывает индексы.
- Регистрация не запускает пересчёт геометрии. Кэш размеров слайдов
  сбрасывается при изменении размеров `Viewport` или `Track`
  (`ResizeObserver`) и при смене `gap`, `scrollMode` или `orientation`:
  после перестановки слайдов без этих изменений в кэше остаются прежние
  размеры по индексам.
- Размер слайда задаёт потребитель или содержимое; родитель измеряет ширину
  в горизонтальной карусели и высоту в вертикальной.

---

## Дизайн-токены

Собственных токенов нет.

---

## Инварианты

- `forwardRef` указывает на корневой `<div>` слайда; внешний ref объединяется
  с регистрационным callback.
- `displayName` — `"Carousel.Item"`, CSS-класс — `slide`.
- При смене `index` и размонтировании прежняя запись удаляется из реестра:
  родитель считает слайды по числу записей, а не по `children`.
- `role="group"` задан до spread, потребитель может его переопределить.

---

## Accessibility

- Роль по умолчанию — `group`; доступное имя задаёт потребитель через
  `aria-label` или `aria-labelledby`.
- `index` не даёт `aria-posinset` / `aria-setsize` и связей с индикаторами.
- Слайды за пределами видимой области не получают `aria-hidden`, `inert`
  или `tabIndex={-1}`: их содержимое остаётся в Tab-порядке.

---

## Связанные компоненты

- `Carousel` — владелец контекста, геометрии и навигации.
- `Carousel.Track` — лента слайдов, задаёт `gap` и смещение.
- `Carousel.Viewport` — видимая область и touch-жесты.

---

## Stories

Основные истории: `stories/Carousel/Carousel.stories.tsx`
Файлы примеров: `stories/Carousel/examples/`

| Story | Example file | Что демонстрирует |
|---|---|---|
| `Playground` | `Playground.tsx` | Слайды при смене ориентации, режима прокрутки и зазора |
| `Default` | `Default.tsx` | Слайды разной ширины |
| `ScrollModes` | `ScrollModes.tsx` | Слайды в режимах `ITEM` и `PAGE` |
| `Orientations` | `Orientations.tsx` | Ширина горизонтальных и высота вертикальных слайдов |
| `Production` | `Production.tsx` | Слайды с карточками и вложенными кнопками |
| `DynamicIndicators` | `DynamicIndicators.tsx` | Длинная лента слайдов |

---

## История изменений

| Дата | Изменение |
|---|---|
| 2026-10-20 | Создан документ |
