import React, { useEffect, useContext, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import MaskedInputTextMask, { conformToMask, MaskedInputProps, PipeConfig } from "react-text-mask";
import { DataAttributes } from "@sberbusiness/triplex-next/types/CoreTypes";
import { presets, TFormFieldMaskedInputPresets } from "./FormFieldMaskedInputPresets";
import { FormFieldInput } from "@sberbusiness/triplex-next/components/FormField/components/FormFieldInput";
import { FormFieldContext } from "../FormFieldContext";
import { TFormFieldMaskedInputMask } from "@sberbusiness/triplex-next/components/FormField/types";
import stylesFormFieldInput from "../styles/FormFieldInput.module.less";
import styles from "../styles/FormFieldMaskedInput.module.less";
import { EFormFieldStatus } from "../enums";

/** Свойства компонента FormFieldInput. */
export interface IFormFieldMaskedInputProps
    extends Omit<MaskedInputProps, "guide" | "mask" | "render">,
        DataAttributes {
    value: string;
    /** Состояние ошибки. */
    error?: boolean;
    /** Ссылка на поле ввода. */
    forwardedRef?: React.Ref<HTMLInputElement>;
    /** Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский ввод.
     * Подробнее можно ознакомиться https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
     * */
    mask: TFormFieldMaskedInputMask;
    /** Плейсхолдер, отображаемый при вводе. Например: дд.мм.гггг, при вводе будет отображаться как 22.1м.гггг. */
    placeholderMask?: string;
}

export interface IFormFieldIMaskedInputFC extends React.FC<IFormFieldMaskedInputProps> {
    presets: TFormFieldMaskedInputPresets;
}

/**
 * Компонент маскированного ввода.
 * Основан на https://github.com/text-mask/text-mask.
 */
export const FormFieldMaskedInput: IFormFieldIMaskedInputFC = ({
    className,
    forwardedRef,
    mask,
    onChange,
    placeholder,
    placeholderChar = "0",
    placeholderMask,
    value,
    ...inputProps
}) => {
    // Значение инпута, отображающего часть введенного значения и оставшуюся маску.
    const [placeholderValue, setPlaceholderValue] = useState("");
    const pasted = useRef(false);
    const { valueExist, focused, size, status } = useContext(FormFieldContext);

    useEffect(() => {
        /**
         * Возвращает значение placeholderValue.
         */
        const calculatePlaceholderValue = (): string => {
            // Массив символов placeholderValue.
            let nextPlaceholderValue: string[] = [];

            // Значение инпута остутствует.
            if (!value) {
                // Передан props placeholderMask, например дд.мм.гггг
                if (placeholderMask) {
                    // При наличии маски плейсхолдера, placeholderValue равен маски плейсхолдера.
                    nextPlaceholderValue = placeholderMask.split("");
                } else {
                    // Маска с символами заполнения, например 00.00.00
                    const { conformedValue } = conformToMask("", mask, { guide: true, placeholderChar });
                    nextPlaceholderValue = conformedValue.split("");
                }
            } else {
                // Инпут имеет value.

                // Value с маской, например: 22.00.00
                const { conformedValue } = conformToMask(value.toString(), mask, { guide: true, placeholderChar });

                // Символы placeholderValue собираются из введенного пользователем значения и оставшейся части из placeholderMask или placeholderChar.
                for (let i = 0; i < mask.length; i++) {
                    // Не редактируемый символ маски.
                    if (typeof mask[i] === "string") {
                        // Символ из маски.
                        nextPlaceholderValue[i] = conformedValue[i];
                    } else {
                        // Не введенный пользователем символ заполняется символом placeholderMask или placeholderChar.
                        if (conformedValue[i] === placeholderChar && !value.toString()[i]) {
                            nextPlaceholderValue[i] = placeholderMask?.[i] || placeholderChar;
                        } else {
                            nextPlaceholderValue[i] = conformedValue[i];
                        }
                    }
                }
            }

            return nextPlaceholderValue.join("");
        };

        setPlaceholderValue(calculatePlaceholderValue());
    }, [value, mask, placeholderChar, placeholderMask]);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value: nextValue } = event.target;

            pasted.current = false;

            if (value !== nextValue) {
                onChange?.(event);
            }
        },
        [value, onChange],
    );

    const handlePaste = () => {
        pasted.current = true;
    };

    // Постобработчик введенных значений. Выполняется после внутреннего форматирования и до onChange.
    const pipe = (conformedValue: string, config: PipeConfig) => {
        // Для маски с номером телефона отдельный обработчик.
        if (mask === FormFieldMaskedInput.presets.masks.phone) {
            // Пустое значение не обрабатывается, чтобы значение в инпуте можно было стереть полностью.
            if (!conformedValue.length) {
                return conformedValue;
            }

            return phonePipe(config.rawValue);
        } else if (mask === FormFieldMaskedInput.presets.masks.swiftCode) {
            return conformedValue.toUpperCase();
        }

        return conformedValue;
    };

    // Постобработчик введенных значений, если маска является номером телефона.
    const phonePipe = (text: string) => {
        let indexesOfPipedChars: number[] = [];

        if (pasted.current) {
            // Выражение для поиска чисел из 1 цифры и более, начинающихся с 7 или 8
            let regEx = /^[78]((\D*\d)*)/;

            text = text.replace(regEx, "+7 ($1");

            // Выражение для поиска чисел вида {любая цифра}7, например 87, 971 и т.д.
            regEx = /^\d7/;

            // Если вторая цифра номера 7, добавляется +7 перед этим, иначе conformToMask вместо 9701234567 вернет +7901234567.
            text = text.replace(regEx, (match) => {
                indexesOfPipedChars = Array.from("+7 (").map((_, i) => i);
                return `+7 (${match}`;
            });
        } else if (text === "7" || text === "8") {
            // Если первая введенная цифра 7 или 8, заменяем её на +7 (
            text = "+7 (";
        }

        return {
            indexesOfPipedChars,
            value: conformToMask(text, mask, { guide: false, placeholderChar }).conformedValue,
        };
    };

    // Возвращает value, для передачи в компоненты рендера. Для некоторых типов масок, value приходится модифицировать из-за багов.
    const getValue = (): string => {
        if (mask === FormFieldMaskedInput.presets.masks.phone) {
            value = phonePipe(value).value;
            return value;
        }

        return conformToMask(value, mask, { guide: false, placeholderChar }).conformedValue;
    };

    /** Функция для хранения ссылки. */
    const setRef = (ref: (inputElement: HTMLElement) => void) => (instance: HTMLInputElement | null) => {
        if (instance) {
            ref(instance);
        }
        if (typeof forwardedRef === "function") {
            forwardedRef(instance);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = instance;
        }
    };

    const getPlaceholderValue = () => {
        if ((!valueExist && !focused) || (!value && placeholder)) {
            return "";
        }
        return placeholderValue;
    };

    return (
        <div className={clsx(styles.formFieldMaskedInputWrapper, styles[`size-${size}`])}>
            {/* Input, отображающий маску. */}
            <input
                className={clsx(stylesFormFieldInput.formFieldInput, styles.formFieldMaskedInputPlaceholder, className)}
                disabled={status === EFormFieldStatus.DISABLED}
                placeholder={getPlaceholderValue()}
                readOnly
                aria-hidden="true"
                tabIndex={-1}
                type="text"
            />

            {/* Input, отображающий введенное значение. */}
            <MaskedInputTextMask
                className={clsx(styles.formFieldMaskedInput, { [styles.error]: Boolean(inputProps.error) }, className)}
                // https://github.com/text-mask/text-mask/pull/993
                defaultValue=""
                disabled={status === EFormFieldStatus.DISABLED}
                /* Input отображает только введенное значение без маски, маска рисуется в inputPlaceholder. */
                guide={false}
                render={(ref, props) => {
                    return (
                        <FormFieldInput {...props} value={value} placeholder={placeholder || ""} ref={setRef(ref)} />
                    );
                }}
                mask={mask}
                onChange={handleChange}
                onPaste={handlePaste}
                placeholderChar={placeholderChar}
                // value={value} не используется т.к. возникает баг при передаче снаружи изначально пустого value, а затем не пустого.
                value={getValue()}
                pipe={pipe}
                type="text"
                {...inputProps}
            />
        </div>
    );
};

FormFieldMaskedInput.presets = presets;
