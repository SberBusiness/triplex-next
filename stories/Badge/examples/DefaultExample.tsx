import React from "react";
import { Badge, EComponentSize, EFontType, EFontWeightText, ETextSize, Text } from "@sberbusiness/triplex-next";

export const DefaultExample = () => (
    <Badge size={EComponentSize.MD}>
        <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
            Badge text
        </Text>
    </Badge>
);
