import React from "react";
import { CheckboxbulkStrokeSrvIcon24, CheckboxtickStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ECheckboxSize } from "./enum";
import clsx from "clsx";
import styles from "./styles/Checkbox.module.less";

/** Свойства компонента Checkbox. */
export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Признак частичного типа выбора. */
    bulk?: boolean;
    /** Размер чекбокса. */
    size?: ECheckboxSize;
}

/** Чекбокс с описанием. */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const { children, className, disabled, bulk, labelAttributes, size = ECheckboxSize.MD, ...inputAttributes } = props;
    const classNames = clsx(styles.checkbox, className, styles[size]);
    const classNamesLabel = clsx(
        styles.label,
        styles[size],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        labelAttributes?.className,
    );

    /** Отрисовка галочки чекбокса. */
    const renderCheckmarkIcon = () => {
        const className = styles.checkmarkIcon;

        return bulk ? (
            <CheckboxbulkStrokeSrvIcon24 className={className} paletteIndex={7} />
        ) : (
            <CheckboxtickStrokeSrvIcon24 className={className} paletteIndex={7} />
        );
    };

    return (
        <label {...labelAttributes} className={classNamesLabel} data-tx={process.env.npm_package_version}>
            <input type="checkbox" className={classNames} disabled={disabled} {...inputAttributes} ref={ref} />
            <span className={styles.checkboxIcon} />
            {renderCheckmarkIcon()}
            {children}
        </label>
    );
});

Checkbox.displayName = "Checkbox";
