import React from "react";
import { TTooltipToggleType, ITooltipElements } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Свойства контекста Tooltip. */
export interface ITooltipContext {
    /** Способ открытия подсказки: по клику или по наведению. */
    toggleType?: TTooltipToggleType;
    /** Субкомпоненты, разобранные из children Tooltip. */
    elements: ITooltipElements;
    /** Признак того, что подсказка открыта. */
    tooltipOpen: boolean;
    /** Признак того, что открытие было инициировано наведением на целевой элемент. */
    targetHoveredRef: React.MutableRefObject<boolean>;
    /** Изменение состояния открытости подсказки. */
    setTooltipOpen: (open: boolean) => void;
}

/** Контекст компонента Tooltip. */
export const TooltipContext = React.createContext<ITooltipContext>({
    elements: {
        body: null,
        link: null,
        closeButton: null,
        mobileHeader: null,
        target: null,
    },
    setTooltipOpen: () => {},
    targetHoveredRef: { current: false },
    tooltipOpen: false,
});
