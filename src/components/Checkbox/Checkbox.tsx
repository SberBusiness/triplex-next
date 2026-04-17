import React from "react";
import clsx from "clsx";
import { CheckboxbulkStrokeSrvIcon24, CheckboxtickStrokeSrvIcon24 } from "@sberbusiness/icons-next";
import { ETextSize, Text } from "../Typography";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/Checkbox.module.less";

/** Свойства компонента Checkbox. */
export interface ICheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Признак частичного типа выбора. */
    bulk?: boolean;
    /** Размер чекбокса. */
    size?: EComponentSize;
    /** Контент лейбла чекбокса. */
    children?: React.ReactNode;
}

const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/** Чекбокс с описанием. */
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
    const classNames = clsx(styles.checkbox, SIZE_TO_CLASS_NAME_MAP[size]);
    const classNamesLabel = clsx(
        styles.label,
        SIZE_TO_CLASS_NAME_MAP[size],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        className,
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
            {children && (
                <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} tag="div">
                    {children}
                </Text>
            )}
        </label>
    );
});

Checkbox.displayName = "Checkbox";
