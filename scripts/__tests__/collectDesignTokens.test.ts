import { describe, expect, it } from "vitest";
import { collectDesignTokens } from "../collectDesignTokens";
import { DesignTokenUtils } from "../../src/components/DesignTokens/DesignTokenUtils";
import { DesignTokensCore } from "../../src/components/DesignTokens/DesignTokensCore";
import { DesignTokensComponents } from "../../src/components/DesignTokens/DesignTokensComponents";
import { ETriplexNextTheme } from "../../src/components/ThemeProvider/ETriplexNextTheme";

const section = collectDesignTokens("1.44.0");

/**
 * Разбирает вывод `DesignTokenUtils.getStyle` в карту `Группа.Токен` → значение.
 * Имя переменной — `--triplex-next-{Группа}-{Токен}-{версия}`; ни группа, ни токен
 * дефисов не содержат, поэтому первые два сегмента хвоста и есть путь токена.
 */
const parseStyle = (theme: ETriplexNextTheme): Map<string, string> => {
    const map = new Map<string, string>();

    for (const line of DesignTokenUtils.getStyle(theme, {}).split("\n")) {
        const match = /^--triplex-next-(.+?):\s*(.*);$/.exec(line.trim());

        if (!match) {
            continue;
        }

        const [group, token] = match[1].split("-");

        map.set(`${group}.${token}`, match[2]);
    }

    return map;
};

describe("collectDesignTokens", () => {
    it("собирает все группы core- и компонентных токенов", () => {
        const groups = Object.keys(section.groups);

        expect(groups).toContain("ColorBrand");
        expect(groups).toContain("Calendar");
        expect(section.groups.ColorBrand.kind).toBe("core");
        expect(section.groups.Calendar.kind).toBe("component");
    });

    it("отмечает refable только у core-групп — ссылки генерируются из DesignTokensCore", () => {
        const refable = Object.entries(section.groups)
            .filter(([, group]) => group.refable)
            .map(([name]) => name)
            .sort();

        expect(refable).toEqual(Object.keys(DesignTokensCore).sort());
    });

    it("у каждого токена path совпадает с его местом в дереве", () => {
        for (const [groupName, group] of Object.entries(section.groups)) {
            for (const [tokenName, token] of Object.entries(group.tokens)) {
                expect(token.path).toBe(`${groupName}.${tokenName}`);
            }
        }
    });

    it("сохраняет ref там, где токен ссылается на палитру", () => {
        expect(section.groups.Calendar.tokens.Background.light.ref).toBe("ColorNeutral.100");
        expect(section.groups.Calendar.tokens.Background.dark.ref).toBe("ColorDarkNeutral.50");
        // Токен с собственным значением ссылки не имеет.
        expect(section.groups.Calendar.tokens.View_Item_Background_Default.light.ref).toBeUndefined();
    });

    it("resolved совпадает со значением css-переменной светлой темы", () => {
        const expected = parseStyle(ETriplexNextTheme.LIGHT);

        for (const group of Object.values(section.groups)) {
            for (const token of Object.values(group.tokens)) {
                expect(`${token.path}=${token.light.resolved}`).toBe(`${token.path}=${expected.get(token.path)}`);
            }
        }
    });

    it("resolved совпадает со значением css-переменной тёмной темы", () => {
        const expected = parseStyle(ETriplexNextTheme.DARK);

        for (const group of Object.values(section.groups)) {
            for (const token of Object.values(group.tokens)) {
                expect(`${token.path}=${token.dark.resolved}`).toBe(`${token.path}=${expected.get(token.path)}`);
            }
        }
    });

    it("темы расходятся там, где токен объявлен разными значениями", () => {
        const background = section.groups.Calendar.tokens.Background;

        expect(background.light.resolved).not.toBe(background.dark.resolved);
    });

    it("покрывает все токены дерева", () => {
        const collected = Object.values(section.groups).reduce(
            (sum, group) => sum + Object.keys(group.tokens).length,
            0,
        );
        const expected = [DesignTokensCore, DesignTokensComponents].reduce(
            (sum, tree) =>
                sum +
                Object.values(tree as Record<string, Record<string, unknown>>).reduce(
                    (groupSum, group) => groupSum + Object.keys(group).length,
                    0,
                ),
            0,
        );

        expect(collected).toBe(expected);
    });

    it("описывает внутренний слой отдельным блоком", () => {
        expect(section.internal.versionSuffix).toBe("1-44-0");
        expect(section.internal.cssVarPattern).toContain("--triplex-next-");
    });
});
