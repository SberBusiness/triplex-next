import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTabsContent } from "../components/HeaderTabs/HeaderTabsContent";

const getRoot = () => screen.getByTestId("content");

describe("HeaderTabsContent", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTabsContent data-testid="content">Content</HeaderTabsContent>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should merge custom className with own classes", () => {
        const { rerender } = render(<HeaderTabsContent data-testid="content" />);
        const ownClasses = getRoot().className.split(" ").filter(Boolean);

        rerender(<HeaderTabsContent className="custom-class" data-testid="content" />);

        expect(getRoot()).toHaveClass(...ownClasses, "custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTabsContent id="content-id" aria-label="Content" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "content-id");
        expect(root).toHaveAttribute("aria-label", "Content");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTabsContent ref={ref} data-testid="content" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTabsContent ref={ref} data-testid="content" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderTabsContent.displayName).toBe("HeaderTabsContent");
    });
});
