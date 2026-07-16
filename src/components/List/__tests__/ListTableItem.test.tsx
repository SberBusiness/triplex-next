import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListTableItem } from "../components/ListTableItem";
import { ListItemControlsButton } from "../components/ListItemControlsButton";

describe("ListTableItem", () => {
    it("renders as a list item element with content", () => {
        render(<ListTableItem>Row content</ListTableItem>);
        const item = screen.getByRole("listitem");
        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent("Row content");
    });

    it("forwards ref to the li element", () => {
        const ref = React.createRef<HTMLLIElement>();
        render(<ListTableItem ref={ref}>Row content</ListTableItem>);
        expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it("merges custom className on the li element", () => {
        render(<ListTableItem className="custom-row">Row content</ListTableItem>);
        const item = screen.getByRole("listitem");
        expect(item).toHaveClass("custom-row");
    });

    it("calls onClickItem when content is clicked", () => {
        const onClickItem = vi.fn();
        render(
            <ListTableItem onClickItem={onClickItem}>
                <span data-testid="row-content">Row content</span>
            </ListTableItem>,
        );
        fireEvent.click(screen.getByTestId("row-content"));
        expect(onClickItem).toHaveBeenCalledTimes(1);
    });

    it("renders controlButtons when provided", () => {
        render(
            <ListTableItem
                controlButtons={<ListItemControlsButton data-testid="action-btn">Action</ListItemControlsButton>}
            >
                Row content
            </ListTableItem>,
        );
        expect(screen.getByTestId("action-btn")).toBeInTheDocument();
    });

    it("does not render a checkbox in non-selectable mode", () => {
        render(<ListTableItem>Row content</ListTableItem>);
        expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });

    it("renders a checkbox in selectable mode and reflects selected state", () => {
        const { rerender } = render(
            <ListTableItem selected={false} onSelect={vi.fn()}>
                Row content
            </ListTableItem>,
        );
        expect(screen.getByRole("checkbox")).not.toBeChecked();

        rerender(
            <ListTableItem selected={true} onSelect={vi.fn()}>
                Row content
            </ListTableItem>,
        );
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("calls onSelect when checkbox is toggled", () => {
        const onSelect = vi.fn();
        render(
            <ListTableItem selected={false} onSelect={onSelect}>
                Row content
            </ListTableItem>,
        );
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onSelect).toHaveBeenCalledWith(true);
    });
});
