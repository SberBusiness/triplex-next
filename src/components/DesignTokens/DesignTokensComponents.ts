// Токены компонентов.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    AlertContext_Tokens,
    Button_Tokens,
    Input_Tokens,
    Typography_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsInputValue,
    TDesignTokensComponentsTypographyValue,
    LoadingDots_Tokens,
    TDesignTokensComponentsLoadingDotsValue,
    TDesignTokensComponentsAlertContextValue,
} from "./components";

export const DesignTokensComponents: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.LIGHT, Button_Tokens),
    Input: GetTokensValueByTheme<TDesignTokensComponentsInputValue>(ETriplexNextTheme.LIGHT, Input_Tokens),
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
};
