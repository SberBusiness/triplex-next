import React from "react";
import { IFormFieldInputProps } from "../FormField";
import { ITextFieldProps } from "../TextField";
import { IDropdownProps } from "../Dropdown";
import { IPullerProps } from "../Puller";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";

/** Свойства компонента SuggestField. */
export interface ISuggestFieldProps<T extends ISuggestFieldOption = ISuggestFieldOption>
    extends Omit<ITextFieldProps, "onSelect">, DataAttributes {
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
    /** Флаг состояния загрузки. */
    loading?: boolean;
    /** Флаг управления видимостью Tooltip. */
    tooltipOpen: boolean;
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
    /** Обработчик очистки поля. Кнопка очистки отображается, только если обработчик передан. */
    onClear?: React.MouseEventHandler<HTMLButtonElement>;
    /** Рендер-функция поля ввода. */
    renderInput?: (props: IFormFieldInputProps) => JSX.Element;
    /**
     * Свойства выпадающего списка.
     * `children`, `opened`, `setOpened`, `targetRef`, `size` и `onSelect` компонент задаёт сам.
     * На мобильной ширине применяются только `pullerProps`, `onOpen` и `onClose`: список открывается в шторке Puller.
     */
    dropdownProps?: ISuggestFieldDropdownProps;
}

/** Свойства выпадающего списка SuggestField. */
export interface ISuggestFieldDropdownProps extends Omit<
    IDropdownProps,
    "children" | "opened" | "setOpened" | "targetRef" | "size" | "onSelect" | "pullerProps"
> {
    /** Свойства шторки Puller на мобильной ширине. Содержимое и состояние открытия компонент задаёт сам. */
    pullerProps?: Omit<IPullerProps, "children" | "opened" | "setOpened" | "onSelect">;
}

/** Опция выпадающего списка SuggestField. */
export interface ISuggestFieldOption {
    /** Уникальный идентификатор опции. */
    id: string;
    /** Текст для отображения опции в списке и поле ввода. */
    label: string;
    /** Кастомное содержимое опции в списке. */
    content?: React.ReactNode;
    /** Флаг отображения значка новых уведомлений. */
    showNotificationIcon?: boolean;
}
