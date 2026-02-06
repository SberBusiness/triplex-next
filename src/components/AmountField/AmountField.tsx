import React, { useLayoutEffect, useRef } from "react";
import { TextFieldBase, ITextFieldBaseProps } from "../TextField/TextFieldBase";
import { FormFieldInput, IFormFieldInputProps, EFormFieldStatus } from "../FormField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { Text, ETextSize, EFontType } from "../Typography";
import { AmountBaseInputCore } from "./AmountBaseInputCore";
import { setCaretPosition } from "../../utils/inputUtils";
import { createPlaceholder, setFallbackCaret } from "./utils";

export interface IAmountFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства поля ввода. */
    inputProps: Omit<IFormFieldInputProps, "type" | "maxLength" | "onChange" | "inputMode" | "autoComplete"> & {
        /** Значение. */
        value: string;
        /** Обработчик изменения значения. */
        onChange: (value: string) => void;
    };
    /** Наименование валюты. */
    currency?: string;
    /** Максимальное количество знаков перед запятой. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. */
    fractionDigits?: number;
    /** Обработчик очищения значения. */
    onClear?: () => void;
}

export const AmountField = React.forwardRef<HTMLInputElement, IAmountFieldProps>(
    ({ inputProps, currency, postfix, maxIntegerDigits = 16, fractionDigits = 2, onClear, ...restProps }, ref) => {
        const { status, "data-test-id": dataTestId } = restProps;
        const placeholder = inputProps.placeholder || createPlaceholder(fractionDigits);

        const refInput = useRef<HTMLInputElement | null>(null);
        const core = useRef<AmountBaseInputCore>();
        if (core.current === undefined) core.current = new AmountBaseInputCore(maxIntegerDigits, fractionDigits);

        useLayoutEffect(() => {
            if (core.current && refInput.current == document.activeElement)
                setCaretPosition(refInput.current, Math.max(core.current.caret, 0));
        }, [inputProps.value]);

        /** Функция, возвращающая отформатированное значение. */
        const getFormattedValue = () => {
            if (!core.current) return "";

            if (
                inputProps.value != core.current.value ||
                maxIntegerDigits != core.current.maxIntegerDigits ||
                fractionDigits != core.current.fractionDigits
            ) {
                core.current.maxIntegerDigits = maxIntegerDigits;
                core.current.fractionDigits = fractionDigits;
                core.current.apply(inputProps.value, inputProps.value.length);
            }

            core.current.cache.formattedValue = core.current.formattedValue;

            return core.current.formattedValue;
        };

        /** Обработчик изменения значения. */
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!core.current) return;

            const caret = event.target.selectionStart ?? event.target.value.length;

            core.current.apply(event.target.value, caret);

            setFallbackCaret(event.target, core.current, fractionDigits);

            inputProps.onChange(core.current.value);
        };

        /** Обработчик нажатия клавиши. */
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (!core.current) return;

            core.current.cache.key = event.key;

            inputProps.onKeyDown?.(event);
        };

        /** Обработчик выбора текста. */
        const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
            if (!core.current) return;

            core.current.cache.key = "";
            core.current.cache.selectionStart = event.currentTarget.selectionStart;
            core.current.cache.selectionEnd = event.currentTarget.selectionEnd;
            core.current.cache.selectionDirection = event.currentTarget.selectionDirection;

            inputProps.onSelect?.(event);
        };

        /** Функция для хранения ссылки. */
        const setRef = (instance: HTMLInputElement | null) => {
            refInput.current = instance;

            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <TextFieldBase
                postfix={
                    <React.Fragment>
                        {onClear !== undefined && <FormFieldClear onClick={onClear} />}
                        {currency !== undefined && (
                            <Text
                                size={ETextSize.B2}
                                type={status !== EFormFieldStatus.DISABLED ? EFontType.SECONDARY : EFontType.DISABLED}
                                data-test-id={dataTestId && `${dataTestId}__unit`}
                            >
                                {currency}
                            </Text>
                        )}
                        {postfix}
                    </React.Fragment>
                }
                {...restProps}
            >
                <FormFieldInput
                    {...inputProps}
                    // eslint-disable-next-line react-hooks/refs
                    value={getFormattedValue()}
                    placeholder={placeholder}
                    autoComplete="off"
                    inputMode="decimal"
                    data-test-id={dataTestId && `${dataTestId}__input`}
                    onKeyDown={handleKeyDown}
                    onSelect={handleSelect}
                    onChange={handleChange}
                    ref={setRef}
                />
            </TextFieldBase>
        );
    },
);
