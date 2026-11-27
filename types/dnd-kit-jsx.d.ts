// В декларациях @dnd-kit/core 6.3.1 эти модули используют глобальный JSX.
// Ограничиваем совместимость самими модулями, сохраняя типы экспортируемых сенсоров.
import type * as DndReact from "react";

declare namespace DndJSX {
    type Element = DndReact.ReactElement;
    type IntrinsicElements = { [Tag in Extract<DndReact.ElementType, string>]: DndReact.ComponentProps<Tag> };
}

declare module "@dnd-kit/core/dist/components/DragOverlay/DragOverlay" {
    export import JSX = DndJSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/PositionedOverlay/PositionedOverlay" {
    export import JSX = DndJSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/NullifiedContextProvider/NullifiedContextProvider" {
    export import JSX = DndJSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/AnimationManager/AnimationManager" {
    export import JSX = DndJSX;
}

declare module "@dnd-kit/core/dist/components/Accessibility/Accessibility" {
    export import JSX = DndJSX;
}
