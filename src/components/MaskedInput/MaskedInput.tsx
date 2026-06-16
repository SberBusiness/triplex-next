import React, { useEffect, useRef, useState, useCallback } from "react";
import MaskedInputTextMask, { conformToMask, PipeConfig } from "react-text-mask";
import clsx from "clsx";
import { IMaskedInputProps } from "./types";
import { MaskedInputPresets } from "./MaskedInputPresets";
import styles from "./styles/MaskedInput.module.less";

const MaskedInputBase = React.forwardRef<HTMLElement, IMaskedInputProps>(
    (
        { className, mask, onChange, placeholder, placeholderChar = "0", placeholderMask, value, render, ...restProps },
        ref,
    ) => {
        const [placeholderValue, setPlaceholderValue] = useState("");
        const pasted = useRef(false);

        useEffect(() => {
            const calculatePlaceholderValue = (): string => {
                let nextPlaceholderValue: string[] = [];

                if (!value) {
                    if (placeholderMask) {
                        nextPlaceholderValue = placeholderMask.split("");
                    } else {
                        const { conformedValue } = conformToMask("", mask, { guide: true, placeholderChar });
                        nextPlaceholderValue = conformedValue.split("");
                    }
                } else {
                    const { conformedValue } = conformToMask(value.toString(), mask, {
                        guide: true,
                        placeholderChar,
                    });

                    for (let i = 0; i < mask.length; i++) {
                        if (typeof mask[i] === "string") {
                            nextPlaceholderValue[i] = conformedValue[i];
                        } else {
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

        const pipe = (conformedValue: string, config: PipeConfig) => {
            if (mask === MaskedInputPresets.masks.phone) {
                if (!conformedValue.length) {
                    return conformedValue;
                }

                return phonePipe(config.rawValue);
            } else if (mask === MaskedInputPresets.masks.swiftCode) {
                return conformedValue.toUpperCase();
            }

            return conformedValue;
        };

        const phonePipe = (text: string) => {
            let indexesOfPipedChars: number[] = [];

            if (pasted.current) {
                let regEx = /^[78]((\D*\d)*)/;

                text = text.replace(regEx, "+7 ($1");

                regEx = /^\d7/;

                text = text.replace(regEx, (match) => {
                    indexesOfPipedChars = Array.from("+7 (").map((_, i) => i);
                    return `+7 (${match}`;
                });
            } else if (text === "7" || text === "8") {
                text = "+7 (";
            }

            return {
                indexesOfPipedChars,
                value: conformToMask(text, mask, { guide: false, placeholderChar }).conformedValue,
            };
        };

        const getValue = (): string => {
            if (mask === MaskedInputPresets.masks.phone) {
                // eslint-disable-next-line react-hooks/immutability
                value = phonePipe(value).value;
                return value;
            }

            return conformToMask(value, mask, { guide: false, placeholderChar }).conformedValue;
        };

        const setRef = (textMaskRef: (inputElement: HTMLElement) => void) => (instance: HTMLElement | null) => {
            if (instance) {
                textMaskRef(instance);
            }
            if (typeof ref === "function") {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        };

        return (
            <div className={clsx(styles.maskedInputWrapper, className)}>
                <input
                    className={clsx(styles.maskedInputPlaceholder)}
                    type="text"
                    placeholder={!value && placeholder ? "" : placeholderValue}
                    aria-hidden="true"
                    tabIndex={-1}
                    readOnly
                />

                <MaskedInputTextMask
                    className={styles.maskedInput}
                    guide={false}
                    render={(textMaskRef, props) => {
                        const combinedRef = setRef(textMaskRef);

                        if (typeof render === "function") {
                            return render(combinedRef, props);
                        }
                        return <input {...props} ref={combinedRef} />;
                    }}
                    mask={mask}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    placeholderChar={placeholderChar}
                    value={getValue()}
                    pipe={pipe}
                    type="text"
                    {...restProps}
                />
            </div>
        );
    },
);

MaskedInputBase.displayName = "MaskedInput";

/**
 * Компонент маскированного ввода.
 * Основан на https://github.com/text-mask/text-mask.
 */
export const MaskedInput = Object.assign(MaskedInputBase, { presets: MaskedInputPresets });
