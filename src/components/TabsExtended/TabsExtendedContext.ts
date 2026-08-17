import React, { MutableRefObject } from "react";
import { ETabsExtendedType } from "./enums";

/** Значение контекста TabsExtended, общее для всех частей компонента. */
export interface ITabsExtendedContext {
    /** Массив id табов, передаваемых в Dropdown. */
    dropdownItemsIds: string[];
    /** Ref на TabsExtendedDropdownWrapper. */
    dropdownRef: MutableRefObject<HTMLDivElement | null>;
    /** Массив id табов, отрендеренных inline. */
    inlineItemsIds: string[];
    /** Обработчик выбора таба. */
    onSelectTab: (selectedId: string) => void;
    /** Id выбранного таба. */
    selectedId: string;
    /** Определяет id табов, передаваемых в Dropdown. */
    setDropdownItemsIds: (dropdownItemsIds: string[]) => void;
    /** Определяет id табов, отрендеренных inline. */
    setInlineItemsIds: (inlineItemsIds: string[]) => void;
    /** Тип компонента. */
    type: ETabsExtendedType;
}

const contextInitial: ITabsExtendedContext = {
    dropdownItemsIds: [],
    dropdownRef: { current: null },
    inlineItemsIds: [],
    onSelectTab: () => {},
    selectedId: "",
    setDropdownItemsIds: () => {},
    setInlineItemsIds: () => {},
    type: ETabsExtendedType.TYPE_1,
};

export const TabsExtendedContext = React.createContext<ITabsExtendedContext>(contextInitial);
