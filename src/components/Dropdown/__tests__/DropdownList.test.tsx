import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DropdownList } from "../desktop/DropdownList";
import { DropdownListContext, IDropdownListContext } from "../DropdownListContext";
import { useDropdownListKeyboard } from "../useDropdownListKeyboard";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

type TDropdownListProps = React.ComponentProps<typeof DropdownList>;

/**
 * Управляющий элемент со связкой useDropdownListKeyboard: клавиши списку передаются с него.
 * Результат handleKeyDown записывается в data-handled.
 */
const KeyboardHarness = ({ dropdownOpened = true, ...listProps }: Partial<TDropdownListProps>) => {
    const { context, activeDescendant, handleKeyDown } = useDropdownListKeyboard();

    return (
        <DropdownListContext.Provider value={context}>
            <button
                type="button"
                aria-activedescendant={activeDescendant}
                onKeyDown={(event) => {
                    event.currentTarget.dataset.handled = String(handleKeyDown(event));
                }}
            >
                Trigger
            </button>
            <DropdownList dropdownOpened={dropdownOpened} {...listProps} />
        </DropdownListContext.Provider>
    );
};

const DEFAULT_ITEMS = [
    <DropdownList.Item key="item-1" id="item-1">
        Option 1
    </DropdownList.Item>,
    <DropdownList.Item key="item-2" id="item-2">
        Option 2
    </DropdownList.Item>,
    <DropdownList.Item key="item-3" id="item-3">
        Option 3
    </DropdownList.Item>,
];

const renderList = ({ children = DEFAULT_ITEMS, ...props }: Partial<TDropdownListProps> = {}) =>
    render(<KeyboardHarness {...props}>{children}</KeyboardHarness>);

const getItems = () => screen.getAllByRole("option");

const getTrigger = () => screen.getByRole("button");

/** Нажатие клавиши на управляющем элементе. Возвращает true, если у события вызван preventDefault. */
const pressKey = (keyCode: number) => !fireEvent.keyDown(getTrigger(), { keyCode });

