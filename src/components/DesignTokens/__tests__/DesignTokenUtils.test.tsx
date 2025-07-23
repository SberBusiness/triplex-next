import { describe, it, expect, beforeEach, vi } from "vitest";
import { DesignTokenUtils } from "../DesignTokenUtils";
import { ETriplexNextTheme } from "../../ThemeProvider/ETriplexNextTheme";
import { TDesignTokenValue } from "../types/DesignTokenTypes";
import { TDesignTokens, TDesignTokensGroupAbstract } from "../types/DesignTokensTypes";

beforeEach(() => {
	process.env.npm_package_version = "1.0.0";
});

vi.mock("../DesignTokensCore", () => ({
	DesignTokensCore: {
		Primary: {
			"100": { value: "#E5FCF7" },
			"500": { value: "#21A19A" },
			"700": { ref: "Primary.500" },
		},
		Neutral: {
			"100": { value: "#F2F4F7" },
			"500": { value: "#D0D7DD" },
		},
	},
}));

vi.mock("../DesignTokensCoreThemeDark", () => ({
	DesignTokensCoreThemeDark: {
		Primary: {
			"100": { value: "#0A2A2A" },
			"500": { value: "#1A8A8A" },
		},
		Neutral: {
			"100": { value: "#1A1A1A" },
			"500": { value: "#4A4A4A" },
		},
	},
}));

vi.mock("../DesignTokensComponents", () => ({
	DesignTokensComponents: {
		Button: {
			"background": { value: "#21A19A" },
			"text": { value: "#FFFFFF" },
		},
		Input: {
			"border": { value: "#D0D7DD" },
			"background": { value: "#FFFFFF" },
		},
	},
}));

vi.mock("../DesignTokensComponentsThemeDark", () => ({
	DesignTokensComponentsThemeDark: {
		Button: {
			"background": { value: "#1A8A8A" },
			"text": { value: "#000000" },
		},
		Input: {
			"border": { value: "#4A4A4A" },
			"background": { value: "#1A1A1A" },
		},
	},
}));


describe("DesignTokenUtils", () => {
	describe("getTokenValue", () => {
		it("should return direct value when token has value property", () => {
			const tokenValue: TDesignTokenValue = { value: "#21A19A" };
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

			expect(result).toBe("#21A19A");
		});

		it("should resolve reference when token has ref property", () => {
			const tokenValue: TDesignTokenValue = { ref: "Primary.500" };
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

			expect(result).toBe("#21A19A");
		});

		it("should resolve nested references", () => {
			const tokenValue: TDesignTokenValue = { ref: "Primary.700" };
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
					"700": { ref: "Primary.500" },
				},
			};

			const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

			expect(result).toBe("#21A19A");
		});

		it("should return empty string for invalid reference", () => {
			const tokenValue: TDesignTokenValue = { ref: "Invalid.Token" as any };
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			expect(() => {
				DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);
			}).toThrow();
		});

		it("should return empty string for token without value or ref", () => {
			const tokenValue: TDesignTokenValue = {} as any;
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			const result = DesignTokenUtils.getTokenValue(tokenValue, tokens as TDesignTokens);

			expect(result).toBe("");
		});
	});

	describe("getCSSVariableByTokenGroup", () => {
		it("should generate CSS variables for token group", () => {
			const tokenGroup = {
				Primary: {
					"100": { value: "#E5FCF7" },
					"500": { value: "#21A19A" },
				},
			};
			const tokens = {
				Primary: {
					"100": { value: "#E5FCF7" },
					"500": { value: "#21A19A" },
				},	
			};

			const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);

			expect(result).toContain("--triplex-next-Primary-100-1-0-0: #E5FCF7;");
			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #21A19A;");
		});
	});

	describe("getStyleByTokens", () => {
		it("should generate CSS for all token groups", () => {
			const tokens = {
				Primary: {
					"100": { value: "#E5FCF7" },
					"500": { value: "#21A19A" },
				},
				Neutral: {
					"100": { value: "#F2F4F7" },
					"500": { value: "#D0D7DD" },
				},
			};

			const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);

			expect(result).toContain("--triplex-next-Primary-100-1-0-0: #E5FCF7;");
			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #21A19A;");
			expect(result).toContain("--triplex-next-Neutral-100-1-0-0: #F2F4F7;");
			expect(result).toContain("--triplex-next-Neutral-500-1-0-0: #D0D7DD;");
		});
	});

	describe("getStyle", () => {
		it("should generate light theme styles by default", () => {
			const customTokens = {
				Primary: {
					"500": { value: "#custom-color" },
				},
			};

			const result = DesignTokenUtils.getStyle(undefined, customTokens);

			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #custom-color;");
		});

		it("should generate light theme styles", () => {
			const customTokens = {
				Primary: {
					"500": { value: "#custom-color" },
				},
			};

			const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);

			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #custom-color;");
		});

		it("should generate dark theme styles", () => {
			const customTokens = {
				Primary: {
					"500": { value: "#custom-dark-color" },
				},
			};

			const result = DesignTokenUtils.getStyle(ETriplexNextTheme.DARK, customTokens);

			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #custom-dark-color;");
		});

		it("should merge custom tokens with theme tokens", () => {
			const customTokens = {
				Primary: {
					"500": { value: "#custom-color" },
				},
			};

			const result = DesignTokenUtils.getStyle(ETriplexNextTheme.LIGHT, customTokens);

			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #custom-color;");
			expect(result).toContain("--triplex-next-Primary-100-1-0-0: #E5FCF7;");
		});
	});

	describe("Integration Tests", () => {
		it("should handle complex token resolution chain", () => {
			const tokens = {
				Primary: {
					"100": { value: "#E5FCF7" },
					"500": { value: "#21A19A" },
					"700": { ref: "Primary.500" },
					"900": { ref: "Primary.700" },
				},
			};

			const result = DesignTokenUtils.getStyleByTokens(tokens as TDesignTokens);

			expect(result).toContain("--triplex-next-Primary-100-1-0-0: #E5FCF7;");
			expect(result).toContain("--triplex-next-Primary-500-1-0-0: #21A19A;");
			expect(result).toContain("--triplex-next-Primary-700-1-0-0: #21A19A;");
			expect(result).toContain("--triplex-next-Primary-900-1-0-0: #21A19A;");
		});
	});

	describe("Version Handling", () => {
		it("should handle different package versions", () => {
			process.env.npm_package_version = "2.1.3";

			const tokenGroup = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			const result = DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);

			expect(result).toContain("--triplex-next-Primary-500-2-1-3:");
		});

		it("should handle missing package version", () => {
			delete process.env.npm_package_version;

			const tokenGroup = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};
			const tokens = {
				Primary: {
					"500": { value: "#21A19A" },
				},
			};

			expect(() => {
				DesignTokenUtils.getCSSVariableByTokenGroup(tokenGroup, tokens as TDesignTokens);
			}).toThrow();
		});
	});
}); 