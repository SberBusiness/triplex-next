import React from "react";
import {
    WarningStrokeStsIcon16,
    ErrorStrokeStsIcon16,
    SuccessStrokeStsIcon16,
    WaitStrokeStsIcon16,
    TickStrokeSrvIcon16,
} from "@sberbusiness/icons-next";
import { EStepperStepIconType } from "./enums";

/** Свойства иконки в шаге. */
export type TStepperStepIconProps = {
    /** Тип иконки. */
    type: EStepperStepIconType;
};

/** Компонент StepperStepIcon, иконка в шаге. */
export const StepperStepIcon: React.FC<TStepperStepIconProps> = ({ type }) => {
    switch (type) {
        case EStepperStepIconType.FILLED:
            return <TickStrokeSrvIcon16 paletteIndex={0} />;
        case EStepperStepIconType.SUCCESS:
            return <SuccessStrokeStsIcon16 paletteIndex={0} />;
        case EStepperStepIconType.WARNING:
            return <WarningStrokeStsIcon16 paletteIndex={2} />;
        case EStepperStepIconType.ERROR:
            return <ErrorStrokeStsIcon16 paletteIndex={1} />;
        case EStepperStepIconType.WAIT:
            return <WaitStrokeStsIcon16 paletteIndex={4} />;
        default:
            return null;
    }
};
