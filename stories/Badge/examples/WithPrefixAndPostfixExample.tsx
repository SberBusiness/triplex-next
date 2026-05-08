import React from "react";
import {
    PercentsmallStrokeSrvIcon16,
    PercentsmallStrokeSrvIcon20,
    PercentsmallStrokeSrvIcon24,
} from "@sberbusiness/icons-next";
import {
    Badge,
    Caption,
    ECaptionSize,
    EComponentSize,
    EFontType,
    EFontWeightCaption,
    EFontWeightText,
    ETextSize,
    Text,
} from "@sberbusiness/triplex-next";

export const WithPrefixAndPostfixExample = () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Badge
            size={EComponentSize.SM}
            prefix={<PercentsmallStrokeSrvIcon16 paletteIndex={10} />}
            postfix={<PercentsmallStrokeSrvIcon16 paletteIndex={10} />}
        >
            <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text SM
            </Caption>
        </Badge>
        <Badge
            size={EComponentSize.MD}
            prefix={<PercentsmallStrokeSrvIcon20 paletteIndex={10} />}
            postfix={<PercentsmallStrokeSrvIcon20 paletteIndex={10} />}
        >
            <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text MD
            </Text>
        </Badge>
        <Badge
            size={EComponentSize.LG}
            prefix={<PercentsmallStrokeSrvIcon24 paletteIndex={10} />}
            postfix={<PercentsmallStrokeSrvIcon24 paletteIndex={10} />}
        >
            <Text size={ETextSize.B3} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                Badge text LG
            </Text>
        </Badge>
    </div>
);
