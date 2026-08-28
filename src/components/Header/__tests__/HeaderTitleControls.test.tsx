import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTitleControls } from "../components/HeaderTitle/HeaderTitleControls";

const getRoot = () => screen.getByTestId("controls");

describe("HeaderTitleControls", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTitleControls data-testid="controls">Content</HeaderTitleControls>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should set the global class on the root element", () => {
        render(<HeaderTitleControls data-testid="controls" />);

        expect(getRoot()).toHaveClass("global-HeaderTitleControls");
    });

    it("Should merge custom className with own classes", () => {
        const { rerender } = render(<HeaderTitleControls data-testid="controls" />);
        const ownClasses = getRoot().className.split(" ").filter(Boolean);

        rerender(<HeaderTitleControls className="custom-class" data-testid="controls" />);

        expect(getRoot()).toHaveClass(...ownClasses, "custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTitleControls id="controls-id" aria-label="Controls" data-testid="controls" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "controls-id");
        expect(root).toHaveAttribute("aria-label", "Controls");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTitleControls ref={ref} data-testid="controls" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTitleControls ref={ref} data-testid="controls" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderTitleControls.displayName).toBe("HeaderTitleControls");
    });
});
