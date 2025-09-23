import React from "react";

export interface IListItemContext {
    // Элемент списка выбран.
    selected: boolean;
    // Устанавливает значение selected.
    setSelected: (selected: boolean) => void;
}

/** Контекст компонента ListItem. */
export const ListItemContext = React.createContext<IListItemContext>({
    selected: false,
    setSelected: () => {},
});
