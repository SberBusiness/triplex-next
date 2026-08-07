import { describe, it, expect } from "vitest";
import { mapTypeToClassName } from "../utils";
import { EIslandType } from "../enums";

describe("mapTypeToClassName", () => {
    it.each([
        [EIslandType.TYPE_1, "type1"],
        [EIslandType.TYPE_2, "type2"],
        [EIslandType.TYPE_3, "type3"],
    ])("returns class name for %s", (type, expectedClassName) => {
        expect(mapTypeToClassName(type)).toBe(expectedClassName);
    });

    it("covers every value of EIslandType", () => {
        const classNames = Object.values(EIslandType).map(mapTypeToClassName);

        expect(classNames.every(Boolean)).toBe(true);
        expect(new Set(classNames).size).toBe(Object.values(EIslandType).length);
    });
});
