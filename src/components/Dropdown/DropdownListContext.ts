import { createContext } from "react";

/** Контекст вложенного списка. */
export interface IDropdownListContext {
    /** Текущий активный элемент (его идентификатор). */
    activeDescendant: string | undefined;
    /** Установить текущий активный элемент (его идентификатор). */
    setActiveDescendant: (id?: string) => void;
}

export const DropdownListContext = createContext<IDropdownListContext>({
    activeDescendant: undefined,
    setActiveDescendant: () => {},
});
