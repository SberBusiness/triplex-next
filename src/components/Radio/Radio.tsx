import React from "react";
import clsx from "clsx";
import { Text, ETextSize } from "../Typography";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";
import styles from "./styles/Radio.module.less";

/** Свойства компонента Radio. */
export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Атрибуты корневого label. Его className объединяется с внутренними классами label. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Размер радио-кнопки. По умолчанию EComponentSize.MD. */
    size?: EComponentSize;
    /** Контент лейбла радио-кнопки. */
    children?: React.ReactNode;
}

const SIZE_TO_TEXT_SIZE_MAP: Record<EComponentSize, ETextSize> = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

const SIZE_TO_CLASS_NAME_MAP = createSizeToClassNameMap(styles);

/**
 * Радио-кнопка с описанием.
 * Корневой элемент — label, внутри него нативный input[type="radio"], на который указывает ref.
 * className и остальные input-атрибуты применяются к input, labelAttributes — к label.
 */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const { children, className, disabled, labelAttributes, size = EComponentSize.MD, ...inputAttributes } = props;
    const inputClassName = clsx(styles.radio, className, SIZE_TO_CLASS_NAME_MAP[size]);
    const labelClassName = clsx(
        styles.label,
        styles[size],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        labelAttributes?.className,
    );

    return (
        <label {...labelAttributes} className={labelClassName} data-tx={process.env.npm_package_version}>
            <input type="radio" className={inputClassName} disabled={disabled} {...inputAttributes} ref={ref} />
            <span className={styles.radioIcon} />
            {children && (
                <Text size={SIZE_TO_TEXT_SIZE_MAP[size]} tag="div">
                    {children}
                </Text>
            )}
        </label>
    );
});

Radio.displayName = "Radio";
