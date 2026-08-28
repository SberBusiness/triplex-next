import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderLayoutSidebarSidebar } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebarSidebar";

const getRoot = () => screen.getByTestId("sidebar");

describe("HeaderLayoutSidebarSidebar", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderLayoutSidebarSidebar data-testid="sidebar">Content</HeaderLayoutSidebarSidebar>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<HeaderLayoutSidebarSidebar data-testid="sidebar" />);

        expect(getRoot()).toHaveClass("headerLayoutSidebarSidebar");
    });

    it("Should merge custom className with own class", () => {
        render(<HeaderLayoutSidebarSidebar className="custom-class" data-testid="sidebar" />);

        const root = getRoot();
        expect(root).toHaveClass("headerLayoutSidebarSidebar");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderLayoutSidebarSidebar id="sidebar-id" aria-label="Sidebar" data-testid="sidebar" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "sidebar-id");
        expect(root).toHaveAttribute("aria-label", "Sidebar");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderLayoutSidebarSidebar ref={ref} data-testid="sidebar" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderLayoutSidebarSidebar ref={ref} data-testid="sidebar" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderLayoutSidebarSidebar.displayName).toBe("HeaderLayoutSidebarSidebar");
    });
});
