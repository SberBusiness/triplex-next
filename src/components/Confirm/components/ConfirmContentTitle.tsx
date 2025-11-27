import React from "react";
import { ETitleSize } from "../../Typography/enums";
import { TTitleProps } from "../../Typography/Title";
import { Title } from "../../Typography/Title";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmContentTitle. */
export interface IConfirmContentTitleProps extends TTitleProps<"h1"> {}

export const ConfirmContentTitle: React.FC<IConfirmContentTitleProps> = ({
    children,
    className,
    size = ETitleSize.H3,
    ...rest
}) => (
    <Title size={size} className={clsx(className, styles.confirmContentTitle)} {...rest}>
        {children}
    </Title>
);

ConfirmContentTitle.displayName = "ConfirmContentTitle";
