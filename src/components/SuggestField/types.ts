import React from "react";
import { IFormFieldInputProps } from "../FormField";
import { ITextFieldProps } from "../TextField";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SuggestField. */
export interface ISuggestFieldProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<ITextFieldProps, "onSelect">,
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
    /** Обработчик отчиски поля. */
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    /** Рендер-функция поля ввода. */
    renderInput?: (props: IFormFieldInputProps) => JSX.Element;
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
