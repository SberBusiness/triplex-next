import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListItemTable } from "../components/ListItemTable";
import { ListItemControlsButton } from "../components/ListItemControlsButton";

describe("ListItemTable", () => {
    it("renders as a list item element with content", () => {
        render(<ListItemTable>Row content</ListItemTable>);
        const item = screen.getByRole("listitem");
        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent("Row content");
    });

    it("forwards ref to the li element", () => {
        const ref = React.createRef<HTMLLIElement>();
        render(<ListItemTable ref={ref}>Row content</ListItemTable>);
        expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it("merges custom className on the li element", () => {
        render(<ListItemTable className="custom-row">Row content</ListItemTable>);
        const item = screen.getByRole("listitem");
        expect(item).toHaveClass("custom-row");
    });

    it("calls onClickItem when content is clicked", () => {
        const onClickItem = vi.fn();
        render(
            <ListItemTable onClickItem={onClickItem}>
                <span data-testid="row-content">Row content</span>
            </ListItemTable>,
        );
        fireEvent.click(screen.getByTestId("row-content"));
        expect(onClickItem).toHaveBeenCalledTimes(1);
    });

    it("renders controlButtons when provided", () => {
        render(
            <ListItemTable
                controlButtons={<ListItemControlsButton data-testid="action-btn">Action</ListItemControlsButton>}
            >
                Row content
            </ListItemTable>,
        );
        expect(screen.getByTestId("action-btn")).toBeInTheDocument();
    });

    it("does not render a checkbox in non-selectable mode", () => {
        render(<ListItemTable>Row content</ListItemTable>);
        expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    });

    it("renders a checkbox in selectable mode and reflects selected state", () => {
        const { rerender } = render(
            <ListItemTable selected={false} onSelect={vi.fn()}>
                Row content
            </ListItemTable>,
        );
        expect(screen.getByRole("checkbox")).not.toBeChecked();

        rerender(
            <ListItemTable selected={true} onSelect={vi.fn()}>
                Row content
            </ListItemTable>,
        );
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("calls onSelect when checkbox is toggled", () => {
        const onSelect = vi.fn();
        render(
            <ListItemTable selected={false} onSelect={onSelect}>
                Row content
            </ListItemTable>,
        );
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onSelect).toHaveBeenCalledWith(true);
    });
});
