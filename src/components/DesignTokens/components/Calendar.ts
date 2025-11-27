import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Calendar.
export const designTokensComponentsCalendarKeys = [
    "Background",
    "Background_Shadow",
    "View_Header_Color",
    "View_Item_Background_Default",
    "View_Item_Background_Hover",
    "View_Item_Background_Range",
    "View_Item_Background_Selected_Default",
    "View_Item_Background_Selected_Hover",
    "View_Item_Background_Selected_Muted_Default",
    "View_Item_Background_Selected_Muted_Hover",
    "View_Item_BorderColor_Default",
    "View_Item_BorderColor_Focus",
    "View_Item_Color_Default",
    "View_Item_Color_Hover",
    "View_Item_Color_Disabled",
    "View_Item_Color_Muted",
    "View_Item_Color_Selected",
    "View_Item_Color_Selected_Muted_Default",
    "View_Item_Color_Selected_Muted_Hover",
    "View_Item_Mark_Basic_Background_Default",
    "View_Item_Mark_Basic_Background_Selected_Default",
    "View_Item_Mark_Basic_Background_Selected_Hover",
    "View_Item_Mark_Standard_Background_Default",
    "View_Item_Mark_Standard_Background_Selected_Default",
    "View_Item_Mark_Standard_Background_Selected_Hover",
    "View_Item_Mark_Attention_Background_Default",
    "View_Item_Mark_Attention_Background_Selected_Default",
    "View_Item_Mark_Attention_Background_Selected_Hover",
    "View_Item_Mark_Critical_Background_Default",
    "View_Item_Mark_Critical_Background_Selected_Default",
    "View_Item_Mark_Critical_Background_Selected_Hover",
] as const;
// Тип, содержащий названия токенов компонента Calendar.
export type TDesignTokensComponentsCalendarKeys = (typeof designTokensComponentsCalendarKeys)[number];
// Тип, содержащий названия токенов компонента Calendar и их значения.
export type TDesignTokensComponentsCalendarValue = Record<TDesignTokensComponentsCalendarKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Calendar и их значения в светлой и темной теме.
export type TDesignTokensComponentsCalendarValues = Record<TDesignTokensComponentsCalendarKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Calendar.
export type TDesignTokensComponentsCalendar = { Calendar: TDesignTokensComponentsCalendarValue };

