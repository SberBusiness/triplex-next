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
    /** Возвращает строку с css-переменными группы токенов, вида `--variable-name-1: "#000000"; --variable-name-2: "16px"`. */
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

export const DesignTokenUtils: IDesignTokenUtils = {
    getCSSVariableByTokenGroup: (tokenGroup, tokens) => {
        const tokenGroupTitle = Object.keys(tokenGroup)[0];
        const tokenPrefix = "triplex-next";

        // Безопасный fallback для Rollup, защищающий от отсутствия версии
        let tokenVersion = process.env.npm_package_version || "0.0.0";
        tokenVersion = tokenVersion.replace(/\./g, "-");

        return Object.keys(tokenGroup[tokenGroupTitle])
            .map(
                (tokenTitle) =>
                    `--${tokenPrefix}-${tokenGroupTitle}-${tokenTitle}-${tokenVersion}: ${DesignTokenUtils.getTokenValue(
                        tokenGroup[tokenGroupTitle][tokenTitle],
                        tokens,
                    )};`,
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
