import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EFormFieldStatus, FormField, FormFieldInput, FormFieldLabel } from "@sberbusiness/triplex-next/components";
import { IFormFieldInputProvideProps } from "../components/FormFieldInput";

describe("FormFieldInput", () => {
    it("handles value changes", () => {
        const handleChange = vi.fn();
        render(
            <FormField>
                <FormFieldLabel>Change Test</FormFieldLabel>
                <FormFieldInput onChange={handleChange} />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "test value" } });

        expect(handleChange).toHaveBeenCalled();
    });

    it("handles focus and blur events", () => {
        const handleFocus = vi.fn();
        const handleBlur = vi.fn();

        render(
            <FormField>
                <FormFieldLabel>Focus Test</FormFieldLabel>
                <FormFieldInput onFocus={handleFocus} onBlur={handleBlur} />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        fireEvent.focus(input);
        expect(handleFocus).toHaveBeenCalled();

        fireEvent.blur(input);
        expect(handleBlur).toHaveBeenCalled();
    });

    it("applies disabled state", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldLabel>Disabled Input</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();
    });

    it("handles placeholder correctly", () => {
        render(
            <FormField>
                <FormFieldLabel>Placeholder Test</FormFieldLabel>
                <FormFieldInput placeholder="Enter text..." />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        expect(input).toHaveAttribute("placeholder", "Enter text...");
    });

    it("handles custom render function", () => {
        const customRender = vi.fn((props: IFormFieldInputProvideProps) => {
            const { size, ...inputProps } = props;
            return <input {...inputProps} data-testid="custom-input" />;
        });

        render(
            <FormField>
                <FormFieldLabel>Custom Render</FormFieldLabel>
                <FormFieldInput render={customRender} />
            </FormField>,
        );

        expect(customRender).toHaveBeenCalled();
        expect(screen.getByTestId("custom-input")).toBeDefined();
    });

    it("passes through additional props", () => {
        render(
            <FormField>
                <FormFieldLabel>Props Test</FormFieldLabel>
                <FormFieldInput data-testid="input-test" className="custom-input-class" maxLength={10} />
            </FormField>,
        );

        const input = screen.getByTestId("input-test");
        expect(input).toHaveClass("custom-input-class");
        expect(input).toHaveAttribute("maxLength", "10");
    });
});
