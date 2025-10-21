import React from "react";
import { ITableBasicColumn } from "@sberbusiness/triplex-next/components/Table/TableBasic/types";

/** Свойства контекста MasterTableContext. */
export interface IMasterTableContextContext {
    /** Структура заголовков таблицы. */
    columns: ITableBasicColumn[];
    /** Состояние загрузки. */
    loading: boolean;
    /** Установить колонки. */
    setColumns: (columns: ITableBasicColumn[]) => void;
}

/** Контекст компонента MasterTableContext. */
export const MasterTableContext = React.createContext<IMasterTableContextContext>({
    columns: [],
    loading: false,
    setColumns: () => {},
});
