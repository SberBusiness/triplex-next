import React, { useLayoutEffect, useRef } from "react";
import { FormGroup } from "@sberbusiness/triplex-next/components/FormGroup/FormGroup";
import { FormField, IFormFieldProps } from "@sberbusiness/triplex-next/components/FormField/FormField";
import { FormFieldDescription } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldDescription";
import { FormFieldLabel } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldLabel";
import { FormFieldPostfix } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldPostfix";
import { FormFieldClear } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldClear";
import {
    FormFieldInput,
    IFormFieldInputProps,
} from "@sberbusiness/triplex-next/components/FormField/components/FormFieldInput";
import styles from "./styles/AmountField.module.less";
import { AmountBaseInputCore } from "./AmountBaseInputCore";
import { setCaretPosition } from "@sberbusiness/triplex-next/utils/inputUtils";
import { createPlaceholder, setFallbackCaret } from "./utils";

export interface IAmountFieldProps extends IFormFieldProps {
    /** Свойства поля ввода. */
    inputProps: Omit<IFormFieldInputProps, "type" | "maxLength" | "onChange" | "inputMode" | "autoComplete"> & {
        /** Значение. */
        value: string;
        /** Обработчик изменения значения. */
        onChange: (value: string) => void;
    };
    /** Валюта. */
    currency?: string;
    /** Лейбл поля ввода. */
    label?: React.ReactNode;
    /** Максимальное количество знаков перед запятой. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. */
    fractionDigits?: number;
    /** Постфикс поля ввода. */
    postfix?: React.ReactNode;
    /** Описание поля ввода. */
    description?: React.ReactNode;
    "data-test-id"?: string;
}

export const AmountField = React.forwardRef<HTMLInputElement, IAmountFieldProps>(
    (
        {
            label,
            description,
            currency,
            postfix,
            inputProps,
            maxIntegerDigits = 16,
            fractionDigits = 2,
            ...formFieldProps
        },
        ref,
    ) => {
        const dataTestId = formFieldProps["data-test-id"];
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

        /** Обработчик очистки текста */
        const handleClear = () => {
            if (!core.current || !refInput.current) return;

            core.current.apply("", 0);

            setFallbackCaret(refInput.current, core.current, fractionDigits);

            inputProps.onChange(core.current.value);
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
            <FormGroup>
                <FormField {...formFieldProps}>
                    {label ? <FormFieldLabel>{label}</FormFieldLabel> : null}
                    <FormFieldInput
                        {...inputProps}
                        ref={setRef}
                        // eslint-disable-next-line react-hooks/refs
                        value={getFormattedValue()}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onSelect={handleSelect}
                        autoComplete="off"
                        inputMode="decimal"
                        data-test-id={dataTestId && `${dataTestId}__input`}
                        placeholder={placeholder}
                    />
                    <FormFieldPostfix>
                        <FormFieldClear onClick={handleClear} />
                        {currency ? (
                            <span className={styles.currency} data-test-id={dataTestId && `${dataTestId}__unit`}>
                                {currency}
                            </span>
                        ) : null}
                        {postfix ? postfix : null}
                    </FormFieldPostfix>
                </FormField>
                {description ? <FormFieldDescription>{description}</FormFieldDescription> : null}
            </FormGroup>
        );
    },
);
