import React from "react";

/** Значение контекста, отличающее скрытую копию табов от отображаемой. */
export interface ITabsExtendedTabContext {
    /** Это скрытый tab, отрендеренный для расчёта позиционирования отображаемых табов. */
    isFakeTab: boolean;
}

const contextInitial: ITabsExtendedTabContext = {
    isFakeTab: false,
};

export const TabsExtendedTabContext = React.createContext<ITabsExtendedTabContext>(contextInitial);
