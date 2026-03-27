import React from "react";
import { EComponentSize } from "../../enums/EComponentSize";
import { EFormFieldStatus } from "./enums";

export interface IFormFieldContext {
    /** Размер поля. */
    size: EComponentSize;
    /** Статус поля. */
    status: EFormFieldStatus;
    /** Идентификатор элемента ввода. */
    targetId: string | undefined;
    /** Идентификатор лейбла. */
    labelId: string | undefined;
    /** Ширина элемента FormFieldPrefix. */
    prefixWidth: number;
    /** Ширина элемента FormFieldPostfix. */
    postfixWidth: number;
    /** Поле заполнено. */
    filled: boolean;
    /** Поле в фокусе. */
    focused: boolean;
    /** Поле активно. */
    active: boolean;
    /** Установка значения targetId. */
    setTargetId: (targetId: string | undefined) => void;
    /** Установка значения labelId. */
    setLabelId: (labelId: string | undefined) => void;
    /** Установка значения postfixWidth. */
    setPostfixWidth: (postfixWidth: number) => void;
    /** Установка значения prefixWidth. */
    setPrefixWidth: (prefixWidth: number) => void;
    /** Установка значения filled. */
    setFilled: (filled: boolean) => void;
    /** Установка значения focused. */
    setFocused: (focused: boolean) => void;
}

export const initialFormFieldContext: IFormFieldContext = {
    size: EComponentSize.LG,
    status: EFormFieldStatus.DEFAULT,
    targetId: undefined,
    labelId: undefined,
    postfixWidth: 0,
    prefixWidth: 0,
    filled: false,
    focused: false,
    active: false,
    setTargetId: () => {},
    setLabelId: () => {},
    setPostfixWidth: () => {},
    setPrefixWidth: () => {},
    setFilled: () => {},
    setFocused: () => {},
};

/**
 * Контекст поля ввода.
 */
export const FormFieldContext = React.createContext<IFormFieldContext>(initialFormFieldContext);
