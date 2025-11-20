import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Card.
export const designTokensComponentsCardKeys = [
    // Static card backgrounds (CardStatic)
    "Static_General_Background",
    "Static_Secondary_Background",

    // Action card backgrounds (CardAction)
    "Action_General_Background",
    "Action_General_Background_Hover",
    "Action_General_Background_Selected",
    "Action_General_Background_Selected_Hover",

    "Action_Secondary_Background",
    "Action_Secondary_Background_Hover",
    "Action_Secondary_Background_Selected",
    "Action_Secondary_Background_Selected_Hover",

    // Shadow
    "Shadow_Default",
    "Shadow_Focus",
    "Shadow_Hover",
    "Shadow_Selected",
    "Shadow_Selected_Hover",
] as const;
// Тип, содержащий названия токенов компонента Card.
export type TDesignTokensComponentsCardKeys = (typeof designTokensComponentsCardKeys)[number];
// Тип, содержащий названия токенов компонента Card и их значения.
export type TDesignTokensComponentsCardValue = Record<TDesignTokensComponentsCardKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Card и их значения в светлой и темной теме.
export type TDesignTokensComponentsCardValues = Record<TDesignTokensComponentsCardKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Card.
export type TDesignTokensComponentsCard = { Card: TDesignTokensComponentsCardValue };

// Токены компонента Card в светлой и темной темах.
export const Card_Tokens: TDesignTokensComponentsCardValues = {
    // Static (CardStatic)
    Static_General_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Card-Static_General_Background)
    Static_Secondary_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Card-Static_Secondary_Background)

    // Action (CardAction)
    Action_General_Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.50" }], // var(--triplex-next-Card-Action_General_Background)
    Action_General_Background_Hover: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.60" }], // var(--triplex-next-Card-Action_General_Background_Hover)
    Action_General_Background_Selected: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Card-Action_General_Background_Selected)
    Action_General_Background_Selected_Hover: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.80" }], // var(--triplex-next-Card-Action_General_Background_Selected_Hover)

    Action_Secondary_Background: [{ ref: "ColorNeutral.90" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-Card-Action_Secondary_Background)
    Action_Secondary_Background_Hover: [{ ref: "ColorNeutral.70" }, { value: "none" }], // var(--triplex-next-Card-Action_Secondary_Background_Hover)
    Action_Secondary_Background_Selected: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Card-Action_Secondary_Background_Selected)
    Action_Secondary_Background_Selected_Hover: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-Card-Action_Secondary_Background_Selected_Hover)

    // Shadow
    Shadow_Default: [{ value: "0 2px 12px 0 rgba(31, 31, 34, 0.12)" }, { value: "none" }], // var(--triplex-next-Card-Shadow_Default)
    Shadow_Focus: [{ value: "inset 0 0 0 1px #FFD169" }, { value: "inset 0 0 0 1px #FFD169" }], // var(--triplex-next-Card-Shadow_Focus)
    Shadow_Hover: [{ value: "0 4px 12px 0 rgba(31, 31, 34, 0.16)" }, { value: "none" }], // var(--triplex-next-Card-Shadow_Hover)
    Shadow_Selected: [{ value: "inset 0 0 0 1px #21A19A" }, { value: "inset 0 0 0 1px #21A19A" }], // var(--triplex-next-Card-Shadow_Selected)
    Shadow_Selected_Hover: [{ value: "inset 0 0 0 1px #19BDB0" }, { value: "inset 0 0 0 1px #19BDB0" }], // var(--triplex-next-Card-Shadow_Selected_Hover)
};
