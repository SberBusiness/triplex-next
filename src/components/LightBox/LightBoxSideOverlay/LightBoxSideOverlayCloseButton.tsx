import React from "react";
import { CrossStrokeSrvIcon32 } from "@sberbusiness/icons-next";
import { ButtonIcon, IButtonIconProps } from "../../Button/ButtonIcon";
import clsx from "clsx";
import styles from "./styles/LightBoxSideOverlayCloseButton.module.less";

export interface ILightBoxSideOverlayCloseButtonProps extends Omit<IButtonIconProps, "children"> {}

/**
 * Кнопка закрытия SideOverlay.
 */
export const LightBoxSideOverlayCloseButton = React.forwardRef<HTMLButtonElement, ILightBoxSideOverlayCloseButtonProps>(
    ({ className, title = "Закрыть", ...props }, ref) => (
        <ButtonIcon
            className={clsx(className, styles.lightBoxSideOverlayCloseButton)}
            title={title}
            {...props}
            ref={ref}
        >
            <CrossStrokeSrvIcon32 paletteIndex={0} />
        </ButtonIcon>
    ),
);

LightBoxSideOverlayCloseButton.displayName = "LightBoxSideOverlayCloseButton";
