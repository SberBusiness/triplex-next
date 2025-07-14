import { TDesignTokenValue, TDesignTokenValues } from "./types/DesignTokenTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";

/**
 * Возвращает токен со значением текущей темы.
 */
export const GetTokensValueByTheme = <TokensWithValue extends { [key: string]: TDesignTokenValue }>(
    theme: ETriplexNextTheme,
    tokens: Record<keyof TokensWithValue, TDesignTokenValues>,
): TokensWithValue => {
    const tokensWithValue = {} as Record<keyof TokensWithValue, TDesignTokenValue>;

    Object.keys(tokens).forEach((key: keyof TokensWithValue) => {
        tokensWithValue[key] = theme === ETriplexNextTheme.LIGHT ? tokens[key][0] : tokens[key][1];
    });

    return tokensWithValue as TokensWithValue;
};
