import React from "react";
import { EComponentSize } from "../../enums";

/** Значение контекста StepperExtended: его читает каждый StepperExtended.Step. */
export interface IStepperExtendedContext {
    /** Размер шагов. */
    size: EComponentSize;
    /** Уникальный идентификатор выбранного шага. */
    selectedId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (selectedId: string) => void;
}

/** Контекст StepperExtended. Через barrel не экспортируется — это внутренняя деталь компонента. */
export const StepperExtendedContext = React.createContext<IStepperExtendedContext>({
    size: EComponentSize.LG,
    selectedId: undefined,
    onSelectStep: () => {},
});
