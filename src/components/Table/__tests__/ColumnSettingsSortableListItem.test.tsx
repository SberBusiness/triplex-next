import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ListSortable } from "../../List/ListSortable";
import { IListSortableItemChildrenProvideProps, IListSortableItemProps } from "../../List/components/ListSortableItem";
import {
    ColumnSettingsSortableListItem,
    IColumnSettingsSortableListItemProps,
} from "../TableBasicSettings/components/ColumnSettingsSortableListItem";

const boundary = vi.hoisted(() => {
    const listeners = { onMouseDown: vi.fn() };
    const state: Pick<IListSortableItemChildrenProvideProps, "dragging" | "listeners"> = {
        dragging: false,
        listeners,
    };

    return {
        useRealComponent: false,
        listeners,
        state,
        setActivatorNodeRef: vi.fn<(element: HTMLElement | null) => void>(),
    };
});

// Изолируем только источник render-props: Target, Controls и ExpandAnimation остаются настоящими.
// Smoke-тест ниже делегирует оригиналу и проверяет композицию с реальным DnD-контекстом без перетаскивания.
vi.mock("../../List/components/ListSortableItem", async (importOriginal) => {
    const React = await import("react");
    const original = await importOriginal<typeof import("../../List/components/ListSortableItem")>();

    return {
        ...original,
        ListSortableItem: React.forwardRef<HTMLLIElement, IListSortableItemProps>(
            function ListSortableItemBoundary(props, ref) {
                if (boundary.useRealComponent) {
                    return <original.ListSortableItem {...props} ref={ref} />;
                }

                const { children, disabled, ...rest } = props;

                return (
                    <li {...rest} ref={ref}>
                        {typeof children === "function"
                            ? children({
                                  ...boundary.state,
                                  disabled,
                                  setActivatorNodeRef: boundary.setActivatorNodeRef,
                              })
                            : children}
                    </li>
                );
            },
        ),
    };
});

const renderItem = (props: Partial<IColumnSettingsSortableListItemProps> & React.RefAttributes<HTMLLIElement> = {}) =>
    render(
        <ul>
            <ColumnSettingsSortableListItem id="column" {...props}>
                <span>Колонка</span>
            </ColumnSettingsSortableListItem>
        </ul>,
    );

const getItem = () => screen.getByRole("listitem");

// Target не имеет отдельной семантической роли; класс задаёт его состояние и отделяет от controls внутри.
const getTarget = () => screen.getByText("Колонка").closest(".columnSettingsSortableListItemTarget");

beforeEach(() => {
    boundary.useRealComponent = false;
    boundary.state.dragging = false;
    boundary.state.listeners = boundary.listeners;
    vi.clearAllMocks();
});

afterEach(() => {
    vi.useRealTimers();
});

