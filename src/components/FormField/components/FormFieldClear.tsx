import React, { useContext } from "react";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { FormFieldContext } from "../FormFieldContext";
import clsx from "clsx";
import { EFormFieldStatus } from "../enums";
import styles from "../styles/FormFieldClear.module.less";

export interface IFormFieldClearProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: never;
}

/** Кнопка очищения введенного значения. */
export const FormFieldClear = React.forwardRef<HTMLSpanElement, IFormFieldClearProps>(
    ({ className, onMouseDown, ...htmlLabelAttributes }, ref) => {
        const { status, focused, hovered, valueExist } = useContext(FormFieldContext);
        const classNames = clsx(
            styles.formFieldClear,
            "hoverable",
            {
                [styles.hidden]: !valueExist || status === EFormFieldStatus.DISABLED || !(focused || hovered),
            },
            className,
        );

        const handleMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            onMouseDown?.(event);
        };

        return (
            <span className={classNames} onMouseDown={handleMouseDown} {...htmlLabelAttributes} ref={ref}>
                <CrossStrokeSrvIcon16 paletteIndex={5} />
            </span>
        );
    },
);

FormFieldClear.displayName = "FormFieldClear";
