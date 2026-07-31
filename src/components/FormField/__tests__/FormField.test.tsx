import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EFormFieldStatus, FormField, FormFieldInput, FormFieldLabel } from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

describe("FormField", () => {
    it("applies error state correctly", () => {
        render(
            <FormField status={EFormFieldStatus.ERROR}>
                <FormFieldLabel>Error Field</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByRole("textbox").closest("div");
        expect(formField).toHaveClass("error");
    });

    it("applies disabled state correctly", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldLabel>Disabled Field</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        expect(input).toBeDisabled();

        const formField = input.closest("div");
        expect(formField).toHaveClass("disabled");
    });

    it("handles focus state", () => {
        render(
            <FormField>
                <FormFieldLabel>Focus Test</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        fireEvent.focus(input);

        const formField = input.closest("div");
        expect(formField).toHaveClass("active");
    });

    it("passes through additional props", () => {
        render(
            <FormField data-testid="form-field" className="custom-class">
                <FormFieldLabel>Props Test</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveClass("custom-class");
    });

    it("renders children inside the root element", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldLabel>Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveClass("formField");
        expect(formField).toContainElement(screen.getByRole("textbox"));
        expect(screen.getByText("Label")).toBeInTheDocument();
    });

    it.each([
        [EFormFieldStatus.DEFAULT, "default"],
        [EFormFieldStatus.DISABLED, "disabled"],
        [EFormFieldStatus.ERROR, "error"],
        [EFormFieldStatus.WARNING, "warning"],
    ])("applies class for status %s", (status, expectedClassName) => {
        render(
            <FormField data-testid="form-field" status={status}>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass(expectedClassName);
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies class for size %s", (size, expectedClassName) => {
        render(
            <FormField data-testid="form-field" size={size}>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass(expectedClassName);
    });

    it("applies default status and size when they are not passed", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveClass("default");
        expect(formField).toHaveClass("lg");
    });

    it("applies active state from the active prop", () => {
        render(
            <FormField data-testid="form-field" active>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("active");
    });

    it("removes active state on blur", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");
        const formField = screen.getByTestId("form-field");

        fireEvent.focus(input);
        expect(formField).toHaveClass("active");

        fireEvent.blur(input);
        expect(formField).not.toHaveClass("active");
    });

    it("keeps active state on blur when the active prop is set", () => {
        render(
            <FormField data-testid="form-field" active>
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");

        fireEvent.focus(input);
        fireEvent.blur(input);

        expect(screen.getByTestId("form-field")).toHaveClass("active");
    });

    it("applies filled state when the nested input has a value", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput defaultValue="value" />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveClass("filled");
    });

    it("does not apply filled state when the nested input is empty", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).not.toHaveClass("filled");
    });

    it("binds label to the nested input through context", () => {
        render(
            <FormField>
                <FormFieldLabel>Field label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByLabelText("Field label")).toBe(screen.getByRole("textbox"));
    });

    it("applies default horizontal paddings", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveStyle({ paddingLeft: "12px", paddingRight: "12px" });
    });

    it("allows overriding paddings via the style prop", () => {
        render(
            <FormField data-testid="form-field" style={{ paddingLeft: 20, paddingRight: 24 }}>
                <FormFieldInput />
            </FormField>,
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveStyle({ paddingLeft: "20px", paddingRight: "24px" });
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <FormField ref={ref} data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("form-field"));
    });
});
