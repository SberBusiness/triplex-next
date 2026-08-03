import React, { useCallback } from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import styles from "../styles/FormFieldClear.module.less";

/** Свойства компонента FormFieldClear. */
export interface IFormFieldClearProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

/**
 * Кнопка очистки введённого значения.
 *
 * Гасит установку фокуса на mousedown, чтобы поле ввода не теряло фокус при клике по кнопке.
 */
export const FormFieldClear = React.forwardRef<HTMLButtonElement, IFormFieldClearProps>(
    ({ className, onMouseDown, ...restProps }, ref) => {
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
                {...restProps}
                className={clsx(styles.formFieldClear, className)}
                onMouseDown={handleMouseDown}
                ref={ref}
            >
                <CrossStrokeSrvIcon16 paletteIndex={5} />
            </ButtonIcon>
        );
    },
);

FormFieldClear.displayName = "FormFieldClear";
