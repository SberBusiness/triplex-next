import React from "react";
import { ETitleSize } from "../../Typography/enums";
import { TTitleProps } from "../../Typography/Title";
import { Title } from "../../Typography/Title";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/** Свойства компонента ConfirmContentTitle. */
export interface IConfirmContentTitleProps extends Partial<TTitleProps<"h1">> {}

/**
 * Заголовок предупреждения.
 * Обёртка над {@link Title} с дефолтом `size=H3` и отступом до подзаголовка.
 */
export const ConfirmContentTitle = React.forwardRef<HTMLHeadingElement, IConfirmContentTitleProps>(
    ({ children, className, size = ETitleSize.H3, ...rest }, ref) => (
        <Title size={size} className={clsx(styles.confirmContentTitle, className)} {...rest} ref={ref}>
            {children}
        </Title>
    ),
);

ConfirmContentTitle.displayName = "ConfirmContentTitle";
