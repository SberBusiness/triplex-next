import { getSafeRel } from "@sberbusiness/triplex-next/utils/html/anchorSecurity";

describe("getSafeRel", () => {
    test("подставляет noopener для target=_blank без явного rel", () => {
        expect(getSafeRel("_blank", undefined)).toBe("noopener");
    });

    test("сохраняет явный rel при target=_blank", () => {
        expect(getSafeRel("_blank", "nofollow")).toBe("nofollow");
    });

    test("подставляет noopener для target=_blank при пустом rel", () => {
        expect(getSafeRel("_blank", "")).toBe("noopener");
    });

    test("не меняет rel для прочих значений target", () => {
        expect(getSafeRel("_self", undefined)).toBeUndefined();
        expect(getSafeRel(undefined, undefined)).toBeUndefined();
        expect(getSafeRel("_parent", "nofollow")).toBe("nofollow");
    });
});
