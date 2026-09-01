import React, { useRef, useLayoutEffect, useMemo } from "react";
import clsx from "clsx";
import { TextFieldBase, ITextFieldBaseProps } from "../TextField/TextFieldBase";
import { FormFieldInput, IFormFieldInputProps, EFormFieldStatus } from "../FormField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { AmountBaseInputCore } from "./AmountBaseInputCore";
import { setCaretPosition, createSizeToClassNameMap } from "../../utils";
import { createPlaceholder, setFallbackCaret } from "./utils";
import { EComponentSize } from "../../enums";
import styles from "./styles/AmountField.module.less";

/** Свойства компонента AmountField. */
export interface IAmountFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства поля ввода. */
    inputProps: Omit<IFormFieldInputProps, "type" | "maxLength" | "onChange" | "inputMode" | "autoComplete"> & {
        /** Значение. */
        value: string;
        /** Обработчик изменения значения. */
        onChange: (value: string) => void;
        /** Ссылка на HTML-элемент поля ввода. */
        ref?: React.Ref<HTMLInputElement>;
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

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

export const AmountField = React.forwardRef<HTMLDivElement, IAmountFieldProps>(
    (
        {
            size = EComponentSize.LG,
            postfix,
            inputProps,
            currency,
            maxIntegerDigits = 16,
            fractionDigits = 2,
            onClear,
            ...restProps
        },
        ref,
    ) => {
        const { status, "data-test-id": dataTestId } = restProps;
        const placeholder = inputProps.placeholder || createPlaceholder(fractionDigits);

        const inputRef = useRef<HTMLInputElement | null>(null);
        const core = useRef<AmountBaseInputCore>();
        if (core.current === undefined) core.current = new AmountBaseInputCore(maxIntegerDigits, fractionDigits);

        useLayoutEffect(() => {
            if (core.current && inputRef.current == document.activeElement)
                setCaretPosition(inputRef.current, Math.max(core.current.caret, 0));
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

        const formattedValue = getFormattedValue();

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

        const mergedInputRef = useMemo(() => {
            const externalRef = inputProps.ref;

            if (externalRef === undefined) {
                return (instance: HTMLInputElement | null) => {
                    inputRef.current = instance;
                };
            }

            return (instance: HTMLInputElement | null) => {
                inputRef.current = instance;
                if (typeof externalRef === "function") {
                    externalRef(instance);
                } else {
                    (externalRef as React.MutableRefObject<HTMLInputElement | null>).current = instance;
                }
            };
        }, [inputProps.ref]);

        const renderPostfix = () => {
            if (onClear !== undefined) {
                return (
                    <>
                        <FormFieldClear onClick={onClear} />
                        {postfix}
                    </>
                );
            }
            return postfix;
        };

        const showCurrency = currency !== undefined && formattedValue.length > 0;

        return (
            <TextFieldBase size={size} postfix={renderPostfix()} {...restProps} ref={ref}>
                <div className={styles.amountFieldInputWrapper}>
                    {showCurrency && (
                        <div className={clsx(styles.currencyLayout, SIZE_TO_CLASS_NAME_MAP[size])}>
                            <span className={styles.valueMirror} aria-hidden="true">
                                {`${formattedValue} `}
                            </span>
                            <span
                                className={clsx(styles.currencyUnit, {
                                    [styles.disabled]: status === EFormFieldStatus.DISABLED,
                                })}
                                data-test-id={dataTestId && `${dataTestId}__unit`}
                            >
                                {currency}
                            </span>
                        </div>
                    )}
                    <FormFieldInput
                        {...inputProps}
                        value={formattedValue}
                        placeholder={placeholder}
                        autoComplete="off"
                        inputMode="decimal"
                        data-test-id={dataTestId && `${dataTestId}__input`}
                        onKeyDown={handleKeyDown}
                        onSelect={handleSelect}
                        onChange={handleChange}
                        ref={mergedInputRef}
                    />
                </div>
            </TextFieldBase>
        );
    },
);
