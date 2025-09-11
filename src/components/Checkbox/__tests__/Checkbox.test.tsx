import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox, ECheckboxSize } from "@sberbusiness/triplex-next/components";

const getCheckbox = () => screen.getByRole("checkbox");
const getLabel = () => screen.getByRole("checkbox").closest("label");

describe("Checkbox", () => {
    it("Should render with label", () => {
        render(<Checkbox>Checkbox label</Checkbox>);
        const checkbox = getCheckbox();
        const label = getLabel();

        expect(checkbox).toBeInTheDocument();
        expect(label).toHaveTextContent("Checkbox label");
        expect(label).toHaveClass("nonempty");
    });

    it("Should apply size classes", () => {
        const { rerender } = render(<Checkbox checkboxSize={ECheckboxSize.MD} data-testid="checkbox" />);
        const label = getLabel();
        expect(label).toHaveClass("md");

        rerender(<Checkbox checkboxSize={ECheckboxSize.LG} data-testid="checkbox" />);
        expect(label).toHaveClass("lg");
    });

    it("Should apply checked state", () => {
        render(<Checkbox checked data-testid="checkbox" />);
        const checkbox = getCheckbox();
        expect(checkbox).toBeChecked();
    });

    it("Should apply disabled state and class", () => {
        render(<Checkbox disabled data-testid="checkbox" />);
        const checkbox = getCheckbox();
        const label = getLabel();

        expect(checkbox).toBeDisabled();
        expect(label).toHaveClass("disabled");
    });

    it("Should handle click events", () => {
        const handleClick = vi.fn();
        render(<Checkbox onClick={handleClick} data-testid="checkbox" />);
        const checkbox = getCheckbox();

        fireEvent.click(checkbox);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} data-testid="checkbox" />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
