import React from "react";
import { describe, it, expect, vi } from "vitest";
import {
    IListItemKeyboardProps,
    createListKeyDownHandler,
    getListItemElement,
    getListItemsProps,
    getNextActiveListItemId,
    resolveActiveListItemId,
} from "../listUtils";
import { DropdownListItem } from "../desktop/DropdownListItem";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

/** Создаёт событие клавиатуры с отслеживаемым preventDefault. */
const createKeyboardEvent = (keyCode: number) =>
    ({ keyCode, preventDefault: vi.fn() }) as unknown as React.KeyboardEvent;

describe("Dropdown list utils", () => {
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

    describe("createListKeyDownHandler", () => {
        const createItems = (keyCodesForSelection?: number[]): IListItemKeyboardProps[] =>
            ["1", "2", "3"].map((id) => ({ id, keyCodesForSelection, onSelect: vi.fn() }));

        it.each([
            ["ArrowDown", EVENT_KEY_CODES.ARROW_DOWN, "3"],
            ["ArrowUp", EVENT_KEY_CODES.ARROW_UP, "1"],
        ])("navigates on %s and prevents default", (_, keyCode, expected) => {
            const onNavigate = vi.fn();
            const event = createKeyboardEvent(keyCode);

            expect(createListKeyDownHandler(createItems(), "2", onNavigate)(event)).toBe(true);
            expect(onNavigate).toHaveBeenCalledWith(expected);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it("leaves arrow keys unhandled for an empty list", () => {
            const onNavigate = vi.fn();
            const event = createKeyboardEvent(EVENT_KEY_CODES.ARROW_DOWN);

            expect(createListKeyDownHandler([], undefined, onNavigate)(event)).toBe(false);
            expect(onNavigate).not.toHaveBeenCalled();
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it.each([
            ["Space", EVENT_KEY_CODES.SPACE],
            ["Enter", EVENT_KEY_CODES.ENTER],
        ])("selects the active item on default key %s", (_, keyCode) => {
            const items = createItems();
            const event = createKeyboardEvent(keyCode);

            expect(createListKeyDownHandler(items, "2", vi.fn())(event)).toBe(true);
            expect(items[1].onSelect).toHaveBeenCalled();
            expect(items[0].onSelect).not.toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it("respects keyCodesForSelection of the active item", () => {
            const items = createItems([EVENT_KEY_CODES.ENTER]);
            const handler = createListKeyDownHandler(items, "1", vi.fn());
            const space = createKeyboardEvent(EVENT_KEY_CODES.SPACE);

            expect(handler(space)).toBe(false);
            expect(items[0].onSelect).not.toHaveBeenCalled();
            expect(space.preventDefault).not.toHaveBeenCalled();

            expect(handler(createKeyboardEvent(EVENT_KEY_CODES.ENTER))).toBe(true);
            expect(items[0].onSelect).toHaveBeenCalledTimes(1);
        });

        it("does not handle selection keys without an active item", () => {
            const items = createItems();
            const event = createKeyboardEvent(EVENT_KEY_CODES.ENTER);

            expect(createListKeyDownHandler(items, undefined, vi.fn())(event)).toBe(false);
            expect(items[0].onSelect).not.toHaveBeenCalled();
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
});
