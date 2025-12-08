import React, { useState, useMemo } from "react";
import { SmallInput, ISmallInputProps } from "../SmallInput/SmallInput";
import { Text } from "../Typography/Text";
import { EFontType, ETextSize } from "../Typography/enums";
import { getCaretPosition, setCaretPosition } from "../../utils/inputUtils";
import { StringUtils } from "../../utils/stringUtils";
import { isKey } from "../../utils/keyboard";
import styles from "./styles/DocumentNumberEdit.module.less";
import clsx from "clsx";
import { Link } from "../Link/Link";

/** Свойства компонента DocumentNumberEdit. */
export interface IDocumentNumberEditProps extends ISmallInputProps {
    /** Номер документа. */
    value?: React.ReactText;
    /** Текст кнопки "Изменить". По умолчанию - "Изменить". */
    buttonLabel: string;
    /** Текст кнопки "Изменить" при отсутствии номера. По умолчанию - "Задать номер". */
    emptyNumberButtonLabel: string;
    /** Текст перед номером, при отсутствии номера. По умолчанию - "Номер документа будет присвоен автоматически". */
    emptyNumberLabel: string;
    /** Текст перед номером. По умолчанию - "Документ №". */
    numberLabel: string;
    /** Максимальная длина поля ввода. */
    maxLength?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

// Максимальное число символов.
const INPUT_MAX_LENGTH = 6;

/** Поле редактирования номера документа. */
export const DocumentNumberEdit: React.FC<IDocumentNumberEditProps> = ({
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
}) => {
    const [editingMode, setEditingMode] = useState(false);

    /** Текст лейбла. */
    const labelText = useMemo(() => {
        if (editingMode) {
            return numberLabel;
        } else if (value) {
            return `${numberLabel} ${value}`;
        } else {
            return emptyNumberLabel;
        }
    }, [value, numberLabel, emptyNumberLabel, editingMode]);

    /** Рендер поля ввода. */
    const renderInput = () => (
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
    );

    /** Плейсхолдер поля ввода. */
    const inputPlaceholder = "0".repeat(maxLength);

    /** Обработчик потери фокуса поля ввода. */
    const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setEditingMode(false);

        onBlur?.(event);
    };

    /** Обработчик нажатия клавиши поля ввода. */
    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (isKey(event.code, "ENTER")) {
            setEditingMode(false);
        }

        onKeyDown?.(event);
    };

    /** Обработчик изменения значения поля ввода. */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const caret = getCaretPosition(event.target);
        const value = getFilteredValue(event.target.value);
        const caretShift = value.length - event.target.value.length;

        event.target.value = value;

        setCaretPosition(event.target, caret + caretShift);

        onChange?.(event);
    };

    /** Функция, возвращающая отфильтрованное значение. */
    const getFilteredValue = (value: string) => {
        const buffer: string[] = [];
        const length = value.length;

        for (let i = 0; i < length; i++) {
            if (StringUtils.isDigit(value[i])) {
                buffer.push(value[i]);
            }
        }

        return buffer.join("");
    };

    /** Рендер кнопки. */
    const renderButton = () => (
        <Text className={styles.label} tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
            <Link href="#" onClick={handleButtonClick}>
                {value ? buttonLabel : emptyNumberButtonLabel}
            </Link>
        </Text>
    );

    /** Обработчик клика кнопки. */
    const handleButtonClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setEditingMode(true);
    };

    return (
        <div className={clsx(styles.documentNumberEdit, className)}>
            <Text className={styles.label} tag="div" size={ETextSize.B3} type={EFontType.SECONDARY}>
                {labelText}
            </Text>

            {editingMode ? renderInput() : renderButton()}
        </div>
    );
};

DocumentNumberEdit.displayName = "DocumentNumberEdit";
