import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Stepper.
export const designTokensComponentsStepperKeys = [
    "Step_Background_Default",
    "Step_Background_Disabled",
    "Step_Background_Hover",
    "Step_Background_Error",
    "Step_Background_Error_Hover",
    "Step_Background_Warning",
    "Step_Background_Warning_Hover",
    "Step_BorderColor_Focus",
    "Step_BorderColor_Error",
    "Step_BorderColor_Warning",
    "Step_BorderColor_Success",
    "Step_Color_Default",
    "Step_Color_Hover",
    "Step_Color_Disabled",

    "Background",
    "ButtonNext_Background",
    "ButtonPrev_Background",
    "Wrapper_Background",
    "Wrapper_BoxShadow",
] as const;
// Тип, содержащий названия токенов компонента Stepper.
export type TDesignTokensComponentsStepperKeys = (typeof designTokensComponentsStepperKeys)[number];
// Тип, содержащий названия токенов компонента Stepper и их значения.
export type TDesignTokensComponentsStepperValue = Record<TDesignTokensComponentsStepperKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Stepper и их значения в светлой и темной теме.
export type TDesignTokensComponentsStepperValues = Record<TDesignTokensComponentsStepperKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Stepper.
export type TDesignTokensComponentsStepper = { Stepper: TDesignTokensComponentsStepperValue };

// Токены компонента Stepper в светлой и темной темах.
export const Stepper_Tokens: TDesignTokensComponentsStepperValues = {
    Step_Background_Default: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Stepper-Step_Background_Default)
    Step_Background_Hover: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Stepper-Step_Background_Hover)
    Step_Background_Disabled: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Stepper-Step_Background_Disabled)
    Step_Background_Error: [{ ref: "ColorError.100" }, { ref: "ColorError.0" }], // var(--triplex-next-Stepper-Step_Background_Error)
    Step_Background_Error_Hover: [{ ref: "ColorError.90" }, { ref: "ColorError.10" }], // var(--triplex-next-Stepper-Step_Background_Error_Hover)
    Step_Background_Warning: [{ ref: "ColorWarning.100" }, { ref: "ColorWarning.0" }], // var(--triplex-next-Stepper-Step_Background_Warning)
    Step_Background_Warning_Hover: [{ ref: "ColorWarning.90" }, { ref: "ColorWarning.10" }], // var(--triplex-next-Stepper-Step_Background_Warning_Hover)
    Step_BorderColor_Focus: [{ ref: "ColorWarning.80" }, { ref: "ColorWarning.80" }], // var(--triplex-next-Stepper-Step_BorderColor_Focus)
    Step_BorderColor_Error: [{ ref: "ColorError.50" }, { ref: "ColorError.50" }], // var(--triplex-next-Stepper-Step_BorderColor_Error)
    Step_BorderColor_Warning: [{ ref: "ColorWarning.50" }, { ref: "ColorWarning.50" }], // var(--triplex-next-Stepper-Step_BorderColor_Warning)
    Step_BorderColor_Success: [{ ref: "ColorBrand.50" }, { ref: "ColorBrand.50" }], // var(--triplex-next-Stepper-Step_BorderColor_Success)
    Step_Color_Default: [{ ref: "ColorDarkNeutralAlpha.40" }, { ref: "ColorNeutralAlpha.50" }], // var(--triplex-next-Stepper-Step_Color_Default)
    Step_Color_Hover: [{ ref: "ColorDarkNeutralAlpha.0" }, { ref: "ColorNeutralAlpha.0" }], // var(--triplex-next-Stepper-Step_Color_Hover)
    Step_Color_Disabled: [{ ref: "ColorDarkNeutralAlpha.70" }, { ref: "ColorNeutralAlpha.80" }], // var(--triplex-next-Stepper-Step_Color_Disabled)

    ButtonNext_Background: [
        { value: "linear-gradient(to left, #FFFFFF 39.06%, transparent)" },
        { value: "linear-gradient(to left, #181819 39.06%, transparent)" },
    ], // var(--triplex-next-Stepper-ButtonNext_Background)
    ButtonPrev_Background: [
        { value: "linear-gradient(to right, #FFFFFF 39.06%, transparent)" },
        { value: "linear-gradient(to right, #181819 39.06%, transparent)" },
    ], // var(--triplex-next-Stepper-ButtonPrev_Background)

    Background: [{ value: "#FFFFFF" }, { value: "#181819" }], // var(--triplex-next-Stepper-Background)
    Wrapper_Background: [{ value: "linear-gradient(#FFFFFF 64px, transparent 0)" }, { ref: "ColorNeutral.50" }], // var(--triplex-next-Stepper-Wrapper_Background)
    Wrapper_BoxShadow: [{ value: "0 10px 15px 0 rgba(228, 232, 235, 0.5)" }, { value: "none" }], // var(--triplex-next-Stepper-Wrapper_BoxShadow)
};
