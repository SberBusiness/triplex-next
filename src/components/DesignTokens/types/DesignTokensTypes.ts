import { TDesignTokenValue } from "./DesignTokenTypes";
import { TDesignTokensComponentsButton, TDesignTokensComponentsInput } from "../components";

// Название токенов группы BasicAlpha.
export const designTokensCoreGroupBasicAlphaKeys = ["100", "90", "80", "70", "60", "40", "0"] as const;
// Название токенов группы Brand.
export const designTokensCoreGroupBrandKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы DarkBasicAlpha.
export const designTokensCoreGroupDarkBasicAlphaKeys = ["100", "90", "80", "70", "60", "40", "0"] as const;
// Название токенов группы DarkNeutralAlpha.
export const designTokensCoreGroupDarkNeutralAlphaKeys = ["70", "50"] as const;
// Название токенов группы DarkNeutral.
export const designTokensCoreGroupDarkNeutralKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы Error.
export const designTokensCoreGroupErrorKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы Info.
export const designTokensCoreGroupInfoKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы NeutralAlpha.
export const designTokensCoreGroupNeutralAlphaKeys = ["100", "90", "40", "30", "20", "0"] as const;
// Название токенов группы Neutral.
export const designTokensCoreGroupNeutralKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы Success.
export const designTokensCoreGroupSuccessKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;
// Название токенов группы Warning.
export const designTokensCoreGroupWarningKeys = [
    "100",
    "90",
    "80",
    "70",
    "60",
    "50",
    "40",
    "30",
    "20",
    "10",
    "0",
] as const;

// Тип, содержащий названия токенов группы BasicAlpha.
export type TDesignTokensCoreGroupBasicAlphaKeys = (typeof designTokensCoreGroupBasicAlphaKeys)[number];
// Тип, содержащий названия токенов группы Brand.
export type TDesignTokensCoreGroupBrandKeys = (typeof designTokensCoreGroupBrandKeys)[number];
// Тип, содержащий названия токенов группы DarkBasicAlpha.
export type TDesignTokensCoreGroupDarkBasicAlphaKeys = (typeof designTokensCoreGroupDarkBasicAlphaKeys)[number];
// Тип, содержащий названия токенов группы DarkNeutralAlpha.
export type TDesignTokensCoreGroupDarkNeutralAlphaKeys = (typeof designTokensCoreGroupDarkNeutralAlphaKeys)[number];
// Тип, содержащий названия токенов группы DarkNeutral.
export type TDesignTokensCoreGroupDarkNeutralKeys = (typeof designTokensCoreGroupDarkNeutralKeys)[number];
// Тип, содержащий названия токенов группы Error.
export type TDesignTokensCoreGroupErrorKeys = (typeof designTokensCoreGroupErrorKeys)[number];
// Тип, содержащий названия токенов группы Info.
export type TDesignTokensCoreGroupInfoKeys = (typeof designTokensCoreGroupInfoKeys)[number];
// Тип, содержащий названия токенов группы NeutralAlpha.
export type TDesignTokensCoreGroupNeutralAlphaKeys = (typeof designTokensCoreGroupNeutralAlphaKeys)[number];
// Тип, содержащий названия токенов группы Neutral.
export type TDesignTokensCoreGroupNeutralKeys = (typeof designTokensCoreGroupNeutralKeys)[number];
// Тип, содержащий названия токенов группы Success.
export type TDesignTokensCoreGroupSuccessKeys = (typeof designTokensCoreGroupSuccessKeys)[number];
// Тип, содержащий названия токенов группы Warning.
export type TDesignTokensCoreGroupWarningKeys = (typeof designTokensCoreGroupWarningKeys)[number];

// Тип, содержащий названия токенов группы BasicAlpha и их значения.
export type TDesignTokensCoreGroupBasicAlphaValue = Record<TDesignTokensCoreGroupBasicAlphaKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Brand и их значения.
export type TDesignTokensCoreGroupBrandValue = Record<TDesignTokensCoreGroupBrandKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы DarkBasicAlpha и их значения.
export type TDesignTokensCoreGroupDarkBasicAlphaValue = Record<
    TDesignTokensCoreGroupDarkBasicAlphaKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов группы DarkNeutralAlpha и их значения.
export type TDesignTokensCoreGroupDarkNeutralAlphaValue = Record<
    TDesignTokensCoreGroupDarkNeutralAlphaKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов группы DarkNeutral и их значения.
