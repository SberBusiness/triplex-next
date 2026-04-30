import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListSortable } from "../ListSortable";
import { ListSortableItem } from "../components/ListSortableItem";

interface IItem {
    id: string;
    label: string;
}

const items: IItem[] = [
    { id: "a", label: "Item A" },
    { id: "b", label: "Item B" },
    { id: "c", label: "Item C" },
];

describe("ListSortable", () => {
    it("renders a ul list", () => {
        render(<ListSortable items={items} onItemsChange={vi.fn()} />);
        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("renders sortable items in given order", () => {
        render(
            <ListSortable items={items} onItemsChange={vi.fn()}>
                {items.map((item) => (
                    <ListSortableItem key={item.id} id={item.id}>
                        {item.label}
                    </ListSortableItem>
                ))}
            </ListSortable>,
        );
        const renderedItems = screen.getAllByRole("listitem");
        expect(renderedItems).toHaveLength(3);
        expect(renderedItems[0]).toHaveTextContent("Item A");
        expect(renderedItems[1]).toHaveTextContent("Item B");
        expect(renderedItems[2]).toHaveTextContent("Item C");
    });

    it("forwards ref to the inner ul element", () => {
        const ref = React.createRef<HTMLUListElement>();
        render(<ListSortable items={items} onItemsChange={vi.fn()} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("merges custom className on the ul", () => {
        render(<ListSortable items={items} onItemsChange={vi.fn()} className="custom-list" />);
        expect(screen.getByRole("list")).toHaveClass("custom-list");
    });

    it("renders ListSortableItem with render-prop children", () => {
        render(
            <ListSortable items={items} onItemsChange={vi.fn()}>
                <ListSortableItem id="a">
                    {({ dragging, disabled }) => (
                        <span data-testid="render-prop">
                            {String(dragging)}-{String(!!disabled)}
                        </span>
                    )}
                </ListSortableItem>
            </ListSortable>,
        );
        expect(screen.getByTestId("render-prop")).toHaveTextContent("false-false");
    });
});
