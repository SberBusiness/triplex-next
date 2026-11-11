import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { DesignTokenUtils } from "../DesignTokenUtils";
import { ETriplexNextTheme } from "../../ThemeProvider/ETriplexNextTheme";
import { TDesignTokenValue } from "../types/DesignTokenTypes";
import { TDesignTokens } from "../types/DesignTokensTypes";

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

vi.mock("../DesignTokensCore", () => ({
    DesignTokensCore: {
        ColorBrand: {
            "0": { value: "#1F3336" },
            "40": { value: "#008985" },
            "50": { value: "#21A19A" },
            "60": { value: "#19BDB0" },
        },
        ColorNeutral: {
            "0": { value: "#FFFFFF" },
            "90": { value: "#F2F4F7" },
        },
        ColorDarkNeutral: {
            "0": { value: "#19191B" },
            "50": { value: "#2A2A2C" },
        },
    },
}));

vi.mock("../DesignTokensCoreThemeDark", () => ({
    DesignTokensCoreThemeDark: {
        ColorBrand: {
            "0": { value: "#1F3336" },
            "40": { value: "#008985" },
            "50": { value: "#21A19A" },
            "60": { value: "#19BDB0" },
        },
        ColorNeutral: {
            "0": { value: "#FFFFFF" },
            "90": { value: "#F2F4F7" },
        },
        ColorDarkNeutral: {
            "0": { value: "#19191B" },
            "50": { value: "#2A2A2C" },
        },
    },
}));

vi.mock("../DesignTokensComponents", () => ({
    DesignTokensComponents: {
        Button: {
            General_Background_Default: { value: "#21A19A" },
            General_Color_Default: { value: "#FFFFFF" },
        },
        FormField: {
            border: { value: "#D0D7DD" },
            background: { value: "#FFFFFF" },
        },
    },
}));

vi.mock("../DesignTokensComponentsThemeDark", () => ({
    DesignTokensComponentsThemeDark: {
        Button: {
            General_Background_Default: { value: "#21A19A" },
            General_Color_Default: { value: "#FFFFFF" },
        },
        FormField: {
            border: { value: "#4A4A4A" },
            background: { value: "#19191B" },
        },
    },
}));

