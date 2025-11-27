import React from "react";
import { ETitleSize } from "../../Typography/enums";
import { TTitleProps } from "../../Typography/Title";
import { Title } from "../../Typography/Title";

/** Свойства компонента ConfirmContentTitle. */
export interface IConfirmContentTitleProps extends TTitleProps<"h1"> {}

export const ConfirmContentTitle: React.FC<IConfirmContentTitleProps> = ({
    children,
    size = ETitleSize.H3,
    ...rest
}) => (
    <Title size={size} {...rest}>
        {children}
    </Title>
);

ConfirmContentTitle.displayName = "ConfirmContentTitle";
