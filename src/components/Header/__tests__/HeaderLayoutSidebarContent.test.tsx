import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderLayoutSidebarContent } from "../components/HeaderLayoutSidebar/HeaderLayoutSidebarContent";

const getRoot = () => screen.getByTestId("content");

describe("HeaderLayoutSidebarContent", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderLayoutSidebarContent data-testid="content">Content</HeaderLayoutSidebarContent>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<HeaderLayoutSidebarContent data-testid="content" />);

        expect(getRoot()).toHaveClass("headerLayoutSidebarContent");
    });

    it("Should merge custom className with own class", () => {
        render(<HeaderLayoutSidebarContent className="custom-class" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveClass("headerLayoutSidebarContent");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderLayoutSidebarContent id="content-id" aria-label="Content" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "content-id");
        expect(root).toHaveAttribute("aria-label", "Content");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderLayoutSidebarContent ref={ref} data-testid="content" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderLayoutSidebarContent ref={ref} data-testid="content" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderLayoutSidebarContent.displayName).toBe("HeaderLayoutSidebarContent");
    });
});
