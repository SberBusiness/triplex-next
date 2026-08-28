import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTabsControls } from "../components/HeaderTabs/HeaderTabsControls";

const getRoot = () => screen.getByTestId("controls");

describe("HeaderTabsControls", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTabsControls data-testid="controls">Content</HeaderTabsControls>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should merge custom className with own classes", () => {
        const { rerender } = render(<HeaderTabsControls data-testid="controls" />);
        const ownClasses = getRoot().className.split(" ").filter(Boolean);

        rerender(<HeaderTabsControls className="custom-class" data-testid="controls" />);

        expect(getRoot()).toHaveClass(...ownClasses, "custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTabsControls id="controls-id" aria-label="Controls" data-testid="controls" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "controls-id");
        expect(root).toHaveAttribute("aria-label", "Controls");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTabsControls ref={ref} data-testid="controls" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTabsControls ref={ref} data-testid="controls" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderTabsControls.displayName).toBe("HeaderTabsControls");
    });
});
