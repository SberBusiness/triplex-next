import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FooterDescriptionContent } from "../components/FooterDescriptionContent";

const getRoot = () => screen.getByTestId("content");

describe("FooterDescriptionContent", () => {
    it("Should render children inside the root element", () => {
        render(<FooterDescriptionContent data-testid="content">Content</FooterDescriptionContent>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<FooterDescriptionContent data-testid="content" />);

        expect(getRoot()).toHaveClass("footerDescriptionContent");
    });

    it("Should merge custom className with own class", () => {
        render(<FooterDescriptionContent className="custom-class" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveClass("footerDescriptionContent");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<FooterDescriptionContent id="content-id" aria-label="Content" data-testid="content" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "content-id");
        expect(root).toHaveAttribute("aria-label", "Content");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<FooterDescriptionContent ref={ref} data-testid="content" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<FooterDescriptionContent ref={ref} data-testid="content" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(FooterDescriptionContent.displayName).toBe("FooterDescriptionContent");
    });
});
