import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FooterDescriptionControls } from "../components/FooterDescriptionControls";

const getRoot = () => screen.getByTestId("controls");

describe("FooterDescriptionControls", () => {
    it("Should render children inside the root element", () => {
        render(
            <FooterDescriptionControls data-testid="controls">
                <button type="button">Save</button>
            </FooterDescriptionControls>,
        );

        expect(getRoot()).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("Should set own class on the root element", () => {
        render(<FooterDescriptionControls data-testid="controls" />);

        expect(getRoot()).toHaveClass("footerDescriptionControls");
    });

    it("Should merge custom className with own class", () => {
        render(<FooterDescriptionControls className="custom-class" data-testid="controls" />);

        const root = getRoot();
        expect(root).toHaveClass("footerDescriptionControls");
        expect(root).toHaveClass("custom-class");
    });

    it("Should spread rest props on the root element", () => {
        render(<FooterDescriptionControls id="controls-id" aria-label="Controls" data-testid="controls" />);

        const root = getRoot();
        expect(root).toHaveAttribute("id", "controls-id");
        expect(root).toHaveAttribute("aria-label", "Controls");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<FooterDescriptionControls ref={ref} data-testid="controls" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<FooterDescriptionControls ref={ref} data-testid="controls" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should set displayName", () => {
        expect(FooterDescriptionControls.displayName).toBe("FooterDescriptionControls");
    });
});
