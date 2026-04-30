import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ListItemControlsButtonDropdown } from "../components/ListItemControlsButtonDropdown";

const options = [
    { id: "opt-1", label: "Option 1" },
    { id: "opt-2", label: "Option 2" },
];

describe("ListItemControlsButtonDropdown", () => {
    it("renders a button with menu aria attributes", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-haspopup", "menu");
        expect(button).toHaveAttribute("aria-expanded", "false");
        expect(button).toHaveAttribute("aria-controls");
    });

    it("toggles aria-expanded on click", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "true");

        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("opens the dropdown on ArrowDown when closed", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");
        fireEvent.keyDown(button, { key: "ArrowDown" });
        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("opens the dropdown on ArrowUp when closed", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");
        fireEvent.keyDown(button, { key: "ArrowUp" });
        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("does not toggle aria-expanded on ArrowUp/ArrowDown when already open", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "true");

        fireEvent.keyDown(button, { key: "ArrowDown" });
        expect(button).toHaveAttribute("aria-expanded", "true");
        fireEvent.keyDown(button, { key: "ArrowUp" });
        expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("calls preventDefault for ArrowUp/ArrowDown keys", () => {
        render(<ListItemControlsButtonDropdown options={options}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button");

        const arrowDown = fireEvent.keyDown(button, { key: "ArrowDown" });
        // fireEvent returns false when an event handler called preventDefault
        expect(arrowDown).toBe(false);

        const arrowUp = fireEvent.keyDown(button, { key: "ArrowUp" });
        expect(arrowUp).toBe(false);
    });

    it("is disabled when disabled prop is set", () => {
        render(
            <ListItemControlsButtonDropdown options={options} disabled>
                Actions
            </ListItemControlsButtonDropdown>,
        );
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("forwards ref to the button element", () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(
            <ListItemControlsButtonDropdown options={options} ref={ref}>
                Actions
            </ListItemControlsButtonDropdown>,
        );
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it("renders provided icon", () => {
        render(
            <ListItemControlsButtonDropdown options={options} icon={<svg data-testid="icon" />}>
                Actions
            </ListItemControlsButtonDropdown>,
        );
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("calls onSelect of an option when chosen and closes the dropdown", () => {
        const onSelect = vi.fn();
        const opts = [{ id: "opt-1", label: "Option 1", onSelect }];
        render(<ListItemControlsButtonDropdown options={opts}>Actions</ListItemControlsButtonDropdown>);
        const button = screen.getByRole("button", { name: /Actions/ });
        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded", "true");

        const item = screen.getByText("Option 1");
        fireEvent.click(item);
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(button).toHaveAttribute("aria-expanded", "false");
    });
});
