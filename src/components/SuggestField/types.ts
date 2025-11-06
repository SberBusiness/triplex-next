import React from "react";
import { TestProps } from "@sberbusiness/triplex-next/types/CoreTypes";
import {
    IFormFieldProps,
    IFormFieldInputProps,
    IFormFieldLabelProps,
    IFormFieldPostfixProps,
} from "@sberbusiness/triplex-next/components/FormField";
import { IDropdownDesktopProps } from "@sberbusiness/triplex-next/components/Dropdown";

/**
 * Функция установки рефа, generic.
 * @param instance Инстанс HTML элемента, для которого устанавливается реф.
 */
export type TSetRef<T> = (instance: T) => void;

/** Свойства компонента SuggestField. */
export interface ISuggestFieldProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IFormFieldProps, "value" | "size" | "onSelect">,
        Required<Pick<IFormFieldProps, "size">>,
        TestProps {
    /** Выбранное значение. */
    value: T | undefined;
    /** Список значений. */
    options: T[];
    /** Текст лейбла, который отображается над полем ввода. */
    label?: string;
    /** Текст подсказки, которая отображается в поле ввода когда оно пустое и не в фокусе. */
    placeholder?: string;
    /** Текст Tooltip. */
    tooltipHint: string;
    /** Флаг управления видимостью Tooltip. */
    tooltipOpen: boolean;
    /** Флаг состояния загрузки. */
    loading?: boolean;
    /** Флаг состояния загрузки DropdownList. */
    dropdownListLoading?: boolean;
    /** Определяет, нужно ли очищать поле ввода при получении фокуса. */
    clearInputOnFocus?: boolean;
    /** Обработчик выбора элемента из списка. */
    onSelect: (value: T | undefined) => void;
    /** Обработчик фильтрации значений. */
    onFilter: (value: string) => void;
    /** Обработчик окончания скролла списка (доступные в данный момент элементы закончились). */
    onScrollEnd?: () => void;
    /** Обработчик получения фокуса TargetInput. */
    onTargetInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик потери фокуса TargetInput. */
    onTargetInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Рендер-функция Target. */
    renderTarget?: (props: any) => JSX.Element;
    /** Рендер-функция TargetInput. */
    renderTargetInput?: (props: ISuggestFieldInputProvideProps) => JSX.Element;
    /** Рендер-функция TargetLabel. */
    renderTargetLabel?: (props: ISuggestFieldLabelProvideProps) => JSX.Element;
    /** Рендер-функция TargetPrefix. */
    renderTargetPrefix?: () => JSX.Element;
    /** Рендер-функция TargetPostfix. */
    renderTargetPostfix?: (props: ISuggestFieldTargetPostfixProvideProps) => JSX.Element;
    /** Рендер-функция DesktopDropdown. */
    renderDropdown?: (props: ISuggestFieldDropdownProps<T>) => JSX.Element;
    /** Рендер-функция DesktopDropdownListItem. */
    renderDropdownItem?: (props: ISuggestFieldDropdownItemProps<T>) => JSX.Element;
    /** Рендер-функция DesktopDropdownListItemLabel. */
    renderDropdownItemLabel?: (props: ISuggestFieldDropdownItemLabelProps<T>) => JSX.Element;
}

/**
 * Свойствo labelReactNode позволяет форматировать вывод option.
 *
 * @prop {React.ReactNode} [labelReactNode] Option в формате ReactNode.
 */
export interface ISuggestFieldOption {
    id: string;
    label: string;
    /** Отображается в списке options, при значении undefined в списке отображается label. */
    labelReactNode?: React.ReactNode;
}

