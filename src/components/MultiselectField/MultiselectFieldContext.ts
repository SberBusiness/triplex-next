import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export interface IMultiselectFieldContext {
    size: EComponentSize;
}

export const initialMultiselectFieldContext: IMultiselectFieldContext = {
    size: EComponentSize.MD,
};

export const MultiselectFieldContext = React.createContext<IMultiselectFieldContext>(initialMultiselectFieldContext);
