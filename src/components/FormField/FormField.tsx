import React, { useState } from "react";
import clsx from "clsx";
import { FormFieldContext } from "./FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "./consts";
import { EFormFieldStatus } from "./enums";
import { EComponentSize } from "../../enums/EComponentSize";
import { DataAttributes } from "../../types/CoreTypes";
import styles from "./styles/FormField.module.less";

/** Свойства компонента FormField. */
export interface IFormFieldProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "placeholder">, DataAttributes {
    status?: EFormFieldStatus;
    size?: EComponentSize;
}

/** Элемент, отображающий input/select/textarea + label. */
export const FormField: React.FC<IFormFieldProps> = ({
    children,
    className,
    status = EFormFieldStatus.DEFAULT,
    onMouseEnter,
    onMouseLeave,
    style,
    size = EComponentSize.LG,
    ...htmlDivAttributes
}) => {
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [id, setId] = useState("");
    const [postfixWidth, setPostfixWidth] = useState(TARGET_PADDING_X_DEFAULT);
    const [prefixWidth, setPrefixWidth] = useState(TARGET_PADDING_X_DEFAULT);
    const [valueExist, setValueExist] = useState(false);

    const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(true);
        onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
        setHovered(false);
        onMouseLeave?.(event);
    };

    return (
        <FormFieldContext.Provider
            value={{
                status,
                focused,
                hovered,
                id,
                postfixWidth,
                prefixWidth,
                setFocused,
                setId,
                setPostfixWidth,
                setPrefixWidth,
                setValueExist,
                valueExist,
                size,
            }}
        >
            <div
                className={clsx(
                    styles.formField,
                    styles[`size-${size}`],
                    {
                        [styles.active]: focused,
                        [styles.disabled]: status === EFormFieldStatus.DISABLED,
                        [styles.error]: status === EFormFieldStatus.ERROR,
                        [styles.warning]: status === EFormFieldStatus.WARNING,
                    },
                    className,
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-tx={process.env.npm_package_version}
                style={{ paddingLeft: prefixWidth, paddingRight: postfixWidth, ...style }}
                {...htmlDivAttributes}
            >
                {children}
            </div>
        </FormFieldContext.Provider>
    );
};
