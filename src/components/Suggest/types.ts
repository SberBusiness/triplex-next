import React from "react";
import { IDropdownProps } from "../Dropdown/Dropdown";
import { EComponentSize } from "../../enums";

/** Свойства компонента Suggest. */
export interface ISuggestProps<T extends ISuggestOption = ISuggestOption>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    /** Выбранное значение. */
    value: T | undefined;
    /** Список значений. */
    options: T[];
    /** Размер. */
    size: EComponentSize;
    /** Текст подсказки. */
    placeholder?: string;
    /** Текст, отображаемый при отсутствии опций. */
    noOptionsText?: string;
    /** Флаг управления видимостью Tooltip. */
    tooltipOpen?: boolean;
    /** Флаг состояния загрузки. */
    loading?: boolean;
    /** Флаг состояния загрукзи DropdownList. */
    dropdownListLoading?: boolean;
    /** Определяет, нужно ли очищать поле ввода при получении фокуса. */
    clearInputOnFocus?: boolean;
    /** Обработчик выбора элемента из списка. */
    onSelect: (value: T | undefined) => void;
    /** Обработчик фильтрации значений. */
    onFilter: (value: string) => void;
    /** Обработчик окончания скролла списка (доступные в данный момент элементы закончились). */
    onScrollEnd?: () => void;
}

/** Свойства компонента SuggestTarget. */
export interface ISuggestTargetProps<T extends ISuggestOption = ISuggestOption>
    extends Pick<ISuggestProps<T>, "value" | "options" | "clearInputOnFocus" | "onSelect" | "onFilter">,
        Pick<React.HTMLAttributes<HTMLElement>, "aria-controls" | "aria-activedescendant"> {
    /** Значение поля ввода. */
    inputValue: string;
    /** Текущее состояние видимости выпадающего списка. */
    dropdownOpen: boolean;
    /** Выпадающий список отключен. */
    dropdownDisabled: boolean;
    /** Сеттер значения поля ввода. */
    setInputValue: (inputValue: string) => void;
    /** Сеттер состояния видимости выпадающего списка. */
    setDropdownOpen: (dropdownOpen: boolean) => void;
    /** Сеттер отключенности выпадающего списка. */
    setDropdownDisabled: (dropdownDisabled: boolean) => void;
}

/** Свойства компонента SuggestDesktopTarget. */
export interface ISuggestDesktopTargetProps<T extends ISuggestOption = ISuggestOption> extends ISuggestTargetProps<T> {}

/** Свойства компонента SuggestMobileTarget. */
export interface ISuggestMobileTargetProps<T extends ISuggestOption = ISuggestOption> extends ISuggestTargetProps<T> {}

/** Свойства, передаваемые в рендер-функцию SuggestTarget. */
export interface ISuggestTargetProvidedProps
    extends Pick<
            React.HTMLAttributes<HTMLElement>,
            "aria-controls" | "aria-activedescendant" | "onFocus" | "onBlur" | "onClick"
        >,
        Pick<ISuggestProps, "onFilter"> {
    /** Значение поля ввода. */
    inputValue: string;
    /** Текущее состояние видимости выпадающего списка. */
    dropdownOpen: boolean;
}

/** Свойства компонента SuggestDropdown. */
export interface ISuggestDropdownProps<T extends ISuggestOption = ISuggestOption>
    extends Omit<IDropdownProps, "onSelect">,
        Pick<
            ISuggestProps<T>,
            | "value"
            | "options"
            | "placeholder"
            | "noOptionsText"
            | "loading"
            | "clearInputOnFocus"
            | "onSelect"
            | "onFilter"
            | "onScrollEnd"
        > {
    /** Идентификатор DropdownList. */
    listId: string;
    /** Значение поля ввода. */
    inputValue: string;
}

/** Опция выпадающего списка Suggest. */
export interface ISuggestOption {
    /** Уникальный идентификатор. */
    id: string;
    /** Текст для отображения опции в списке и поле ввода. */
    label: string;
    /** Кастомное содержимое опции в списке. */
    content?: React.ReactNode;
}
