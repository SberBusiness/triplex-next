import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { SmallInput } from "../SmallInput";

describe("SmallInput", () => {
    const renderComponent = (props: Partial<React.ComponentProps<typeof SmallInput>> = {}) =>
        render(<SmallInput {...props} />);

    const getInput = () => screen.getByRole("textbox");

    it("renders text input", () => {
        renderComponent();
        expect(getInput()).toBeInTheDocument();
        expect(getInput()).toHaveAttribute("type", "text");
    });

    it("keeps type text when type is passed from outside", () => {
        renderComponent({ type: "number" });
        expect(getInput()).toHaveAttribute("type", "text");
    });

    it("applies own class to root element", () => {
        renderComponent();
        expect(getInput()).toHaveClass("smallInput");
    });

    it("merges custom className with own class", () => {
        renderComponent({ className: "custom-class" });
        expect(getInput()).toHaveClass("smallInput", "custom-class");
    });

    it("forwards ref to input element", () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<SmallInput ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("spreads rest props to input element", () => {
        renderComponent({ id: "small-input", placeholder: "000000", maxLength: 6, "aria-label": "Номер документа" });
        const input = getInput();
        expect(input).toHaveAttribute("id", "small-input");
        expect(input).toHaveAttribute("placeholder", "000000");
        expect(input).toHaveAttribute("maxlength", "6");
        expect(input).toHaveAccessibleName("Номер документа");
    });

    it("renders controlled value", () => {
        renderComponent({ value: "000123", onChange: () => {} });
        expect(getInput()).toHaveValue("000123");
    });

    it("calls onChange with change event on typing", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        renderComponent({ onChange });
        await user.type(getInput(), "7");
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ type: "change", target: expect.objectContaining({ value: "7" }) }),
        );
    });

    it("does not call onChange when disabled", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        renderComponent({ onChange, disabled: true });
        await user.type(getInput(), "7");
        expect(getInput()).toBeDisabled();
        expect(onChange).not.toHaveBeenCalled();
    });

    it("does not call onChange when readOnly", async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        renderComponent({ onChange, readOnly: true });
        await user.type(getInput(), "7");
        expect(getInput()).toHaveAttribute("readonly");
        expect(onChange).not.toHaveBeenCalled();
    });
});
