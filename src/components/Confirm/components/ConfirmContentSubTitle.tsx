import React from "react";
import { Text } from "../../Typography";
import { ETextSize } from "../../Typography/enums";
import { TTextProps } from "../../Typography/Text";
import { ITypographyProps } from "../../Typography/types";

/**
 * Свойства компонента ConfirmContentSubTitle.
 *
 * `tag` берётся строкой из {@link ITypographyProps}, а не из параметра типа
 * {@link Text}: обёртка не полиморфна, тег переопределяется любым именем.
 */
export interface IConfirmContentSubTitleProps
    extends Omit<Partial<TTextProps<"div">>, "tag" | "ref">, Pick<ITypographyProps, "tag"> {}

/**
 * Неполиморфная сигнатура {@link Text} — по той же причине, что и `TitleBase`
 * в ConfirmContentTitle: обёртка обещает строковый `tag` и ref на `HTMLElement`.
 */
const TextBase = Text as React.ForwardRefExoticComponent<
    IConfirmContentSubTitleProps & { size: ETextSize } & React.RefAttributes<HTMLElement>
>;

/**
 * Подзаголовок предупреждения — поясняющий текст под заголовком.
 * Обёртка над {@link Text} с дефолтами `size=B2` и `tag="div"` — тег можно переопределить.
 *
 * Ref типизирован как `HTMLElement`, а не `HTMLDivElement`: переопределённый
 * `tag` меняет тип реального DOM-узла, и обещать `div` было бы неправдой.
 */
export const ConfirmContentSubTitle = React.forwardRef<HTMLElement, IConfirmContentSubTitleProps>(
    ({ children, size = ETextSize.B2, ...rest }, ref) => (
        <TextBase size={size} tag="div" {...rest} ref={ref}>
            {children}
        </TextBase>
    ),
);

ConfirmContentSubTitle.displayName = "ConfirmContentSubTitle";
