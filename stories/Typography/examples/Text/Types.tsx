import React from "react";
import { Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";

export const Types = () => (
    <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY}>
                Primary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SECONDARY}>
                Secondary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.TERTIARY}>
                Tertiary
            </Text>
            <Text size={ETextSize.B2} type={EFontType.BRAND}>
                Brand
            </Text>
            <Text size={ETextSize.B2} type={EFontType.INFO}>
                Info
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SUCCESS}>
                Success
            </Text>
            <Text size={ETextSize.B2} type={EFontType.WARNING}>
                Warning
            </Text>
            <Text size={ETextSize.B2} type={EFontType.ERROR}>
                Error
            </Text>
            <Text size={ETextSize.B2} type={EFontType.DISABLED}>
                Disabled
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SYSTEM}>
                System
            </Text>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#1F1F22" }}>
            <Text size={ETextSize.B2} type={EFontType.PRIMARY_INVERT}>
                Primary Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.COMPLEMENTARY_INVERT}>
                Complementary Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SECONDARY_INVERT}>
                Secondary Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.TERTIARY_INVERT}>
                Tertiary Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.BRAND_INVERT}>
                Brand Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.INFO_INVERT}>
                Info Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SUCCESS_INVERT}>
                Success Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.WARNING_INVERT}>
                Warning Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.ERROR_INVERT}>
                Error Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.DISABLED_INVERT}>
                Disabled Invert
            </Text>
            <Text size={ETextSize.B2} type={EFontType.SYSTEM_INVERT}>
                System Invert
            </Text>
        </div>
    </div>
);
