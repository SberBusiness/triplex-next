import React from "react";
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

export const SizesExample = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "150px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>EComponentSize.SM</div>
            <Badge size={EComponentSize.SM}>
                <Caption size={ECaptionSize.C1} weight={EFontWeightCaption.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text SM
                </Caption>
            </Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>EComponentSize.MD</div>
            <Badge size={EComponentSize.MD}>
                <Text size={ETextSize.B4} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text MD
                </Text>
            </Badge>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "8px", fontSize: "16px", fontWeight: "700" }}>EComponentSize.LG</div>
            <Badge size={EComponentSize.LG}>
                <Text size={ETextSize.B3} weight={EFontWeightText.REGULAR} type={EFontType.PRIMARY_INVERT}>
                    Badge text LG
                </Text>
            </Badge>
        </div>
    </div>
);
