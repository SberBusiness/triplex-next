import React, { useRef } from "react";
import CheckboxbulkStrokeSrvIcon24 from "@sberbusiness/icons-next/CheckboxbulkStrokeSrvIcon24";
import CheckboxtickStrokeSrvIcon24 from "@sberbusiness/icons-next/CheckboxtickStrokeSrvIcon24";
import { ECheckboxSize } from "./enum";
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
    const classNames = clsx(styles.checkbox, className, styles[checkboxSize]);
    const classNamesLabel = clsx(
        styles.label,
        styles[checkboxSize],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        labelAttributes?.className,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

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
        <label {...labelAttributes} className={classNamesLabel} data-tx={process.env.npm_package_version}>
            <input
                type="checkbox"
                className={classNames}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
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
