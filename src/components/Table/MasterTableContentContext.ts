import React from "react";

/** Свойства контекста MasterTableContentContext. */
export interface IMasterTableContentContext {
    /** Состояние загрузки контента таблицы. */
    loading: boolean;
}

/** Контекст компонента MasterTableContent. Сообщает потомкам состояние загрузки контента таблицы. */
export const MasterTableContentContext = React.createContext<IMasterTableContentContext>({
    loading: false,
});
