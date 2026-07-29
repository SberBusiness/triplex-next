import React from "react";
import { Caption, ECaptionSize, EFontType } from "@sberbusiness/triplex-next";

export const Types = () => (
    <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY}>
                Primary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY}>
                Secondary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY}>
                Tertiary
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.BRAND}>
                Brand
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.INFO}>
                Info
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS}>
                Success
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.WARNING}>
                Warning
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.ERROR}>
                Error
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.DISABLED}>
                Disabled
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SYSTEM}>
                System
            </Caption>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#1F1F22" }}>
            <Caption size={ECaptionSize.C1} type={EFontType.PRIMARY_INVERT}>
                Primary Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.COMPLEMENTARY_INVERT}>
                Complementary Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SECONDARY_INVERT}>
                Secondary Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.TERTIARY_INVERT}>
                Tertiary Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.BRAND_INVERT}>
                Brand Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.INFO_INVERT}>
                Info Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SUCCESS_INVERT}>
                Success Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.WARNING_INVERT}>
                Warning Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.ERROR_INVERT}>
                Error Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.DISABLED_INVERT}>
                Disabled Invert
            </Caption>
            <Caption size={ECaptionSize.C1} type={EFontType.SYSTEM_INVERT}>
                System Invert
            </Caption>
        </div>
    </div>
);
