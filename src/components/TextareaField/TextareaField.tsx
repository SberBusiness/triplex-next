import React from "react";
import { ITextareaFieldProps } from "./types";
import { TextFieldBase } from "../TextField/TextFieldBase";
import { FormFieldTextarea } from "../FormField";

/** Многострочное текстовое поле для ввода большого объема текста. */
export const TextareaField: React.FC<ITextareaFieldProps> = ({ textareaProps, ...restProps }) => (
    <TextFieldBase {...restProps}>
        <FormFieldTextarea {...textareaProps} />
    </TextFieldBase>
);
