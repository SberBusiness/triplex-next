/**
 * Собирает секцию `tokens` для mcp-data.json — машиночитаемое дерево дизайн-токенов
 * для `@sberbusiness/triplex-next-mcp-server` (tool `get_tokens`).
 *
 * Источник — TS-дерево токенов, а не документация: `DesignTokensCore` (палитра) и
 * `DesignTokensComponents` (токены компонентов) вместе с их тёмными вариантами.
 * Значения разрешаются тем же `DesignTokenUtils.getTokenValue`, которым
 * `ThemeProvider` рендерит css-переменные, поэтому бандл не может разойтись
 * с тем, что видит потребитель.
 *
 * Форма секции:
 * - группы плоские, как и сам объект токенов (`TDesignTokens`): вложенности
 *   `core` / `components` в API нет, `kind` несёт ту же информацию для листинга;
 * - у каждого токена явный `path` — строка, которую потребитель передаёт в
 *   `ThemeProvider`. Собирать её из ключей вложенности агент не должен;
 * - `refable` отмечает группы, на которые можно сослаться через `{ ref: "..." }`:
 *   список ссылок генерируется только из `DesignTokensCore`
 *   (см. scripts/generateRefTokensTypes.ts);
 * - `internal` описывает внутренний слой (css-переменные с версией в имени) явно
 *   отдельным блоком, чтобы его нельзя было принять за публичный API.
 */
import { DesignTokensCore } from "../src/components/DesignTokens/DesignTokensCore";
import { DesignTokensCoreThemeDark } from "../src/components/DesignTokens/DesignTokensCoreThemeDark";
import { DesignTokensComponents } from "../src/components/DesignTokens/DesignTokensComponents";
import { DesignTokensComponentsThemeDark } from "../src/components/DesignTokens/DesignTokensComponentsThemeDark";
import { DesignTokenUtils } from "../src/components/DesignTokens/DesignTokenUtils";
import type { TDesignTokens } from "../src/components/DesignTokens/types/DesignTokensTypes";
import type { TDesignTokenValue } from "../src/components/DesignTokens/types/DesignTokenTypes";

/** Значение токена в одной теме. */
export interface TokenThemeValue {
    /** Ссылка на core-токен, если значение задано ссылкой. */
    ref?: string;
    /** Итоговое css-значение: собственное либо разрешённое по ссылке. */
    resolved: string;
}

/** Токен в бандле. */
export interface TokenEntry {
    /** Путь `Группа.Токен` — то, что передаётся в ThemeProvider. */
    path: string;
    light: TokenThemeValue;
    dark: TokenThemeValue;
}

/** Группа токенов в бандле. */
export interface TokenGroupEntry {
    /** `core` — палитра и примитивы, `component` — токены компонента. */
    kind: "core" | "component";
    /** Можно ли сослаться на токены группы через `{ ref: "Группа.Токен" }`. */
    refable: boolean;
    tokens: Record<string, TokenEntry>;
}

/** Секция `tokens` бандла. */
export interface TokensSection {
    /** Подсказка агенту, что означает `path`. */
    overridePath: string;
    groups: Record<string, TokenGroupEntry>;
    internal: {
        cssVarPattern: string;
        versionSuffix: string;
    };
}

type TokenGroupMap = Record<string, Record<string, TDesignTokenValue>>;

/** Разрешает значение токена в дереве своей темы. */
const toThemeValue = (token: TDesignTokenValue, tokens: TDesignTokens): TokenThemeValue => {
    const resolved = DesignTokenUtils.getTokenValue(token, tokens);

    return token.ref === undefined ? { resolved } : { ref: token.ref, resolved };
};

/**
 * Собирает секцию `tokens`.
 * @param version версия пакета — из неё складывается суффикс css-переменных.
 */
export const collectDesignTokens = (version: string): TokensSection => {
    const lightTree = { ...DesignTokensCore, ...DesignTokensComponents } as TDesignTokens;
    const darkTree = { ...DesignTokensCoreThemeDark, ...DesignTokensComponentsThemeDark } as TDesignTokens;
    const groups: Record<string, TokenGroupEntry> = {};

    const collect = (
        light: TokenGroupMap,
        dark: TokenGroupMap,
        kind: TokenGroupEntry["kind"],
        refable: boolean,
    ): void => {
        Object.keys(light).forEach((group) => {
            const tokens: Record<string, TokenEntry> = {};

            Object.keys(light[group]).forEach((name) => {
                const darkToken = dark[group]?.[name] ?? light[group][name];

                tokens[name] = {
                    path: `${group}.${name}`,
                    light: toThemeValue(light[group][name], lightTree),
                    dark: toThemeValue(darkToken, darkTree),
                };
            });

            groups[group] = { kind, refable, tokens };
        });
    };

    collect(
        DesignTokensCore as unknown as TokenGroupMap,
        DesignTokensCoreThemeDark as unknown as TokenGroupMap,
        "core",
        true,
    );
    collect(
        DesignTokensComponents as unknown as TokenGroupMap,
        DesignTokensComponentsThemeDark as unknown as TokenGroupMap,
        "component",
        false,
    );

    return {
        overridePath: "Группа.Токен — путь для ThemeProvider prop tokens",
        groups,
        internal: {
            cssVarPattern: "--triplex-next-{Группа}-{Токен}-{версия}",
            versionSuffix: version.replace(/\./g, "-"),
        },
    };
};
