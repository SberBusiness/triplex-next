import React from "react";
import { render, screen } from "@testing-library/react";
import { FormFieldCounter, FormFieldDescription } from "@sberbusiness/triplex-next/components";
import { FormFieldDescriptionContext } from "../FormFieldDescriptionContext";

describe("FormFieldCounter", () => {
    it("renders children inside the root element", () => {
        render(<FormFieldCounter data-testid="counter">3/10</FormFieldCounter>);

        const counter = screen.getByTestId("counter");

        expect(counter).toHaveClass("formFieldCounter");
        expect(counter).toHaveTextContent("3/10");
    });

    it("passes through additional props", () => {
        render(
            <FormFieldCounter data-testid="counter" id="counter-id">
                3/10
            </FormFieldCounter>,
        );

        expect(screen.getByTestId("counter")).toHaveAttribute("id", "counter-id");
    });

    it("reports its presence to the description context on mount", () => {
        const setWithCounter = vi.fn();

        render(
            <FormFieldDescriptionContext.Provider value={{ withCounter: false, setWithCounter }}>
                <FormFieldCounter>3/10</FormFieldCounter>
            </FormFieldDescriptionContext.Provider>,
        );

        expect(setWithCounter).toHaveBeenCalledTimes(1);
        expect(setWithCounter).toHaveBeenCalledWith(true);
    });

    it("resets its presence in the description context on unmount", () => {
        const setWithCounter = vi.fn();

        const { unmount } = render(
            <FormFieldDescriptionContext.Provider value={{ withCounter: false, setWithCounter }}>
                <FormFieldCounter>3/10</FormFieldCounter>
            </FormFieldDescriptionContext.Provider>,
        );

        setWithCounter.mockClear();
        unmount();

        expect(setWithCounter).toHaveBeenCalledTimes(1);
        expect(setWithCounter).toHaveBeenCalledWith(false);
    });

    it("renders outside of the description without errors", () => {
        expect(() => render(<FormFieldCounter data-testid="counter">3/10</FormFieldCounter>)).not.toThrow();
        expect(screen.getByTestId("counter")).toBeInTheDocument();
    });

    it("is rendered inside the description", () => {
        render(
            <FormFieldDescription data-testid="description">
                <FormFieldCounter data-testid="counter">3/10</FormFieldCounter>
            </FormFieldDescription>,
        );

        expect(screen.getByTestId("description")).toContainElement(screen.getByTestId("counter"));
    });

    it("merges a custom className with the base one", () => {
        render(
            <FormFieldCounter data-testid="counter" className="custom-class">
                3/10
            </FormFieldCounter>,
        );

        const counter = screen.getByTestId("counter");

        expect(counter).toHaveClass("formFieldCounter");
        expect(counter).toHaveClass("custom-class");
    });
});
