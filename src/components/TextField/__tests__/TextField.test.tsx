import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EFormFieldStatus } from "../../FormField";
import { ITextFieldProps, TextField } from "../TextField";

describe("TextField", () => {
    const renderComponent = (props: Partial<ITextFieldProps> = {}) => render(<TextField inputProps={{}} {...props} />);

    it("renders input element", () => {
        renderComponent();

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("forwards inputProps to FormFieldInput", () => {
        renderComponent({
            inputProps: { "data-testid": "text-field-input", maxLength: 10, placeholder: "Enter text" },
        });

        const input = screen.getByTestId("text-field-input");
        expect(input).toHaveAttribute("placeholder", "Enter text");
        expect(input).toHaveAttribute("maxLength", "10");
    });

    it("calls inputProps.onChange with changed value", () => {
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>();
        renderComponent({ inputProps: { onChange } });

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target).toHaveValue("hello");
    });

    it("forwards ref to FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextField inputProps={{}} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formField");
    });

    it("forwards inputProps.ref to input element", () => {
        const ref = React.createRef<HTMLInputElement>();
        renderComponent({ inputProps: { ref } });

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(screen.getByRole("textbox"));
    });

    it("merges className into FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextField className="custom-class" inputProps={{}} ref={ref} />);

        expect(ref.current).toHaveClass("custom-class");
    });

    it("passes label, prefix, postfix, description and counter to TextFieldBase", () => {
        renderComponent({
            counter: "0/10",
            description: "Description",
            label: "Label",
            postfix: "Postfix",
            prefix: "Prefix",
        });

        expect(screen.getByText("Label").closest("label")).toHaveClass("formFieldLabel");
        expect(screen.getByText("Prefix")).toHaveClass("formFieldPrefix");
        expect(screen.getByText("Postfix")).toHaveClass("formFieldPostfix");
        expect(screen.getByText("Description")).toHaveClass("formFieldDescription");
        expect(screen.getByText("0/10")).toHaveClass("formFieldCounter");
    });

    it("disables input when status is DISABLED", () => {
        renderComponent({ status: EFormFieldStatus.DISABLED });

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("has correct displayName", () => {
        expect(TextField.displayName).toBe("TextField");
    });
});
