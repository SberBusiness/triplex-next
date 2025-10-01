import React from "react";
import { TTooltipToggleType, ITooltipElements } from "@sberbusiness/triplex-next/components/Tooltip/types";

/** Свойства контекста Tooltip. */
export interface ITooltipContext {
    toggleType?: TTooltipToggleType;
    elements: ITooltipElements;
    tooltipOpen: boolean;
    targetHoveredRef: React.MutableRefObject<boolean>;
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
