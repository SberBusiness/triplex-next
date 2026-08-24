import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";

export interface IIslandWidgetContext {
    adaptive: boolean;
    disableAdaptiveCollapsing: boolean;
    open: boolean;
    size: EComponentSize;
}

const contextInitial: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
    size: EComponentSize.MD,
};

export const IslandWidgetContext = React.createContext(contextInitial);
