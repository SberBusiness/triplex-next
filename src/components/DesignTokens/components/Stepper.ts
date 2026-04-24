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

    "ButtonWrapper_Background_Prev",
    "ButtonWrapper_Background_Next",
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
    ButtonWrapper_Background_Prev: [
        { value: "linear-gradient(to right, rgba(255,255,255,1) 39.06%, rgba(255,255,255,0) 100%)" },
        { value: "linear-gradient(to right, rgba(38,38,41,1) 39.06%, rgba(38,38,41,0) 100%)" },
    ], // var(--triplex-next-Stepper-ButtonWrapper_Background_Prev)
    ButtonWrapper_Background_Next: [
        { value: "linear-gradient(to left, rgba(255,255,255,1) 39.06%, rgba(255,255,255,0) 100%)" },
        { value: "linear-gradient(to left, rgba(38,38,41,1) 39.06%, rgba(38,38,41,0) 100%)" },
    ], // var(--triplex-next-Stepper-ButtonWrapper_Background_Next)
};
