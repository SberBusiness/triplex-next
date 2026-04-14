import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconWrapper } from "../IconWrapper";

describe("IconWrapper", () => {
    const renderComponent = (props: Partial<React.ComponentProps<typeof IconWrapper>> = {}) =>
        render(
            <IconWrapper {...props}>
                <svg data-testid="icon" />
            </IconWrapper>,
        );

    const getWrapper = () => screen.getByTestId("icon").parentElement as HTMLSpanElement;

    it("renders without errors", () => {
        renderComponent();
        expect(getWrapper()).toBeInTheDocument();
    });

    it("renders children", () => {
        renderComponent();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("forwards ref to root element", () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <IconWrapper ref={ref}>
                <svg />
            </IconWrapper>,
        );
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it("applies hoverable class by default", () => {
        renderComponent();
        expect(getWrapper()).toHaveClass("hoverable");
    });

    it("applies active class when active prop is set", () => {
        renderComponent({ active: true });
        expect(getWrapper()).toHaveClass("active");
    });

    it("does not apply active class when active is false", () => {
        renderComponent({ active: false });
        expect(getWrapper()).not.toHaveClass("active");
    });

    it("applies disabled class when disabled prop is set", () => {
        renderComponent({ disabled: true });
        expect(getWrapper()).toHaveClass("disabled");
    });

    it("does not apply disabled class when disabled is false", () => {
        renderComponent({ disabled: false });
        expect(getWrapper()).not.toHaveClass("disabled");
    });

    it("applies disableInteraction style", () => {
        renderComponent({ disableInteraction: true });
        expect(getWrapper().className).toMatch(/disableInteraction/);
    });
});
