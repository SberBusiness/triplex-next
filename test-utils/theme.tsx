import React from "react";
import { ThemeProviderContext } from "../src/components/ThemeProvider/ThemeProviderContext";
import { ETriplexNextTheme } from "../src/components/ThemeProvider/ETriplexNextTheme";
import { DesignTokensCore, DesignTokensComponents } from "../src/components/DesignTokens";

/** Класс темы, который ThemeContextWrapper кладёт в контекст по умолчанию. */
export const TEST_SCOPE_CLASS_NAME = "triplex-next-theme-test";

/** Свойства ThemeContextWrapper. */
interface IThemeContextWrapperProps {
    children?: React.ReactNode;
    /** Класс темы в контексте. Пустая строка — как вне ThemeProvider. */
    scopeClassName?: string;
}

/** Подставляет контекст темы без ThemeProvider. */
export const ThemeContextWrapper: React.FC<IThemeContextWrapperProps> = ({
    children,
    scopeClassName = TEST_SCOPE_CLASS_NAME,
}) => (
    <ThemeProviderContext.Provider
        value={{
            scopeClassName,
            theme: ETriplexNextTheme.LIGHT,
            tokens: { ...DesignTokensCore, ...DesignTokensComponents },
        }}
    >
        {children}
    </ThemeProviderContext.Provider>
);
