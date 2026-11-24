import React from "react";

/** Значение контекста описания поля ввода. */
export interface IFormFieldDescriptionContext {
    /** Сообщает описанию о наличии счётчика символов (FormFieldCounter). */
    setWithCounter: (withCounter: boolean) => void;
}

/** Значение контекста по умолчанию — используется вне FormFieldDescription. */
export const initialFormFieldDescriptionContext: IFormFieldDescriptionContext = {
    setWithCounter: () => {},
};

/**
 * Контекст описания поля ввода.
 */
export const FormFieldDescriptionContext = React.createContext<IFormFieldDescriptionContext>(
    initialFormFieldDescriptionContext,
);
