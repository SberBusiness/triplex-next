import React from "react";
import clsx from "clsx";
import { Text, ETextSize } from "../Typography";
import styles from "./styles/Radio.module.less";
import { EComponentSize } from "../../enums/EComponentSize";
import { createSizeToClassNameMap } from "../../utils/classNameMaps";

/** Свойства компонента Radio. */
export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Размер радио-кнопки. */
    size?: EComponentSize;
}

const sizeToTextSizeMap = {
    [EComponentSize.LG]: ETextSize.B2,
    [EComponentSize.MD]: ETextSize.B3,
    [EComponentSize.SM]: ETextSize.B4,
};

const sizeToClassNameMap = createSizeToClassNameMap(styles);

/** Радио-кнопка с описанием. */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const { children, className, disabled, labelAttributes, size = EComponentSize.MD, ...inputAttributes } = props;
    const classNames = clsx(styles.radio, className, sizeToClassNameMap[size]);
    const classNamesLabel = clsx(
        styles.label,
        styles[size],
        { [styles.disabled]: !!disabled, [styles.nonempty]: !!children },
        labelAttributes?.className,
    );

    return (
        <label {...labelAttributes} className={classNamesLabel} data-tx={process.env.npm_package_version}>
            <input type="radio" className={classNames} disabled={disabled} {...inputAttributes} ref={ref} />
            <span className={styles.radioIcon} />
            {children && (
                <Text size={sizeToTextSizeMap[size]} tag="div">
                    {children}
                </Text>
            )}
        </label>
    );
});

Radio.displayName = "Radio";
