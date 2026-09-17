import { describe, it, expect } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { ETextSize } from "../../Typography/enums";
import { ITabsLineItemProps } from "../components/TabsLineItem";
import { splitTabsByMaxVisible, tabsLineSizeToTextSizeMap } from "../utils";

describe("TabsLine utils", () => {
    const tabs: ITabsLineItemProps[] = [
        { id: "tab-1", label: "Tab 1" },
        { id: "tab-2", label: "Tab 2" },
        { id: "tab-3", label: "Tab 3" },
        { id: "tab-4", label: "Tab 4" },
        { id: "tab-5", label: "Tab 5" },
    ];

    const getIds = (items: ITabsLineItemProps[]) => items.map(({ id }) => id);

    describe("tabsLineSizeToTextSizeMap", () => {
        it("Should map every component size to a text size", () => {
            expect(tabsLineSizeToTextSizeMap).toEqual({
                [EComponentSize.SM]: ETextSize.B4,
                [EComponentSize.MD]: ETextSize.B3,
                [EComponentSize.LG]: ETextSize.B2,
            });
        });
    });

    describe("splitTabsByMaxVisible", () => {
        it("Should keep all tabs inline when maxVisible is not passed", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs);

            expect(getIds(inlineTabs)).toEqual(["tab-1", "tab-2", "tab-3", "tab-4", "tab-5"]);
            expect(dropdownTabs).toEqual([]);
        });

        it("Should keep all tabs inline when tabs fit into maxVisible", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs, 5);

            expect(getIds(inlineTabs)).toEqual(["tab-1", "tab-2", "tab-3", "tab-4", "tab-5"]);
            expect(dropdownTabs).toEqual([]);
        });

        it("Should reserve the last visible slot for the dropdown when tabs do not fit", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs, 3);

            expect(getIds(inlineTabs)).toEqual(["tab-1", "tab-2"]);
            expect(getIds(dropdownTabs)).toEqual(["tab-3", "tab-4", "tab-5"]);
        });

        it("Should move every tab to the dropdown when maxVisible is 1", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs, 1);

            expect(inlineTabs).toEqual([]);
            expect(getIds(dropdownTabs)).toEqual(["tab-1", "tab-2", "tab-3", "tab-4", "tab-5"]);
        });

        it("Should keep all tabs inline when maxVisible is 0", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs, 0);

            expect(getIds(inlineTabs)).toEqual(["tab-1", "tab-2", "tab-3", "tab-4", "tab-5"]);
            expect(dropdownTabs).toEqual([]);
        });

        it("Should move every tab to the dropdown when maxVisible is negative", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible(tabs, -1);

            expect(inlineTabs).toEqual([]);
            expect(getIds(dropdownTabs)).toEqual(["tab-1", "tab-2", "tab-3", "tab-4", "tab-5"]);
        });

        it("Should return empty collections for an empty tabs list", () => {
            const { inlineTabs, dropdownTabs } = splitTabsByMaxVisible([], 3);

            expect(inlineTabs).toEqual([]);
            expect(dropdownTabs).toEqual([]);
        });
    });
});