/** Значение контекста без useDropdownListKeyboard — для проверки вызовов его сеттеров. */
const createContextValue = (overrides: Partial<IDropdownListContext> = {}): IDropdownListContext => ({
    activeDescendant: undefined,
    setActiveDescendant: vi.fn(),
    registerKeyDownHandler: vi.fn(() => () => {}),
    ...overrides,
});

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
        renderList({
            children: [
                <DropdownList.Item key="item-1" id="item-1">
                    Option 1
                </DropdownList.Item>,
                <DropdownList.Item key="item-2" id="item-2" selected>
                    Option 2
                </DropdownList.Item>,
            ],
        });

        expect(getItems()[1]).toHaveClass("active");
    });

    it("skips children that are not elements when choosing the active item on open", () => {
        const onSelect = vi.fn();

        renderList({
            children: [
                null,
                <DropdownList.Item key="item-1" id="item-1" onSelect={onSelect}>
                    Option 1
                </DropdownList.Item>,
            ],
        });

        expect(getItems()[0]).toHaveClass("active");
        expect(getTrigger()).toHaveAttribute("aria-activedescendant", "item-1");

        pressKey(EVENT_KEY_CODES.ENTER);

        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("resets the active item on reopening", () => {
        const { rerender } = renderList();

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(getItems()[1]).toHaveClass("active");

        rerender(<KeyboardHarness dropdownOpened={false}>{DEFAULT_ITEMS}</KeyboardHarness>);
        rerender(<KeyboardHarness dropdownOpened>{DEFAULT_ITEMS}</KeyboardHarness>);

        expect(getItems()[0]).toHaveClass("active");
    });

    it("clears the active item when the dropdown is closed", () => {
        const { rerender } = renderList();

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(getItems()[1]).toHaveClass("active");

        rerender(<KeyboardHarness dropdownOpened={false}>{DEFAULT_ITEMS}</KeyboardHarness>);

        getItems().forEach((item) => expect(item).not.toHaveClass("active"));
    });

    it("moves the active item down on ArrowDown and wraps around", () => {
        renderList();

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(getItems()[1]).toHaveClass("active");

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(getItems()[2]).toHaveClass("active");

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);
        expect(getItems()[0]).toHaveClass("active");
    });

    it("moves the active item up on ArrowUp and wraps around", () => {
        renderList();

        pressKey(EVENT_KEY_CODES.ARROW_UP);
        expect(getItems()[2]).toHaveClass("active");

        pressKey(EVENT_KEY_CODES.ARROW_UP);
        expect(getItems()[1]).toHaveClass("active");
    });

    it("prevents default browser scrolling on arrow keys and reports them as handled", () => {
        renderList();

        expect(pressKey(EVENT_KEY_CODES.ARROW_DOWN)).toBe(true);
        expect(getTrigger()).toHaveAttribute("data-handled", "true");
    });

    it("does not handle arrow keys in an empty list", () => {
        renderList({ children: [] });

        expect(pressKey(EVENT_KEY_CODES.ARROW_DOWN)).toBe(false);
        expect(pressKey(EVENT_KEY_CODES.ARROW_UP)).toBe(false);
        expect(getTrigger()).toHaveAttribute("data-handled", "false");
    });

    it("does not handle keyboard navigation when the dropdown is closed", () => {
        renderList({ dropdownOpened: false });

        expect(pressKey(EVENT_KEY_CODES.ARROW_DOWN)).toBe(false);
        expect(getTrigger()).toHaveAttribute("data-handled", "false");
        getItems().forEach((item) => expect(item).not.toHaveClass("active"));
    });

    it("does not listen to keyboard events on the document", () => {
        const onSelect = vi.fn();

        renderList({
            children: [
                <DropdownList.Item key="item-1" id="item-1" onSelect={onSelect}>
                    Option 1
                </DropdownList.Item>,
                <DropdownList.Item key="item-2" id="item-2">
                    Option 2
                </DropdownList.Item>,
            ],
        });

        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ARROW_DOWN });
        fireEvent.keyDown(document, { keyCode: EVENT_KEY_CODES.ENTER });

        expect(getItems()[0]).toHaveClass("active");
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("does not handle keys without DropdownListContext provider", () => {
        const onSelect = vi.fn();

        render(
            <DropdownList dropdownOpened>
                <DropdownList.Item id="item-1" onSelect={onSelect}>
                    Option 1
                </DropdownList.Item>
            </DropdownList>,
        );

        fireEvent.keyDown(screen.getByRole("option"), { keyCode: EVENT_KEY_CODES.ENTER });

        expect(onSelect).not.toHaveBeenCalled();
    });

    it.each([
        ["Enter", EVENT_KEY_CODES.ENTER],
        ["Space", EVENT_KEY_CODES.SPACE],
    ])("calls onSelect of the active item on %s and prevents default", (_, keyCode) => {
        const onSelectFirst = vi.fn();
        const onSelectSecond = vi.fn();

        renderList({
            children: [
                <DropdownList.Item key="item-1" id="item-1" onSelect={onSelectFirst}>
                    Option 1
                </DropdownList.Item>,
                <DropdownList.Item key="item-2" id="item-2" onSelect={onSelectSecond}>
                    Option 2
                </DropdownList.Item>,
            ],
        });

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);

        expect(pressKey(keyCode)).toBe(true);
        expect(getTrigger()).toHaveAttribute("data-handled", "true");
        expect(onSelectFirst).not.toHaveBeenCalled();
        expect(onSelectSecond).toHaveBeenCalledTimes(1);
    });

    it("respects keyCodesForSelection of the active item", () => {
        const onSelect = vi.fn();

        renderList({
            children: (
                <DropdownList.Item id="item-1" onSelect={onSelect} keyCodesForSelection={[EVENT_KEY_CODES.ENTER]}>
                    Option 1
                </DropdownList.Item>
            ),
        });

        expect(pressKey(EVENT_KEY_CODES.SPACE)).toBe(false);
        expect(getTrigger()).toHaveAttribute("data-handled", "false");
        expect(onSelect).not.toHaveBeenCalled();

        pressKey(EVENT_KEY_CODES.ENTER);
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("does not select anything when there is no active item", () => {
        const onSelect = vi.fn();

        renderList({
            children: (
                <DropdownList.Item id="item-1" onSelect={onSelect}>
                    Option 1
                </DropdownList.Item>
            ),
        });

        fireEvent.mouseOut(getItems()[0]);

        expect(pressKey(EVENT_KEY_CODES.ENTER)).toBe(false);
        expect(onSelect).not.toHaveBeenCalled();
    });

    it("selects the item activated by mouse over", () => {
        const onSelect = vi.fn();

        renderList({
            children: [
                <DropdownList.Item key="item-1" id="item-1">
                    Option 1
                </DropdownList.Item>,
                <DropdownList.Item key="item-2" id="item-2" onSelect={onSelect}>
                    Option 2
                </DropdownList.Item>,
            ],
        });

        fireEvent.mouseOver(getItems()[1]);
        pressKey(EVENT_KEY_CODES.ENTER);

        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("uses the latest onSelect after rerender", () => {
        const firstOnSelect = vi.fn();
        const secondOnSelect = vi.fn();

        const { rerender } = renderList({
            children: (
                <DropdownList.Item id="item-1" onSelect={firstOnSelect}>
                    Option 1
                </DropdownList.Item>
            ),
        });

        rerender(
            <KeyboardHarness>
                <DropdownList.Item id="item-1" onSelect={secondOnSelect}>
                    Option 1
                </DropdownList.Item>
            </KeyboardHarness>,
        );

        pressKey(EVENT_KEY_CODES.ENTER);

        expect(firstOnSelect).not.toHaveBeenCalled();
        expect(secondOnSelect).toHaveBeenCalledTimes(1);
    });

    it("does not handle other keys", () => {
        renderList();

        expect(pressKey(EVENT_KEY_CODES.TAB)).toBe(false);
        expect(getTrigger()).toHaveAttribute("data-handled", "false");
    });

    it("unregisters the keyboard handler when closed and on unmount", () => {
        const unregister = vi.fn();
        const registerKeyDownHandler = vi.fn(() => unregister);
        const value = createContextValue({ registerKeyDownHandler });

        const { rerender, unmount } = render(
            <DropdownListContext.Provider value={value}>
                <DropdownList dropdownOpened>{DEFAULT_ITEMS}</DropdownList>
            </DropdownListContext.Provider>,
        );

        expect(registerKeyDownHandler).toHaveBeenLastCalledWith(expect.any(Function));
        expect(unregister).not.toHaveBeenCalled();

        rerender(
            <DropdownListContext.Provider value={value}>
                <DropdownList dropdownOpened={false}>{DEFAULT_ITEMS}</DropdownList>
            </DropdownListContext.Provider>,
        );

        // Каждая регистрация снята, закрытый список новую не создаёт.
        expect(unregister).toHaveBeenCalledTimes(registerKeyDownHandler.mock.calls.length);

        rerender(
            <DropdownListContext.Provider value={value}>
                <DropdownList dropdownOpened>{DEFAULT_ITEMS}</DropdownList>
            </DropdownListContext.Provider>,
        );
        unmount();

        expect(unregister).toHaveBeenCalledTimes(registerKeyDownHandler.mock.calls.length);
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

        renderList({
            children: (
                <DropdownList.Item id="item-1" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                    Option 1
                </DropdownList.Item>
            ),
        });

        fireEvent.mouseOver(getItems()[0]);
        fireEvent.mouseOut(getItems()[0]);

        expect(onMouseOver).toHaveBeenCalledTimes(1);
        expect(onMouseOut).toHaveBeenCalledTimes(1);
    });

    it("passes the list size down to items", () => {
        const { container } = renderList({
            size: EComponentSize.LG,
            children: (
                <DropdownList.Item id="item-1" showNotificationIcon>
                    Option 1
                </DropdownList.Item>
            ),
        });

        expect(container.querySelector(".notificationIcon")).toHaveClass("lg");
    });

    it("renders children that are not valid elements as is", () => {
        renderList({
            children: [
                "Plain text",
                <DropdownList.Item key="item-1" id="item-1">
                    Option 1
                </DropdownList.Item>,
            ],
        });

        expect(screen.getByRole("listbox")).toHaveTextContent("Plain text");
    });

    it("syncs activeDescendant with the active item", () => {
        renderList();

        expect(getTrigger()).toHaveAttribute("aria-activedescendant", "item-1");

        pressKey(EVENT_KEY_CODES.ARROW_DOWN);

        expect(getTrigger()).toHaveAttribute("aria-activedescendant", "item-2");
    });

    it("resets activeDescendant when the mouse leaves the active item", () => {
        renderList();

        fireEvent.mouseOver(getItems()[1]);
        expect(getTrigger()).toHaveAttribute("aria-activedescendant", "item-2");

        fireEvent.mouseOut(getItems()[1]);
        expect(getTrigger()).not.toHaveAttribute("aria-activedescendant");
    });

    it("syncs activeDescendant when items appear after opening", () => {
        const { rerender } = renderList({ children: [] });

        expect(getTrigger()).not.toHaveAttribute("aria-activedescendant");

        rerender(<KeyboardHarness>{DEFAULT_ITEMS}</KeyboardHarness>);

        expect(getItems()[0]).toHaveClass("active");
        expect(getTrigger()).toHaveAttribute("aria-activedescendant", "item-1");
    });

    it("resets activeDescendant when the dropdown is closed", () => {
        const setActiveDescendant = vi.fn();

        render(
            <DropdownListContext.Provider value={createContextValue({ setActiveDescendant })}>
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
            <DropdownListContext.Provider
                value={createContextValue({ activeDescendant: "item-1", setActiveDescendant })}
            >
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

        pressKey(EVENT_KEY_CODES.ARROW_UP);

        expect(getItems()[2]).toHaveClass("active");
        // 0 + 60 (bottom элемента) - 40 (bottom контейнера) + 4 (отступ).
        expect(container.scrollTop).toBe(24);
    });
});
