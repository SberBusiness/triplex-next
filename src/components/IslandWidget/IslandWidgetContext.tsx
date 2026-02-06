import React from "react";

export interface IIslandWidgetContext {
    adaptive: boolean;
    disableAdaptiveCollapsing: boolean;
    open: boolean;
}

const contextInitial: IIslandWidgetContext = {
    adaptive: false,
    disableAdaptiveCollapsing: false,
    open: false,
};

export const IslandWidgetContext = React.createContext(contextInitial);
