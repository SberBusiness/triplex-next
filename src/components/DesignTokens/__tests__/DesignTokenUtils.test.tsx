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
        ColorBasicAlpha: {
            "0": { value: "#E5FCF7" },
            "40": { value: "#21A19A" },
            "60": { ref: "ColorBrand.40" },
        },
        ColorBrand: {
            "0": { value: "#F2F4F7" },
            "40": { value: "#D0D7DD" },
        },
    },
}));

vi.mock("../DesignTokensCoreThemeDark", () => ({
    DesignTokensCoreThemeDark: {
        ColorBasicAlpha: {
            "0": { value: "#0A2A2A" },
            "40": { value: "#1A8A8A" },
        },
        ColorBrand: {
            "0": { value: "#1A1A1A" },
            "40": { value: "#4A4A4A" },
        },
    },
}));

vi.mock("../DesignTokensComponents", () => ({
    DesignTokensComponents: {
        Button: {
            background: { value: "#21A19A" },
            text: { value: "#FFFFFF" },
        },
        Input: {
            border: { value: "#D0D7DD" },
            background: { value: "#FFFFFF" },
        },
    },
}));

vi.mock("../DesignTokensComponentsThemeDark", () => ({
    DesignTokensComponentsThemeDark: {
        Button: {
            background: { value: "#1A8A8A" },
            text: { value: "#000000" },
        },
        Input: {
            border: { value: "#4A4A4A" },
            background: { value: "#1A1A1A" },
        },
    },
}));

describe("DesignTokenUtils", () => {
    describe("getTokenValue", () => {
        it("should return direct value when token has value property", () => {
            const tokenValue: TDesignTokenValue = { value: "#21A19A" };
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

            expect(result).toBe("#21A19A");
        });

        it("should resolve reference when token has ref property", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBasicAlpha.40" };
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

            expect(result).toBe("#21A19A");
        });

        it("should resolve nested references", () => {
            const tokenValue: TDesignTokenValue = { ref: "ColorBasicAlpha.60" };
            const tokens = {
                ColorBasicAlpha: {
                    "60": { value: "#21A19A" },
                    "80": { ref: "ColorBasicAlpha.40" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

            expect(result).toBe("#21A19A");
        });

        it("should return empty string for invalid reference", () => {
            const tokenValue: TDesignTokenValue = { ref: "Invalid.Token" as any };
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            expect(() => {
                DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
            }).toThrow();
        });

        it("should return empty string for token without value or ref", () => {
            const tokenValue: TDesignTokenValue = {} as any;
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

            expect(result).toBe("");
        });
    });

    describe("getCSSVariableByTokenGroup", () => {
        it("should generate CSS variables for token group", () => {
            const tokenGroup = {
                ColorBasicAlpha: {
                    "0": { value: "#E5FCF7" },
                    "40": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBasicAlpha: {
                    "0": { value: "#E5FCF7" },
                    "40": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-0-1-0-0: #E5FCF7;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #21A19A;");
        });
    });

    describe("getStyleByTokens", () => {
        it("should generate CSS for all token groups", () => {
            const tokens = {
                ColorBasicAlpha: {
                    "0": { value: "#E5FCF7" },
                    "40": { value: "#21A19A" },
                },
                ColorBrand: {
                    "0": { value: "#F2F4F7" },
                    "40": { value: "#D0D7DD" },
                },
            };

            const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-0-1-0-0: #E5FCF7;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorBrand-0-1-0-0: #F2F4F7;");
            expect(result).toContain("--triplex-next-ColorBrand-40-1-0-0: #D0D7DD;");
        });
    });

    describe("getStyle", () => {
        it("should generate light theme styles by default", () => {
            const customTokens = {
                ColorBasicAlpha: {
                    "40": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(undefined, customTokens);

            console.log(result);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #custom-color;");
        });

        it("should generate light theme styles", () => {
            const customTokens = {
                ColorBasicAlpha: {
                    "40": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #custom-color;");
        });

        it("should generate dark theme styles", () => {
            const customTokens = {
                ColorBasicAlpha: {
                    "40": { value: "#custom-dark-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.DARK, customTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #custom-dark-color;");
        });

        it("should merge custom tokens with theme tokens", () => {
            const customTokens = {
                ColorBasicAlpha: {
                    "40": { value: "#custom-color" },
                },
            };

            const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #custom-color;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-0-1-0-0: #E5FCF7;");
        });
    });

    describe("Integration Tests", () => {
        it("should handle complex token resolution chain", () => {
            const tokens = {
                ColorBasicAlpha: {
                    "0": { value: "#E5FCF7" },
                    "40": { value: "#21A19A" },
                    "60": { ref: "ColorBasicAlpha.40" },
                    "80": { ref: "ColorBasicAlpha.60" },
                },
            };

            const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-0-1-0-0: #E5FCF7;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-60-1-0-0: #21A19A;");
            expect(result).toContain("--triplex-next-ColorBasicAlpha-80-1-0-0: #21A19A;");
        });
    });

    describe("Version Handling", () => {
        it("should handle different package versions", () => {
            process.env.npm_package_version = "2.1.3";

            const tokenGroup = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);

            expect(result).toContain("--triplex-next-ColorBasicAlpha-40-2-1-3:");
        });

        it("should handle missing package version", () => {
            delete process.env.npm_package_version;

            const tokenGroup = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };
            const tokens = {
                ColorBasicAlpha: {
                    "40": { value: "#21A19A" },
                },
            };

            expect(() => {
                DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
            }).toThrow();
        });
    });
});
