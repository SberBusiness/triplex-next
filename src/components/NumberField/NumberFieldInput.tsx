import React, { useCallback } from "react";
import { FormFieldInput, IFormFieldInputProps } from "../FormField";
import { getCaretPosition, setCaretPosition } from "@sberbusiness/triplex-next/utils/inputUtils";
import { StringUtils } from "@sberbusiness/triplex-next/utils/stringUtils";
import { AmountConst } from "@sberbusiness/triplex-next/consts/AmountConst";

/** Поле ввода компонента NumberField. */
export const NumberFieldInput = React.forwardRef<HTMLInputElement, IFormFieldInputProps>(
    ({ onChange, ...restProps }, ref) => {
        /** Функция, возвращающая отфильтрованное значение. */
        const getFilteredValue = useCallback((value: string, caret: number): string => {
            const buffer: string[] = [];
            const length = value.length;
            let separatorIndex = -1;

            for (let i = 0; i < length; i++) {
                if (StringUtils.isDigit(value[i])) {
                    buffer.push(value[i]);
                } else if (StringUtils.isDecimalSeparator(value[i])) {
                    if (separatorIndex == -1) {
                        buffer.push(AmountConst.DecimalComma);
                        separatorIndex = buffer.length - 1;
                    } else if (i > caret) {
                        buffer.push(AmountConst.DecimalComma);
                        buffer[separatorIndex] = "";
                        separatorIndex = buffer.length - 1;
                    }
                } else if (i === 0 && StringUtils.isUnaryMinus(value[i])) {
                    buffer.push("-");
                }
            }

            return buffer.join("");
        }, []);

        /** Обработчик изменения значения. */
        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const caret = getCaretPosition(event.target);
                const value = getFilteredValue(event.target.value, caret);
                const caretShift = value.length - event.target.value.length;

                event.target.value = value;

                setCaretPosition(event.target, caret + caretShift);

                onChange?.(event);
            },
            [getFilteredValue, onChange],
        );

        return <FormFieldInput onChange={handleChange} {...restProps} ref={ref} />;
    },
);
