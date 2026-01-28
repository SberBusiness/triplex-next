import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Avatar.
export const designTokensComponentsAvatarKeys = ["Background"] as const;
// Тип, содержащий названия токенов компонента Avatar.
export type TDesignTokensComponentsAvatarKeys = (typeof designTokensComponentsAvatarKeys)[number];
// Тип, содержащий названия токенов компонента Avatar и их значения.
export type TDesignTokensComponentsAvatarValue = Record<TDesignTokensComponentsAvatarKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Avatar и их значения в светлой и темной теме.
export type TDesignTokensComponentsAvatarValues = Record<TDesignTokensComponentsAvatarKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Avatar.
export type TDesignTokensComponentsAvatar = { Avatar: TDesignTokensComponentsAvatarValue };

// Токены компонента Avatar в светлой и темной темах.
export const Avatar_Tokens: TDesignTokensComponentsAvatarValues = {
    Background: [{ ref: "ColorNeutral.50" }, { ref: "ColorDarkNeutral.90" }], // var(--triplex-next-Avatar-Background)
};
