import React, { useState, useRef } from "react";
// import { CheckboxbulkStsIcon16 } from "@sberbusiness/icons/CheckboxbulkStsIcon16";
// import { CheckboxtickStsIcon16 } from "@sberbusiness/icons/CheckboxtickStsIcon16";
import { ICheckboxProps } from "./types";
import { EFocusSource } from "../../enums/EFocusSource";
import clsx from "clsx";
import styles from "./styles/Checkbox.module.less";

const CheckboxbulkStsIcon16 = ({ className }: { className: string }) => (
    <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.5 8C3.5 7.44772 3.94772 7 4.5 7H11.5C12.0523 7 12.5 7.44772 12.5 8C12.5 8.55228 12.0523 9 11.5 9H4.5C3.94772 9 3.5 8.55228 3.5 8Z"
            fill="white"
        />
    </svg>
);

const CheckboxtickStsIcon16 = ({ className }: { className: string }) => (
    <svg
        className={className}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.7399 4.32733C13.1114 4.73599 13.0813 5.36844 12.6727 5.73995L7.17267 10.7399C6.7777 11.099 6.17034 11.0846 5.79289 10.7071L3.29289 8.20711C2.90237 7.81659 2.90237 7.18342 3.29289 6.7929C3.68342 6.40238 4.31658 6.40238 4.70711 6.7929L6.53287 8.61866L11.3273 4.26007C11.736 3.88856 12.3684 3.91868 12.7399 4.32733Z"
            fill="white"
        />
    </svg>
);

/** Чекбокс с описанием. */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const { children, className, onFocus, onBlur, disabled, bulk, labelAttributes, ...inputAttributes } = props;
    const [focusVisible, setFocusVisible] = useState(false);
    const focusSource = useRef(EFocusSource.NONE);
    const classNames = clsx(styles.checkbox, className);
    const classNamesLabel = clsx(
        styles.label,
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

        return bulk ? <CheckboxbulkStsIcon16 className={className} /> : <CheckboxtickStsIcon16 className={className} />;
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
