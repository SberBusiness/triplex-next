import { TDesignTokenValue, TDesignTokenValues } from "../types/DesignTokenTypes";

// Название токенов компонента Notification.
export const designTokensComponentsNotificationKeys = ["Background", "Color", "Shadow", "TimeColor"] as const;
// Тип, содержащий названия токенов компонента Notification.
export type TDesignTokensComponentsNotificationKeys = (typeof designTokensComponentsNotificationKeys)[number];
// Тип, содержащий названия токенов компонента Notification и их значения.
export type TDesignTokensComponentsNotificationValue = Record<
    TDesignTokensComponentsNotificationKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов компонента Notification и их значения в светлой и темной теме.
export type TDesignTokensComponentsNotificationValues = Record<
    TDesignTokensComponentsNotificationKeys,
    TDesignTokenValues
>;
// Тип локальных токенов компонента Notification.
export type TDesignTokensComponentsNotification = { Notification: TDesignTokensComponentsNotificationValue };

// Токены компонента Notification в светлой и темной темах.
export const Notification_Tokens: TDesignTokensComponentsNotificationValues = {
    Background: [{ ref: "ColorNeutral.100" }, { ref: "ColorDarkNeutral.30" }], // var(--triplex-next-Notification-Background)
    Color: [{ ref: "ColorDarkNeutral.30" }, { ref: "ColorNeutral.100" }], // var(--triplex-next-Notification-Color)
    TimeColor: [{ value: "rgba(31, 31, 34, 0.65)" }, { value: "rgba(255, 255, 255, 0.55)" }], // var(--triplex-next-Notification-TimeColor)
    Shadow: [{ value: "0px 2px 7px rgba(31, 31, 34, 0.25)" }, { value: "0px 2px 7px rgba(0, 0, 0, 0.35)" }], // var(--triplex-next-Notification-Shadow)
};
