import React from "react";
import { CrossStrokeSrvIcon20 } from "@sberbusiness/icons-next";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";
import { Button, TButtonProps } from "../../Button/Button";
import { EButtonTheme } from "../../Button/enums";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

export interface IConfirmCloseButtonProps extends Omit<TButtonProps, "theme" | "size" | "icon"> {}

/**
 * Кнопка закрытия.
 */
export const ConfirmCloseButton = React.forwardRef<HTMLButtonElement, IConfirmCloseButtonProps>(
    ({ className, title = "Закрыть", ...props }, ref) => (
        <Button
            icon={<CrossStrokeSrvIcon20 paletteIndex={0} />}
            theme={EButtonTheme.SECONDARY}
            size={EComponentSize.MD}
            ref={ref}
            className={clsx(className, styles.confirmCloseButton)}
            title={title}
            {...props}
        />
    ),
);

ConfirmCloseButton.displayName = "ConfirmCloseButton";
