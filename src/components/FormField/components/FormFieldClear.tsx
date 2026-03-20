import React, { useCallback } from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import styles from "../styles/FormFieldClear.module.less";

/** Свойства компонета FormFieldClear. */
export interface IFormFieldClearProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

/** Кнопка очищения введенного значения. */
export const FormFieldClear = React.forwardRef<HTMLButtonElement, IFormFieldClearProps>(
    ({ className, onMouseDown, ...htmlClearAttributes }, ref) => {
        const handleMouseDown = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
                // Предотвращаем получение фокуса.
                event.preventDefault();
                onMouseDown?.(event);
            },
            [onMouseDown],
        );

        return (
            <ButtonIcon
                className={clsx(styles.formFieldClear, "hoverable", className)}
                tabIndex={-1}
                onMouseDown={handleMouseDown}
                {...htmlClearAttributes}
                ref={ref}
            >
                <CrossStrokeSrvIcon16 paletteIndex={5} />
            </ButtonIcon>
        );
    },
);

FormFieldClear.displayName = "FormFieldClear";
