import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

export interface IMultiselectFieldContext {
    size: EComponentSize;
    mouseUsedRef: React.MutableRefObject<boolean>;
}

export const initialMultiselectFieldContext: IMultiselectFieldContext = {
    size: EComponentSize.MD,
    mouseUsedRef: { current: false },
};

export const MultiselectFieldContext = React.createContext<IMultiselectFieldContext>(initialMultiselectFieldContext);
