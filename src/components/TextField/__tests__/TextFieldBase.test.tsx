import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EComponentSize } from "../../../enums/EComponentSize";
import { EFormFieldStatus } from "../../FormField";
import { ITextFieldBaseProps, TextFieldBase } from "../TextFieldBase";

describe("TextFieldBase", () => {
    const renderComponent = (props: Partial<ITextFieldBaseProps> = {}) =>
        render(
            <TextFieldBase {...props}>
                <input />
            </TextFieldBase>,
        );

    it("renders children inside FormField", () => {
        renderComponent();

        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
        expect(input.closest(".formField")).not.toBeNull();
    });

    it("forwards ref to FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <TextFieldBase ref={ref}>
                <input />
            </TextFieldBase>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("formField");
    });

    it("merges className into FormField root element", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <TextFieldBase className="custom-class" ref={ref}>
                <input />
            </TextFieldBase>,
        );

        expect(ref.current).toHaveClass("custom-class");
        expect(ref.current).toHaveClass("formField");
    });

    it.each([
        [EFormFieldStatus.DISABLED, "disabled"],
        [EFormFieldStatus.ERROR, "error"],
        [EFormFieldStatus.WARNING, "warning"],
    ])("applies correct class for status %s", (status, expectedClassName) => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <TextFieldBase status={status} ref={ref}>
                <input />
            </TextFieldBase>,
        );

        expect(ref.current).toHaveClass(expectedClassName);
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies correct class for size %s", (size, expectedClassName) => {
        const ref = React.createRef<HTMLDivElement>();
        render(
            <TextFieldBase size={size} ref={ref}>
                <input />
            </TextFieldBase>,
        );

        expect(ref.current).toHaveClass(expectedClassName);
    });

    it("renders prefix inside FormFieldPrefix when passed", () => {
        renderComponent({ prefix: "Prefix" });

        expect(screen.getByText("Prefix")).toHaveClass("formFieldPrefix");
    });

    it("does not render FormFieldPrefix without prefix", () => {
        const { container } = renderComponent();

        expect(container.querySelector(".formFieldPrefix")).toBeNull();
    });

    it("renders postfix inside FormFieldPostfix when passed", () => {
        renderComponent({ postfix: "Postfix" });

        expect(screen.getByText("Postfix")).toHaveClass("formFieldPostfix");
    });

    it("does not render FormFieldPostfix without postfix", () => {
        const { container } = renderComponent();

        expect(container.querySelector(".formFieldPostfix")).toBeNull();
    });

    it("renders label inside FormFieldLabel when passed", () => {
        renderComponent({ label: "Label" });

        expect(screen.getByText("Label").closest("label")).toHaveClass("formFieldLabel");
    });

    it("does not render FormFieldLabel without label", () => {
        const { container } = renderComponent();

        expect(container.querySelector("label")).toBeNull();
    });

    it("renders description inside FormFieldDescription without counter", () => {
        const { container } = renderComponent({ description: "Description" });

        expect(screen.getByText("Description")).toHaveClass("formFieldDescription");
        expect(container.querySelector(".formFieldCounter")).toBeNull();
    });

    it("renders counter inside FormFieldDescription without description", () => {
        const { container } = renderComponent({ counter: "0/10" });

        expect(container.querySelector(".formFieldDescription")).not.toBeNull();
        expect(screen.getByText("0/10")).toHaveClass("formFieldCounter");
    });

    it("renders description and counter inside single FormFieldDescription", () => {
        const { container } = renderComponent({ counter: "0/10", description: "Description" });

        expect(container.querySelectorAll(".formFieldDescription")).toHaveLength(1);
        expect(screen.getByText("Description")).toHaveClass("formFieldDescription");
        expect(screen.getByText("0/10")).toHaveClass("formFieldCounter");
    });

    it("does not render FormFieldDescription without description and counter", () => {
        const { container } = renderComponent();

        expect(container.querySelector(".formFieldDescription")).toBeNull();
    });

    it("has correct displayName", () => {
        expect(TextFieldBase.displayName).toBe("TextFieldBase");
    });
});
