import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента ModalWindow.
export const designTokensComponentsModalWindowKeys = ["Background", "Backdrop_Background"] as const;
// Тип, содержащий названия токенов компонента ModalWindow.
export type TDesignTokensComponentsModalWindowKeys = (typeof designTokensComponentsModalWindowKeys)[number];
// Тип, содержащий названия токенов компонента ModalWindow и их значения.
export type TDesignTokensComponentsModalWindowValue = Record<TDesignTokensComponentsModalWindowKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента ModalWindow и их значения в светлой и темной теме.
export type TDesignTokensComponentsModalWindowValues = Record<
    TDesignTokensComponentsModalWindowKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента ModalWindow.
export type TDesignTokensComponentsModalWindow = { ModalWindow: TDesignTokensComponentsModalWindowValue };

// Токены компонента ModalWindow в светлой и темной темах.
export const ModalWindow_Tokens: TDesignTokensComponentsModalWindowValues = {
    Background: [{ ref: "ColorNeutral.70" }, { ref: "ColorDarkNeutral.20" }], // var(--triplex-next-ModalWindow-Background)
    Backdrop_Background: [{ value: "rgba(79, 79, 82, .5)" }, { value: "rgba(0, 0, 0, .5)" }], // var(--triplex-next-ModalWindow-Backdrop_Background)
};
