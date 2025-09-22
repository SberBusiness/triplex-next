// Токены локальных компонентов Triplex Next.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    Button_Tokens,
    Checkbox_Tokens,
    FormField_Tokens,
    Radio_Tokens,
    Typography_Tokens,
    Link_Tokens,
    Loader_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsCheckboxValue,
    TDesignTokensComponentsFormFieldValue,
    TDesignTokensComponentsRadioValue,
    TDesignTokensComponentsTypographyValue,
    TDesignTokensComponentsLinkValue,
    TDesignTokensComponentsLoaderValue,
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
    Radio: GetTokensValueByTheme<TDesignTokensComponentsRadioValue>(ETriplexNextTheme.DARK, Radio_Tokens),
    Link: GetTokensValueByTheme<TDesignTokensComponentsLinkValue>(ETriplexNextTheme.DARK, Link_Tokens),
    Loader: GetTokensValueByTheme<TDesignTokensComponentsLoaderValue>(ETriplexNextTheme.DARK, Loader_Tokens),
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
    DropdownList: GetTokensValueByTheme<TDesignTokensComponentsDropdownListValue>(
        ETriplexNextTheme.DARK,
        DropdownList_Tokens,
    ),
    DropdownMobile: GetTokensValueByTheme<TDesignTokensComponentsDropdownMobileValue>(
        ETriplexNextTheme.DARK,
        DropdownMobile_Tokens,
    ),
    DropdownMobileList: GetTokensValueByTheme<TDesignTokensComponentsDropdownMobileListValue>(
        ETriplexNextTheme.DARK,
        DropdownMobileList_Tokens,
    ),
    Overlay: GetTokensValueByTheme<TDesignTokensComponentsOverlayValue>(ETriplexNextTheme.DARK, Overlay_Tokens),
};
