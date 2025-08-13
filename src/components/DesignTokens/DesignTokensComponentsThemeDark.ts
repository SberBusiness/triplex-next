// Токены локальных компонентов Triplex Next.
import { TDesignTokensComponents } from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { GetTokensValueByTheme } from "./GetTokensValueByTheme";
import {
    Button_Tokens,
    Input_Tokens,
    FormField_Tokens,
    TDesignTokensComponentsButtonValue,
    TDesignTokensComponentsInputValue,
    TDesignTokensComponentsFormFieldValue,
} from "./components";

export const DesignTokensComponentsThemeDark: TDesignTokensComponents = {
    Button: GetTokensValueByTheme<TDesignTokensComponentsButtonValue>(ETriplexNextTheme.DARK, Button_Tokens),
    FormField: GetTokensValueByTheme<TDesignTokensComponentsFormFieldValue>(ETriplexNextTheme.DARK, FormField_Tokens),
    Input: GetTokensValueByTheme<TDesignTokensComponentsInputValue>(ETriplexNextTheme.DARK, Input_Tokens),
};
