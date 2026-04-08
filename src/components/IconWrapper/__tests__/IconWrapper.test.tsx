import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IconWrapper } from "../IconWrapper";

describe("IconWrapper", () => {
    const renderComponent = (props: Partial<React.ComponentProps<typeof IconWrapper>> = {}) =>
        render(
            <IconWrapper data-testid="icon-wrapper" {...props}>
                <svg data-testid="icon" />
            </IconWrapper>,
        );

    it("renders without errors", () => {
        renderComponent();
        expect(screen.getByTestId("icon-wrapper")).toBeInTheDocument();
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
        expect(screen.getByTestId("icon-wrapper")).toHaveClass("hoverable");
    });

    it("applies active class when active prop is set", () => {
        renderComponent({ active: true });
        expect(screen.getByTestId("icon-wrapper")).toHaveClass("active");
    });

    it("does not apply active class when active is false", () => {
        renderComponent({ active: false });
        expect(screen.getByTestId("icon-wrapper")).not.toHaveClass("active");
    });

    it("applies disabled class when disabled prop is set", () => {
        renderComponent({ disabled: true });
        expect(screen.getByTestId("icon-wrapper")).toHaveClass("disabled");
    });

    it("does not apply disabled class when disabled is false", () => {
        renderComponent({ disabled: false });
        expect(screen.getByTestId("icon-wrapper")).not.toHaveClass("disabled");
    });

    it("applies disablePointerEvents style", () => {
        renderComponent({ disablePointerEvents: true });
        const el = screen.getByTestId("icon-wrapper");
        expect(el.className).toMatch(/disablePointerEvents/);
    });

    it("applies displayContents style", () => {
        renderComponent({ displayContents: true });
        const el = screen.getByTestId("icon-wrapper");
        expect(el.className).toMatch(/displayContents/);
    });

    it("passes className to root element", () => {
        renderComponent({ className: "custom-class" });
        expect(screen.getByTestId("icon-wrapper")).toHaveClass("custom-class");
    });

    it("spreads rest props to root element", () => {
        renderComponent({ "aria-label": "settings icon" } as React.HTMLAttributes<HTMLSpanElement>);
        expect(screen.getByTestId("icon-wrapper")).toHaveAttribute("aria-label", "settings icon");
    });

    it("calls onClick when clicked", () => {
        const onClick = vi.fn();
        renderComponent({ onClick });
        fireEvent.click(screen.getByTestId("icon-wrapper"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
