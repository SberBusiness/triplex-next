import React, { RefObject } from "react";

export interface ITabsExtendedContext {
    // Массив id табов, передаваемых в Dropdown.
    dropdownItemsIds: string[];
    // Ref на TabsExtendedDropdownWrapper.
    dropdownRef: RefObject<HTMLDivElement>;
    // Массив id табов, отрендереных inline.
    inlineItemsIds: string[];
    // Обработчик выбора таба.
    onSelectTab: (selectedId: string) => void;
    // Id выбранного таба.
    selectedId: string;
    // Определяет id табов, передаваемых в Dropdown.
    setDropdownItemsIds: (dropdownItemsIds: string[]) => void;
    // Определяет id табов, отрендереных inline.
    setInlineItemsIds: (inlineItemsIds: string[]) => void;
}

const contextInitial: ITabsExtendedContext = {
    dropdownItemsIds: [],
    dropdownRef: { current: null },
    inlineItemsIds: [],
    onSelectTab: () => {},
    selectedId: "",
    setDropdownItemsIds: () => {},
    setInlineItemsIds: () => {},
};

export const TabsExtendedContext = React.createContext<ITabsExtendedContext>(contextInitial);
