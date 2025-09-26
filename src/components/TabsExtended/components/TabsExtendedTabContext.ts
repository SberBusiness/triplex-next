import React from "react";

export interface ITabsExtendedTabContext {
    // Это скрытый tab, отрендеренный для расчета позиционирования отображаемых табов.
    isFakeTab: boolean;
}

const contextInitial: ITabsExtendedTabContext = {
    isFakeTab: false,
};

export const TabsExtendedTabContext = React.createContext<ITabsExtendedTabContext>(contextInitial);
