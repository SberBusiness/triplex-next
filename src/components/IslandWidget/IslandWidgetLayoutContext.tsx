import React from "react";

/** Значение контекста IslandWidgetWrapper — связь виджета с его дополнительным подвалом. */
export interface IIslandWidgetLayoutContext {
    /** Дополнительный подвал раскрыт — виджет рисует под собой тень. */
    hasExtraFooter: boolean;
    /** Сообщить обёртке о состоянии дополнительного подвала. */
    setHasExtraFooter: (has: boolean) => void;
}

const contextInitial: IIslandWidgetLayoutContext = {
    hasExtraFooter: false,
    setHasExtraFooter: () => {},
};

/** Контекст IslandWidgetWrapper. Внутренний: в публичный barrel не экспортируется. */
export const IslandWidgetLayoutContext = React.createContext(contextInitial);
