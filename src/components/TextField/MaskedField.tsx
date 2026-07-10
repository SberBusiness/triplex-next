import React from "react";
import { FormFieldMaskedInput, IFormFieldMaskedInputProps } from "../FormField/components/FormFieldMaskedInput";
import { ITextFieldBaseProps, TextFieldBase } from "./TextFieldBase";

/** Свойства компонента MaskedField. */
export interface IMaskedFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства поля ввода. */
    maskedInputProps: IFormFieldMaskedInputProps & { ref?: React.RefObject<HTMLInputElement> };
}

/** Компонент ввода с маской. */
export const MaskedField = React.forwardRef<HTMLDivElement, IMaskedFieldProps>(
    ({ maskedInputProps, ...restProps }, ref) => (
        <TextFieldBase {...restProps} ref={ref}>
            <FormFieldMaskedInput {...maskedInputProps} />
        </TextFieldBase>
    ),
);

MaskedField.displayName = "MaskedField";
