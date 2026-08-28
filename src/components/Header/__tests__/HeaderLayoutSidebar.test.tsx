import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderLayoutSidebar } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebar";
import { HeaderLayoutSidebarContent } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebarContent";
import { HeaderLayoutSidebarSidebar } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebarSidebar";

const getRoot = () => screen.getByTestId("layout");

describe("HeaderLayoutSidebar", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderLayoutSidebar data-testid="layout">Content</HeaderLayoutSidebar>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should merge custom className with own classes", () => {
        const { rerender } = render(<HeaderLayoutSidebar data-testid="layout" />);
        const ownClasses = getRoot().className.split(" ").filter(Boolean);

        rerender(<HeaderLayoutSidebar className="custom-class" data-testid="layout" />);

        expect(getRoot()).toHaveClass(...ownClasses, "custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderLayoutSidebar id="layout-id" aria-label="Layout" data-testid="layout" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "layout-id");
        expect(root).toHaveAttribute("aria-label", "Layout");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderLayoutSidebar ref={ref} data-testid="layout" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderLayoutSidebar ref={ref} data-testid="layout" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose subcomponents as static properties", () => {
        expect(HeaderLayoutSidebar.Content).toBe(HeaderLayoutSidebarContent);
        expect(HeaderLayoutSidebar.Sidebar).toBe(HeaderLayoutSidebarSidebar);
    });

    it("Should set displayName", () => {
        expect(HeaderLayoutSidebar.displayName).toBe("HeaderLayoutSidebar");
    });
});
