import { describe, it, expect } from "vitest";
import { statusToClassNameMap } from "../utils";

describe("statusToClassNameMap", () => {
    // Полноту карты гарантирует satisfies Record<EMarkerStatus, string> в utils.ts —
    // забытый статус не скомпилируется, дублировать это рантайм-проверкой незачем.
    // Типы не ловят другое: опечатку в styles.*, из-за которой класс станет undefined,
    // и два статуса, случайно уехавшие в один класс.
    it("should map every status to a non-empty distinct class name", () => {
        const classNames = Object.values(statusToClassNameMap);

        classNames.forEach((className) => expect(className).toBeTruthy());
        expect(new Set(classNames).size).toBe(classNames.length);
    });
});
