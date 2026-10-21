import React from "react";
import { CrossStrokeSrvIcon16 } from "@sberbusiness/icons-next";
import { ButtonIcon, IButtonIconProps } from "../Button/ButtonIcon";

/** Свойства компонента PullerClose. */
export interface IPullerCloseProps extends Omit<IButtonIconProps, "children"> {
    /** Не принимается: иконку-крестик кнопка рендерит сама. */
    children?: never;
}

/** Кнопка закрытия Puller. */
export const PullerClose = React.forwardRef<HTMLButtonElement, IPullerCloseProps>((props, ref) => (
    <ButtonIcon {...props} ref={ref}>
        <CrossStrokeSrvIcon16 paletteIndex={5} />
    </ButtonIcon>
));

PullerClose.displayName = "PullerClose";
