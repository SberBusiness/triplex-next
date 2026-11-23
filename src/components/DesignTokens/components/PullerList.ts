import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sberbusiness/triplex-next/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента PullerList.
export const designTokensComponentsPullerListKeys = ["Active_Background", "Selected_Background"] as const;
// Тип, содержащий названия токенов компонента PullerList.
export type TDesignTokensComponentsPullerListKeys = (typeof designTokensComponentsPullerListKeys)[number];
// Тип, содержащий названия токенов компонента PullerList и их значения.
export type TDesignTokensComponentsPullerListValue = Record<TDesignTokensComponentsPullerListKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента PullerList и их значения в светлой и темной теме.
export type TDesignTokensComponentsPullerListValues = Record<TDesignTokensComponentsPullerListKeys, TDesignTokenValues>;
// Тип локальных токенов компонента PullerList.
export type TDesignTokensComponentsPullerList = {
    PullerList: TDesignTokensComponentsPullerListValue;
};

// Токены компонента PullerList в светлой и темной темах.
export const PullerList_Tokens: TDesignTokensComponentsPullerListValues = {
    Active_Background: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.70" }], // var(--triplex-next-PullerList-Active_Background)
    Selected_Background: [{ ref: "ColorNeutral.30" }, { ref: "ColorDarkNeutral.100" }], // var(--triplex-next-PullerList-Selected_Background)
};
