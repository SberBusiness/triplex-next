import React from "react";
import { Text } from "../../Typography";
import { ETextSize } from "../../Typography/enums";
import { TTextProps } from "../../Typography/Text";

/** Свойства компонента ConfirmContentSubTitle. */
export interface IConfirmContentSubTitleProps extends Partial<TTextProps<"div">> {}

/**
 * Подзаголовок предупреждения — поясняющий текст под заголовком.
 * Обёртка над {@link Text} с дефолтами `size=B2` и `tag="div"` — тег можно переопределить.
 */
export const ConfirmContentSubTitle = React.forwardRef<HTMLDivElement, IConfirmContentSubTitleProps>(
    ({ children, size = ETextSize.B2, ...rest }, ref) => (
        <Text size={size} tag="div" {...rest} ref={ref}>
            {children}
        </Text>
    ),
);

ConfirmContentSubTitle.displayName = "ConfirmContentSubTitle";
