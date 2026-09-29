import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "../Link/Link";
import { SmallInput, ISmallInputProps } from "../SmallInput/SmallInput";
import { Text } from "../Typography/Text";
import { EFontType, ETextSize } from "../Typography/enums";
import { getCaretPosition, setCaretPosition } from "../../utils/inputUtils";
import { StringUtils } from "../../utils/stringUtils";
import { isKey } from "../../utils/keyboard";
import styles from "./styles/DocumentNumberEdit.module.less";

/** Свойства компонента DocumentNumberEdit. */
export interface IDocumentNumberEditProps extends ISmallInputProps {
    /** Номер документа. */
    value?: React.ReactText;
    /** Текст кнопки редактирования номера. Например, "Изменить". */
    buttonLabel: string;
    /** Текст кнопки редактирования, когда номер не задан. Например, "Задать номер". */
    emptyNumberButtonLabel: string;
    /** Текст вместо номера, когда номер не задан. Например, "Номер документа будет присвоен автоматически". */
    emptyNumberLabel: string;
    /** Текст перед номером. Например, "Документ №". */
    numberLabel: string;
    /** Максимальная длина поля ввода. По умолчанию 6. */
    maxLength?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/** Максимальная длина поля ввода по умолчанию. */
const INPUT_MAX_LENGTH = 6;

/** Оставляет в строке только цифры. */
const filterDigits = (value: string): string => Array.from(value).filter(StringUtils.isDigit).join("");

/** Поле редактирования номера документа. */
export const DocumentNumberEdit = React.forwardRef<HTMLDivElement, IDocumentNumberEditProps>(
    (
        {
            className,
            value,
            buttonLabel,
            emptyNumberButtonLabel,
            emptyNumberLabel,
            numberLabel,
            maxLength = INPUT_MAX_LENGTH,
            onBlur,
            onChange,
            onKeyDown,
            ...rest
        },
        ref,
    ) => {
        const [editingMode, setEditingMode] = useState(false);

        /** Текст лейбла: при редактировании — только подпись, иначе подпись с номером либо текст об отсутствии номера. */
        const getLabelText = () => {
            if (editingMode) {
                return numberLabel;
            }

            return value ? `${numberLabel} ${value}` : emptyNumberLabel;
        };

        /** Плейсхолдер поля ввода — маска из нулей по максимальной длине номера. */
        const inputPlaceholder = "0".repeat(maxLength);

        /** Обработчик потери фокуса поля ввода. Завершает редактирование. */
        const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            setEditingMode(false);

            onBlur?.(event);
        };

        /** Обработчик нажатия клавиши в поле ввода. Enter завершает редактирование. */
        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (isKey(event.code, "ENTER")) {
                setEditingMode(false);
            }

            onKeyDown?.(event);
        };

        /** Обработчик изменения значения поля ввода. Отбрасывает нецифровые символы, сохраняя позицию курсора. */
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const caret = getCaretPosition(event.target);
            const filteredValue = filterDigits(event.target.value);
            const caretShift = filteredValue.length - event.target.value.length;

            // Значение поля перезаписывается до вызова onChange, чтобы потребитель получил уже отфильтрованное значение.
            event.target.value = filteredValue;

            setCaretPosition(event.target, caret + caretShift);

            onChange?.(event);
        };

        /** Обработчик клика по кнопке. Включает режим редактирования. */
        const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            setEditingMode(true);
        };

        return (
            <div className={clsx(styles.documentNumberEdit, className)} ref={ref}>
                <Text className={styles.label} tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                    {getLabelText()}
                </Text>

                {editingMode ? (
                    <div className={styles.inputEditWrapper}>
                        <SmallInput
                            {...rest}
                            value={value || ""}
                            placeholder={inputPlaceholder}
                            maxLength={maxLength}
                            autoFocus={true}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                            onChange={handleInputChange}
                        />
                    </div>
                ) : (
                    <Text className={styles.label} tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                        <Link href="#" onClick={handleButtonClick}>
                            {value ? buttonLabel : emptyNumberButtonLabel}
                        </Link>
                    </Text>
                )}
            </div>
        );
    },
);

DocumentNumberEdit.displayName = "DocumentNumberEdit";
