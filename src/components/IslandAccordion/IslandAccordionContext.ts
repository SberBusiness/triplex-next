import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EIslandType } from "../Island";

export interface IIslandAccordionContext {
    size: EComponentSize;
    type: EIslandType;
}

export const initialIslandAccordionContext: IIslandAccordionContext = {
    size: EComponentSize.MD,
    type: EIslandType.TYPE_1,
};

export const IslandAccordionContext = React.createContext<IIslandAccordionContext>(initialIslandAccordionContext);
