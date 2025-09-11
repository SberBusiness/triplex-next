// Токены локальных компонентов Triplex Next.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    Button_Tokens,
    Checkbox_Tokens,
    FormField_Tokens,
    Typography_Tokens,
    Loader_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsCheckboxValue,
    TDesignTokensComponentsFormFieldValue,
    TDesignTokensComponentsTypographyValue,
    TDesignTokensComponentsLoaderValue,
    AlertContext_Tokens,
    TDesignTokensComponentsAlertContextValue,
    AlertProcess_Tokens,
    TDesignTokensComponentsAlertProcessValue,
} from "./components";

export const DesignTokensComponentsThemeDark: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.DARK, Button_Tokens),
    Checkbox: GetTokensValueByTheme<TDesignTokensComponentsCheckboxValue>(ETriplexNextTheme.DARK, Checkbox_Tokens),
    FormField: GetTokensValueByTheme<TDesignTokensComponentsFormFieldValue>(ETriplexNextTheme.DARK, FormField_Tokens),
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
};
