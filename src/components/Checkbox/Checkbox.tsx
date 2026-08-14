import React from "react";
import clsx from "clsx";
import { CheckboxbulkStrokeSrvIcon24, CheckboxtickStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ETextSize, Text } from "../Typography";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/Checkbox.module.less";

/** Свойства компонента Checkbox. */
export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Атрибуты корневого label. Его className объединяется с className компонента. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Признак частичного типа выбора: вместо галочки используется bulk-иконка. Её видимость, как и у галочки, определяется checked. По умолчанию false. */
    bulk?: boolean;
    /** Размер чекбокса. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Контент лейбла чекбокса. */
    children?: React.ReactNode;
}

/** Соответствие размера чекбокса размеру текста лейбла. */
const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

/** Соответствие размера чекбокса имени класса. */
const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Чекбокс с описанием.
 * Корневой элемент — label, внутри него нативный input[type="checkbox"], на который указывает ref.
 * className применяется к корневому label, остальные props — к input.
 */
export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => {
    const {
        children,
        className,
        disabled,
        bulk,
        labelAttributes,
        size = EComponentSize.MD,
        ...inputAttributes
    } = props;
    const labelClassName = clsx(
        styles.label,
        SIZE_TO_CLASS_NAME_MAP[size],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        className,
        labelAttributes?.className,
    );
    const CheckmarkIcon = bulk ? CheckboxbulkStrokeSrvIcon24 : CheckboxtickStrokeSrvIcon24;

    return (
        <label {...labelAttributes} className={labelClassName} data-tx={process.env.npm_package_version}>
            <input type="checkbox" className={styles.checkbox} disabled={disabled} {...inputAttributes} ref={ref} />
            <span className={styles.checkboxIcon} />
            <CheckmarkIcon className={styles.checkmarkIcon} paletteIndex={7} />
            {children && (
                <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} tag="div">
                    {children}
                </Text>
            )}
        </label>
    );
});

Checkbox.displayName = "Checkbox";
