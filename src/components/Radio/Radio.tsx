import React, { useRef } from "react";
import { ERadioSize } from "./enum";
import clsx from "clsx";
import styles from "./styles/Radio.module.less";

/** Свойства компонента Radio. */
export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
    /** Объект label-атрибутов. */
    labelAttributes?: React.LabelHTMLAttributes<HTMLLabelElement>;
    /** Размер радио-кнопки. */
    size?: ERadioSize;
}

/** Радио-кнопка с описанием. */
export const Radio = React.forwardRef<HTMLInputElement, IRadioProps>((props, ref) => {
    const {
        children,
        className,
        onFocus,
        onBlur,
        disabled,
        labelAttributes,
        size = ERadioSize.MD,
        ...inputAttributes
    } = props;
    const classNames = clsx(styles.radio, className, styles[size]);
    const classNamesLabel = clsx(
        styles.label,
        styles[size],
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

    return (
        <label {...labelAttributes} className={classNamesLabel} data-tx={process.env.npm_package_version}>
            <input
                type="radio"
                className={classNames}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                {...inputAttributes}
                ref={setRef}
            />
            <span className={styles.radioIcon} />
            {children}
        </label>
    );
});

Radio.displayName = "Radio";
