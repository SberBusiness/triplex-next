import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { EFormFieldStatus } from "../../FormField";
import { FormFieldMaskedInput } from "../../FormField/components/FormFieldMaskedInput";
import { IMaskedFieldProps, MaskedField } from "../MaskedField";

const { masks, placeholderMasks } = FormFieldMaskedInput.presets;

describe("MaskedField", () => {
    const renderComponent = (props: Partial<IMaskedFieldProps> = {}) =>
        render(
            <MaskedField {...props} maskedInputProps={{ mask: masks.date, value: "", ...props.maskedInputProps }} />,
        );

    it("renders input element", () => {
        renderComponent();

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("forwards maskedInputProps to input element", () => {
        renderComponent({
            maskedInputProps: {
                "data-testid": "masked-field-input",
                mask: masks.date,
                placeholder: "Enter date",
                value: "",
            },
        });

        const input = screen.getByTestId("masked-field-input");
        expect(input).toHaveAttribute("placeholder", "Enter date");
    });

    it("applies mask to value", () => {
        renderComponent({ maskedInputProps: { mask: masks.date, value: "12122024" } });

        expect(screen.getByRole("textbox")).toHaveValue("12.12.2024");
    });

    it("calls maskedInputProps.onChange with masked value", () => {
        // Значение читается в момент вызова: поле контролируемое, после ре-рендера в DOM вернётся исходное value.
        let changedValue: string | undefined;
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>((event) => {
            changedValue = event.target.value;
        });
        renderComponent({ maskedInputProps: { mask: masks.date, onChange, value: "" } });

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "1212" } });

        expect(onChange).toHaveBeenCalledTimes(1);
        // Разделитель маски подставляется сразу после заполнения предыдущей группы символов.
        expect(changedValue).toBe("12.12.");
    });

    it("does not call maskedInputProps.onChange when masked value is unchanged", () => {
        const onChange = vi.fn<React.ChangeEventHandler<HTMLInputElement>>();
        renderComponent({ maskedInputProps: { mask: masks.date, onChange, value: "12.12" } });

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "12.12" } });

        expect(onChange).not.toHaveBeenCalled();
    });

    it("renders placeholderMask when field is focused", () => {
        const { container } = renderComponent({
            maskedInputProps: { mask: masks.date, placeholderMask: placeholderMasks.date, value: "" },
        });

        expect(container.querySelector(".formFieldMaskedInputPlaceholder")).toBeNull();

        fireEvent.focus(screen.getByRole("textbox"));

        expect(container.querySelector(".formFieldMaskedInputPlaceholder")).toHaveTextContent("дд.мм.гггг");
    });

    it("renders remaining part of placeholderMask for filled value", () => {
        const { container } = renderComponent({
            maskedInputProps: { mask: masks.date, placeholderMask: placeholderMasks.date, value: "12" },
        });

        expect(container.querySelector(".formFieldMaskedInputPlaceholder")).toHaveTextContent("12.мм.гггг");
    });

    it("forwards ref to FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<MaskedField maskedInputProps={{ mask: masks.date, value: "" }} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formField");
    });

    it("forwards maskedInputProps.forwardedRef to input element", () => {
        const forwardedRef = React.createRef<HTMLInputElement>();
        renderComponent({ maskedInputProps: { forwardedRef, mask: masks.date, value: "" } });

        expect(forwardedRef.current).toBeInstanceOf(HTMLInputElement);
        expect(forwardedRef.current).toBe(screen.getByRole("textbox"));
    });

    it("merges className into FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<MaskedField className="custom-class" maskedInputProps={{ mask: masks.date, value: "" }} ref={ref} />);

        expect(ref.current).toHaveClass("custom-class");
        expect(ref.current).toHaveClass("formField");
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
        expect(MaskedField.displayName).toBe("MaskedField");
    });
});
