import React from "react";
import { ClosemediumNavIcon20 } from "@sberbusiness/icons/ClosemediumNavIcon20";
import { ButtonIcon, IButtonIconProps } from "@sber-business/triplex/components/Button/ButtonIcon";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

export interface IConfirmCloseButtonProps extends Omit<IButtonIconProps, "children"> {}

/**
 * Кнопка закрытия.
 */
export const ConfirmCloseButton = React.forwardRef<HTMLButtonElement, IConfirmCloseButtonProps>(
    ({ className, title = "Закрыть", ...props }, ref) => (
        <ButtonIcon
            ref={ref}
            className={classnames(className, "cssClass[confirmCloseButton]")}
            title={title}
            {...props}
        >
            <ClosemediumNavIcon20 />
        </ButtonIcon>
    )
);

ConfirmCloseButton.displayName = "ConfirmCloseButton";
