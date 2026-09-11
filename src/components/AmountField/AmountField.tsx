import React, { useRef, useLayoutEffect, useCallback } from "react";
import clsx from "clsx";
import { TextFieldBase, ITextFieldBaseProps } from "../TextField/TextFieldBase";
import { FormFieldInput, IFormFieldInputProps, EFormFieldStatus } from "../FormField";
import { FormFieldClear } from "../FormField/components/FormFieldClear";
import { AmountBaseInputCore } from "./AmountBaseInputCore";
import { setCaretPosition, createSizeToClassNameMap } from "../../utils";
import { createPlaceholder, syncCoreAndGetFormattedValue, setFallbackCaret, setForwardedRef } from "./utils";
import { EComponentSize } from "../../enums";
import styles from "./styles/AmountField.module.less";

/** Свойства компонента AmountField. */
export interface IAmountFieldProps extends Omit<ITextFieldBaseProps, "children"> {
    /** Свойства поля ввода. */
    inputProps: Omit<IFormFieldInputProps, "type" | "maxLength" | "onChange" | "inputMode" | "autoComplete"> & {
        /** Значение. Хранится без разделителей разрядов, с точкой в роли десятичного разделителя ("1234.56"). */
        value: string;
        /** Обработчик изменения значения. Получает нормализованное значение, а не то, что видно в поле. */
        onChange: (value: string) => void;
        /** Ссылка на HTML-элемент поля ввода. */
        ref?: React.Ref<HTMLInputElement>;
    };
    /** Наименование валюты. Отображается справа от значения, пока значение не пустое. */
    currency?: string;
    /** Максимальное количество знаков перед запятой. По умолчанию 16. */
    maxIntegerDigits?: number;
    /** Количество знаков после запятой. По умолчанию 2. */
    fractionDigits?: number;
    /** Обработчик очищения значения. Если передан, в постфиксе поля отображается кнопка очистки. */
    onClear?: () => void;
}

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Поле ввода денежной суммы.
 *
 * Форматирует значение во время ввода (разряды через пробел, запятая в роли десятичного разделителя)
 * и удерживает каретку в осмысленной позиции, а наружу отдаёт нормализованное значение вида "1234.56".
 */
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
        const coreRef = useRef<AmountBaseInputCore | null>(null);

        if (coreRef.current === null) {
            coreRef.current = new AmountBaseInputCore(maxIntegerDigits, fractionDigits);
        }

        const core = coreRef.current;
        const formattedValue = syncCoreAndGetFormattedValue(core, inputProps.value, maxIntegerDigits, fractionDigits);

        // Возвращаем каретку в рассчитанную ядром позицию: React после перерисовки ставит её в конец значения.
        // setCaretPosition ничего не делает, если поле не в фокусе.
        useLayoutEffect(() => {
            setCaretPosition(inputRef.current, Math.max(core.caret, 0));
        }, [inputProps.value, core]);

        /** Обработчик изменения значения. */
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const caret = event.target.selectionStart ?? event.target.value.length;

            core.apply(event.target.value, caret);

            setFallbackCaret(event.target, core, fractionDigits);

            inputProps.onChange(core.value);
        };

        /** Обработчик нажатия клавиши. */
        const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            core.cache.key = event.key;

            inputProps.onKeyDown?.(event);
        };

        /** Обработчик выбора текста. */
        const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
            core.cache.key = "";
            core.cache.selectionStart = event.currentTarget.selectionStart;
            core.cache.selectionEnd = event.currentTarget.selectionEnd;
            core.cache.selectionDirection = event.currentTarget.selectionDirection;

            inputProps.onSelect?.(event);
        };

        const setInputRef = useCallback(
            (instance: HTMLInputElement | null) => {
                inputRef.current = instance;
                setForwardedRef(inputProps.ref, instance);
            },
            [inputProps.ref],
        );

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
                        ref={setInputRef}
                    />
                </div>
            </TextFieldBase>
        );
    },
);

AmountField.displayName = "AmountField";
