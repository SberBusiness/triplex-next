import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";

/** Значение контекста Row. */
export interface IRowContext {
    /** Размер отступа между колонками. */
    gridHorizontalGap: EComponentSize.SM | EComponentSize.MD;
}

/** Контекст Row, передающий размер отступа между колонками в Col. Внутренний модуль, не экспортируется через barrel. */
export const RowContext = React.createContext<IRowContext>({
    gridHorizontalGap: EComponentSize.SM,
});