describe("DesignTokenUtils", () => {
    describe("getTokenValue", () => {
        it("should return direct value when token has value property", () => {
            const tokenValue: TDesignTokenValue = { value: "#21A19A" };
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("#21A19A");
        });

        it("should resolve reference when token has ref property", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBrand.50" };
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("#21A19A");
        });

        it("should resolve nested references", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBrand.60" };
            const tokens = {
                ColorBrand: {
                    "40": { value: "#19BDB0" },
                    "50": { ref: "ColorBrand.40" },
                    "60": { ref: "ColorBrand.50" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("#19BDB0");
        });

        it("should return empty string for invalid reference", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBrand.100" } as unknown as TDesignTokenValue;
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("");
        });

        it("should return empty string for token without value or ref", () => {
            const tokenValue: TDesignTokenValue = {} as unknown as TDesignTokenValue;
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("");
        });

        it("should prevent stack overflow on circular references", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBrand.10" };
            const tokens = {
                ColorBrand: {
                    "10": { ref: "ColorBrand.20" },
                    "20": { ref: "ColorBrand.30" },
                    "30": { ref: "ColorBrand.10" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            expect(result).toBe("");
        });
    });

    describe("getCSSVariableByTokenGroup", () => {
        it("should generate CSS variables for token group", () => {
            const tokenGroup = {
                ColorBrand: {
                    "0": { value: "#1F3336" },
                    "50": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBrand: {
                    "0": { value: "#1F3336" },
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            expect(result).toContain("--triplex-next-ColorBrand-0-1-0-0: #1F3336;");
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #21A19A;");
        });

        describe("недопустимые символы", () => {
            let warn: ReturnType<typeof vi.spyOn>;

            beforeEach(() => {
                warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
            });

            afterEach(() => {
                warn.mockRestore();
            });

            it.each([
                ["точка с запятой", "red; color: blue"],
                ["закрывающая скобка правила", "red } body { display: none"],
                ["открывающая скобка правила", "red { color: blue"],
                ["обратная косая черта", "red\\"],
            ])("пропускает токен, если в значении есть %s", (_, value) => {
                const tokens = { ColorBrand: { "0": { value }, "50": { value: "#21A19A" } } };

                const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokens, tokens as TDesignTokens);

                expect(result).toBe("--triplex-next-ColorBrand-50-1-0-0: #21A19A;");
                expect(warn).toHaveBeenCalledTimes(1);
            });

            it("пропускает токен, если недопустимое значение получено по ссылке", () => {
                const tokens: Record<string, Record<string, TDesignTokenValue>> = {
                    ColorBrand: {
                        "0": { ref: "ColorBrand.50" },
                        "40": { value: "#008985" },
                        "50": { value: "red } body { display: none" },
                    },
                };

                const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokens, tokens as unknown as TDesignTokens);

                expect(result).toBe("--triplex-next-ColorBrand-40-1-0-0: #008985;");
                expect(warn).toHaveBeenCalledTimes(2);
            });

            it.each([
                ["имени токена", { ColorBrand: { "0: red } body { display: none": { value: "#000" } } }],
                ["имени группы", { "ColorBrand: red } body { display: none": { "0": { value: "#000" } } }],
            ])("пропускает токен с недопустимыми символами в %s", (_, tokens) => {
                const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokens, tokens as unknown as TDesignTokens);

                expect(result).toBe("");
                expect(warn).toHaveBeenCalledTimes(1);
            });

            it.each([
                "0 0 0 1px #E60037 inset",
                "rgba(0, 0, 0, 0.5)",
                "linear-gradient(90deg, #fff 0%, #000 100%)",
                "'SB Sans Text', sans-serif",
                "calc(100% - 16px)",
            ])("не трогает обычное css-значение: %s", (value) => {
                const tokens = { ColorBrand: { "0": { value } } };

                const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokens, tokens as TDesignTokens);

                expect(result).toBe(`--triplex-next-ColorBrand-0-1-0-0: ${value};`);
                expect(warn).not.toHaveBeenCalled();
            });
        });
    });

    describe("getStyleByTokens", () => {
        it("should generate CSS for all token groups", () => {
            const tokens = {
                ColorBrand: {
                    "0": { value: "#1F3336" },
                    "50": { value: "#21A19A" },
                },
                ColorNeutral: {
                    "0": { value: "#FFFFFF" },
                    "90": { value: "#F2F4F7" },
                },
            };

            const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);
            expect(result).toContain("--triplex-next-ColorBrand-0-1-0-0: #1F3336;");
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorNeutral-0-1-0-0: #FFFFFF;");
            expect(result).toContain("--triplex-next-ColorNeutral-90-1-0-0: #F2F4F7;");
        });
    });

    describe("getStyle", () => {
        it("should generate light theme styles by default", () => {
            const customTokens = {
                ColorBrand: {
                    "50": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(undefined, customTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #custom-color;");
        });

        it("should generate light theme styles", () => {
            const customTokens = {
                ColorBrand: {
                    "50": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #custom-color;");
        });

        it("should generate dark theme styles", () => {
            const customTokens = {
                ColorBrand: {
                    "50": { value: "#custom-dark-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.DARK, customTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #custom-dark-color;");
        });

        it("should merge custom tokens with theme tokens", () => {
            const customTokens = {
                ColorBrand: {
                    "50": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #custom-color;");
            expect(result).toContain("--triplex-next-ColorBrand-0-1-0-0: #1F3336;");
        });
    });

    describe("getStyle: недопустимые значения пользовательских токенов", () => {
        it("не выводит в стили значение, выходящее за пределы объявления", () => {
            const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
            const customTokens = {
                ColorBrand: { "0": { value: "red } body { background: url(//example.test/x)" } },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);

            expect(result).not.toContain("body");
            expect(result).not.toContain("}");
            expect(result).not.toContain("--triplex-next-ColorBrand-0-");
            // Остальные токены группы выводятся как обычно.
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #21A19A;");
            warn.mockRestore();
        });
    });

    describe("Integration Tests", () => {
        it("should handle missing package version", () => {
            delete process.env.npm_package_version;

            const tokenGroup = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-0-0-0:");
        });
    });

    describe("Version Handling", () => {
        it("should handle different package versions", () => {
            process.env.npm_package_version = "2.1.3";

            const tokenGroup = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-2-1-3:");
        });

        it("should handle missing package version", () => {
            delete process.env.npm_package_version;

            const tokenGroup = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            expect(result).toContain("--triplex-next-ColorBrand-50-0-0-0:");
        });
    });
});
