import React from "react";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EIslandType } from "../Island";

/** Значение контекста аккордеона: оформление, которое IslandAccordion раздаёт своим элементам. */
export interface IIslandAccordionContext {
    /** Размер элементов аккордеона. */
    size: EComponentSize;
    /** Визуальный тип острова, на котором построен элемент. */
    type: EIslandType;
}

/** Значение контекста по умолчанию — используется, если элемент отрендерен вне IslandAccordion. */
export const initialIslandAccordionContext: IIslandAccordionContext = {
    size: EComponentSize.MD,
    type: EIslandType.TYPE_1,
};

/** Контекст, через который IslandAccordion передаёт size и type своим элементам. */
export const IslandAccordionContext = React.createContext<IIslandAccordionContext>(initialIslandAccordionContext);
