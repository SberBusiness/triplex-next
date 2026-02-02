import React, { useContext } from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { FormFieldContext } from "@sberbusiness/triplex-next/components/FormField/FormFieldContext";
import { EFormFieldStatus } from "../enums";
import { ButtonIcon } from "@sberbusiness/triplex-next/components/Button/ButtonIcon";
import styles from "../styles/FormFieldClear.module.less";

/** Свойства компонета FormFieldClear. */
export interface IFormFieldClearProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: never;
}

/** Кнопка очищения введенного значения. */
export const FormFieldClear = React.forwardRef<HTMLButtonElement, IFormFieldClearProps>(
    ({ className, onMouseDown, ...htmlClearAttributes }, ref) => {
        const { status, focused, hovered, valueExist } = useContext(FormFieldContext);
        const classNames = clsx(
            styles.formFieldClear,
            "hoverable",
            {
                [styles.hidden]: !valueExist || status === EFormFieldStatus.DISABLED || !(focused || hovered),
            },
            className,
        );

        const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
            // Предотвращаем получение фокуса.
            event.preventDefault();
            onMouseDown?.(event);
        };

        return (
            <ButtonIcon className={classNames} onMouseDown={handleMouseDown} {...htmlClearAttributes} ref={ref}>
                <CrossStrokeSrvIcon16 paletteIndex={5} />
            </ButtonIcon>
        );
    },
);

FormFieldClear.displayName = "FormFieldClear";
