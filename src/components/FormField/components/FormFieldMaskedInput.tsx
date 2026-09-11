import React, { useEffect, useContext, useRef, useState, useCallback } from "react";
import MaskedInputTextMask, { conformToMask, MaskedInputProps, PipeConfig } from "react-text-mask";
import clsx from "clsx";
import { DataAttributes } from "../../../types/CoreTypes";
import { presets } from "./FormFieldMaskedInputPresets";
import { FormFieldInput } from "./FormFieldInput";
import { FormFieldContext } from "../FormFieldContext";
import { TFormFieldMaskedInputMask } from "../types";
import { EFormFieldStatus } from "../enums";
import { createSizeToClassNameMap } from "../../../utils";
import styles from "../styles/FormFieldMaskedInput.module.less";

/** Свойства компонента FormFieldMaskedInput. */
export interface IFormFieldMaskedInputProps
    extends Omit<MaskedInputProps, "disabled" | "guide" | "mask" | "render" | "defaultValue">, DataAttributes {
    /** Значение поля. Поле контролируемое, поэтому начальное значение задаётся через него, а не через defaultValue. */
    value: string;
    /** Ссылка на поле ввода. */
    forwardedRef?: React.Ref<HTMLInputElement>;
    /**
     * Маска. Каждый элемент массива должен быть либо строкой, либо регулярным выражением. Каждая строка — это фиксированный символ в маске, а каждое регулярное выражение — это заполнитель, который принимает пользовательский ввод.
     * Подробнее можно ознакомиться https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#mask.
     */
    mask: TFormFieldMaskedInputMask;
    /** Плейсхолдер, отображаемый при вводе. Например: дд.мм.гггг, при вводе будет отображаться как 22.1м.гггг. */
    placeholderMask?: string;
}

const PHONE_PREFIX = "+7 (";

/**
 * Приводит произвольный номер к виду, который корректно раскладывается по маске телефона.
 * Ведущий код страны 7 или 8 заменяется на "+7 (", а номер, у которого вторая цифра 7,
 * дополняется этим же префиксом — иначе conformToMask примет первую цифру номера
 * за литерал "7" из маски и потеряет последнюю цифру.
 */
const normalizePhoneText = (text: string): { indexesOfPipedChars: number[]; text: string } => {
    let indexesOfPipedChars: number[] = [];

    // Поиск числа из 1 цифры и более, начинающегося с 7 или 8.
    let nextText = text.replace(/^[78]((\D*\d)*)/, `${PHONE_PREFIX}$1`);

    // Поиск числа вида {любая цифра}7, например 87, 971 и т.д., и добавление +7 перед ним.
    nextText = nextText.replace(/^\d7/, (match) => {
        indexesOfPipedChars = Array.from(PHONE_PREFIX).map((_, i) => i);
        return `${PHONE_PREFIX}${match}`;
    });

    return { indexesOfPipedChars, text: nextText };
};

