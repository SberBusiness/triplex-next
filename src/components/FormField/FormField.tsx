import React, { useState } from "react";
import { FormFieldContext } from "./FormFieldContext";
import { TARGET_PADDING_X_DEFAULT } from "./consts";
import clsx from "clsx";
import styles from "./styles/FormField.module.less";
import { EFormFieldStatus } from "./enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

/** Свойства компонента FormField. */
export interface IFormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
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
                    {
                        [styles.active]: focused,
                        [styles.disabled]: status === EFormFieldStatus.DISABLED,
                        [styles.error]: status === EFormFieldStatus.ERROR,
                        [styles.warning]: status === EFormFieldStatus.WARNING,
                        [styles[`size-${size}`]]: size,
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
