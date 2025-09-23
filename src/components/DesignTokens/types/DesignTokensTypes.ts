import { TDesignTokenValue } from "./DesignTokenTypes";
import {
    TDesignTokensComponentsButton,
    TDesignTokensComponentsCheckbox,
    TDesignTokensComponentsRadio,
    TDesignTokensComponentsTypography,
    TDesignTokensComponentsLink,
    TDesignTokensComponentsLoader,
    TDesignTokensComponentsFormField,
    TDesignTokensComponentsAlertContext,
    TDesignTokensComponentsAlertProcess,
    TDesignTokensComponentsDropdown,
    TDesignTokensComponentsDropdownList,
    TDesignTokensComponentsDropdownMobile,
    TDesignTokensComponentsDropdownMobileList,
    TDesignTokensComponentsOverlay,
    TDesignTokensComponentsListItem,
    TDesignTokensComponentsListItemControlsButton,
    TDesignTokensComponentsListMaster,
    TDesignTokensComponentsBody,
    TDesignTokensComponentsUploadZone,
    TDesignTokensComponentsPagination,
    TDesignTokensComponentsCard,
} from "../components";

// Название токенов группы ColorBrand.
export const designTokensCoreGroupColorBrandKeys = [
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
// Название токенов группы ColorDarkNeutralAlpha.
export const designTokensCoreGroupColorDarkNeutralAlphaKeys = [
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
// Название токенов группы ColorDarkNeutral.
export const designTokensCoreGroupColorDarkNeutralKeys = [
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
// Название токенов группы ColorError.
export const designTokensCoreGroupColorErrorKeys = [
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
// Название токенов группы ColorInfo.
export const designTokensCoreGroupColorInfoKeys = [
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
// Название токенов группы ColorNeutralAlpha.
export const designTokensCoreGroupColorNeutralAlphaKeys = [
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
// Название токенов группы ColorNeutral.
export const designTokensCoreGroupColorNeutralKeys = [
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
// Название токенов группы ColorSuccess.
export const designTokensCoreGroupColorSuccessKeys = [
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
// Название токенов группы ColorSystem.
export const designTokensCoreGroupColorSystemKeys = [
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
// Название токенов группы ColorWarning.
export const designTokensCoreGroupColorWarningKeys = [
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

// Тип, содержащий названия токенов группы ColorBrand.
export type TDesignTokensCoreGroupColorBrandKeys = (typeof designTokensCoreGroupColorBrandKeys)[number];
// Тип, содержащий названия токенов группы ColorDarkNeutralAlpha.
export type TDesignTokensCoreGroupColorDarkNeutralAlphaKeys =
    (typeof designTokensCoreGroupColorDarkNeutralAlphaKeys)[number];
// Тип, содержащий названия токенов группы DarkNeutral.
export type TDesignTokensCoreGroupColorDarkNeutralKeys = (typeof designTokensCoreGroupColorDarkNeutralKeys)[number];
// Тип, содержащий названия токенов группы ColorError.
export type TDesignTokensCoreGroupColorErrorKeys = (typeof designTokensCoreGroupColorErrorKeys)[number];
// Тип, содержащий названия токенов группы ColorInfo.
export type TDesignTokensCoreGroupColorInfoKeys = (typeof designTokensCoreGroupColorInfoKeys)[number];
// Тип, содержащий названия токенов группы ColorNeutralAlpha.
export type TDesignTokensCoreGroupColorNeutralAlphaKeys = (typeof designTokensCoreGroupColorNeutralAlphaKeys)[number];
// Тип, содержащий названия токенов группы ColorNeutral.
export type TDesignTokensCoreGroupColorNeutralKeys = (typeof designTokensCoreGroupColorNeutralKeys)[number];
// Тип, содержащий названия токенов группы ColorSuccess.
export type TDesignTokensCoreGroupColorSuccessKeys = (typeof designTokensCoreGroupColorSuccessKeys)[number];
// Тип, содержащий названия токенов группы ColorSystem.
export type TDesignTokensCoreGroupColorSystemKeys = (typeof designTokensCoreGroupColorSystemKeys)[number];
// Тип, содержащий названия токенов группы ColorWarning.
export type TDesignTokensCoreGroupColorWarningKeys = (typeof designTokensCoreGroupColorWarningKeys)[number];

// Тип, содержащий названия токенов группы ColorBrand и их значения.
export type TDesignTokensCoreGroupColorBrandValue = Record<TDesignTokensCoreGroupColorBrandKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы ColorDarkNeutralAlpha и их значения.
export type TDesignTokensCoreGroupColorDarkNeutralAlphaValue = Record<
    TDesignTokensCoreGroupColorDarkNeutralAlphaKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов группы ColorDarkNeutral и их значения.
export type TDesignTokensCoreGroupColorDarkNeutralValue = Record<
    TDesignTokensCoreGroupColorDarkNeutralKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов группы ColorError и их значения.
export type TDesignTokensCoreGroupColorErrorValue = Record<TDesignTokensCoreGroupColorErrorKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы ColorInfo и их значения.
export type TDesignTokensCoreGroupColorInfoValue = Record<TDesignTokensCoreGroupColorInfoKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы ColorNeutralAlpha и их значения.
export type TDesignTokensCoreGroupColorNeutralAlphaValue = Record<
    TDesignTokensCoreGroupColorNeutralAlphaKeys,
    TDesignTokenValue
>;
// Тип, содержащий названия токенов группы ColorNeutral и их значения.
export type TDesignTokensCoreGroupColorNeutralValue = Record<TDesignTokensCoreGroupColorNeutralKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы ColorSuccess и их значения.
export type TDesignTokensCoreGroupColorSuccessValue = Record<TDesignTokensCoreGroupColorSuccessKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы ColorSystem и их значения.
export type TDesignTokensCoreGroupColorSystemValue = Record<TDesignTokensCoreGroupColorSystemKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов группы Warning и их значения.
export type TDesignTokensCoreGroupColorWarningValue = Record<TDesignTokensCoreGroupColorWarningKeys, TDesignTokenValue>;

// Тип токенов группы Brand.
export type TDesignTokensCoreGroupColorBrand = { ColorBrand: TDesignTokensCoreGroupColorBrandValue };
// Тип токенов группы DarkNeutralAlpha.
export type TDesignTokensCoreGroupColorDarkNeutralAlpha = {
    ColorDarkNeutralAlpha: TDesignTokensCoreGroupColorDarkNeutralAlphaValue;
};
// Тип токенов группы DarkNeutral.
export type TDesignTokensCoreGroupColorDarkNeutral = { ColorDarkNeutral: TDesignTokensCoreGroupColorDarkNeutralValue };
// Тип токенов группы Error.
export type TDesignTokensCoreGroupColorError = { ColorError: TDesignTokensCoreGroupColorErrorValue };
// Тип токенов группы Info.
export type TDesignTokensCoreGroupColorInfo = { ColorInfo: TDesignTokensCoreGroupColorInfoValue };
// Тип токенов группы NeutralAlpha.
export type TDesignTokensCoreGroupColorNeutralAlpha = {
    ColorNeutralAlpha: TDesignTokensCoreGroupColorNeutralAlphaValue;
};
// Тип токенов группы Neutral.
export type TDesignTokensCoreGroupColorNeutral = { ColorNeutral: TDesignTokensCoreGroupColorNeutralValue };
// Тип токенов группы Success.
export type TDesignTokensCoreGroupColorSuccess = { ColorSuccess: TDesignTokensCoreGroupColorSuccessValue };
// Тип токенов группы ColorSystem.
export type TDesignTokensCoreGroupColorSystem = { ColorSystem: TDesignTokensCoreGroupColorSystemValue };
// Тип токенов группы Warning.
export type TDesignTokensCoreGroupColorWarning = { ColorWarning: TDesignTokensCoreGroupColorWarningValue };

// Тип глобальных токенов.
export type TDesignTokensCore = TDesignTokensCoreGroupColorBrand &
    TDesignTokensCoreGroupColorDarkNeutralAlpha &
    TDesignTokensCoreGroupColorDarkNeutral &
    TDesignTokensCoreGroupColorError &
    TDesignTokensCoreGroupColorInfo &
    TDesignTokensCoreGroupColorNeutralAlpha &
    TDesignTokensCoreGroupColorNeutral &
    TDesignTokensCoreGroupColorSuccess &
    TDesignTokensCoreGroupColorSystem &
    TDesignTokensCoreGroupColorWarning;

// Тип локальных токенов(токенов компонентов).
export type TDesignTokensComponents =
    | TDesignTokensComponentsButton
    | TDesignTokensComponentsCheckbox
    | TDesignTokensComponentsFormField
    | TDesignTokensComponentsRadio
    | TDesignTokensComponentsTypography
    | TDesignTokensComponentsLink
    | TDesignTokensComponentsLoader
    | TDesignTokensComponentsAlertContext
    | TDesignTokensComponentsAlertProcess
    | TDesignTokensComponentsDropdown
    | TDesignTokensComponentsDropdownList
    | TDesignTokensComponentsDropdownMobile
    | TDesignTokensComponentsDropdownMobileList
    | TDesignTokensComponentsOverlay
    | TDesignTokensComponentsListItem
    | TDesignTokensComponentsListItemControlsButton
    | TDesignTokensComponentsListMaster
    | TDesignTokensComponentsBody
    | TDesignTokensComponentsOverlay
    | TDesignTokensComponentsUploadZone
    | TDesignTokensComponentsPagination
    | TDesignTokensComponentsCard;

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
