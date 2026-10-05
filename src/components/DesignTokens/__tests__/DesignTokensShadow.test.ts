import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { DesignTokenUtils } from "../DesignTokenUtils";
import { DesignTokensCore } from "../DesignTokensCore";
import { DesignTokensCoreThemeDark } from "../DesignTokensCoreThemeDark";
import { ETriplexNextTheme } from "../../ThemeProvider/ETriplexNextTheme";
import {
    designTokensCoreGroupShadowKeys,
    designTokensCoreGroupDarkShadowKeys,
    TDesignTokens,
} from "../types/DesignTokensTypes";

/** Формат тени: `X Y blur rgba(r, g, b, a)`, spread и inset в палитре не используются. */
const shadowValuePattern = /^-?\d+px -?\d+px \d+px rgba\(\d+, \d+, \d+, (0|1|0?\.\d+)\)$/;

/** Хранилище для восстановления исходного окружения. */
let originalVersion: string | undefined;

beforeEach(() => {
    originalVersion = process.env.npm_package_version;
    process.env.npm_package_version = "1.0.0";
});

afterEach(() => {
    if (originalVersion === undefined) {
        delete process.env.npm_package_version;
    } else {
        process.env.npm_package_version = originalVersion;
    }
});

describe("Shadow tokens", () => {
    it("содержат Shadow.01 … Shadow.07 (светлая палитра) и DarkShadow.01 … DarkShadow.07 (тёмная палитра)", () => {
        expect(designTokensCoreGroupShadowKeys).toEqual(["01", "02", "03", "04", "05", "06", "07"]);
        expect(designTokensCoreGroupDarkShadowKeys).toEqual([...designTokensCoreGroupShadowKeys]);
        expect(Object.keys(DesignTokensCore.Shadow)).toEqual([...designTokensCoreGroupShadowKeys]);
        expect(Object.keys(DesignTokensCore.DarkShadow)).toEqual([...designTokensCoreGroupDarkShadowKeys]);
    });

    it("хранят значение в формате box-shadow без ссылок", () => {
        for (const key of designTokensCoreGroupShadowKeys) {
            expect(DesignTokensCore.Shadow[key].ref).toBeUndefined();
            expect(DesignTokensCore.Shadow[key].value).toMatch(shadowValuePattern);
            expect(DesignTokensCore.DarkShadow[key].ref).toBeUndefined();
            expect(DesignTokensCore.DarkShadow[key].value).toMatch(shadowValuePattern);
        }
    });

    it("Shadow — такая же core-группа, как и цвета: DesignTokensCoreThemeDark ничего не переопределяет", () => {
        // Как и для остальных core-групп (ColorNeutral/ColorDarkNeutral и т.д.), разница между темами
        // выражена парой групп внутри одного DesignTokensCore, а не файлом DesignTokensCoreThemeDark.
        expect(DesignTokensCoreThemeDark).toBe(DesignTokensCore);
    });

    it("getStyle отдаёт обе группы (Shadow и DarkShadow) одинаково в любой теме — темы палитра не касается", () => {
        const lightStyle = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, {});
        const darkStyle = DesignTokenUtils.getStyle(ETriplexNextTheme.DARK, {});

        for (const style of [lightStyle, darkStyle]) {
            expect(style).toContain("--triplex-next-Shadow-01-1-0-0: 0px 0px 10px rgba(0, 0, 0, 0.1);");
            expect(style).toContain("--triplex-next-Shadow-02-1-0-0: 0px 2px 10px rgba(31, 31, 34, 0.09);");
            expect(style).toContain("--triplex-next-DarkShadow-02-1-0-0: 0px 2px 10px rgba(255, 255, 255, 0.04);");
            expect(style).toContain("--triplex-next-DarkShadow-04-1-0-0: 0px 2px 9px rgba(0, 0, 0, 0.5);");
        }
    });

    it("ref компонента выбирает нужную тему через группу (Shadow для светлой, DarkShadow для тёмной)", () => {
        const lightRef = { ref: "Shadow.02" as const };
        const darkRef = { ref: "DarkShadow.02" as const };

        expect(DesignTokenUtils.getTokenValue(lightRef, DesignTokensCore as TDesignTokens)).toBe(
            "0px 2px 10px rgba(31, 31, 34, 0.09)",
        );
        expect(DesignTokenUtils.getTokenValue(darkRef, DesignTokensCore as TDesignTokens)).toBe(
            "0px 2px 10px rgba(255, 255, 255, 0.04)",
        );
    });
});