/** Соответствие размера имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

const FormFieldMaskedInputBase = React.forwardRef<HTMLDivElement, IFormFieldMaskedInputProps>(
    (
        {
            className,
            forwardedRef,
            mask,
            onChange,
            placeholder,
            placeholderChar = "0",
            placeholderMask,
            value,
            ...restProps
        },
        ref,
    ) => {
        // Значение инпута, отображающего часть введенного значения и оставшуюся маску.
        const [placeholderValue, setPlaceholderValue] = useState("");
        const [filledLength, setFilledLength] = useState(0);
        const pasted = useRef(false);
        const { filled, focused, size, status } = useContext(FormFieldContext);

        /*
         * Для маски телефона значение приводится к виду с префиксом "+7 (" — см. normalizePhoneText,
         * для остальных масок используется как есть. Приведение выполняется один раз здесь, потому что
         * одно и то же значение нужно и инпуту, и слою с маской: посчитанные по разным значениям,
         * введённый текст и маска под ним разъезжаются.
         */
        const normalizedValue = mask === presets.masks.phone ? normalizePhoneText(value).text : value;

        useEffect(() => {
            /** Возвращает значение placeholderValue. */
            const calculatePlaceholderValue = (): string => {
                // Массив символов placeholderValue.
                let nextPlaceholderValue: string[] = [];

                // Значение инпута остутствует.
                if (!normalizedValue) {
                    // Передан props placeholderMask, например дд.мм.гггг
                    if (placeholderMask) {
                        // При наличии маски плейсхолдера, placeholderValue равен маски плейсхолдера.
                        nextPlaceholderValue = placeholderMask.split("");
                    } else {
                        // Маска с символами заполнения, например 00.00.00
                        const { conformedValue } = conformToMask("", mask, { guide: true, placeholderChar });
                        nextPlaceholderValue = conformedValue.split("");
                    }
                    setFilledLength(0);
                }
                // Инпут имеет value.
                else {
                    // Value с маской, например: 22.00.00
                    const { conformedValue } = conformToMask(normalizedValue, mask, { guide: true, placeholderChar });
                    // Нам нужна точная длина того, что уже ввел пользователь
                    const conformed = conformToMask(normalizedValue, mask, {
                        guide: false,
                        placeholderChar,
                    }).conformedValue;
                    setFilledLength(conformed.length);

                    // Символы placeholderValue собираются из введенного пользователем значения и оставшейся части из placeholderMask или placeholderChar.
                    for (let i = 0; i < mask.length; i++) {
                        // Не редактируемый символ маски.
                        if (typeof mask[i] === "string") {
                            // Символ из маски.
                            nextPlaceholderValue[i] = conformedValue[i];
                        } else {
                            // Не введенный пользователем символ заполняется символом placeholderMask или placeholderChar.
                            if (conformedValue[i] === placeholderChar && !normalizedValue[i]) {
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
        }, [normalizedValue, mask, placeholderChar, placeholderMask]);

        const handlePaste = () => {
            pasted.current = true;
        };

        // Постобработчик введенных значений. Выполняется после внутреннего форматирования и до onChange.
        const pipe = (conformedValue: string, config: PipeConfig) => {
            // Для маски с номером телефона отдельный обработчик.
            if (mask === presets.masks.phone) {
                // Пустое значение не обрабатывается, чтобы значение в инпуте можно было стереть полностью.
                if (!conformedValue.length) {
                    return conformedValue;
                }

                return phonePipe(config.rawValue);
            } else if (mask === presets.masks.swiftCode) {
                return conformedValue.toUpperCase();
            }

            return conformedValue;
        };

        // Постобработчик введенных значений, если маска является номером телефона.
        const phonePipe = (text: string) => {
            // При вставке номер может прийти в любом виде, поэтому нормализуется целиком.
            // При ручном вводе нормализуется только первая цифра: дальше в text уже есть префикс "+7 (".
            const normalized = pasted.current
                ? normalizePhoneText(text)
                : { indexesOfPipedChars: [], text: text === "7" || text === "8" ? PHONE_PREFIX : text };

            return {
                indexesOfPipedChars: normalized.indexesOfPipedChars,
                value: conformToMask(normalized.text, mask, { guide: false, placeholderChar }).conformedValue,
            };
        };

        // Значение, приведённое к маске, — уходит в react-text-mask.
        const maskedValue = conformToMask(normalizedValue, mask, { guide: false, placeholderChar }).conformedValue;
        /*
         * Значение, отображаемое в input. Для маски телефона — приведённое к маске (телефон нормализует
         * ввод с 7/8/+7 в начале, без этого react-text-mask форматирует номер неверно), для остальных масок —
         * исходное: react-text-mask сам пишет отформатированное значение в DOM, а исходное значение нужно,
         * чтобы можно было стереть символ-разделитель (иначе маска тут же возвращает его обратно).
         */
        const inputValue = mask === presets.masks.phone ? maskedValue : value;

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                const { value: nextValue } = event.target;

                pasted.current = false;

                // Сравнивается именно отображаемое значение: react-text-mask успевает отформатировать
                // DOM до вызова обработчика, поэтому nextValue уже приведено к маске.
                if (inputValue !== nextValue) {
                    onChange?.(event);
                }
            },
            [inputValue, onChange],
        );

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
            if ((!filled && !focused) || (!value && placeholder)) {
                return "";
            }
            return placeholderValue;
        };

        return (
            <div className={clsx(styles.formFieldMaskedInputWrapper, className)} ref={ref}>
                {getPlaceholderValue() && (
                    <div className={clsx(styles.maskLayout, SIZE_TO_CLASS_NAME_MAP[size])} aria-hidden="true">
                        <span className={styles.valueMirror}>{placeholderValue.slice(0, filledLength)}</span>
                        <span
                            className={clsx(styles.placeholderMask, {
                                [styles.disabled]: status === EFormFieldStatus.DISABLED,
                            })}
                        >
                            {placeholderValue.slice(filledLength)}
                        </span>
                    </div>
                )}

                {/* Input, отображающий введенное значение. */}
                <MaskedInputTextMask
                    disabled={status === EFormFieldStatus.DISABLED}
                    /* Input отображает только введенное значение без маски, маска рисуется в inputPlaceholder. */
                    guide={false}
                    render={(ref, props) => (
                        <FormFieldInput
                            {...props}
                            // react-text-mask подставляет в props defaultValue, равное value (https://github.com/text-mask/text-mask/pull/993).
                            // На контролируемом input это даёт предупреждение React «both value and defaultValue props».
                            defaultValue={undefined}
                            value={inputValue}
                            placeholder={placeholder || ""}
                            ref={setRef(ref)}
                        />
                    )}
                    mask={mask}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    placeholderChar={placeholderChar}
                    // value={value} не используется т.к. возникает баг при передаче снаружи изначально пустого value, а затем не пустого.
                    value={maskedValue}
                    pipe={pipe}
                    type="text"
                    {...restProps}
                />
            </div>
        );
    },
);

FormFieldMaskedInputBase.displayName = "FormFieldMaskedInput";

/**
 * Компонент маскированного ввода.
 * Основан на https://github.com/text-mask/text-mask.
 */
export const FormFieldMaskedInput = Object.assign(FormFieldMaskedInputBase, { presets });
