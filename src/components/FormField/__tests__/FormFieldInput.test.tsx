import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
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

    it("syncs filled state from the controlled value", () => {
        const { rerender } = render(
            <FormField data-testid="form-field">
                <FormFieldInput value="" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).not.toHaveClass("filled");

        rerender(
            <FormField data-testid="form-field">
                <FormFieldInput value="value" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("reports filled state on browser autofill and resets it on autofill cancel", () => {
        // jsdom не реализует AnimationEvent, поэтому animationName проставляется вручную.
        const fireAnimationStart = (element: HTMLElement, animationName: string) => {
            const event = createEvent.animationStart(element, {});

            Object.defineProperty(event, "animationName", { value: animationName });
            fireEvent(element, event);
        };

        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        const formField = screen.getByTestId("form-field");

        fireAnimationStart(input, "autofill-applied-hook-1");
        expect(formField).toHaveClass("filled");

        fireAnimationStart(input, "autofill-cancelled-hook-1");
        expect(formField).not.toHaveClass("filled");
    });

    it("forwards ref to the input element", () => {
        const ref = React.createRef<HTMLInputElement>();

        render(
            <FormField>
                <FormFieldInput ref={ref} />
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
        expect(ref.current).toBe(screen.getByRole("textbox"));
    });
});
