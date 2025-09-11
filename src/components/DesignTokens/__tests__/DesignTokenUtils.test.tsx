import { describe, it, expect, beforeEach, vi } from "vitest";
import { DesignTokenUtils } from "../DesignTokenUtils";
import { ETriplexNextTheme } from "../../ThemeProvider/ETriplexNextTheme";
import { TDesignTokenValue } from "../types/DesignTokenTypes";
import { TDesignTokens } from "../types/DesignTokensTypes";

beforeEach(() => {
    process.env.npm_package_version = "1.0.0";
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
                    "60": { value: "#19BDB0" },
                    "80": { ref: "ColorBrand.50" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

            expect(result).toBe("#19BDB0");
        });

        it("should return empty string for invalid reference", () => {
            const tokenValue: TDesignTokenValue = { ref: "Invalid.Token" } as unknown as TDesignTokenValue;
            const tokens = {
                ColorBrand: {
                    "50": { value: "#21A19A" },
                },
            };

            expect(() => {
                DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            }).toThrow();
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

    describe("Integration Tests", () => {
        it("should handle complex token resolution chain", () => {
            const tokens = {
                ColorBrand: {
                    "0": { value: "#1F3336" },
                    "50": { value: "#21A19A" },
                    "60": { ref: "ColorBrand.50" },
                    "80": { ref: "ColorBrand.60" },
                },
            };

            const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);

            expect(result).toContain("--triplex-next-ColorBrand-0-1-0-0: #1F3336;");
            expect(result).toContain("--triplex-next-ColorBrand-50-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorBrand-60-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorBrand-80-1-0-0: #21A19A;");
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

            expect(() => {
                DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            }).toThrow();
        });
    });
});
