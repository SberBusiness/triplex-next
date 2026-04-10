import React from "react";
import { Badge, EFontType, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";

export const PlaygroundExample = ({ size }: React.ComponentProps<typeof Badge>) => (
    <Badge size={size}>
        <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
            Badge text
        </Text>
    </Badge>
);
