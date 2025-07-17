import { describe, it, expect } from "vitest";
import { ETriplexNextTheme } from "../ETriplexNextTheme";

describe("ETriplexNextTheme", () => {
	describe("Enum Values", () => {
		it("should have LIGHT theme value", () => {
			expect(ETriplexNextTheme.LIGHT).toBe("light");
		});

		it("should have DARK theme value", () => {
			expect(ETriplexNextTheme.DARK).toBe("dark");
		});

		it("should have exactly two theme values", () => {
			const themeValues = Object.values(ETriplexNextTheme);
			expect(themeValues).toHaveLength(2);
		});
	});
}); 