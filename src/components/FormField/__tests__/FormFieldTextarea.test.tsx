import React from "react";
import { render, screen, fireEvent, createEvent } from "@testing-library/react";
import { EFormFieldStatus, FormField, FormFieldLabel, FormFieldTextarea } from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("FormFieldTextarea", () => {
    it("renders a textarea", () => {
        render(
            <FormField>
                <FormFieldTextarea />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");

        expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
        expect(textarea).toHaveClass("formFieldTextarea");
    });

    it("is disabled for the disabled status", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldTextarea />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("binds the label to the textarea", () => {
        render(
            <FormField>
                <FormFieldLabel>Comment</FormFieldLabel>
                <FormFieldTextarea />
            </FormField>,
        );

        expect(screen.getByLabelText("Comment")).toBe(screen.getByRole("textbox"));
    });

    it("uses the id passed from outside", () => {
        render(
            <FormField>
                <FormFieldTextarea id="custom-textarea-id" />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toHaveAttribute("id", "custom-textarea-id");
    });

    it("reports filled state from defaultValue", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldTextarea defaultValue="text" />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("syncs filled state on input and clearing", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldTextarea />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");
        const formField = screen.getByTestId("form-field");

        fireEvent.change(textarea, { target: { value: "text" } });
        expect(formField).toHaveClass("filled");

        fireEvent.change(textarea, { target: { value: "" } });
        expect(formField).not.toHaveClass("filled");
    });

    it("syncs filled state from the controlled value", () => {
        const { rerender } = render(
            <FormField data-testid="form-field">
                <FormFieldTextarea value="" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).not.toHaveClass("filled");

        rerender(
            <FormField data-testid="form-field">
                <FormFieldTextarea value="text" onChange={vi.fn()} />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("calls onChange with the event", () => {
        const handleChange = vi.fn();

        render(
            <FormField>
                <FormFieldTextarea onChange={handleChange} />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");
        fireEvent.change(textarea, { target: { value: "text" } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: textarea, type: "change" }));
    });

    it("syncs focus state and calls handlers", () => {
        const handleFocus = vi.fn();
        const handleBlur = vi.fn();

        render(
            <FormField data-testid="form-field">
                <FormFieldTextarea onFocus={handleFocus} onBlur={handleBlur} />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");
        const formField = screen.getByTestId("form-field");

        fireEvent.focus(textarea);
        expect(formField).toHaveClass("active");
        expect(handleFocus).toHaveBeenCalledTimes(1);

        fireEvent.blur(textarea);
        expect(formField).not.toHaveClass("active");
        expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("reports filled state on autofill and resets it on autofill cancel", () => {
        // jsdom не реализует AnimationEvent, поэтому animationName проставляется вручную.
        const fireAnimationStart = (element: HTMLElement, animationName: string) => {
            const event = createEvent.animationStart(element, {});

            Object.defineProperty(event, "animationName", { value: animationName });
            fireEvent(element, event);
        };
        const handleAnimationStart = vi.fn();

        render(
            <FormField data-testid="form-field">
                <FormFieldTextarea onAnimationStart={handleAnimationStart} />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");
        const formField = screen.getByTestId("form-field");

        fireAnimationStart(textarea, "autofill-applied-hook-1");
        expect(formField).toHaveClass("filled");

        fireAnimationStart(textarea, "autofill-cancelled-hook-1");
        expect(formField).not.toHaveClass("filled");

        expect(handleAnimationStart).toHaveBeenCalledTimes(2);
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies class for size %s from the context", (size, expectedClassName) => {
        render(
            <FormField size={size}>
                <FormFieldTextarea />
            </FormField>,
        );

        expect(screen.getByRole("textbox")).toHaveClass(expectedClassName);
    });

    it("merges custom className into the root element", () => {
        render(
            <FormField>
                <FormFieldTextarea className="custom-textarea" />
            </FormField>,
        );

        const textarea = screen.getByRole("textbox");

        expect(textarea).toHaveClass("custom-textarea");
        expect(textarea).toHaveClass("formFieldTextarea");
    });

    it("forwards ref to the textarea element", () => {
        const ref = React.createRef<HTMLTextAreaElement>();

        render(
            <FormField>
                <FormFieldTextarea ref={ref} />
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
        expect(ref.current).toBe(screen.getByRole("textbox"));
    });
});
