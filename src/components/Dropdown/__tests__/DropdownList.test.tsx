import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownList } from "../desktop/DropdownList";
import { DropdownListContext } from "../DropdownListContext";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

const renderList = (props: Partial<React.ComponentProps<typeof DropdownList>> = {}) =>
    render(
        <DropdownList dropdownOpened {...props}>
            <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
            <DropdownList.Item id="item-2">Option 2</DropdownList.Item>
            <DropdownList.Item id="item-3">Option 3</DropdownList.Item>
        </DropdownList>,
    );

const getItems = () => screen.getAllByRole("option");

describe("DropdownList", () => {
    it("renders a listbox with items", () => {
        renderList();

        expect(screen.getByRole("listbox")).toHaveClass("dropdownDesktopList");
        expect(getItems()).toHaveLength(3);
    });

    it("merges custom className and applies size class", () => {
        renderList({ className: "custom-class", size: EComponentSize.LG });

        expect(screen.getByRole("listbox")).toHaveClass("dropdownDesktopList", "lg", "custom-class");
    });

    it.each([EComponentSize.SM, EComponentSize.MD, EComponentSize.LG])("applies size class for %s", (size) => {
        renderList({ size });

        expect(screen.getByRole("listbox")).toHaveClass(size);
    });

    it("passes html attributes to the root element", () => {
        renderList({ id: "list-id", "aria-label": "Options" });

        expect(screen.getByRole("listbox")).toHaveAttribute("id", "list-id");
        expect(screen.getByRole("listbox")).toHaveAttribute("aria-label", "Options");
    });

    it("exposes DropdownListItem as a static subcomponent", () => {
        expect(DropdownList.Item).toBeTypeOf("object");
    });

    it("assigns listRef to the list container", () => {
        const listRef = React.createRef<HTMLDivElement>();

        renderList({ listRef });

        expect(listRef.current).toBe(screen.getByRole("listbox"));
    });

    it("renders a loader item when loading", () => {
        const { container } = renderList({ loading: true });

        expect(getItems()).toHaveLength(4);
        expect(container.querySelector(".dropdownDesktopListLoader")).not.toBeNull();
    });

    it("marks the first item as active when the dropdown is opened", () => {
        renderList();

        expect(getItems()[0]).toHaveClass("active");
    });

    it("marks the selected item as active when the dropdown is opened", () => {
        render(
            <DropdownList dropdownOpened>
                <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                <DropdownList.Item id="item-2" selected>
                    Option 2
                </DropdownList.Item>
            </DropdownList>,
        );

        expect(getItems()[1]).toHaveClass("active");
    });

    it("resets the active item on reopening", () => {
        const { rerender } = renderList();

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(getItems()[1]).toHaveClass("active");

        rerender(
            <DropdownList dropdownOpened={false}>
                <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                <DropdownList.Item id="item-2">Option 2</DropdownList.Item>
                <DropdownList.Item id="item-3">Option 3</DropdownList.Item>
            </DropdownList>,
        );
        rerender(
            <DropdownList dropdownOpened>
                <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                <DropdownList.Item id="item-2">Option 2</DropdownList.Item>
                <DropdownList.Item id="item-3">Option 3</DropdownList.Item>
            </DropdownList>,
        );

        expect(getItems()[0]).toHaveClass("active");
    });

    it("moves the active item down on ArrowDown and wraps around", () => {
        renderList();

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(getItems()[1]).toHaveClass("active");

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(getItems()[2]).toHaveClass("active");

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        expect(getItems()[0]).toHaveClass("active");
    });

    it("moves the active item up on ArrowUp and wraps around", () => {
        renderList();

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_UP });
        expect(getItems()[2]).toHaveClass("active");

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_UP });
        expect(getItems()[1]).toHaveClass("active");
    });

    it("prevents default browser scrolling on arrow keys", () => {
        renderList();

        const prevented = !fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });

        expect(prevented).toBe(true);
    });

    it("does not handle keyboard navigation when the dropdown is closed", () => {
        renderList({ dropdownOpened: false });

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });

        getItems().forEach((item) => expect(item).not.toHaveClass("active"));
    });

    it("activates an item on mouse over and deactivates it on mouse out", () => {
        renderList();

        fireEvent.mouseOver(getItems()[2]);
        expect(getItems()[2]).toHaveClass("active");

        fireEvent.mouseOut(getItems()[2]);
        getItems().forEach((item) => expect(item).not.toHaveClass("active"));
    });

    it("calls the original onMouseOver and onMouseOut handlers of an item", () => {
        const onMouseOver = vi.fn();
        const onMouseOut = vi.fn();

        render(
            <DropdownList dropdownOpened>
                <DropdownList.Item id="item-1" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                    Option 1
                </DropdownList.Item>
            </DropdownList>,
        );

        fireEvent.mouseOver(getItems()[0]);
        fireEvent.mouseOut(getItems()[0]);

        expect(onMouseOver).toHaveBeenCalledTimes(1);
        expect(onMouseOut).toHaveBeenCalledTimes(1);
    });

    it("passes the list size down to items", () => {
        const { container } = render(
            <DropdownList dropdownOpened size={EComponentSize.LG}>
                <DropdownList.Item id="item-1" showNotificationIcon>
                    Option 1
                </DropdownList.Item>
            </DropdownList>,
        );

        expect(container.querySelector(".notificationIcon")).toHaveClass("lg");
    });

    it("renders children that are not valid elements as is", () => {
        render(
            <DropdownList dropdownOpened>
                {"Plain text"}
                <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
            </DropdownList>,
        );

        expect(screen.getByRole("listbox")).toHaveTextContent("Plain text");
    });

    it("syncs activeDescendant with the active item", () => {
        const setActiveDescendant = vi.fn();

        render(
            <DropdownListContext.Provider value={{ activeDescendant: undefined, setActiveDescendant }}>
                <DropdownList dropdownOpened>
                    <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                    <DropdownList.Item id="item-2">Option 2</DropdownList.Item>
                </DropdownList>
            </DropdownListContext.Provider>,
        );

        expect(setActiveDescendant).toHaveBeenCalledWith("item-1");

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });

        expect(setActiveDescendant).toHaveBeenCalledWith("item-2");
    });

    it("resets activeDescendant when the dropdown is closed", () => {
        const setActiveDescendant = vi.fn();

        render(
            <DropdownListContext.Provider value={{ activeDescendant: undefined, setActiveDescendant }}>
                <DropdownList dropdownOpened={false}>
                    <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                </DropdownList>
            </DropdownListContext.Provider>,
        );

        expect(setActiveDescendant).toHaveBeenCalledWith(undefined);
    });

    it("resets activeDescendant on unmount", () => {
        const setActiveDescendant = vi.fn();

        const { unmount } = render(
            <DropdownListContext.Provider value={{ activeDescendant: "item-1", setActiveDescendant }}>
                <DropdownList dropdownOpened>
                    <DropdownList.Item id="item-1">Option 1</DropdownList.Item>
                </DropdownList>
            </DropdownListContext.Provider>,
        );

        setActiveDescendant.mockClear();
        unmount();

        expect(setActiveDescendant).toHaveBeenCalledWith(undefined);
    });

    /**
     * Прокрутка работает через внутренний ref контейнера, когда listRef не передан снаружи,
     * поэтому тест намеренно не использует listRef.
     */
    it("scrolls the list container to the item that becomes active", () => {
        renderList();

        const container = screen.getByRole("listbox");

        container.scrollTop = 0;
        // Контейнер высотой 40px показывает два элемента по 20px, третий находится за его границей.
        container.getBoundingClientRect = () => ({ top: 0, bottom: 40 }) as DOMRect;
        getItems().forEach((item, index) => {
            item.getBoundingClientRect = () => ({ top: index * 20, bottom: index * 20 + 20 }) as DOMRect;
        });

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_UP });

        expect(getItems()[2]).toHaveClass("active");
        // 0 + 60 (bottom элемента) - 40 (bottom контейнера) + 4 (отступ).
        expect(container.scrollTop).toBe(24);
    });
});
