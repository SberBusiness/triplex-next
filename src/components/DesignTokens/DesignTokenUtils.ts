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
    // Возвращает строку с css-переменными группы токенов, вида `--variable-name-1: '#fff'; --variable-name-2: '#0ed'`.
    getCSSVariableByTokenGroup: (tokenGroup: TDesignTokensGroupAbstract, tokens: TDesignTokens) => string;
    // Возвращает токены, которые использует компонент.
    getComponentTokens: (componentName: string) => { core: string[]; components: string[] };
    // Возвращает строку с css-переменными на основе темы и токенов.
    getStyle: (theme: ETriplexNextTheme | undefined, tokens: TDesignTokensPartial) => string;
    // Возвращает строку с css-переменными.
    getStyleByTokens: (tokens: TDesignTokens) => string;
    // Возвращает значение токена. Если токен имеет значение в виде строки, будет возвращена эта строка, если токен ссылается на другой токен, будет возвращено значение другого токена.
    getTokenValue: (tokenValue: TDesignTokenValue, tokens: TDesignTokens) => string;
}

export const DesignTokenUtils: IDesignTokenUtils = {
    getCSSVariableByTokenGroup: (tokenGroup, tokens) => {
        const tokenGroupTitle = Object.keys(tokenGroup)[0];

        const tokenPrefix = "triplex-next";
        // Не объединять в одну строку  const tokenVersion = process.env.npm_package_version!.replace(/\./g, '-');
        // Иначе rollup не заменяет process.env.npm_package_version на значение.
        let tokenVersion = process.env.npm_package_version;
        tokenVersion = tokenVersion!.replace(/\./g, "-");

        return Object.keys(tokenGroup[tokenGroupTitle])
            .map(
                (tokenTitle) =>
                    `--${tokenPrefix}-${tokenGroupTitle}-${tokenTitle}-${tokenVersion!}: ${DesignTokenUtils.getTokenValue(
                        tokenGroup[tokenGroupTitle][tokenTitle],
                        tokens,
                    )};`,
            )
            .join("\n");
    },
    // Возвращает токены, которые использует компонент.
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
    // Возвращает строку с css-переменными.
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
    // Возвращает значение токена. Если токен имеет значение в виде строки, будет возвращена эта строка, если токен ссылается на другой токен, будет возвращено значение другого токена.
    getTokenValue: (tokenValue, tokens) => {
        let value = "";
        if (tokenValue.value) {
            value = tokenValue.value;
        } else if (tokenValue.ref) {
            const refArr = tokenValue.ref.split(".");
            const nextValue = (tokens as TDesignTokensGroupAbstract)[refArr[0]][refArr[1]].value;
            if (nextValue) {
                value = nextValue;
            } else if ((tokens as TDesignTokensGroupAbstract)[refArr[0]][refArr[1]].ref) {
                value = DesignTokenUtils.getTokenValue(
                    (tokens as TDesignTokensGroupAbstract)[refArr[0]][refArr[1]],
                    tokens,
                );
            }
        }

        return value;
    },
};
