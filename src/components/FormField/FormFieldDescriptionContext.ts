import React from "react";

export interface IFormFieldDescriptionContext {
    // Поле имеет счетчик символов.
    withCounter: boolean;
    // Установка значения withCounter.
    setWithCounter: (withCounter: boolean) => void;
}

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
