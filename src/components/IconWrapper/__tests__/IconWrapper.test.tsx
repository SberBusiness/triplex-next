import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
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

    it("does not apply disableInteraction style by default", () => {
        renderComponent();
        expect(getWrapper().className).not.toMatch(/disableInteraction/);
    });

    it("applies displayContents style when displayContents prop is set", () => {
        renderComponent({ displayContents: true });
        expect(getWrapper().className).toMatch(/displayContents/);
    });

    it("does not apply displayContents style by default", () => {
        renderComponent();
        expect(getWrapper().className).not.toMatch(/displayContents/);
    });

    it("merges custom className with own classes", () => {
        renderComponent({ className: "custom-class", active: true });
        expect(getWrapper()).toHaveClass("custom-class", "hoverable", "active");
    });

    it("spreads rest props to root element", () => {
        renderComponent({ id: "icon-wrapper", "aria-hidden": true });
        const wrapper = getWrapper();
        expect(wrapper).toHaveAttribute("id", "icon-wrapper");
        expect(wrapper).toHaveAttribute("aria-hidden", "true");
    });

    it("calls onClick with click event on root element", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        renderComponent({ onClick });
        await user.click(getWrapper());
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ type: "click", target: getWrapper() }));
    });
});
