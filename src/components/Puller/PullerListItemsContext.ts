import { createContext } from "react";

/** Контекст PullerList для его элементов. Вне PullerList не задан. */
export interface IPullerListItemsContext {
    /** Идентификатор активного (подсвеченного с клавиатуры) элемента списка. */
    activeId: string | undefined;
}

export const PullerListItemsContext = createContext<IPullerListItemsContext | undefined>(undefined);
