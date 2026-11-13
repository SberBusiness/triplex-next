import { tokenizer, TokenType } from "@csstools/css-tokenizer";
import { defaultsDeep } from "lodash-es";
import {
    TDesignTokens,
    TDesignTokensComponentsWithIndex,
    TDesignTokensGroupAbstract,
    TDesignTokensPartial,
} from "./types/DesignTokensTypes";
import { ETriplexNextTheme } from "../ThemeProvider/ETriplexNextTheme";
import { DesignTokensCore } from "./DesignTokensCore";
import { DesignTokensCoreThemeDark } from "./DesignTokensCoreThemeDark";
import { DesignTokensComponents } from "./DesignTokensComponents";
import { DesignTokensComponentsThemeDark } from "./DesignTokensComponentsThemeDark";
import { TDesignTokenValue } from "./types/DesignTokenTypes";

export interface IDesignTokenUtils {
    /**
     * Возвращает строку с css-переменными группы токенов, вида `--variable-name-1: "#000000"; --variable-name-2: "16px"`.
     * Токены с недопустимыми именами или значениями пропускаются.
     */
    getCSSVariableByTokenGroup: (tokenGroup: TDesignTokensGroupAbstract, tokens: TDesignTokens) => string;
    /** Возвращает токены, которые использует компонент. */
    getComponentTokens: (componentName: string) => { core: string[]; components: string[] };
    /** Возвращает строку с css-переменными на основе темы и токенов. */
    getStyle: (theme: ETriplexNextTheme | undefined, tokens: TDesignTokensPartial) => string;
    /** Возвращает строку с css-переменными. */
    getStyleByTokens: (tokens: TDesignTokens) => string;
    /** Возвращает значение токена. Если токен имеет значение в виде строки, будет возвращена эта строка, если токен ссылается на другой токен, будет возвращено значение другого токена. */
    getTokenValue: (tokenValue: TDesignTokenValue, tokens: TDesignTokens) => string;
}

/** Внутренний помощник для безопасного рекурсивного разрешения значений токенов. */
const resolveTokenValue = (tokenValue: TDesignTokenValue, tokens: TDesignTokens, visitedRefs: Set<string>): string => {
    if (tokenValue.value !== undefined) {
        return tokenValue.value;
    }

    if (tokenValue.ref !== undefined) {
        if (visitedRefs.has(tokenValue.ref)) {
            return "";
        }
        visitedRefs.add(tokenValue.ref);

        const [groupName, tokenName] = tokenValue.ref.split(".");
        const abstractTokens: TDesignTokensGroupAbstract = tokens;

        const tokenGroup = Object.prototype.hasOwnProperty.call(abstractTokens, groupName)
            ? abstractTokens[groupName]
            : undefined;

        if (tokenGroup && Object.prototype.hasOwnProperty.call(tokenGroup, tokenName)) {
            const nextToken = abstractTokens[groupName][tokenName];

            if (nextToken.value !== undefined) {
                return nextToken.value;
            } else if (nextToken.ref !== undefined) {
                return resolveTokenValue(nextToken, tokens, visitedRefs);
            }
        }
    }

    return "";
};

/** Допустимое имя группы токенов и токена: оно становится частью имени css-переменной. */
const SAFE_TOKEN_NAME = /^[\w-]+$/;

/** Проверяет, что значение можно вставить в одно CSS-объявление. */
const isSafeTokenValue = (value: string): boolean => {
    if (/[{}\\]/.test(value)) {
        return false;
    }

    let hasParseError = false;
    const { nextToken } = tokenizer(
        { css: value },
        {
            onParseError: () => {
                hasParseError = true;
            },
        },
    );
    const closingTokens: TokenType[] = [];

    while (!hasParseError) {
        const [type] = nextToken();

        switch (type) {
            case TokenType.EOF:
                return !hasParseError && closingTokens.length === 0;
            case TokenType.Function:
            case TokenType.OpenParen:
                closingTokens.push(TokenType.CloseParen);
                break;
            case TokenType.OpenSquare:
                closingTokens.push(TokenType.CloseSquare);
                break;
            case TokenType.CloseParen:
            case TokenType.CloseSquare:
                if (closingTokens.pop() !== type) {
                    return false;
                }
                break;
            case TokenType.Semicolon:
                if (closingTokens.length === 0) {
                    return false;
                }
                break;
        }
    }

    return false;
};

