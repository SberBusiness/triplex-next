import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTitle } from "../components/HeaderTitle/HeaderTitle";
import { HeaderTitleContent } from "../components/HeaderTitle/HeaderTitleContent";
import { HeaderTitleControls } from "../components/HeaderTitle/HeaderTitleControls";

const getRoot = () => screen.getByTestId("title");

describe("HeaderTitle", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTitle data-testid="title">Content</HeaderTitle>);

        expect(getRoot()).toContainElement(screen.getByText("Content"));
    });

    it("Should merge custom className with own classes", () => {
        const { rerender } = render(<HeaderTitle data-testid="title" />);
        const ownClasses = getRoot().className.split(" ").filter(Boolean);

        rerender(<HeaderTitle className="custom-class" data-testid="title" />);

        expect(getRoot()).toHaveClass(...ownClasses, "custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTitle id="title-id" aria-label="Title" data-testid="title" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "title-id");
        expect(root).toHaveAttribute("aria-label", "Title");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTitle ref={ref} data-testid="title" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTitle ref={ref} data-testid="title" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose subcomponents as static properties", () => {
        expect(HeaderTitle.Content).toBe(HeaderTitleContent);
        expect(HeaderTitle.Controls).toBe(HeaderTitleControls);
    });

    it("Should set displayName", () => {
        expect(HeaderTitle.displayName).toBe("HeaderTitle");
    });
});
