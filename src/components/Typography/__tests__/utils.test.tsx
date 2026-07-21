import { getTextDecorationClassName } from "../utils";

const styles = {
    strikethrough: "strikethrough",
    underline: "underline",
    underlineStrikethrough: "underlineStrikethrough",
};

describe("getTextDecorationClassName", () => {
    it("returns undefined when no decoration is set", () => {
        expect(getTextDecorationClassName(styles)).toBeUndefined();
        expect(getTextDecorationClassName(styles, false, false)).toBeUndefined();
    });

    it("returns underline class when only underline is set", () => {
        expect(getTextDecorationClassName(styles, true)).toBe("underline");
        expect(getTextDecorationClassName(styles, true, false)).toBe("underline");
    });

    it("returns strikethrough class when only strikethrough is set", () => {
        expect(getTextDecorationClassName(styles, undefined, true)).toBe("strikethrough");
        expect(getTextDecorationClassName(styles, false, true)).toBe("strikethrough");
    });

    it("returns combined class when both underline and strikethrough are set", () => {
        expect(getTextDecorationClassName(styles, true, true)).toBe("underlineStrikethrough");
    });
});
