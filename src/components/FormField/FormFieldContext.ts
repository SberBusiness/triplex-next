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
    setTargetId: React.Dispatch<React.SetStateAction<string | undefined>>;
    /** Установка значения labelId. */
    setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
    /** Установка значения postfixWidth. */
    setPostfixWidth: React.Dispatch<React.SetStateAction<number>>;
    /** Установка значения prefixWidth. */
    setPrefixWidth: React.Dispatch<React.SetStateAction<number>>;
    /** Установка значения filled. */
    setFilled: React.Dispatch<React.SetStateAction<boolean>>;
    /** Установка значения focused. */
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
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
