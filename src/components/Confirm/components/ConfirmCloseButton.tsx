import React from "react";
import { CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import { ButtonIcon, IButtonIconProps } from "../../Button/ButtonIcon";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

export interface IConfirmCloseButtonProps extends Omit<IButtonIconProps, "children"> {}

/**
 * Кнопка закрытия.
 */
export const ConfirmCloseButton = React.forwardRef<HTMLButtonElement, IConfirmCloseButtonProps>(
    ({ className, title = "Закрыть", ...props }, ref) => (
        <ButtonIcon ref={ref} className={clsx(className, styles.confirmCloseButton)} title={title} {...props}>
            <CrossStrokeSrvIcon20 paletteIndex={0} />
        </ButtonIcon>
    ),
);

ConfirmCloseButton.displayName = "ConfirmCloseButton";
