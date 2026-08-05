import React, { useEffect, useMemo } from "react";
import { defaultsDeep } from "lodash-es";
import { TDesignTokens, TDesignTokensPartial } from "../../DesignTokens/types/DesignTokensTypes";
// Импорт не должен быть относительным.
import { ThemeProviderContext } from "../ThemeProviderContext";
import { ETriplexNextTheme } from "../ETriplexNextTheme";
import {
    DesignTokensCore,
    DesignTokensCoreThemeDark,
    DesignTokensComponents,
    DesignTokensComponentsThemeDark,
} from "../../DesignTokens";

interface IThemeProviderViewProps {
    /** Дизайн-тема Triplex Next. */
    theme: ETriplexNextTheme;
    /** Переопределяемые токены. */
    tokens?: TDesignTokensPartial;
    /** Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных. */
    scopeClassName: string;
    /** Ref на HTML элемент, внутри которого будет действовать текущий конфиг. */
    scopeRef: React.RefObject<HTMLElement>;
    /** Контент, внутри которого действуют тема и токены. */
    children?: React.ReactNode;
}

/**
 * Создаёт провайдер темы: навешивает scopeClassName на элемент из scopeRef (область видимости
 * css-переменных) и отдаёт тему вместе с итоговыми токенами в контекст.
 */
export const ThemeProviderView: React.FC<IThemeProviderViewProps> = ({
    children,
    scopeClassName,
    scopeRef,
    theme,
    tokens: tokensProps,
}) => {
    useEffect(() => {
        const scopeElement = scopeRef.current;

        if (!scopeClassName) {
            return;
        }

        scopeElement?.classList.add(scopeClassName);

        return () => {
            scopeElement?.classList.remove(scopeClassName);
        };
    }, [scopeClassName, scopeRef]);

    const value = useMemo(() => {
        // Не менять порядок, иначе токены темы будут переопределять пользовательские значения.
        const tokens: TDesignTokens = defaultsDeep(
            {},
            tokensProps,
            theme === ETriplexNextTheme.LIGHT ? DesignTokensCore : DesignTokensCoreThemeDark,
            theme === ETriplexNextTheme.LIGHT ? DesignTokensComponents : DesignTokensComponentsThemeDark,
        );

        return { scopeClassName, theme, tokens };
    }, [scopeClassName, theme, tokensProps]);

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};
