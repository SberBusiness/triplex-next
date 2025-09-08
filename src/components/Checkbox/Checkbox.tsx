import React, { useState, useRef } from "react";
import CheckboxbulkStrokeSrvIcon24 from "@sberbusiness/icons-next/CheckboxbulkStrokeSrvIcon24";
import CheckboxtickStrokeSrvIcon24 from "@sberbusiness/icons-next/CheckboxtickStrokeSrvIcon24";
import { ECheckboxSize } from "./enum";
import { EFocusSource } from "../../enums/EFocusSource";
import clsx from "clsx";
import styles from "./styles/Checkbox.module.less";

/** Свойства компонента Checkbox. */
export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Признак частичного типа выбора. */
    bulk?: boolean;
    /** Размер чекбокса. */
    checkboxSize?: ECheckboxSize;
}

/** Чекбокс с описанием. */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const {
        children,
        className,
        onFocus,
        onBlur,
        disabled,
        bulk,
        labelAttributes,
        checkboxSize = ECheckboxSize.MD,
        ...inputAttributes
    } = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = clsx(styles.checkbox, className, styles[checkboxSize]);
    const classNamesLabel = clsx(
        styles.label,
        styles[checkboxSize],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        labelAttributes?.className,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    /** Обработчик клика. */
    const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (event.target === inputRef.current) {
                // Сбрасываем состояние, если событие пришло от чекбокса не в фокусе. (Safari)
                if (event.target !== document.activeElement) {
                    focusSource.current = EFocusSource.NONE;
                }
            } else if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onClick?.(event);
    };

    /** Обработчик нажатия мыши. */
    const handleMouseDown = (event: React.MouseEvent<HTMLLabelElement>) => {
        if (!disabled) {
            if (focusSource.current === EFocusSource.NONE) {
                focusSource.current = EFocusSource.MOUSE;
            }
        }
        labelAttributes?.onMouseDown?.(event);
    };

    /** Обработчик получения фокуса. */
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.MOUSE) {
            focusSource.current = EFocusSource.KEYBOARD;
            setFocusVisible(true);
        } else if (focusVisible) {
            setFocusVisible(false);
        }
        onFocus?.(event);
    };

    /** Обработчик потери фокуса. */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (focusSource.current !== EFocusSource.NONE) {
            // При переключении окон/вкладок состояние не сбрасываем.
            if (event.target !== document.activeElement) {
                focusSource.current = EFocusSource.NONE;
                setFocusVisible(false);
            }
        }
        onBlur?.(event);
    };

    /** Функция для хранения ссылки. */
    const setRef = (instance: HTMLInputElement | null) => {
        inputRef.current = instance;
        if (typeof ref === "function") {
            ref(instance);
        } else if (ref) {
            ref.current = instance;
        }
    };

    /** Отрисовка галочки чекбокса. */
    const renderCheckmarkIcon = () => {
        const className = styles.checkmarkIcon;

        return bulk ? (
            <CheckboxbulkStrokeSrvIcon24 className={className} />
        ) : (
            <CheckboxtickStrokeSrvIcon24 className={className} />
        );
    };

    return (
        <label
            {...labelAttributes}
            className={classNamesLabel}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            data-tx={process.env.npm_package_version}
        >
            <input
                type="checkbox"
                className={classNames}
                disabled={disabled}
                data-focus-visible={focusVisible ? "" : undefined}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...inputAttributes}
                ref={setRef}
            />
            <span className={styles.checkboxIcon} />
            {renderCheckmarkIcon()}
            {children}
        </label>
    );
});

Checkbox.displayName = "Checkbox";
