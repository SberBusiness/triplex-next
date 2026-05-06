import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListItemSelectable } from "../components/ListItemSelectable";
import { ListItem } from "../components/ListItem";
import { ListItemContent } from "../components/ListItemContent";

describe("ListItemSelectable", () => {
    it("renders children inside the wrapper", () => {
        render(
            <ListItemSelectable selected={false} onSelect={vi.fn()}>
                <span>Item content</span>
            </ListItemSelectable>,
        );
        expect(screen.getByText("Item content")).toBeInTheDocument();
    });

    it("renders a checkbox", () => {
        render(<ListItemSelectable selected={false} onSelect={vi.fn()} />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("reflects selected state on the checkbox", () => {
        const { rerender } = render(<ListItemSelectable selected={false} onSelect={vi.fn()} />);
        expect(screen.getByRole("checkbox")).not.toBeChecked();

        rerender(<ListItemSelectable selected={true} onSelect={vi.fn()} />);
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("applies selected class on root when selected", () => {
        render(<ListItemSelectable selected={true} onSelect={vi.fn()} data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("selected");
    });

    it("calls onSelect with true when toggled to checked", () => {
        const onSelect = vi.fn();
        render(<ListItemSelectable selected={false} onSelect={onSelect} />);
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onSelect).toHaveBeenCalledWith(true);
    });

    it("calls onSelect with false when toggled to unchecked", () => {
        const onSelect = vi.fn();
        render(<ListItemSelectable selected={true} onSelect={onSelect} />);
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onSelect).toHaveBeenCalledWith(false);
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<ListItemSelectable selected={false} onSelect={vi.fn()} ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("merges custom className on the root", () => {
        render(<ListItemSelectable selected={false} onSelect={vi.fn()} className="custom-class" data-testid="root" />);
        expect(screen.getByTestId("root")).toHaveClass("custom-class");
    });

    it("propagates selected state to ListItemContent through context", () => {
        const { rerender } = render(
            <ListItem>
                <ListItemSelectable selected={false} onSelect={vi.fn()}>
                    <ListItemContent data-testid="content">Content</ListItemContent>
                </ListItemSelectable>
            </ListItem>,
        );
        expect(screen.getByTestId("content")).not.toHaveClass("selected");

        rerender(
            <ListItem>
                <ListItemSelectable selected={true} onSelect={vi.fn()}>
                    <ListItemContent data-testid="content">Content</ListItemContent>
                </ListItemSelectable>
            </ListItem>,
        );
        expect(screen.getByTestId("content")).toHaveClass("selected");
    });
});
