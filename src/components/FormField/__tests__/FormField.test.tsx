import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField, FormFieldInput, FormFieldLabel } from "@sberbusiness/triplex-next/components";


describe("FormField", () => {
    it("renders with basic structure", () => {
        render(
            <FormField>
                <FormFieldLabel>Test Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>
        );

        expect(screen.getByText("Test Label")).toBeDefined();
        expect(screen.getByRole("textbox")).toBeDefined();
    });

    it("applies error state correctly", () => {
        render(
            <FormField error>
                <FormFieldLabel>Error Field</FormFieldLabel>
                <FormFieldInput />
            </FormField>
        );

        const formField = screen.getByRole("textbox").closest("div");
        expect(formField).toHaveClass("error");
    });

    it("applies disabled state correctly", () => {
        render(
            <FormField disabled>
                <FormFieldLabel>Disabled Field</FormFieldLabel>
                <FormFieldInput />
            </FormField>
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
            </FormField>
        );

        const input = screen.getByRole("textbox");
        fireEvent.focus(input);

        const formField = input.closest("div");
        expect(formField).toHaveClass("active");
    });

    it("handles hover state", () => {
        render(
            <FormField>
                <FormFieldLabel>Hover Test</FormFieldLabel>
                <FormFieldInput />
            </FormField>
        );

        const formField = screen.getByRole("textbox").closest("div");
        fireEvent.mouseEnter(formField as Element);
        fireEvent.mouseLeave(formField as Element);

        // Hover state is handled internally, we just verify no errors occur
        expect(formField).toBeDefined();
    });

    it("passes through additional props", () => {
        render(
            <FormField data-testid="form-field" className="custom-class">
                <FormFieldLabel>Props Test</FormFieldLabel>
                <FormFieldInput />
            </FormField>
        );

        const formField = screen.getByTestId("form-field");
        expect(formField).toHaveClass("custom-class");
    });

    it("renders with children correctly", () => {
        render(
            <FormField>
                <FormFieldLabel>Children Test</FormFieldLabel>
                <FormFieldInput />
                <div data-testid="custom-child">Custom Child</div>
            </FormField>
        );

        expect(screen.getByText("Children Test")).toBeDefined();
        expect(screen.getByRole("textbox")).toBeDefined();
        expect(screen.getByTestId("custom-child")).toBeDefined();
    });
});

