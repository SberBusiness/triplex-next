import React from "react";
import { describe, it, expect } from "vitest";
import {
    getNextActiveListItemIndex,
    getSelectedListItemIndex,
    scrollListToItem,
    scrollListToTop,
} from "../desktop/utils";
import { DropdownListItem } from "../desktop/DropdownListItem";

/** Создаёт элемент с подменённым getBoundingClientRect. */
const createElementWithRect = (rect: Partial<DOMRect>, scrollTop = 0): HTMLElement => {
    const element = document.createElement("div");

    element.scrollTop = scrollTop;
    element.getBoundingClientRect = () => ({ top: 0, bottom: 0, ...rect }) as DOMRect;

    return element;
};

describe("Dropdown utils", () => {
    describe("getSelectedListItemIndex", () => {
        it("returns undefined when there are no children", () => {
            expect(getSelectedListItemIndex(null)).toBeUndefined();
        });

        it("returns undefined when no child is selected", () => {
            const children = [<DropdownListItem key="1" id="1" />, <DropdownListItem key="2" id="2" />];

            expect(getSelectedListItemIndex(children)).toBeUndefined();
        });

        it("returns the index of the selected child", () => {
            const children = [
                <DropdownListItem key="1" id="1" />,
                <DropdownListItem key="2" id="2" selected />,
                <DropdownListItem key="3" id="3" />,
            ];

            expect(getSelectedListItemIndex(children)).toBe(1);
        });

        it("returns the index of the last selected child when several are selected", () => {
            const children = [
                <DropdownListItem key="1" id="1" selected />,
                <DropdownListItem key="2" id="2" />,
                <DropdownListItem key="3" id="3" selected />,
            ];

            expect(getSelectedListItemIndex(children)).toBe(2);
        });

        it("ignores children that are not valid elements", () => {
            const children = ["text", null, <DropdownListItem key="1" id="1" selected />];

            expect(getSelectedListItemIndex(children)).toBe(2);
        });
    });

    describe("getNextActiveListItemIndex", () => {
        const items = [
            <DropdownListItem key="1" id="1" />,
            <DropdownListItem key="2" id="2" />,
            <DropdownListItem key="3" id="3" />,
        ];

        it.each([
            [0, 1],
            [1, 2],
            [2, 0],
        ])("moves next from %s to %s and wraps around", (activeIndex, expected) => {
            expect(getNextActiveListItemIndex(items, activeIndex, "next")).toBe(expected);
        });

        it.each([
            [2, 1],
            [1, 0],
            [0, 2],
        ])("moves previous from %s to %s and wraps around", (activeIndex, expected) => {
            expect(getNextActiveListItemIndex(items, activeIndex, "previous")).toBe(expected);
        });

        it.each([undefined, -1, 3, 5])("starts from the edge when the active index is %s", (activeIndex) => {
            expect(getNextActiveListItemIndex(items, activeIndex, "next")).toBe(0);
            expect(getNextActiveListItemIndex(items, activeIndex, "previous")).toBe(2);
        });

        it("skips children that are not valid elements", () => {
            // Индексы как у React.Children.map: 0 — null, 1 — элемент, 2 — false, 3 — элемент.
            const children = [null, <DropdownListItem key="1" id="1" />, false, <DropdownListItem key="2" id="2" />];

            expect(getNextActiveListItemIndex(children, undefined, "next")).toBe(1);
            expect(getNextActiveListItemIndex(children, 1, "next")).toBe(3);
            expect(getNextActiveListItemIndex(children, 3, "next")).toBe(1);
            expect(getNextActiveListItemIndex(children, 1, "previous")).toBe(3);
            // Индекс «пустого» child считается незаданным.
            expect(getNextActiveListItemIndex(children, 0, "previous")).toBe(3);
        });

        it("returns undefined when there are no elements", () => {
            expect(getNextActiveListItemIndex(null, undefined, "next")).toBeUndefined();
            expect(getNextActiveListItemIndex([null, false], 0, "previous")).toBeUndefined();
        });
    });

    describe("scrollListToTop", () => {
        it("resets scrollTop", () => {
            const container = createElementWithRect({}, 120);

            scrollListToTop(container);

            expect(container.scrollTop).toBe(0);
        });

        it("does nothing when container is null", () => {
            expect(() => scrollListToTop(null)).not.toThrow();
        });
    });

    describe("scrollListToItem", () => {
        it("does nothing when container or item is missing", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 50);

            scrollListToItem(null, createElementWithRect({ top: 0, bottom: 20 }));
            scrollListToItem(container, null);

            expect(container.scrollTop).toBe(50);
        });

        it("does not scroll when the item is fully visible", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 30);
            const item = createElementWithRect({ top: 20, bottom: 40 });

            scrollListToItem(container, item);

            expect(container.scrollTop).toBe(30);
        });

        it("scrolls up when the item is above the visible area", () => {
            const container = createElementWithRect({ top: 100, bottom: 200 }, 60);
            const item = createElementWithRect({ top: 80, bottom: 100 });

            scrollListToItem(container, item);

            // 60 - 100 + 80 - 4 (SCROLL_OFFSET)
            expect(container.scrollTop).toBe(36);
        });

        it("scrolls down when the item is below the visible area", () => {
            const container = createElementWithRect({ top: 0, bottom: 100 }, 10);
            const item = createElementWithRect({ top: 100, bottom: 120 });

            scrollListToItem(container, item);

            // 10 + 120 - 100 + 4 (SCROLL_OFFSET)
            expect(container.scrollTop).toBe(34);
        });
    });
});
