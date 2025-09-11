import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Radio, ERadioSize } from "@sberbusiness/triplex-next/components/Radio";

const getRadio = () => screen.getByRole("radio");
const getLabel = () => screen.getByRole("radio").closest("label");

describe("Radio", () => {
    it("Should render with default props", () => {
        render(<Radio>Radio text</Radio>);

        const radio = getRadio();
        const label = getLabel();

        expect(radio).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(radio).toHaveAttribute("type", "radio");
        expect(radio).not.toBeChecked();
        expect(radio).not.toBeDisabled();
    });

    it("Should apply size classes", () => {
        const { rerender } = render(
            <Radio size={ERadioSize.MD} data-testid="radio">
                Radio text
            </Radio>,
        );
        const label = getLabel();
        expect(label).toHaveClass("md");

        rerender(<Radio size={ERadioSize.LG} data-testid="radio" />);
        expect(label).toHaveClass("lg");
    });

    it("Should render with custom className", () => {
        render(<Radio className="custom-radio">Radio text</Radio>);

        const radio = getRadio();
        expect(radio).toHaveClass("custom-radio");
    });

    it("Should handle checked state", () => {
        render(<Radio checked>Checked radio</Radio>);

        const radio = getRadio();
        expect(radio).toBeChecked();
    });

    it("Should handle disabled state", () => {
        render(<Radio disabled>Disabled radio</Radio>);

        const radio = getRadio();

        expect(radio).toBeDisabled();
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