describe("ColumnSettingsSortableListItem", () => {
    it("renders children inside controls excluded from the drag area", () => {
        renderItem();

        expect(screen.getByText("Колонка").closest("[data-draggable='false']")).toBeInTheDocument();
        expect(getTarget()).toHaveClass("listSortableItemTarget");
    });

    it("forwards listeners to the target", () => {
        renderItem();

        fireEvent.mouseDown(screen.getByText("Колонка"));

        expect(boundary.listeners.onMouseDown).toHaveBeenCalledTimes(1);
        expect(boundary.listeners.onMouseDown).toHaveBeenCalledWith(
            expect.objectContaining({ type: "mousedown", target: screen.getByText("Колонка") }),
        );
    });

    it("renders when listeners are not provided", () => {
        boundary.state.listeners = undefined;

        renderItem();
        fireEvent.mouseDown(screen.getByText("Колонка"));

        expect(getTarget()).toBeInTheDocument();
        expect(boundary.listeners.onMouseDown).not.toHaveBeenCalled();
    });

    it("registers the target div as the activator node", () => {
        renderItem();

        expect(getTarget()?.tagName).toBe("DIV");
        expect(boundary.setActivatorNodeRef).toHaveBeenCalledWith(getTarget());
    });

    it("reflects dragging on the target", () => {
        boundary.state.dragging = true;

        renderItem();

        expect(getTarget()).toHaveClass("dragging");
    });

    it("hides the drag indicator when the item is disabled", () => {
        const { rerender } = renderItem();
        expect(getTarget()?.querySelector(".listSortableItemTargetIcon")).toBeInTheDocument();

        rerender(
            <ul>
                <ColumnSettingsSortableListItem id="column" disabled>
                    <span>Колонка</span>
                </ColumnSettingsSortableListItem>
            </ul>,
        );

        expect(getTarget()?.querySelector(".listSortableItemTargetIcon")).not.toBeInTheDocument();
        expect(screen.getByText("Колонка")).toBeInTheDocument();
    });

    it.each([undefined, null, false, ""])("omits the static content wrapper for %s", (staticContent) => {
        renderItem({ staticContent });

        expect(getItem().childElementCount).toBe(1);
    });

    it("keeps zero as a text node without an animation wrapper", () => {
        renderItem({ staticContent: 0 });

        expect(getItem().childElementCount).toBe(1);
        expect(getItem().lastChild?.nodeType).toBe(Node.TEXT_NODE);
        expect(getItem().lastChild?.textContent).toBe("0");
    });

    it("collapses static content while dragging and expands it afterwards without unmounting", () => {
        vi.useFakeTimers();
        const staticContent = <span>Дополнительные настройки</span>;
        const { rerender } = renderItem({ staticContent });
        const content = screen.getByText("Дополнительные настройки");
        expect(content).toBeVisible();

        const ui = (
            <ul>
                <ColumnSettingsSortableListItem id="column" staticContent={staticContent}>
                    <span>Колонка</span>
                </ColumnSettingsSortableListItem>
            </ul>
        );
        boundary.state.dragging = true;
        rerender(ui);
        act(() => {
            vi.runAllTimers();
        });

        expect(content).toBeInTheDocument();
        expect(content).not.toBeVisible();

        boundary.state.dragging = false;
        rerender(
            <ul>
                <ColumnSettingsSortableListItem id="column" staticContent={staticContent}>
                    <span>Колонка</span>
                </ColumnSettingsSortableListItem>
            </ul>,
        );
        act(() => {
            vi.runAllTimers();
        });

        expect(screen.getByText("Дополнительные настройки")).toBe(content);
        expect(content).toBeVisible();
    });

    it("forwards object ref, className, rest attributes and click events to li", () => {
        const ref = React.createRef<HTMLLIElement>();
        const onClick = vi.fn();
        renderItem({ ref, className: "custom-item", title: "Настройки колонки", "aria-label": "Колонка", onClick });

        const item = getItem();
        expect(ref.current).toBeInstanceOf(HTMLLIElement);
        expect(ref.current).toBe(item);
        expect(item).toHaveClass("custom-item");
        expect(item).toHaveAttribute("id", "column");
        expect(item).toHaveAttribute("title", "Настройки колонки");
        expect(item).toHaveAttribute("aria-label", "Колонка");

        fireEvent.click(item);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: item }));
    });

    it("forwards callback ref to li", () => {
        const ref = vi.fn();

        renderItem({ ref });

        expect(ref).toHaveBeenCalledWith(getItem());
    });

    it("composes with the real ListSortableItem inside ListSortable", () => {
        boundary.useRealComponent = true;
        const ref = React.createRef<HTMLLIElement>();
        const onItemsChange = vi.fn();
        render(
            <ListSortable items={[{ id: "column" }]} onItemsChange={onItemsChange}>
                <ColumnSettingsSortableListItem
                    id="column"
                    ref={ref}
                    staticContent={<span>Дополнительные настройки</span>}
                >
                    <span>Колонка</span>
                </ColumnSettingsSortableListItem>
            </ListSortable>,
        );

        expect(ref.current).toBe(getItem());
        expect(getTarget()).toBeInTheDocument();
        expect(screen.getByText("Дополнительные настройки")).toBeVisible();
        expect(onItemsChange).not.toHaveBeenCalled();
        expect(boundary.setActivatorNodeRef).not.toHaveBeenCalled();
    });
});
