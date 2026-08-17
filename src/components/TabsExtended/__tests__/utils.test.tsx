import { describe, it, expect } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "../../Typography/enums";
import { ETabsExtendedType } from "../enums";
import { TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP, TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP } from "../utils";

describe("TabsExtended utils", () => {
    it("Should map every component size to an existing text size", () => {
        expect(Object.keys(TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP).sort()).toEqual(Object.values(EComponentSize).sort());

        Object.values(TABS_EXTENDED_SIZE_TO_TEXT_SIZE_MAP).forEach((textSize) => {
            expect(Object.values(ETextSize)).toContain(textSize);
        });
    });

    it("Should map every tabs type to an existing CSS class", () => {
        expect(Object.keys(TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP).sort()).toEqual(
            Object.values(ETabsExtendedType).sort(),
        );

        // Класс приходит из CSS-модуля: пустое значение означает, что имя класса в LESS переименовали.
        Object.values(TABS_EXTENDED_TYPE_TO_CLASS_NAME_MAP).forEach((className) => {
            expect(className).toBeTruthy();
        });
    });
});
