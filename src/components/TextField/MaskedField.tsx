import React from "react";
import {
    IFormFieldMaskedInputProps,
    FormFieldMaskedInput,
} from "@sberbusiness/triplex-next/components/FormField/components/FormFieldMaskedInput";
import { ITextFieldBaseProps, TextFieldBase } from "./TextFieldBase";

export interface IMaskedFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства поля ввода. */
    maskedInputProps: IFormFieldMaskedInputProps & { ref?: React.RefObject<HTMLInputElement> };
}
/** Компонент ввода с маской. */
export const MaskedField: React.FC<IMaskedFieldProps> = ({ maskedInputProps, ...textFieldProps }) => (
    <TextFieldBase {...textFieldProps}>
        <FormFieldMaskedInput {...maskedInputProps} />
    </TextFieldBase>
);

MaskedField.displayName = "MaskedField";
