import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FormField, FormFieldInput, FormFieldPostfix } from "@sberbusiness/triplex-next/components";
import {
    getActiveResizeObserverCount,
    resetResizeObservers,
    resizeElement,
} from "../../../../test-utils/resizeObserver";

describe("FormFieldPostfix", () => {
    afterEach(() => {
        resetResizeObservers();
    });

    it("renders children", () => {
        render(
            <FormField>
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix">%</FormFieldPostfix>
            </FormField>,
        );

        expect(screen.getByTestId("postfix")).toHaveTextContent("%");
    });

    it("merges custom className into the root element", () => {
        render(
            <FormField>
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix" className="custom-postfix">
                    %
                </FormFieldPostfix>
            </FormField>,
        );

        const postfix = screen.getByTestId("postfix");

        expect(postfix).toHaveClass("custom-postfix");
        expect(postfix).toHaveClass("formFieldPostfix");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLSpanElement>();

        render(
            <FormField>
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix" ref={ref}>
                    %
                </FormFieldPostfix>
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toBe(screen.getByTestId("postfix"));
    });

    it("supports a callback ref", () => {
        const callbackRef = vi.fn();

        render(
            <FormField>
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix" ref={callbackRef}>
                    %
                </FormFieldPostfix>
            </FormField>,
        );

        expect(callbackRef).toHaveBeenCalledWith(screen.getByTestId("postfix"));
    });

    it("passes the measured width to the right padding of the field", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix">%</FormFieldPostfix>
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("postfix"), 36);
        });

        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingLeft: "12px", paddingRight: "36px" });
    });

    it("does not affect the left padding measured by the prefix", () => {
        render(
            <FormField data-testid="form-field">
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix">%</FormFieldPostfix>
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("postfix"), 36);
        });

        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingLeft: "12px" });
    });

    it("resets the right padding to the default value on unmount", () => {
        const { rerender } = render(
            <FormField data-testid="form-field">
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix">%</FormFieldPostfix>
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("postfix"), 36);
        });
        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingRight: "36px" });

        rerender(
            <FormField data-testid="form-field">
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("form-field")).toHaveStyle({ paddingRight: "12px" });
    });

    it("disconnects the observer on unmount", () => {
        const { unmount } = render(
            <FormField>
                <FormFieldInput />
                <FormFieldPostfix data-testid="postfix">%</FormFieldPostfix>
            </FormField>,
        );

        expect(getActiveResizeObserverCount()).toBe(1);

        unmount();

        expect(getActiveResizeObserverCount()).toBe(0);
    });
});
