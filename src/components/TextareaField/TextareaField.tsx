import React from "react";
import { ITextareaFieldProps } from "./types";
import { TextFieldBase } from "../TextField/TextFieldBase";
import { FormFieldTextarea } from "../FormField";

/**
 * Многострочное текстовое поле для ввода большого объема текста.
 * Отличается от TextField элементом ввода — вместо input используется FormFieldTextarea.
 */
export const TextareaField = React.forwardRef<HTMLDivElement, ITextareaFieldProps>(
    ({ textareaProps, ...restProps }, ref) => (
        <TextFieldBase {...restProps} ref={ref}>
            <FormFieldTextarea {...textareaProps} />
        </TextFieldBase>
    ),
);

TextareaField.displayName = "TextareaField";
