import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FormField, FormFieldInput, FormFieldPrefix } from "@sberbusiness/triplex-next/components";
import { getActiveResizeObserverCount, resetResizeObservers, resizeElement } from "./resizeObserverMock";

describe("FormFieldPrefix", () => {
    afterEach(() => {
        resetResizeObservers();
    });

    it("renders children", () => {
        render(
            <FormField>
                <FormFieldPrefix data-testid="prefix">₽</FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("prefix")).toHaveTextContent("₽");
    });

    it("merges custom className into the root element", () => {
        render(
            <FormField>
                <FormFieldPrefix data-testid="prefix" className="custom-prefix">
                    ₽
                </FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        const prefix = screen.getByTestId("prefix");

        expect(prefix).toHaveClass("custom-prefix");
        expect(prefix).toHaveClass("formFieldPrefix");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <FormField>
                <FormFieldPrefix data-testid="prefix" ref={ref}>
                    ₽
                </FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(screen.getByTestId("prefix"));
    });

    it("supports a callback ref", () => {
        const callbackRef = vi.fn();

        render(
            <FormField>
                <FormFieldPrefix data-testid="prefix" ref={callbackRef}>
                    ₽
                </FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId("prefix"));
    });

    it("passes the measured width to the left padding of the field", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldPrefix data-testid="prefix">₽</FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("prefix"), 48);
        });

        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingLeft: "48px", paddingRight: "12px" });
    });

    it("resets the left padding to the default value on unmount", () => {
        const { rerender } = render(
            <FormField data-testid="form-field">
                <FormFieldPrefix data-testid="prefix">₽</FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("prefix"), 48);
        });
        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingLeft: "48px" });

        rerender(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingLeft: "12px" });
    });

    it("disconnects the observer on unmount", () => {
        const { unmount } = render(
            <FormField>
                <FormFieldPrefix data-testid="prefix">₽</FormFieldPrefix>
                <FormFieldInput />
            </FormField>,
        );

        expect(getActiveResizeObserverCount()).toBe(1);

        unmount();

        expect(getActiveResizeObserverCount()).toBe(0);
    });
});
