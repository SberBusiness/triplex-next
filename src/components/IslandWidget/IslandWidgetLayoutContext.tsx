import React from "react";

/** Значение контекста IslandWidgetWrapper — связь виджета с его дополнительными подвалами. */
export interface IIslandWidgetLayoutContext {
    /** Хотя бы один дополнительный подвал раскрыт — виджет рисует под собой тень. */
    hasExtraFooter: boolean;
    /** Сообщить обёртке, что подвал раскрылся. Считается по экземплярам, а не флагом. */
    addOpenExtraFooter: () => void;
    /** Сообщить обёртке, что подвал закрылся или размонтирован. */
    removeOpenExtraFooter: () => void;
}

const contextInitial: IIslandWidgetLayoutContext = {
    hasExtraFooter: false,
    addOpenExtraFooter: () => {},
    removeOpenExtraFooter: () => {},
};

/** Контекст IslandWidgetWrapper. Внутренний: в публичный barrel не экспортируется. */
export const IslandWidgetLayoutContext = React.createContext(contextInitial);