/** Свойство компонента SuggestTarget. */
export interface ISuggestFieldTargetProps
    extends Omit<IFormFieldProps, "size">,
        Pick<ISuggestFieldProps, "size" | "label" | "placeholder" | "loading"> {
    /** Значение Input. */
    inputValue: string;
    /** Обработчик очищения значения. */
    onClear?: () => void;
    /** Обработчик получения фокуса Input. */
    onInputFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик потери фокуса Input. */
    onInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Обработчик изменения значения Input. */
    onInputChange?: (event: React.FocusEvent<HTMLInputElement>) => void;
    /** Рендер поля ввода. */
    renderInput?: (props: ISuggestFieldInputProvideProps) => JSX.Element;
    /** Рендер лейбла. */
    renderLabel?: (props: ISuggestFieldLabelProvideProps) => JSX.Element;
    /** Рендер префикса. */
    renderPrefix?: () => JSX.Element;
    /** Рендер постфикса. */
    renderPostfix?: (props: ISuggestFieldTargetPostfixProvideProps) => JSX.Element;
}

/** Свойство компонента SuggestFieldDropdown. */
export interface ISuggestFieldDropdownProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<IDropdownDesktopProps, "onSelect">,
        Pick<ISuggestFieldProps<T>, "value" | "options" | "onSelect"> {
    /** Состояние загрузки DropdownList. */
    listLoading?: boolean;
    /** Идентификатор DropdownList. */
    listId: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Рендер-функция для отображения элемента списка. */
    renderCustom?: (itemProps: ISuggestFieldDropdownProps<T>) => JSX.Element;
    /** Рендер-функция для отображения элемента списка. */
    renderDropdownItem: (itemProps: ISuggestFieldDropdownItemProps<T>) => JSX.Element;
    /** Рендер-функция для отображения лейбла элемента списка. */
    renderDropdownItemLabel?: (labelProps: ISuggestFieldDropdownItemLabelProps<T>) => JSX.Element;
    /** Ссылка на DOM элемент списка. */
    listRef?: React.RefObject<HTMLDivElement>;
    /** Css класс для выпадающего списка. */
    suggestDropdownListClassName: string;
    /** Css класс для элемента выпадающего списка. */
    suggestDropdownItemClassName: string;
}

/** Свойства компонента SuggestFieldDropdownItem. */
export interface ISuggestFieldDropdownItemProps<T> extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
    /** Объект опции. */
    option: T;
    /** Флаг состояния элемента (выбран/невыбран). */
    selected: boolean;
    /** Флаг состояния активности элемента (активным элемент становится при перемещении на него курсора). */
    active?: boolean;
    /** Ключ реакт элемента. */
    key: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Рендер-функция для отображения кастомного элемента списка. */
    renderCustom?: (itemProps: ISuggestFieldDropdownItemProps<T>) => JSX.Element;
    /** Рендер-функция для отображения лейбла элемента списка. */
    renderDropdownItemLabel?: (labelProps: ISuggestFieldDropdownItemLabelProps<T>) => JSX.Element;
    /** Обработчик выбора элемента. */
    onSelect: (option: T) => void;
}

/** Свойства компонента SuggestDropdownItemLabel. */
export interface ISuggestFieldDropdownItemLabelProps<T> {
    /** Объект опции. */
    option: T;
    /** Рендер-функция для отображения элемента списка. */
    renderCustom?: (labelProps: ISuggestFieldDropdownItemLabelProps<T>) => JSX.Element;
}

export interface ISuggestFieldInputProvideProps
    extends Pick<
        IFormFieldInputProps,
        "value" | "placeholder" | "aria-controls" | "aria-activedescendant" | "disabled" | "onChange"
    > {}

export interface ISuggestFieldLabelProvideProps extends Pick<IFormFieldLabelProps, "children"> {}

/** Свойства компонента SuggestFieldPostfix. */
export interface ISuggestFieldTargetPostfixProps
    extends IFormFieldPostfixProps,
        Pick<ISuggestFieldTargetProps, "size" | "loading" | "onClear"> {}

export interface ISuggestFieldTargetPostfixProvideProps
    extends Pick<ISuggestFieldTargetPostfixProps, "size" | "loading" | "onClear"> {}
