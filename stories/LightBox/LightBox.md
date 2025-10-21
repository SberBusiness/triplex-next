```jsx {"file": "./examples/LightBox_0_default.jsx"}
```

### Loading emulation

Флаг `isLoading` нужно передать и в LightBox и в LightBox.Content.

```jsx {"file": "./examples/LightBox_1_loading_emulation.jsx"}
```

### TopOverlay

```jsx {"file": "./examples/LightBox_2_TopOverlay.jsx"}
```

### SideOverlay

```jsx {"file": "./examples/LightBox_3_SideOverlay.jsx"}
```

### SideOverlay + Loading emulation

```jsx {"file": "./examples/LightBox_4_SideOverlay_loading_emulation.jsx"}
```

### SideOverlay + TopOverlay

```jsx {"file": "./examples/LightBox_5_SideOverlay_TopOverlay.jsx"}
```

### Nested SideOverlays

```jsx {"file": "./examples/LightBox_6_nested_SideOverlays.jsx"}
```

### SideOverlay + Portal

```jsx {"file": "./examples/LightBox_7_SideOverlay_Portal.jsx"}
```

### Tabs

```jsx {"file": "./examples/LightBox_8_tabs.jsx"}
```

### Custom positioning

LightBox может позиционироваться не только относительно экрана устройства, но и относительно некоторого DOM элемента.
При позиционировании относительно DOM элемента, LightBox рассчитает левую координату и ширину элемента, и отрендерит себя в этих границах. Верхний отступ LightBox от границ экрана будет равен высоте DOM элемента, если отступ не нужен высота элемента должна быть равна 0. При изменении ширины/высоты DOM элемента LightBox будет осуществлять re-render.

Способы включения позиционирования LightBox относительно DOM элемента:

DOM элементу присвоить id из константы lightBoxViewManagerNodeIdDefault:

```jsx static
import {lightBoxViewManagerNodeIdDefault} from '@sber-business/triplex/components/LightBox/LightBox';

// Элемент, в границах которого будет рендериться LightBox.
<div id={lightBoxViewManagerNodeIdDefault} />;
```

Передать произвольный id в DOM элемент и в LightBox.

```jsx static
// Элемент, в границах которого будет рендериться LightBox.
<div id="custom-id" />

<LightBox lightBoxViewManagerNodeId="custom-id"/>
```

LightBox найдет нужную DOM ноду для расчета своего положения на экране, в случае остутствия DOM ноды, LightBox ее создаст и добавить в html-элемент body.

```jsx {"file": "./examples/LightBox_9_custom_positioning.jsx"}
```

### ModalWindow over LightBox.

Это антипаттерн, применять такие кейсы не рекомендуется.

```jsx {"file": "./examples/LightBox_10_ModalWindow_over_LightBox.jsx"}
```

### Disable focusTrap.

```jsx {"file": "./examples/LightBox_11_disable_focusTrap.jsx"}
```
