import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChipPanel } from "../ChipPanel";
import { ChipPanelLinks } from "../ChipPanelLinks";

const getRoot = () => screen.getByTestId("chip-panel");

describe("ChipPanel", () => {
    it("Should render children inside the root div with own class", () => {
        render(<ChipPanel data-testid="chip-panel">Содержимое</ChipPanel>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("chipPanel");
        expect(screen.getByText("Содержимое")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<ChipPanel className="custom-class" data-testid="chip-panel" />);

        expect(getRoot()).toHaveClass("chipPanel");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<ChipPanel data-testid="chip-panel" id="chips" aria-label="Фильтры" />);

        expect(getRoot()).toHaveAttribute("id", "chips");
        expect(getRoot()).toHaveAttribute("aria-label", "Фильтры");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<ChipPanel ref={ref} data-testid="chip-panel" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<ChipPanel ref={ref} data-testid="chip-panel" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should expose ChipPanelLinks as static Links", () => {
        expect(ChipPanel.Links).toBe(ChipPanelLinks);
    });

    it("Should render composition with Links", () => {
        render(
            <ChipPanel data-testid="chip-panel">
                <ChipPanel.Links data-testid="chip-panel-links">Сбросить</ChipPanel.Links>
            </ChipPanel>,
        );

        expect(getRoot()).toContainElement(screen.getByTestId("chip-panel-links"));
    });

    it("Should have displayName", () => {
        expect(ChipPanel.displayName).toBe("ChipPanel");
    });
});
