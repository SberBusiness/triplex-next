import React from "react";
import { render, screen } from "@testing-library/react";
import { FormFieldCounter, FormFieldDescription } from "@sberbusiness/triplex-next/components";

describe("FormFieldDescription", () => {
    it("renders children inside the root element", () => {
        render(<FormFieldDescription data-testid="description">Description text</FormFieldDescription>);

        const description = screen.getByTestId("description");

        expect(description).toHaveClass("formFieldDescription");
        expect(description).toHaveTextContent("Description text");
    });

    it("has no counter modifier without a nested counter", () => {
        render(<FormFieldDescription data-testid="description">Description text</FormFieldDescription>);

        expect(screen.getByTestId("description")).not.toHaveClass("withCounter");
    });

    it("applies the counter modifier when a counter is nested", () => {
        render(
            <FormFieldDescription data-testid="description">
                Description text
                <FormFieldCounter>0/10</FormFieldCounter>
            </FormFieldDescription>,
        );

        expect(screen.getByTestId("description")).toHaveClass("withCounter");
    });

    it("removes the counter modifier when the counter unmounts", () => {
        const { rerender } = render(
            <FormFieldDescription data-testid="description">
                Description text
                <FormFieldCounter>0/10</FormFieldCounter>
            </FormFieldDescription>,
        );

        expect(screen.getByTestId("description")).toHaveClass("withCounter");

        rerender(<FormFieldDescription data-testid="description">Description text</FormFieldDescription>);

        expect(screen.getByTestId("description")).not.toHaveClass("withCounter");
    });

    it("passes through additional props", () => {
        render(
            <FormFieldDescription data-testid="description" id="description-id" aria-live="polite">
                Description text
            </FormFieldDescription>,
        );

        const description = screen.getByTestId("description");

        expect(description).toHaveAttribute("id", "description-id");
        expect(description).toHaveAttribute("aria-live", "polite");
    });

    it("merges a custom className with the base one", () => {
        render(
            <FormFieldDescription data-testid="description" className="custom-class">
                Description text
            </FormFieldDescription>,
        );

        const description = screen.getByTestId("description");

        expect(description).toHaveClass("formFieldDescription");
        expect(description).toHaveClass("custom-class");
    });
});
