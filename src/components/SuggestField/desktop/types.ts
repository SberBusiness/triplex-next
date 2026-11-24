import type React from "react";
import { ISuggestFieldOption, ISuggestFieldProps } from "../types";
import { IDropdownDesktopProps, IDropdownListProps, IDropdownListItemProps } from "../../Dropdown";

/** Свойства компонента SuggestFieldDesktop */
export interface ISuggestFieldDesktopProps<
    T extends ISuggestFieldOption = ISuggestFieldOption,
> extends ISuggestFieldProps<T> {
    /** Рендер-функция компонента Dropdown. */
    renderDropdown?: (props: ISuggestFieldDesktopDropdownProps<T>) => React.ReactElement;
    /** Рендер-функция компонента DropdownList. */
    renderDropdownList?: (props: ISuggestFieldDesktopDropdownListProvideProps) => React.ReactElement;
    /** Рендер-функция компонента DropdownListItem. */
    renderDropdownListItem?: (props: ISuggestFieldDesktopDropdownListItemProvideProps) => React.ReactElement;
}

/** Свойства компонента SuggestFieldDesktopDropdown. */
export interface ISuggestFieldDesktopDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends
        Omit<IDropdownDesktopProps, "onSelect" | "onScrollEnd">,
        Pick<ISuggestFieldDesktopProps<T>, "value" | "options" | "onSelect" | "onScrollEnd"> {
    /** Идентификатор DropdownList. */
    listId: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Состояние загрузки DropdownList. */
    listLoading?: boolean;
    /** Рендер-функция компонента DropdownList. */
    renderList?: (props: ISuggestFieldDesktopDropdownListProvideProps) => React.ReactElement;
    /** Рендер-функция компонента DropdownListItem. */
    renderListItem?: (props: ISuggestFieldDesktopDropdownListItemProvideProps) => React.ReactElement;
}

/** Свойства, передаваемые в рендер-функцию DropdownList. */
export interface ISuggestFieldDesktopDropdownListProvideProps extends Pick<
    IDropdownListProps,
    "children" | "id" | "size" | "dropdownOpened" | "loading" | "onMouseDown" | "onScroll"
> {}

/** Свойства, передаваемые в рендер-функцию DropdownListItem. */
export interface ISuggestFieldDesktopDropdownListItemProvideProps extends Pick<
    IDropdownListItemProps,
    | "children"
    | "id"
    | "data-test-id"
    | "keyCodesForSelection"
    | "selected"
    | "onMouseDown"
    | "onSelect"
    | "showNotificationIcon"
> {}
