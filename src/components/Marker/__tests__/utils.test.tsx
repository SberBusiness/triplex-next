import { describe, it, expect } from "vitest";
import { statusToClassNameMap } from "../utils";
import { EMarkerStatus } from "../enums";

describe("statusToClassNameMap", () => {
    it("should have an entry for every EMarkerStatus value", () => {
        expect(Object.keys(statusToClassNameMap).sort()).toEqual(Object.values(EMarkerStatus).sort());
    });

    it("should map every status to a non-empty distinct class name", () => {
        const classNames = Object.values(statusToClassNameMap);

        classNames.forEach((className) => expect(className).toBeTruthy());
        expect(new Set(classNames).size).toBe(classNames.length);
    });
});
