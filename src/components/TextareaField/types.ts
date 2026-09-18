import React from "react";
import { ITextFieldBaseProps } from "../TextField/TextFieldBase";
import { IFormFieldTextareaProps } from "../FormField";
import { DataAttributes } from "../../types/CoreTypes";

/** Свойства компонента TextareaField. */
export interface ITextareaFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /**
     * Свойства компонента FormFieldTextarea — атрибуты textarea, data-атрибуты
     * и `ref` на сам элемент `<textarea>`.
     */
    textareaProps: IFormFieldTextareaProps & DataAttributes & React.RefAttributes<HTMLTextAreaElement>;
}
