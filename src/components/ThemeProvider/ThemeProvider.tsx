import React, { useLayoutEffect, useMemo } from "react";
import canUseDom from "rc-util/es/Dom/canUseDom";
import { removeCSS, updateCSS } from "rc-util/es/Dom/dynamicCSS";
import { TDesignTokensPartial } from "../DesignTokens/types/DesignTokensTypes";
import { DesignTokenUtils } from "../DesignTokens/DesignTokenUtils";
import { ThemeProviderView } from "./components/ThemeProviderView";
import { uniqueId } from "../../../scripts/uniqueId";
import { ETriplexNextTheme } from "./ETriplexNextTheme";

/** Префикс автогенерируемого scopeClassName. */
const SCOPE_CLASS_NAME_PREFIX = "triplex-next-theme-";

/**
 * Возвращает ключ тега style с css-переменными темы. По этому ключу стили обновляются
 * и удаляются, поэтому ключ вычисляется в одном месте.
 */
const getStyleTagKey = (scopeClassName: string): string => `triplex-next-dynamic-tokens-${scopeClassName}`;

export interface IThemeProviderProps {
    /** Контент, внутри которого действуют тема и токены. */
    children: React.ReactNode;
    /** Classname, который добавлен к элементу из scopeRef для создания области видимости css-переменных. */
    scopeClassName?: string;
    /** Ref на HTML элемент, внутри которого будет действовать текущий конфиг. */
    scopeRef: React.RefObject<HTMLElement>;
    /**
     * Дизайн-тема Triplex Next.
     * @default ETriplexNextTheme.LIGHT
     */
    theme?: ETriplexNextTheme;
    /** Переопределяемые токены. */
    tokens?: TDesignTokensPartial;
}

/**
 * Провайдер темы. Рендерит css-переменные дизайн-токенов выбранной темы в тег style,
 * ограничивает их областью видимости элемента из scopeRef и передаёт тему и токены
 * дочерним компонентам через контекст (см. useToken).
 */
export const ThemeProvider: React.FC<IThemeProviderProps> = ({
    children,
    scopeClassName,
    scopeRef,
    theme = ETriplexNextTheme.LIGHT,
    tokens,
}) => {
    // ClassName, добавляемый к HTML элементу, для определения области видимости CSS-переменных.
    const scopeCssClassName = useMemo(() => scopeClassName || uniqueId(SCOPE_CLASS_NAME_PREFIX), [scopeClassName]);

    useLayoutEffect(() => {
        if (canUseDom()) {
            const style = `.${scopeCssClassName} {${DesignTokenUtils.getStyle(theme, tokens || {})}}`;
            // Создание или обновление тега style с css-переменными текущей темы.
            updateCSS(style, getStyleTagKey(scopeCssClassName));
        } else {
            console.warn("ThemeProvider", "SSR do not support dynamic theme with css variables.");
        }
    }, [scopeCssClassName, theme, tokens]);

    // Удаляет стили при размонтировании компонента.
    useLayoutEffect(() => () => removeCSS(getStyleTagKey(scopeCssClassName)), [scopeCssClassName]);

    return (
        <ThemeProviderView scopeClassName={scopeCssClassName} scopeRef={scopeRef} theme={theme} tokens={tokens}>
            {children}
        </ThemeProviderView>
    );
};
