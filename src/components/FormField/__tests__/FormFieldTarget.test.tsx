import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EFormFieldStatus, FormField, FormFieldLabel, FormFieldTarget } from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("FormFieldTarget", () => {
    it("renders children", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target">Selected value</FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("target")).toHaveTextContent("Selected value");
    });

    it("renders placeholder when there are no children", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target" placeholder="Select value" />
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target).toHaveTextContent("Select value");
        expect(target).toHaveClass("placeholder");
    });

    it("does not render placeholder when children exist", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target" placeholder="Select value">
                    Selected value
                </FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target).not.toHaveTextContent("Select value");
        expect(target).not.toHaveClass("placeholder");
    });

    it("does not apply placeholder class for the disabled status", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldTarget data-testid="target" placeholder="Select value" />
            </FormField>,
        );

        expect(screen.getByTestId("target")).not.toHaveClass("placeholder");
    });

    it("is focusable by default", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target).toHaveAttribute("tabindex", "0");
        expect(target).toHaveAttribute("aria-disabled", "false");
    });

    it("is not focusable for the disabled status", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target).toHaveAttribute("tabindex", "-1");
        expect(target).toHaveAttribute("aria-disabled", "true");
        expect(target).toHaveClass("disabled");
    });

    it("is labelled by the nested label", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        const label = screen.getByTestId("label");

        expect(label.id).toBeTruthy();
        expect(screen.getByTestId("target")).toHaveAttribute("aria-labelledby", label.id);
    });

    it("has no aria-labelledby without a label", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("target")).not.toHaveAttribute("aria-labelledby");
    });

    it("binds the label htmlFor to its own id", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target.id).toBeTruthy();
        expect(screen.getByTestId("label")).toHaveAttribute("for", target.id);
    });

    it("uses the id passed from outside", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target" id="custom-target-id">
                    Value
                </FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("target")).toHaveAttribute("id", "custom-target-id");
    });

    it("reports filled state through the context when children exist", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldTarget>Value</FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("does not report filled state without children", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldTarget placeholder="Select value" />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).not.toHaveClass("filled");
    });

    it("updates filled state when children appear", () => {
        const { rerender } = render(
            <FormField data-testid="form-field">
                <FormFieldTarget placeholder="Select value" />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).not.toHaveClass("filled");

        rerender(
            <FormField data-testid="form-field">
                <FormFieldTarget placeholder="Select value">Value</FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("syncs focus state with the field and calls handlers with the event", () => {
        const handleFocus = vi.fn();
        const handleBlur = vi.fn();

        render(
            <FormField data-testid="form-field">
                <FormFieldTarget data-testid="target" onFocus={handleFocus} onBlur={handleBlur}>
                    Value
                </FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");
        const formField = screen.getByTestId("form-field");

        fireEvent.focus(target);
        expect(formField).toHaveClass("active");
        expect(target).toHaveClass("active");
        expect(handleFocus).toHaveBeenCalledTimes(1);
        expect(handleFocus).toHaveBeenCalledWith(expect.objectContaining({ target, type: "focus" }));

        fireEvent.blur(target);
        expect(formField).not.toHaveClass("active");
        expect(handleBlur).toHaveBeenCalledTimes(1);
        expect(handleBlur).toHaveBeenCalledWith(expect.objectContaining({ target, type: "blur" }));
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies class for size %s from the context", (size, expectedClassName) => {
        render(
            <FormField size={size}>
                <FormFieldTarget data-testid="target">Value</FormFieldTarget>
            </FormField>,
        );

        expect(screen.getByTestId("target")).toHaveClass(expectedClassName);
    });

    it("merges custom className into the root element", () => {
        render(
            <FormField>
                <FormFieldTarget data-testid="target" className="custom-target">
                    Value
                </FormFieldTarget>
            </FormField>,
        );

        const target = screen.getByTestId("target");

        expect(target).toHaveClass("custom-target");
        expect(target).toHaveClass("formFieldTarget");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <FormField>
                <FormFieldTarget data-testid="target" ref={ref}>
                    Value
                </FormFieldTarget>
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("target"));
    });
});
