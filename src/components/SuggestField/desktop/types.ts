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
    renderDropdownList?: (props: ISuggestFieldDesktopDropdownListProps<T>) => JSX.Element;
    /** Рендер-функция компонента DropdownListItem. */
    renderDropdownListItem?: (props: ISuggestFieldDesktopDropdownListItemProps<T>) => JSX.Element;
}

/** Свойство компонента SuggestFieldDesktopDropdown. */
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
    renderList?: (props: ISuggestFieldDesktopDropdownListProps<T>) => JSX.Element;
    /** Рендер-функция компонента DropdownListItem. */
    renderListItem?: (props: ISuggestFieldDesktopDropdownListItemProps<T>) => JSX.Element;
}

/** Свойства компонента SuggestFieldDesktopDropdownList. */
export interface ISuggestFieldDesktopDropdownListProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IDropdownListProps, "onSelect">,
        Pick<ISuggestFieldDesktopProps<T>, "value" | "options" | "onSelect"> {
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Рендер-функция компонента DropdownListItem. */
    renderItem?: (props: ISuggestFieldDesktopDropdownListItemProps<T>) => JSX.Element;
}

/** Свойства компонента SuggestFieldDesktopDropdownListItem. */
export interface ISuggestFieldDesktopDropdownListItemProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IDropdownListItemProps, "onSelect"> {
    /** Объект опции. */
    option: T;
    /** Флаг состояния элемента (выбран/невыбран). */
    selected: boolean;
    /** Флаг состояния активности элемента (активным элемент становится при перемещении на него курсора). */
    active?: boolean;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Обработчик выбора элемента. */
    onSelect: (value: T) => void;
}
