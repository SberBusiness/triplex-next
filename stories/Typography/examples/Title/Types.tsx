import React from "react";
import { Title, ETitleSize, EFontType } from "@sberbusiness/triplex-next";

export const Types = () => (
    <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY}>
                Primary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.COMPLEMENTARY}>
                Complementary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SECONDARY}>
                Secondary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.TERTIARY}>
                Tertiary
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.BRAND}>
                Brand
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.INFO}>
                Info
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SUCCESS}>
                Success
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.WARNING}>
                Warning
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.ERROR}>
                Error
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.DISABLED}>
                Disabled
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SYSTEM}>
                System
            </Title>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#1F1F22" }}>
            <Title size={ETitleSize.H2} type={EFontType.PRIMARY_INVERT}>
                Primary Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.COMPLEMENTARY_INVERT}>
                Complementary Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SECONDARY_INVERT}>
                Secondary Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.TERTIARY_INVERT}>
                Tertiary Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.BRAND_INVERT}>
                Brand Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.INFO_INVERT}>
                Info Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SUCCESS_INVERT}>
                Success Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.WARNING_INVERT}>
                Warning Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.ERROR_INVERT}>
                Error Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.DISABLED_INVERT}>
                Disabled Invert
            </Title>
            <Title size={ETitleSize.H2} type={EFontType.SYSTEM_INVERT}>
                System Invert
            </Title>
        </div>
    </div>
);
