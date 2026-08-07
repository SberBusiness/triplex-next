import React from "react";
import { TDesignTokens } from "../DesignTokens/types/DesignTokensTypes";
import { ETriplexNextTheme } from "./ETriplexNextTheme";
import { DesignTokensCore, DesignTokensComponents } from "../DesignTokens";

export interface IThemeProviderContext {
    /** Classname, задающий область видимости css-переменных темы. Пустая строка вне ThemeProvider. */
    scopeClassName: string;
    /** Текущая дизайн-тема Triplex Next. */
    theme: ETriplexNextTheme;
    /** Итоговые токены: переопределения потребителя поверх токенов темы. */
    tokens: TDesignTokens;
}

/** Значение контекста вне ThemeProvider: светлая тема и токены по умолчанию. */
const contextInitial: IThemeProviderContext = {
    scopeClassName: "",
    theme: ETriplexNextTheme.LIGHT,
    tokens: { ...DesignTokensCore, ...DesignTokensComponents },
};

/** Контекст темы. Значение читается хуком useToken. */
export const ThemeProviderContext = React.createContext<IThemeProviderContext>(contextInitial);
