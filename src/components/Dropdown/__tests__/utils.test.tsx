import React from "react";
import { describe, it, expect } from "vitest";
import {
    getListItemElement,
    getListItemsProps,
    getNextActiveListItemId,
    resolveActiveListItemId,
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
    describe("getListItemsProps", () => {
        it("returns props of elements in children order", () => {
            const children = [<DropdownListItem key="1" id="1" />, <DropdownListItem key="2" id="2" selected />];

            expect(getListItemsProps(children)).toEqual([
                expect.objectContaining({ id: "1" }),
                expect.objectContaining({ id: "2", selected: true }),
            ]);
        });

        it("skips children that are not valid elements", () => {
            const children = ["text", null, <DropdownListItem key="1" id="1" />, false];

            expect(getListItemsProps(children).map(({ id }) => id)).toEqual(["1"]);
        });

        it("returns an empty array when there are no children", () => {
            expect(getListItemsProps(null)).toEqual([]);
        });
    });

    describe("resolveActiveListItemId", () => {
        const ids = ["1", "2", "3"];

        it("returns the active id when it is among the items", () => {
            expect(resolveActiveListItemId(ids, "2")).toBe("2");
        });

        it.each([null, "missing"])("falls back to the first item for %s", (activeId) => {
            expect(resolveActiveListItemId(ids, activeId)).toBe("1");
        });

        it("returns undefined when there is no active item", () => {
            expect(resolveActiveListItemId(ids, undefined)).toBeUndefined();
        });

        it("returns undefined for an empty list", () => {
            expect(resolveActiveListItemId([], null)).toBeUndefined();
            expect(resolveActiveListItemId([], "1")).toBeUndefined();
        });
    });

    describe("getNextActiveListItemId", () => {
        const ids = ["1", "2", "3"];

        it.each([
            ["1", "2"],
            ["2", "3"],
            ["3", "1"],
        ])("moves next from %s to %s and wraps around", (activeId, expected) => {
            expect(getNextActiveListItemId(ids, activeId, "next")).toBe(expected);
        });

        it.each([
            ["3", "2"],
            ["2", "1"],
            ["1", "3"],
        ])("moves previous from %s to %s and wraps around", (activeId, expected) => {
            expect(getNextActiveListItemId(ids, activeId, "previous")).toBe(expected);
        });

        it.each([undefined, "missing"])("starts from the edge when the active id is %s", (activeId) => {
            expect(getNextActiveListItemId(ids, activeId, "next")).toBe("1");
            expect(getNextActiveListItemId(ids, activeId, "previous")).toBe("3");
        });

        it("returns undefined when there are no items", () => {
            expect(getNextActiveListItemId([], undefined, "next")).toBeUndefined();
            expect(getNextActiveListItemId([], "1", "previous")).toBeUndefined();
        });
    });

    describe("getListItemElement", () => {
        it("returns the element with the given id inside the container", () => {
            const container = document.createElement("div");
            const item = document.createElement("div");

            item.id = "item-1";
            container.appendChild(item);
            document.body.appendChild(container);

            expect(getListItemElement(container, "item-1")).toBe(item);

            container.remove();
        });

        it("returns null for an element outside the container", () => {
            const container = document.createElement("div");
            const outside = document.createElement("div");

            outside.id = "outside";
            document.body.append(container, outside);

            expect(getListItemElement(container, "outside")).toBeNull();

            container.remove();
            outside.remove();
        });

        it("finds the item inside the container when an element with the same id precedes it on the page", () => {
            const duplicate = document.createElement("div");
            const container = document.createElement("div");
            const item = document.createElement("div");

            duplicate.id = "item-1";
            item.id = "item-1";
            container.appendChild(item);
            document.body.append(duplicate, container);

            expect(getListItemElement(container, "item-1")).toBe(item);

            duplicate.remove();
            container.remove();
        });

        it("finds an item whose id is not a valid CSS selector", () => {
            const container = document.createElement("div");
            const item = document.createElement("div");

            item.id = '1 "option"';
            container.appendChild(item);

            expect(getListItemElement(container, '1 "option"')).toBe(item);
        });

        it("returns null when container or id is missing", () => {
            expect(getListItemElement(null, "item-1")).toBeNull();
            expect(getListItemElement(document.createElement("div"), undefined)).toBeNull();
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