export type TDesignTokensCoreGroupDarkNeutralValue = Record<TDesignTokensCoreGroupDarkNeutralKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Error и их значения.
export type TDesignTokensCoreGroupErrorValue = Record<TDesignTokensCoreGroupErrorKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Info и их значения.
export type TDesignTokensCoreGroupInfoValue = Record<TDesignTokensCoreGroupInfoKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы NeutralAlpha и их значения.
export type TDesignTokensCoreGroupNeutralAlphaValue = Record<TDesignTokensCoreGroupNeutralAlphaKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Neutral и их значения.
export type TDesignTokensCoreGroupNeutralValue = Record<TDesignTokensCoreGroupNeutralKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Success и их значения.
export type TDesignTokensCoreGroupSuccessValue = Record<TDesignTokensCoreGroupSuccessKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Warning и их значения.
export type TDesignTokensCoreGroupWarningValue = Record<TDesignTokensCoreGroupWarningKeys, TDesignTokenValue>;

// Тип токенов группы BasicAlpha.
export type TDesignTokensCoreGroupBasicAlpha = { ColorBasicAlpha: TDesignTokensCoreGroupBasicAlphaValue };
// Тип токенов группы Brand.
export type TDesignTokensCoreGroupBrand = { ColorBrand: TDesignTokensCoreGroupBrandValue };
// Тип токенов группы DarkBasicAlpha.
export type TDesignTokensCoreGroupDarkBasicAlpha = { ColorDarkBasicAlpha: TDesignTokensCoreGroupDarkBasicAlphaValue };
// Тип токенов группы DarkNeutralAlpha.
export type TDesignTokensCoreGroupDarkNeutralAlpha = {
    ColorDarkNeutralAlpha: TDesignTokensCoreGroupDarkNeutralAlphaValue;
};
// Тип токенов группы DarkNeutral.
export type TDesignTokensCoreGroupDarkNeutral = { ColorDarkNeutral: TDesignTokensCoreGroupDarkNeutralValue };
// Тип токенов группы Error.
export type TDesignTokensCoreGroupError = { ColorError: TDesignTokensCoreGroupErrorValue };
// Тип токенов группы Info.
export type TDesignTokensCoreGroupInfo = { ColorInfo: TDesignTokensCoreGroupInfoValue };
// Тип токенов группы NeutralAlpha.
export type TDesignTokensCoreGroupNeutralAlpha = { ColorNeutralAlpha: TDesignTokensCoreGroupNeutralAlphaValue };
// Тип токенов группы Neutral.
export type TDesignTokensCoreGroupNeutral = { ColorNeutral: TDesignTokensCoreGroupNeutralValue };
// Тип токенов группы Success.
export type TDesignTokensCoreGroupSuccess = { ColorSuccess: TDesignTokensCoreGroupSuccessValue };
// Тип токенов группы Warning.
export type TDesignTokensCoreGroupWarning = { ColorWarning: TDesignTokensCoreGroupWarningValue };

// Тип глобальных токенов.
export type TDesignTokensCore = TDesignTokensCoreGroupBasicAlpha &
    TDesignTokensCoreGroupBrand &
    TDesignTokensCoreGroupDarkBasicAlpha &
    TDesignTokensCoreGroupDarkNeutralAlpha &
    TDesignTokensCoreGroupDarkNeutral &
    TDesignTokensCoreGroupError &
    TDesignTokensCoreGroupInfo &
    TDesignTokensCoreGroupNeutralAlpha &
    TDesignTokensCoreGroupNeutral &
    TDesignTokensCoreGroupSuccess &
    TDesignTokensCoreGroupWarning;

// Тип локальных токенов(токенов компонентов).
export type TDesignTokensComponents = TDesignTokensComponentsButton & TDesignTokensComponentsInput;

// Тип токенов, включающий core токены и токены компонентов.
export type TDesignTokens = TDesignTokensCore & TDesignTokensComponents;

type TCreatePartialTokens<Type> = {
    [Property in keyof Type]?: TCreatePartialTokens<Type[Property]>;
};

// Тип токенов, включающий core токены и токены компонентов со всеми не обязательными свойствами.
export type TDesignTokensPartial = TCreatePartialTokens<TDesignTokens>;

// Тип, чтобы можно было итерировать объекты типа TDesignTokensCore;
export type TDesignTokensCoreWithIndex = TDesignTokensCore & {
    [key: string]: {
        [key: string]: TDesignTokenValue;
    };
};

// Тип, чтобы можно было итерировать объекты типа TDesignTokensComponents;
export type TDesignTokensComponentsWithIndex = TDesignTokensComponents & {
    [key: string]: {
        [key: string]: TDesignTokenValue;
    };
};

// Абстрактный тип группы токенов, не привязанный к названиям токенов.
export type TDesignTokensGroupAbstract = {
    [tokenGroup: string]: {
        [tokenTitle: string]: TDesignTokenValue;
    };
};
