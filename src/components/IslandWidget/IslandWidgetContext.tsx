import React from "react";

export interface IIslandWidgetContext {
    hasExtraFooter: boolean;
    setHasExtraFooter: (has: boolean) => void;
}

const contextInitial: IIslandWidgetContext = {
    hasExtraFooter: false,
    setHasExtraFooter: () => {},
};

export const IslandWidgetContext = React.createContext(contextInitial);
