import React from "react";
import { Title } from "@sber-business/triplex/components/Typography/Title";
import { ETitleSize } from "@sber-business/triplex/components/Typography/enums";
import { EScreenWidth } from "@sber-business/triplex/enums/EScreenWidth";

/** Свойства компонента ConfirmContentTitle. */
export interface IConfirmContentTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const ConfirmContentTitle: React.FC<IConfirmContentTitleProps> = ({ children, ...htmlAttributes }) => (
    <Title
        size={window.matchMedia(`(max-width: ${EScreenWidth.SM_MAX})`).matches ? ETitleSize.H4 : ETitleSize.H2}
        {...htmlAttributes}
    >
        {children}
    </Title>
);

ConfirmContentTitle.displayName = "ConfirmContentTitle";
