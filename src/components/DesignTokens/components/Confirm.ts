import {
    TDesignTokenValue,
    TDesignTokenValues,
} from "@sber-business/triplex/components/DesignTokens/types/DesignTokenTypes";

// Название токенов компонента Confirm.
export const designTokensComponentsConfirmKeys = ["Background", "Shadow"] as const;
// Тип, содержащий названия токенов компонента Confirm.
export type TDesignTokensComponentsConfirmKeys = (typeof designTokensComponentsConfirmKeys)[number];
// Тип, содержащий названия токенов компонента Confirm и их значения.
export type TDesignTokensComponentsConfirmValue = Record<TDesignTokensComponentsConfirmKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Confirm и их значения в светлой и темной теме.
export type TDesignTokensComponentsConfirmValues = Record<TDesignTokensComponentsConfirmKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Confirm.
export type TDesignTokensComponentsConfirm = { Confirm: TDesignTokensComponentsConfirmValue };

// Токены компонента Confirm в светлой и темной темах.
export const Confirm_Tokens: TDesignTokensComponentsConfirmValues = {
    Background: [{ ref: "Error.100" }, { ref: "Basic.700" }], // var(--triplex-Confirm-Background)
    Shadow: [{ value: "0 -1px 0 0 #C11030 inset" }, { value: "0 -1px 0 0 #DB1237 inset" }], // var(--triplex-Confirm-Shadow)
};
