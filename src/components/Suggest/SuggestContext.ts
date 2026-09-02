import React, { useContext } from "react";
import { ISuggestOption, ISuggestProps } from "./types";

/** Значение контекста Suggest. Доступно любому потомку через useSuggestContext. */
interface ISuggestContext<T extends ISuggestOption> extends Pick<
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
    /** Текущее значение поля ввода. Не совпадает с value.label, пока идёт фильтрация. */
    inputValue: string;
    /** Сеттер значения поля ввода. Не вызывает onFilter — для фильтрации используй onFilter. */
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    /** Идентификатор элемента списка, выделенного клавиатурой. Для aria-activedescendant. */
    activeDescendant: string | undefined;
    /** Сеттер идентификатора элемента списка, выделенного клавиатурой. */
    setActiveDescendant: React.Dispatch<React.SetStateAction<string | undefined>>;
    /** Выпадающий список открыт. */
    dropdownOpen: boolean;
    /** Сеттер видимости выпадающего списка. Не сбрасывает поле ввода — для закрытия используй closeDropdown. */
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    /** Закрывает выпадающий список и возвращает в поле ввода newInputValue либо label выбранного значения. */
    closeDropdown: (newInputValue?: string) => void;
    /** Идентификатор выпадающего списка. Для aria-controls на управляющем элементе. */
    dropdownListId: string;
    /** Ссылка на корневой элемент Suggest. Заполняется компонентом Suggest. */
    suggestRef: React.MutableRefObject<HTMLDivElement | null>;
    /** Ссылка на элемент выпадающего списка. Заполняет потребитель, чтобы клик по списку не считался внешним. */
    dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
}

/** Контекст компонента Suggest. */
// Тип опции задаёт потребитель через generic-параметр Suggest, а React.createContext generic-параметр
// не поддерживает. Сужение до ISuggestOption сломает Provider: колбэки (onSelect) контравариантны,
// и ISuggestContext<T> перестанет быть присваиваемым.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SuggestContext = React.createContext<ISuggestContext<any>>({
    value: undefined,
    options: [],
    inputValue: "",
    onSelect: () => {},
    onFilter: () => {},
    setInputValue: () => {},
    activeDescendant: undefined,
    setActiveDescendant: () => {},
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
