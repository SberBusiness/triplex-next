import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FooterDescription } from "../components/FooterDescription";
import { FooterDescriptionContent } from "../components/FooterDescriptionContent";
import { FooterDescriptionControls } from "../components/FooterDescriptionControls";

const getRoot = () => screen.getByTestId("description");

describe("FooterDescription", () => {
    it("Should render children inside the root element", () => {
        render(<FooterDescription data-testid="description">Content</FooterDescription>);

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<FooterDescription data-testid="description" />);

        expect(getRoot()).toHaveClass("footerDescription");
    });

    it("Should merge custom className with own class", () => {
        render(<FooterDescription className="custom-class" data-testid="description" />);

        const root = getRoot();
        expect(root).toHaveClass("footerDescription");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<FooterDescription id="description-id" aria-label="Description" data-testid="description" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "description-id");
        expect(root).toHaveAttribute("aria-label", "Description");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<FooterDescription ref={ref} data-testid="description" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<FooterDescription ref={ref} data-testid="description" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose subcomponents as static properties", () => {
        expect(FooterDescription.Content).toBe(FooterDescriptionContent);
        expect(FooterDescription.Controls).toBe(FooterDescriptionControls);
    });

    it("Should set displayName", () => {
        expect(FooterDescription.displayName).toBe("FooterDescription");
    });
});
