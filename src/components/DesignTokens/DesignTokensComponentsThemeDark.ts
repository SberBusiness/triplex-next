// Токены локальных компонентов Triplex Next.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    Button_Tokens,
    Checkbox_Tokens,
    FormField_Tokens,
    Typography_Tokens,
    LoadingDots_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsCheckboxValue,
    TDesignTokensComponentsFormFieldValue,
    TDesignTokensComponentsTypographyValue,
    TDesignTokensComponentsLoadingDotsValue,
    AlertContext_Tokens,
    TDesignTokensComponentsAlertContextValue,
    AlertProcess_Tokens,
    TDesignTokensComponentsAlertProcessValue,
    Dropdown_Tokens,
    TDesignTokensComponentsDropdownValue,
    DropdownList_Tokens,
    TDesignTokensComponentsDropdownListValue,
    DropdownMobile_Tokens,
    TDesignTokensComponentsDropdownMobileValue,
    DropdownMobileList_Tokens,
    TDesignTokensComponentsDropdownMobileListValue,
    Overlay_Tokens,
    TDesignTokensComponentsOverlayValue,
} from "./components";

export const DesignTokensComponentsThemeDark: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.DARK, Button_Tokens),
    Checkbox: GetTokensValueByTheme<TDesignTokensComponentsCheckboxValue>(ETriplexNextTheme.DARK, Checkbox_Tokens),
    FormField: GetTokensValueByTheme<TDesignTokensComponentsFormFieldValue>(ETriplexNextTheme.DARK, FormField_Tokens),
    LoadingDots: GetTokensValueByTheme<TDesignTokensComponentsLoadingDotsValue>(
        ETriplexNextTheme.DARK,
        LoadingDots_Tokens,
    ),
    Typography: GetTokensValueByTheme<TDesignTokensComponentsTypographyValue>(
        ETriplexNextTheme.DARK,
        Typography_Tokens,
    ),
    AlertContext: GetTokensValueByTheme<TDesignTokensComponentsAlertContextValue>(
        ETriplexNextTheme.DARK,
        AlertContext_Tokens,
    ),
    AlertProcess: GetTokensValueByTheme<TDesignTokensComponentsAlertProcessValue>(
        ETriplexNextTheme.DARK,
        AlertProcess_Tokens,
    ),
    Dropdown: GetTokensValueByTheme<TDesignTokensComponentsDropdownValue>(ETriplexNextTheme.DARK, Dropdown_Tokens),
    DropdownList: GetTokensValueByTheme<TDesignTokensComponentsDropdownListValue>(ETriplexNextTheme.DARK, DropdownList_Tokens),
    DropdownMobile: GetTokensValueByTheme<TDesignTokensComponentsDropdownMobileValue>(ETriplexNextTheme.DARK, DropdownMobile_Tokens),
    DropdownMobileList: GetTokensValueByTheme<TDesignTokensComponentsDropdownMobileListValue>(ETriplexNextTheme.DARK, DropdownMobileList_Tokens),
    Overlay: GetTokensValueByTheme<TDesignTokensComponentsOverlayValue>(ETriplexNextTheme.DARK, Overlay_Tokens),
};
