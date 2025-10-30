import React from "react";
import { EStepperSize } from "./enums";

/** Контекст компонента StepperExtended. */
export interface IStepperExtendedContext {
    /** Размер Stepper. */
    size: EStepperSize;
    /** Уникальный идентификатор выбранного шага. */
    selectedId?: string;
    /** Обработчик выбора шага. */
    onSelectStep: (selectedId: string) => void;
}

/** Контекст в StepperExtended. */
export const StepperExtendedContext = React.createContext<IStepperExtendedContext>({
    size: EStepperSize.SM,
    onSelectStep: () => {},
    selectedId: undefined,
});
