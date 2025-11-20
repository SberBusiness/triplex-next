import React from "react";
import { INumberFieldProps } from "@sberbusiness/triplex-next/components/NumberField/types";
import { NumberFieldInput } from "@sberbusiness/triplex-next/components/NumberField/NumberFieldInput";
import { TextFieldBase } from "@sberbusiness/triplex-next/components/TextField/TextFieldBase";

/** Компонент для ввода числовых значений. */
export const NumberField: React.FC<INumberFieldProps> = ({ inputProps, ...restProps }) => (
    <TextFieldBase {...restProps}>
        <NumberFieldInput {...inputProps} />
    </TextFieldBase>
);
