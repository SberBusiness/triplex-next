import React from "react";
import {
    IFormFieldProps,
    IFormFieldInputProps,
    IFormFieldLabelProps,
    IFormFieldPostfixProps,
} from "@sberbusiness/triplex-next/components/FormField";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SuggestField. */
export interface ISuggestFieldProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
        Required<Pick<IFormFieldProps, "size" | "status">>,
        DataAttributes {
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
    renderTarget?: (props: ISuggestFieldTargetProps) => JSX.Element;
    /** Рендер-функция TargetInput. */
    renderTargetInput?: (props: ISuggestFieldInputProvideProps) => JSX.Element;
    /** Рендер-функция TargetLabel. */
    renderTargetLabel?: (props: ISuggestFieldLabelProvideProps) => JSX.Element;
    /** Рендер-функция TargetPrefix. */
    renderTargetPrefix?: () => JSX.Element;
    /** Рендер-функция TargetPostfix. */
    renderTargetPostfix?: (props: ISuggestFieldTargetPostfixProvideProps) => JSX.Element;
}

/** Опция выпадающего списка SuggestField. */
export interface ISuggestFieldOption {
    /** Уникальный идентификатор опции. */
    id: string;
    /** Текст для отображения опции в списке и поле ввода. */
    label: string;
    /** Кастомное содержимое опции в списке. */
    content?: React.ReactNode;
}

/** Свойство компонента SuggestFieldTarget. */
export interface ISuggestFieldTargetProps
    extends React.HTMLAttributes<HTMLElement>,
        Pick<ISuggestFieldProps, "size" | "status" | "label" | "placeholder" | "loading">,
        Pick<ISuggestFieldTargetPostfixProps, "onClear"> {
    /** Значение поля ввода. */
    inputValue: string;
    /** Идентификатор для тестирования. */
    dataTestId?: string;
    /** Dropdown открыт. */
    dropdownOpen: boolean;
    /** Рендер поля ввода. */
    renderInput?: (props: ISuggestFieldInputProvideProps) => JSX.Element;
    /** Рендер лейбла. */
    renderLabel?: (props: ISuggestFieldLabelProvideProps) => JSX.Element;
    /** Рендер префикса. */
    renderPrefix?: () => JSX.Element;
    /** Рендер постфикса. */
    renderPostfix?: (props: ISuggestFieldTargetPostfixProvideProps) => JSX.Element;
}

/** Свойства, передаваемые в рендер-функцию TargetInput. */
export interface ISuggestFieldInputProvideProps
    extends Pick<
        IFormFieldInputProps,
        "value" | "placeholder" | "aria-controls" | "aria-activedescendant" | "disabled" | "onChange"
    > {}

/** Свойства, передаваемые в рендер-функцию TargetLabel. */
export interface ISuggestFieldLabelProvideProps extends Pick<IFormFieldLabelProps, "children"> {}

/** Свойства компонента SuggestFieldPostfix. */
export interface ISuggestFieldTargetPostfixProps
    extends IFormFieldPostfixProps,
        Pick<ISuggestFieldProps, "size" | "loading"> {
    /** Обработчик очищения значения. */
    onClear?: () => void;
}

/** Свойства, передаваемые в рендер-функцию TargetPostfix. */
export interface ISuggestFieldTargetPostfixProvideProps
    extends Pick<ISuggestFieldTargetPostfixProps, "size" | "loading" | "onClear"> {}
