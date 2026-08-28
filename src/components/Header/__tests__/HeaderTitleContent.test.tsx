import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderTitleContent } from "../components/HeaderTitle/HeaderTitleContent";

const getRoot = () => screen.getByTestId("content");

describe("HeaderTitleContent", () => {
    it("Should render children inside the root element", () => {
        render(<HeaderTitleContent data-testid="content">Content</HeaderTitleContent>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own classes on the root element", () => {
        render(<HeaderTitleContent data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveClass("headerTitleContent");
        expect(root).toHaveClass("global-HeaderTitleContent");
    });

    it("Should merge custom className with own classes", () => {
        render(<HeaderTitleContent className="custom-class" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveClass("headerTitleContent");
        expect(root).toHaveClass("global-HeaderTitleContent");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<HeaderTitleContent id="content-id" aria-label="Content" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "content-id");
        expect(root).toHaveAttribute("aria-label", "Content");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<HeaderTitleContent ref={ref} data-testid="content" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<HeaderTitleContent ref={ref} data-testid="content" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(HeaderTitleContent.displayName).toBe("HeaderTitleContent");
    });
});
