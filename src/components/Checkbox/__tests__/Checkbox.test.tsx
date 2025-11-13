import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

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
        const { rerender } = render(<Checkbox size={EComponentSize.MD} />);
        const label = getLabel();
        expect(label).toHaveClass("md");

        rerender(<Checkbox size={EComponentSize.LG} />);
        expect(label).toHaveClass("lg");
    });

    it("Should apply checked state", () => {
        render(<Checkbox checked />);
        const checkbox = getCheckbox();
        expect(checkbox).toBeChecked();
    });

    it("Should apply disabled state and class", () => {
        render(<Checkbox disabled />);
        const checkbox = getCheckbox();
        const label = getLabel();

        expect(checkbox).toBeDisabled();
        expect(label).toHaveClass("disabled");
    });

    it("Should handle click events", () => {
        const handleClick = vi.fn();
        render(<Checkbox onClick={handleClick} />);
        const checkbox = getCheckbox();

        fireEvent.click(checkbox);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Checkbox ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
});
