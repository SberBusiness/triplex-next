import React from "react";

/** Значение контекста описания поля ввода. */
export interface IFormFieldDescriptionContext {
    /** Описание содержит счетчик символов (FormFieldCounter). */
    withCounter: boolean;
    /** Установка значения withCounter. */
    setWithCounter: (withCounter: boolean) => void;
}

/** Значение контекста по умолчанию — используется вне FormFieldDescription. */
export const initialFormFieldDescriptionContext: IFormFieldDescriptionContext = {
    withCounter: false,
    setWithCounter: () => {},
};

/**
 * Контекст описания поля ввода.
 */
export const FormFieldDescriptionContext = React.createContext<IFormFieldDescriptionContext>(
    initialFormFieldDescriptionContext,
);
