import React from "react";
import { Text } from "../../Typography";
import { ETextSize } from "../../Typography/enums";
import { TTextProps } from "../../Typography/Text";

/** Свойства компонента ConfirmContentSubTitle. */
export interface IConfirmContentSubTitleProps extends TTextProps<"div"> {}

export const ConfirmContentSubTitle: React.FC<IConfirmContentSubTitleProps> = ({
    children,
    size = ETextSize.B2,
    ...rest
}) => (
    <Text size={size} tag="div" {...rest}>
        {children}
    </Text>
);

ConfirmContentSubTitle.displayName = "ConfirmContentSubTitle";
