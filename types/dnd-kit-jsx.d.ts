// В декларациях @dnd-kit/core 6.3.1 эти модули используют глобальный JSX.
// Ограничиваем совместимость самими модулями, сохраняя типы экспортируемых сенсоров.
import * as DndReact from "react";

declare module "@dnd-kit/core/dist/components/DragOverlay/DragOverlay" {
    export import JSX = DndReact.JSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/PositionedOverlay/PositionedOverlay" {
    export import JSX = DndReact.JSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/NullifiedContextProvider/NullifiedContextProvider" {
    export import JSX = DndReact.JSX;
}

declare module "@dnd-kit/core/dist/components/DragOverlay/components/AnimationManager/AnimationManager" {
    export import JSX = DndReact.JSX;
}

declare module "@dnd-kit/core/dist/components/Accessibility/Accessibility" {
    export import JSX = DndReact.JSX;
}
