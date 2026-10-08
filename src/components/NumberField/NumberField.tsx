import React from "react";
import { INumberFieldProps } from "./types";
import { NumberFieldInput } from "./NumberFieldInput";
import { TextFieldBase } from "../TextField/TextFieldBase";

/**
 * Текстовое поле для ввода числовых значений: фильтрует ввод, сохраняя цифры, ведущий минус и десятичную запятую.
 * Передаёт ref на контейнер FormField, а inputProps.ref — на вложенный input.
 */
export const NumberField = React.forwardRef<HTMLDivElement, INumberFieldProps>(({ inputProps, ...restProps }, ref) => (
    <TextFieldBase {...restProps} ref={ref}>
        <NumberFieldInput {...inputProps} />
    </TextFieldBase>
));

NumberField.displayName = "NumberField";
