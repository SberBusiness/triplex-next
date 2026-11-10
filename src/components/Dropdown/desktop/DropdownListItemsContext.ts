import { createContext } from "react";
import { EComponentSize } from "../../../enums/EComponentSize";

/** Контекст DropdownList для его элементов. Вне DropdownList не задан. */
export interface IDropdownListItemsContext {
    /** Идентификатор активного элемента списка. */
    activeId: string | undefined;
    /** Сделать элемент активным; undefined снимает активность. */
    setActiveId: (id: string | undefined) => void;
    /** Размер списка. */
    size: EComponentSize;
}

export const DropdownListItemsContext = createContext<IDropdownListItemsContext | undefined>(undefined);
