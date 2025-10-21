import React from "react";
import { ClosemediumNavIcon20 } from "@sberbusiness/icons/ClosemediumNavIcon20";
import { ButtonIcon, IButtonIconProps } from "@sber-business/triplex/components/Button/ButtonIcon";
import { classnames } from "@sber-business/triplex/utils/classnames/classnames";

export interface ILightBoxSideOverlayCloseButtonProps extends Omit<IButtonIconProps, "children"> {}

/**
 * Кнопка закрытия SideOverlay.
 */
export const LightBoxSideOverlayCloseButton = React.forwardRef<HTMLButtonElement, ILightBoxSideOverlayCloseButtonProps>(
    ({ className, title = "Закрыть", ...props }, ref) => (
        <ButtonIcon
            className={classnames(className, "cssClass[lightBoxSideOverlayCloseButton]")}
            title={title}
            {...props}
            ref={ref}
        >
            <ClosemediumNavIcon20 />
        </ButtonIcon>
    )
);

LightBoxSideOverlayCloseButton.displayName = "LightBoxSideOverlayCloseButton";
