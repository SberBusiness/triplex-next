import React from "react";
import { CodeText, EFontType } from "@sberbusiness/triplex-next";

export const Types = () => (
    <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CodeText type={EFontType.PRIMARY}>Primary</CodeText>
            <CodeText type={EFontType.COMPLEMENTARY}>Complementary</CodeText>
            <CodeText type={EFontType.SECONDARY}>Secondary</CodeText>
            <CodeText type={EFontType.TERTIARY}>Tertiary</CodeText>
            <CodeText type={EFontType.BRAND}>Brand</CodeText>
            <CodeText type={EFontType.INFO}>Info</CodeText>
            <CodeText type={EFontType.SUCCESS}>Success</CodeText>
            <CodeText type={EFontType.WARNING}>Warning</CodeText>
            <CodeText type={EFontType.ERROR}>Error</CodeText>
            <CodeText type={EFontType.DISABLED}>Disabled</CodeText>
            <CodeText type={EFontType.SYSTEM}>System</CodeText>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", backgroundColor: "#1F1F22" }}>
            <CodeText type={EFontType.PRIMARY_INVERT}>Primary Invert</CodeText>
            <CodeText type={EFontType.COMPLEMENTARY_INVERT}>Complementary Invert</CodeText>
            <CodeText type={EFontType.SECONDARY_INVERT}>Secondary Invert</CodeText>
            <CodeText type={EFontType.TERTIARY_INVERT}>Tertiary Invert</CodeText>
            <CodeText type={EFontType.BRAND_INVERT}>Brand Invert</CodeText>
            <CodeText type={EFontType.INFO_INVERT}>Info Invert</CodeText>
            <CodeText type={EFontType.SUCCESS_INVERT}>Success Invert</CodeText>
            <CodeText type={EFontType.WARNING_INVERT}>Warning Invert</CodeText>
            <CodeText type={EFontType.ERROR_INVERT}>Error Invert</CodeText>
            <CodeText type={EFontType.DISABLED_INVERT}>Disabled Invert</CodeText>
            <CodeText type={EFontType.SYSTEM_INVERT}>System Invert</CodeText>
        </div>
    </div>
);
