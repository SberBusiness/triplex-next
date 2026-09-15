import { isFilled } from "../components/utils";

describe("isFilled", () => {
    it("returns false for undefined", () => {
        expect(isFilled(undefined)).toBe(false);
    });

    it("returns false for an empty string", () => {
        expect(isFilled("")).toBe(false);
    });

    it("returns true for a non-empty string", () => {
        expect(isFilled("value")).toBe(true);
    });

    it("returns true for a whitespace string", () => {
        expect(isFilled(" ")).toBe(true);
    });

    it("returns true for any number, including zero", () => {
        expect(isFilled(0)).toBe(true);
        expect(isFilled(42)).toBe(true);
    });

    it("returns false for an empty array of strings", () => {
        expect(isFilled([])).toBe(false);
    });

    it("returns true for a non-empty array of strings", () => {
        expect(isFilled(["a"])).toBe(true);
    });
});
