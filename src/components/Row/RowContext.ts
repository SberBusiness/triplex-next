import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";

export interface IRowContext {
    gridHorizontalGap: EComponentSize.SM | EComponentSize.MD;
}

export const RowContext = React.createContext<IRowContext>({
    gridHorizontalGap: EComponentSize.SM,
});