// Токены компонента Calendar в светлой и темной темах.
export const Calendar_Tokens: TDesignTokensComponentsCalendarValues = {
    // Background: [{ value: "rgba(255, 255, 255, .8)" }, { value: "rgba(24, 24, 25, .8)" }], // var(--triplex-next-Calendar-Panel_Background)
    // Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Calendar-Background)

    // Unit_Background_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-next-DropdownList-Background_Default)
    // Unit_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-next-DropdownList-Background_Active)
    // Unit_Background_Selected: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-DropdownList-Background_Active)

    // Unit_Color: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Calendar-Unit_Color)

    // Background: [{ ref: "Basic.100" }, { ref: "Basic.50" }], // var(--triplex-Calendar-Background)

    Background_Shadow: [{ value: "0 2px 7px 0 rgba(31, 31, 34, 0.25)" }, { value: "none" }], // var(--triplex-Calendar-Background_Shadow)

    View_Header_Color: [{ ref: "ColorDarkNeutralAlpha.50" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-Calendar-View_Header_Color)

    View_Item_Background_Default: [{ value: "none" }, { value: "none" }], // var(--triplex-Calendar-View_Item_Background_Default)
    View_Item_Background_Hover: [{ ref: "ColorBrand.60" }, { ref: "ColorBrand.60" }], // var(--triplex-Calendar-View_Item_Background_Hover)
    // View_Item_Background_Range: [{ ref: "ColorNeutral.100" }, { ref: "ColorNeutral.900" }], // var(--triplex-Calendar-View_Item_Background_Range)
    View_Item_Background_Selected_Default: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-Calendar-View_Item_Background_Selected_Default)
    View_Item_Background_Selected_Hover: [{ ref: "ColorBrand.30" }, { ref: "ColorBrand.30" }], // var(--triplex-Calendar-View_Item_Background_Selected_Hover)
    View_Item_Background_Selected_Muted_Default: [{ ref: "ColorBrand.100" }, { ref: "ColorBrand.20" }], // var(--triplex-Calendar-View_Item_Background_Selected_Muted_Default)
    View_Item_Background_Selected_Muted_Hover: [{ ref: "ColorBrand.90" }, { ref: "ColorBrand.10" }], // var(--triplex-Calendar-View_Item_Background_Selected_Muted_Hover)
    // View_Item_BorderColor_Default: [{ ref: "ColorBasic.0" }, { ref: "ColorBasic.0" }], // var(--triplex-Calendar-View_Item_BorderColor_Default)
    // View_Item_BorderColor_Focus: [{ ref: "ColorAccent.50" }, { ref: "ColorAccent.50" }], // var(--triplex-Calendar-View_Item_BorderColor_Focus)
    View_Item_Color_Default: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-Calendar-View_Item_Color_Default)
    View_Item_Color_Hover: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-Calendar-View_Item_Color_Default)
    View_Item_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-Calendar-View_Item_Color_Disabled)
    View_Item_Color_Muted: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.70" }], // var(--triplex-Calendar-View_Item_Color_Muted)
    View_Item_Color_Selected: [{ ref: "ColorNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-Calendar-View_Item_Color_Selected)
    View_Item_Color_Selected_Muted_Default: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-Calendar-View_Item_Color_Selected_Muted_Default)
    View_Item_Color_Selected_Muted_Hover: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-Calendar-View_Item_Color_Selected_Muted_Hover)

    View_Item_Mark_Basic_Background_Default: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorDarkNeutralAlpha.60" }], // var(--triplex-Calendar-View_Item_Mark_Basic_Background_Default)
    View_Item_Mark_Basic_Background_Selected_Default: [
        { ref: "ColorDarkNeutralAlpha.70" },
        { ref: "ColorDarkNeutralAlpha.60" },
    ], // var(--triplex-Calendar-View_Item_Mark_Basic_Background_Selected_Default)
    View_Item_Mark_Basic_Background_Selected_Hover: [
        { ref: "ColorDarkNeutralAlpha.70" },
        { ref: "ColorDarkNeutralAlpha.60" },
    ], // var(--triplex-Calendar-View_Item_Mark_Basic_Background_Selected_Hover)
    View_Item_Mark_Standard_Background_Default: [{ ref: "ColorSuccess.50" }, { ref: "ColorSuccess.50" }], // var(--triplex-Calendar-View_Item_Mark_Standard_Background_Default)
    View_Item_Mark_Standard_Background_Selected_Default: [{ ref: "ColorSuccess.50" }, { ref: "ColorSuccess.50" }], // var(--triplex-Calendar-View_Item_Mark_Standard_Background_Selected_Default)
    View_Item_Mark_Standard_Background_Selected_Hover: [{ ref: "ColorSuccess.50" }, { ref: "ColorSuccess.50" }], // var(--triplex-Calendar-View_Item_Mark_Standard_Background_Selected_Hover)
    View_Item_Mark_Attention_Background_Default: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-Calendar-View_Item_Mark_Attention_Background_Default)
    View_Item_Mark_Attention_Background_Selected_Default: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-Calendar-View_Item_Mark_Attention_Background_Selected_Default)
    View_Item_Mark_Attention_Background_Selected_Hover: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-Calendar-View_Item_Mark_Attention_Background_Selected_Hover)
    View_Item_Mark_Critical_Background_Default: [{ ref: "ColorError.50" }, { ref: "ColorError.50" }], // var(--triplex-Calendar-View_Item_Mark_Critical_Background_Default)
    View_Item_Mark_Critical_Background_Selected_Default: [{ ref: "ColorError.50" }, { ref: "ColorError.50" }], // var(--triplex-Calendar-View_Item_Mark_Critical_Background_Selected_Default)
    View_Item_Mark_Critical_Background_Selected_Hover: [{ ref: "ColorError.50" }, { ref: "ColorError.50" }], // var(--triplex-Calendar-View_Item_Mark_Critical_Background_Selected_Hover)
};
