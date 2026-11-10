import React, { useCallback } from "react";
import clsx from "clsx";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon } from "../../Button/ButtonIcon";
import styles from "../styles/FormFieldClear.module.less";

/** Нативные свойства кнопки. Иконку задаёт FormFieldClear. */
export interface IFormFieldClearProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {}

/**
 * Кнопка очистки введённого значения.
 *
 * Передайте очистку значения в onClick, а доступное имя в aria-label или aria-labelledby.
 * На mousedown отменяет перенос фокуса на кнопку перед вызовом пользовательского onMouseDown.
 */
export const FormFieldClear = React.forwardRef<HTMLButtonElement, IFormFieldClearProps>(
    ({ className, onMouseDown, ...restProps }, ref) => {
        const handleMouseDown = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
            (event) => {
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