/**
 * Проверяет, что имя css-переменной и её значение можно вывести в стили. Значения токенов
 * подставляются в текст css как есть, поэтому токен, выходящий за пределы своего объявления,
 * не выводится — о нём сообщается в консоль.
 */
const isSafeCSSVariable = (tokenGroupTitle: string, tokenTitle: string, value: string): boolean => {
    const isSafe = SAFE_TOKEN_NAME.test(tokenGroupTitle) && SAFE_TOKEN_NAME.test(tokenTitle) && isSafeTokenValue(value);

    if (!isSafe) {
        console.warn(
            "DesignTokenUtils",
            `Токен ${tokenGroupTitle}.${tokenTitle} пропущен: недопустимое имя или значение.`,
        );
    }

    return isSafe;
};

export const DesignTokenUtils: IDesignTokenUtils = {
    getCSSVariableByTokenGroup: (tokenGroup, tokens) => {
        const tokenGroupTitle = Object.keys(tokenGroup)[0];
        const tokenPrefix = "triplex-next";

        // Безопасный fallback для Rollup, защищающий от отсутствия версии
        let tokenVersion = process.env.npm_package_version || "0.0.0";
        tokenVersion = tokenVersion.replace(/\./g, "-");

        return Object.keys(tokenGroup[tokenGroupTitle])
            .map((tokenTitle) => ({
                tokenTitle,
                value: DesignTokenUtils.getTokenValue(tokenGroup[tokenGroupTitle][tokenTitle], tokens),
            }))
            .filter(({ tokenTitle, value }) => isSafeCSSVariable(tokenGroupTitle, tokenTitle, value))
            .map(
                ({ tokenTitle, value }) =>
                    `--${tokenPrefix}-${tokenGroupTitle}-${tokenTitle}-${tokenVersion}: ${value};`,
            )
            .join("\n");
    },
    getComponentTokens: (componentName) => {
        // Общие токены.
        const coreTokens: string[] = [];
        // Токены компонента.
        const componentsTokens: string[] = [];

        Object.keys(DesignTokensComponents).forEach((tokenGroup) => {
            Object.keys((DesignTokensComponents as TDesignTokensComponentsWithIndex)[tokenGroup]).forEach(
                (tokenTitle) => {
                    // Группа токенов соответствует имени файла.
                    if (tokenGroup === componentName) {
                        componentsTokens.push(`${tokenGroup}.${tokenTitle}`);
                        return;
                    }
                },
            );
        });

        return { components: componentsTokens, core: coreTokens };
    },
    getStyle: (theme = ETriplexNextTheme.LIGHT, tokens) => {
        let style = "";
        switch (theme) {
            case ETriplexNextTheme.LIGHT: {
                const nextTokens = defaultsDeep({}, tokens, DesignTokensCore, DesignTokensComponents) as TDesignTokens;
                style = DesignTokenUtils.getStyleByTokens(nextTokens);
                break;
            }
            case ETriplexNextTheme.DARK: {
                const nextTokens = defaultsDeep(
                    {},
                    tokens,
                    DesignTokensCoreThemeDark,
                    DesignTokensComponentsThemeDark,
                ) as TDesignTokens;
                style = DesignTokenUtils.getStyleByTokens(nextTokens);
                break;
            }
        }
        return style;
    },
    getStyleByTokens: (tokens) => {
        // Convert to css variables
        const cssList = Object.keys(tokens).map((token) =>
            DesignTokenUtils.getCSSVariableByTokenGroup(
                {
                    [token]: tokens[token as keyof TDesignTokensPartial],
                } as TDesignTokensGroupAbstract,
                tokens,
            ),
        );

        return cssList.join("\n").trim();
    },
    getTokenValue: (tokenValue, tokens) => {
        return resolveTokenValue(tokenValue, tokens, new Set<string>());
    },
};
