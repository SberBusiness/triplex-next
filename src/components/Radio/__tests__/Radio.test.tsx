import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio } from "../Radio";

describe("Radio", () => {
    it("Should render with default props", () => {
        render(<Radio>Radio text</Radio>);

        const radio = screen.getByRole("radio");
        const label = screen.getByText("Radio text");

        expect(radio).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(radio).toHaveAttribute("type", "radio");
        expect(radio).not.toBeChecked();
        expect(radio).not.toBeDisabled();
    });

    it("Should render with custom className", () => {
        render(<Radio className="custom-radio">Radio text</Radio>);

        const radio = screen.getByRole("radio");
        expect(radio).toHaveClass("custom-radio");
    });

    it("Should handle checked state", () => {
        render(<Radio checked>Checked radio</Radio>);

        const radio = screen.getByRole("radio");
        expect(radio).toBeChecked();
    });

    it("Should handle disabled state", () => {
        render(<Radio disabled>Disabled radio</Radio>);

        const radio = screen.getByRole("radio");

        expect(radio).toBeDisabled();
    });

    it("Should show focus visible state on keyboard focus", () => {
        render(<Radio>Radio text</Radio>);

        const radio = screen.getByRole("radio");
        fireEvent.focus(radio);

        expect(radio).toHaveAttribute("data-focus-visible", "");
    });

    it("Should forward ref correctly", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Radio ref={ref}>Radio text</Radio>);

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toHaveAttribute("type", "radio");
    });

    it("Should handle function ref correctly", () => {
        const refCallback = vi.fn();
        render(<Radio ref={refCallback}>Radio text</Radio>);

        expect(refCallback).toHaveBeenCalledWith(expect.any(HTMLInputElement));
    });

    it("Should render radio icon", () => {
        render(<Radio>Radio text</Radio>);

        const radioIcon = document.querySelector(".radioIcon");
        expect(radioIcon).toBeInTheDocument();
    });
});
