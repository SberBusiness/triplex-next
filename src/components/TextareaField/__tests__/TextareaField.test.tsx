import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EComponentSize } from "../../../enums";
import { EFormFieldStatus } from "../../FormField";
import { ITextareaFieldProps, TextareaField } from "../index";

describe("TextareaField", () => {
    const renderComponent = (props: Partial<ITextareaFieldProps> = {}) =>
        render(<TextareaField textareaProps={{}} {...props} />);

    it("renders textarea element", () => {
        renderComponent();

        expect(screen.getByRole("textbox")).toBeInstanceOf(HTMLTextAreaElement);
    });

    it("forwards textareaProps to FormFieldTextarea", () => {
        renderComponent({
            textareaProps: {
                "data-testid": "textarea-field-textarea",
                maxLength: 10,
                placeholder: "Enter text",
                rows: 5,
            },
        });

        const textarea = screen.getByTestId("textarea-field-textarea");
        expect(textarea).toHaveAttribute("placeholder", "Enter text");
        expect(textarea).toHaveAttribute("maxLength", "10");
        expect(textarea).toHaveAttribute("rows", "5");
    });

    it("calls textareaProps.onChange with changed value", () => {
        const onChange = vi.fn<React.ChangeEventHandler<HTMLTextAreaElement>>();
        renderComponent({ textareaProps: { onChange } });

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0].target).toHaveValue("hello");
    });

    it("forwards ref to FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextareaField textareaProps={{}} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formField");
    });

    it("forwards textareaProps.ref to textarea element", () => {
        const ref = React.createRef<HTMLTextAreaElement>();
        renderComponent({ textareaProps: { ref } });

        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        expect(ref.current).toBe(screen.getByRole("textbox"));
    });

    it("merges className into FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextareaField className="custom-class" textareaProps={{}} ref={ref} />);

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

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies %s size class to textarea", (size, className) => {
        renderComponent({ size });

        expect(screen.getByRole("textbox")).toHaveClass(className);
    });

    it("disables textarea when status is DISABLED", () => {
        renderComponent({ status: EFormFieldStatus.DISABLED });

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("has correct displayName", () => {
        expect(TextareaField.displayName).toBe("TextareaField");
    });
});
