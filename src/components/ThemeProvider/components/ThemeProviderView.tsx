import React, { useEffect, useMemo, useRef } from "react";
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
    // Дизайн-тема Triplex Next.
    theme: ETriplexNextTheme;
    // Дизайн-токены Triplex.
    tokens?: TDesignTokensPartial;
    // Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных.
    scopeClassName: string;
    // Ref на HTML элемент, внутри которого будет действовать текущий конфиг. По-умолчанию - html.
    scopeRef: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
}

/**
 *  Создает провайдер темы и создает область видимости для css-переменных.
 */
export const ThemeProviderView: React.FC<IThemeProviderViewProps> = ({
    children,
    scopeClassName,
    scopeRef,
    theme,
    tokens: tokensProps,
}) => {
    const prevScopeClassName = useRef("");

    useEffect(() => {
        const scopeRefCurrent = scopeRef.current;

        if (scopeClassName) {
            scopeRefCurrent?.classList.add(scopeClassName);
        }
        prevScopeClassName.current = scopeClassName;

        return () => {
            if (prevScopeClassName.current) {
                scopeRefCurrent?.classList.remove(prevScopeClassName.current);
            }
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
