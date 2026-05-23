import React from "react";

export interface IListItemContext {
    /** Элемент списка выбираемый. */
    selectable: boolean;
    /** Устанавливает значение selectable. */
    setSelectable: (selectable: boolean) => void;
    /** Элемент списка выбран. */
    selected: boolean;
    /** Устанавливает значение selected. */
    setSelected: (selected: boolean) => void;
}

/** Контекст компонента ListItem. */
export const ListItemContext = React.createContext<IListItemContext>({
    selectable: false,
    setSelectable: () => {},
    selected: false,
    setSelected: () => {},
});
