import React from "react";
import { EComponentSize } from "../../enums";

/** Контекст компонента StepperExtended. */
export interface IStepperExtendedContext {
    /** Размер Stepper. */
    size: EComponentSize;
    /** Уникальный идентификатор выбранного шага. */
    selectedId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (selectedId: string) => void;
}

/** Контекст в StepperExtended. */
export const StepperExtendedContext = React.createContext<IStepperExtendedContext>({
    size: EComponentSize.LG,
    selectedId: undefined,
    onSelectStep: () => {},
});
