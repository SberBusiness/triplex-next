import { ISuggestFieldOption, ISuggestFieldProps } from "@sberbusiness/triplex-next/components/SuggestField/types";
import {
    IDropdownProps,
    IDropdownListProps,
    IDropdownListItemProps,
} from "@sberbusiness/triplex-next/components/Dropdown";

/** Свойства компонента SuggestFieldDesktop */
export interface ISuggestFieldDesktopProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends ISuggestFieldProps<T> {
    /** Рендер-функция компонента Dropdown. */
    renderDropdown?: (props: ISuggestFieldDesktopDropdownProps<T>) => JSX.Element;
    /** Рендер-функция компонента DropdownList. */
    renderDropdownList?: (props: ISuggestFieldDesktopDropdownListProvideProps) => JSX.Element;
    /** Рендер-функция компонента DropdownListItem. */
    renderDropdownListItem?: (props: ISuggestFieldDesktopDropdownListItemProvideProps) => JSX.Element;
}

/** Свойства компонента SuggestFieldDesktopDropdown. */
export interface ISuggestFieldDesktopDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IDropdownProps, "onSelect">,
        Pick<ISuggestFieldDesktopProps<T>, "value" | "options" | "onSelect">,
        Pick<IDropdownListProps, "listRef"> {
    /** Идентификатор DropdownList. */
    listId: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Состояние загрузки DropdownList. */
    listLoading?: boolean;
    /** Рендер-функция компонента DropdownList. */
    renderList?: (props: ISuggestFieldDesktopDropdownListProvideProps) => JSX.Element;
    /** Рендер-функция компонента DropdownListItem. */
    renderListItem?: (props: ISuggestFieldDesktopDropdownListItemProvideProps) => JSX.Element;
}

/** Свойства, передаваемые в рендер-функцию DropdownList. */
export interface ISuggestFieldDesktopDropdownListProvideProps
    extends Pick<IDropdownListProps, "children" | "id" | "size" | "dropdownOpened" | "loading" | "onMouseDown"> {}

/** Свойства, передаваемые в рендер-функцию DropdownListItem. */
export interface ISuggestFieldDesktopDropdownListItemProvideProps
    extends Pick<
        IDropdownListItemProps,
        "children" | "id" | "keyCodesForSelection" | "selected" | "onMouseDown" | "onSelect"
    > {}
