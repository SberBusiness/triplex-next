import React from "react";
import { ETitleSize } from "../../Typography/enums";
import { TTitleProps } from "../../Typography/Title";
import { Title } from "../../Typography/Title";
import { ITypographyProps } from "../../Typography/types";
import clsx from "clsx";
import styles from "../styles/Confirm.module.less";

/**
 * Свойства компонента ConfirmContentTitle.
 *
 * `tag` берётся строкой из {@link ITypographyProps}, а не из параметра типа
 * {@link Title}: обёртка не полиморфна, тег переопределяется любым именем.
 */
export interface IConfirmContentTitleProps
    extends Omit<Partial<TTitleProps<"h1">>, "tag" | "ref">, Pick<ITypographyProps, "tag"> {}

/**
 * Неполиморфная сигнатура {@link Title} — такая же, как в React 18-ветке:
 * строковый `tag` и ref на `HTMLElement`. Здесь Typography полиморфна и выводит
 * тип ref из `tag`, поэтому расхождение веток локализовано приведением;
 * реализация `Title` и так принимает `ForwardedRef<HTMLElement>`.
 */
const TitleBase = Title as React.ForwardRefExoticComponent<
    IConfirmContentTitleProps & { size: ETitleSize } & React.RefAttributes<HTMLElement>
>;

/**
 * Заголовок предупреждения.
 * Обёртка над {@link Title} с дефолтом `size=H3` и отступом до подзаголовка.
 *
 * Ref типизирован как `HTMLElement`, а не `HTMLHeadingElement`: тег
 * переопределяется через `tag` (см. Confirm-ai.md), и тогда в DOM окажется
 * не заголовок.
 */
export const ConfirmContentTitle = React.forwardRef<HTMLElement, IConfirmContentTitleProps>(
    ({ children, className, size = ETitleSize.H3, ...rest }, ref) => (
        <TitleBase size={size} className={clsx(styles.confirmContentTitle, className)} {...rest} ref={ref}>
            {children}
        </TitleBase>
    ),
);

ConfirmContentTitle.displayName = "ConfirmContentTitle";
