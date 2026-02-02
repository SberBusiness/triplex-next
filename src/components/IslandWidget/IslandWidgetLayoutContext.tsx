import React from "react";

export interface IIslandWidgetLayoutContext {
    hasExtraFooter: boolean;
    setHasExtraFooter: (has: boolean) => void;
}

const contextInitial: IIslandWidgetLayoutContext = {
    hasExtraFooter: false,
    setHasExtraFooter: () => {},
};

export const IslandWidgetLayoutContext = React.createContext(contextInitial);
