import React, { useContext } from "react";
import { ISuggestOption, ISuggestProps } from "./types";

/** Свойства контекста Suggest. */
interface ISuggestContext<T extends ISuggestOption>
    extends Pick<
        ISuggestProps<T>,
        | "value"
        | "options"
        | "placeholder"
        | "noOptionsText"
        | "loading"
        | "dropdownListLoading"
        | "tooltipOpen"
        | "clearInputOnFocus"
        | "onSelect"
        | "onFilter"
        | "onScrollEnd"
    > {
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    activeDescendant: string | undefined;
    dropdownOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeDropdown: (newInputValue?: string) => void;
    dropdownListId: string;
    suggestRef: React.MutableRefObject<HTMLDivElement | null>;
    dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}

/** Контекст компонента SuggestContext. */
export const SuggestContext = React.createContext<ISuggestContext<any>>({
    value: undefined,
    options: [],
    inputValue: "",
    onSelect: () => {},
    onFilter: () => {},
    setInputValue: () => {},
    activeDescendant: undefined,
    dropdownOpen: false,
    setDropdownOpen: () => {},
    closeDropdown: () => {},
    dropdownListId: "",
    suggestRef: { current: null },
    dropdownRef: { current: null },
});

/** Хук для получения контекста Suggest. */
export const useSuggestContext = <T extends ISuggestOption>() => {
    const context = useContext(SuggestContext);

    return context as ISuggestContext<T>;
};
