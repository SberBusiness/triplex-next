import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipPanelLinks } from "../ChipPanelLinks";

const getRoot = () => screen.getByTestId("chip-panel-links");

describe("ChipPanelLinks", () => {
    it("Should render children inside the root div with own class", () => {
        render(<ChipPanelLinks data-testid="chip-panel-links">Сбросить</ChipPanelLinks>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("chipPanelLinks");
        expect(screen.getByText("Сбросить")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<ChipPanelLinks className="custom-class" data-testid="chip-panel-links" />);

        expect(getRoot()).toHaveClass("chipPanelLinks");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<ChipPanelLinks data-testid="chip-panel-links" id="chip-links" aria-label="Действия" />);

        expect(getRoot()).toHaveAttribute("id", "chip-links");
        expect(getRoot()).toHaveAttribute("aria-label", "Действия");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<ChipPanelLinks ref={ref} data-testid="chip-panel-links" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<ChipPanelLinks ref={ref} data-testid="chip-panel-links" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should have displayName", () => {
        expect(ChipPanelLinks.displayName).toBe("ChipPanelLinks");
    });
});
