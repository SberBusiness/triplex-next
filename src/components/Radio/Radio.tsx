import React from "react";
import { ERadioSize } from "./enum";
import clsx from "clsx";
import { Text, ETextSize } from "../Typography";
import styles from "./styles/Radio.module.less";

/** Свойства компонента Radio. */
export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Размер радио-кнопки. */
    size?: ERadioSize;
}

const mapRadioSizeToTextSize = {
    [ERadioSize.LG]: ETextSize.B2,
    [ERadioSize.MD]: ETextSize.B3,
};

/** Радио-кнопка с описанием. */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const { children, className, disabled, labelAttributes, size = ERadioSize.MD, ...inputAttributes } = props;
    const classNames = clsx(styles.radio, className, styles[size]);
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
            {children && <Text size={mapRadioSizeToTextSize[size]}>{children}</Text>}
        </label>
    );
});

Radio.displayName = "Radio";
