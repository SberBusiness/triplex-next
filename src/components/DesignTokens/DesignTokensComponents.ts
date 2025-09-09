// Токены компонентов.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    AlertContext_Tokens,
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
    TDesignTokensComponentsAlertContextValue,
    AlertProcess_Tokens,
    TDesignTokensComponentsAlertProcessValue,
} from "./components";

export const DesignTokensComponents: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.LIGHT, Button_Tokens),
    Checkbox: GetTokensValueByTheme<TDesignTokensComponentsCheckboxValue>(ETriplexNextTheme.LIGHT, Checkbox_Tokens),
    FormField: GetTokensValueByTheme<TDesignTokensComponentsFormFieldValue>(ETriplexNextTheme.LIGHT, FormField_Tokens),
    LoadingDots: GetTokensValueByTheme<TDesignTokensComponentsLoadingDotsValue>(
        ETriplexNextTheme.LIGHT,
        LoadingDots_Tokens,
    ),
    Typography: GetTokensValueByTheme<TDesignTokensComponentsTypographyValue>(
        ETriplexNextTheme.LIGHT,
        Typography_Tokens,
    ),
    AlertContext: GetTokensValueByTheme<TDesignTokensComponentsAlertContextValue>(
        ETriplexNextTheme.LIGHT,
        AlertContext_Tokens,
    ),
    AlertProcess: GetTokensValueByTheme<TDesignTokensComponentsAlertProcessValue>(
        ETriplexNextTheme.LIGHT,
        AlertProcess_Tokens,
    ),
};
