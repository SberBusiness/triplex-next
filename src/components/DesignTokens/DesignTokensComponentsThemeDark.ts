// Токены локальных компонентов Triplex Next.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    Button_Tokens,
    Input_Tokens,
    Typography_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsInputValue,
    TDesignTokensComponentsTypographyValue,
    LoadingDots_Tokens,
    TDesignTokensComponentsLoadingDotsValue,
    AlertContext_Tokens,
    TDesignTokensComponentsAlertContextValue,
} from "./components";

export const DesignTokensComponentsThemeDark: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.DARK, Button_Tokens),
    Input: GetTokensValueByTheme<TDesignTokensComponentsInputValue>(ETriplexNextTheme.DARK, Input_Tokens),
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
};
