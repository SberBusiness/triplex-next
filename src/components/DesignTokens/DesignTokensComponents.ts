// Токены компонентов.
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
} from "./components";

export const DesignTokensComponents: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.LIGHT, Button_Tokens),
    Input: GetTokensValueByTheme<TDesignTokensComponentsInputValue>(ETriplexNextTheme.LIGHT, Input_Tokens),
    Typography: GetTokensValueByTheme<TDesignTokensComponentsTypographyValue>(ETriplexNextTheme.LIGHT, Typography_Tokens),
};
