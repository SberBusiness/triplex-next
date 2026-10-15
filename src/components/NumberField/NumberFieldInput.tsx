import React, { useCallback } from "react";
import { FormFieldInput, IFormFieldInputProps } from "../FormField";
import { getCaretPosition, setCaretPosition } from "@sberbusiness/triplex-next/utils/inputUtils";
import { StringUtils } from "@sberbusiness/triplex-next/utils/stringUtils";
import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";

/**
 * Оставляет в строке цифры, ведущий минус и одну десятичную запятую (точка заменяется запятой).
 * При повторном разделителе сохраняется тот, что стоит правее каретки.
 * Каретка сдвигается только на символы, удалённые левее неё.
 */
const filterValue = (value: string, caret: number): { value: string; caret: number } => {
    /** Символы результата по позициям исходной строки; пустая строка — символ удалён. */
    const buffer: string[] = [];
    let separatorIndex = -1;

    for (let i = 0; i < value.length; i++) {
        const char = value[i];

        if (StringUtils.isDigit(char)) {
            buffer.push(char);
        } else if (StringUtils.isDecimalSeparator(char) && (separatorIndex === -1 || i > caret)) {
            if (separatorIndex !== -1) {
                buffer[separatorIndex] = "";
            }
            buffer.push(AmountConst.DecimalComma);
            separatorIndex = i;
        } else if (i === 0 && StringUtils.isUnaryMinus(char)) {
            buffer.push("-");
        } else {
            buffer.push("");
        }
    }

    return { value: buffer.join(""), caret: buffer.slice(0, caret).join("").length };
};

/** Поле ввода компонента NumberField. */
export const NumberFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>(
    ({ onChange, ...restProps }, ref) => {
        /** Обработчик изменения значения. */
        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const { value, caret } = filterValue(event.target.value, getCaretPosition(event.target));

                event.target.value = value;

                setCaretPosition(event.target, caret);

                onChange?.(event);
            },
            [onChange],
        );

        return <FormFieldInput onChange={handleChange} {...restProps} ref={ref} />;
    },
);

NumberFieldInput.displayName = "NumberFieldInput";
