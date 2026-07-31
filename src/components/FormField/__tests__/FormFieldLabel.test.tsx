import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import {
    EFormFieldStatus,
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldPrefix,
} from "@sberbusiness/triplex-next/components";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { resetResizeObservers, resizeElement } from "./resizeObserverMock";

describe("FormFieldLabel", () => {
    afterEach(() => {
        resetResizeObservers();
    });

    it("renders label text", () => {
        render(
            <FormField>
                <FormFieldLabel>Label text</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByText("Label text")).toBeInTheDocument();
    });

    it("is not floating when the field is empty and inactive", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).not.toHaveClass("floating");
    });

    it("is floating when the field is filled", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput defaultValue="value" />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveClass("floating");
    });

    it("is floating when the field is active", () => {
        render(
            <FormField active>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveClass("floating");
    });

    it("is floating when the nested input gets focus", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        fireEvent.focus(screen.getByRole("textbox"));

        expect(screen.getByTestId("label")).toHaveClass("floating");
    });

    it("respects the floating prop over the computed value", () => {
        const { rerender } = render(
            <FormField>
                <FormFieldLabel data-testid="label" floating>
                    Label
                </FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveClass("floating");

        rerender(
            <FormField>
                <FormFieldLabel data-testid="label" floating={false}>
                    Label
                </FormFieldLabel>
                <FormFieldInput defaultValue="value" />
            </FormField>,
        );

        expect(screen.getByTestId("label")).not.toHaveClass("floating");
    });

    it("binds htmlFor to the id of the nested input", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const input = screen.getByRole("textbox");

        expect(input.id).toBeTruthy();
        expect(screen.getByTestId("label")).toHaveAttribute("for", input.id);
    });

    it("uses the id passed from outside", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label" id="custom-label-id">
                    Label
                </FormFieldLabel>
                <FormFieldInput id="custom-input-id" />
            </FormField>,
        );

        const label = screen.getByTestId("label");

        expect(label).toHaveAttribute("id", "custom-label-id");
        expect(label).toHaveAttribute("for", "custom-input-id");
    });

    it("applies disabled class for the disabled status", () => {
        render(
            <FormField status={EFormFieldStatus.DISABLED}>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveClass("disabled");
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies class for size %s from the context", (size, expectedClassName) => {
        render(
            <FormField size={size}>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveClass(expectedClassName);
    });

    it("applies default horizontal positions", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveStyle({ left: "12px", right: "12px" });
    });

    it("shifts the left position by the measured prefix width", () => {
        render(
            <FormField>
                <FormFieldPrefix data-testid="prefix">₽</FormFieldPrefix>
                <FormFieldLabel data-testid="label">Label</FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        act(() => {
            resizeElement(screen.getByTestId("prefix"), 40);
        });

        expect(screen.getByTestId("label")).toHaveStyle({ left: "40px", right: "12px" });
    });

    it("allows overriding positions via the style prop", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label" style={{ left: 4, right: 8 }}>
                    Label
                </FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(screen.getByTestId("label")).toHaveStyle({ left: "4px", right: "8px" });
    });

    it("merges custom className into the root element", () => {
        render(
            <FormField>
                <FormFieldLabel data-testid="label" className="custom-label">
                    Label
                </FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        const label = screen.getByTestId("label");

        expect(label).toHaveClass("custom-label");
        expect(label).toHaveClass("formFieldLabel");
    });

    it("forwards ref to the label element", () => {
        const ref = React.createRef<HTMLLabelElement>();

        render(
            <FormField>
                <FormFieldLabel data-testid="label" ref={ref}>
                    Label
                </FormFieldLabel>
                <FormFieldInput />
            </FormField>,
        );

        expect(ref.current).toBeInstanceOf(HTMLLabelElement);
        expect(ref.current).toBe(screen.getByTestId("label"));
    });
});
