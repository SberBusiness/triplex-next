import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterPanel } from "../FilterPanel";

const getRoot = () => screen.getByTestId("filter-panel");

describe("FilterPanel", () => {
    it("Should render children inside the root div with own class", () => {
        render(<FilterPanel data-testid="filter-panel">Содержимое</FilterPanel>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("filterPanel");
        expect(screen.getByText("Содержимое")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<FilterPanel className="custom-class" data-testid="filter-panel" />);

        expect(getRoot()).toHaveClass("filterPanel");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<FilterPanel data-testid="filter-panel" id="filters" aria-label="Фильтры" />);

        expect(getRoot()).toHaveAttribute("id", "filters");
        expect(getRoot()).toHaveAttribute("aria-label", "Фильтры");
    });

    it("Should set data-tx on the root div", () => {
        render(<FilterPanel data-testid="filter-panel" />);

        expect(getRoot()).toHaveAttribute("data-tx");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<FilterPanel ref={ref} data-testid="filter-panel" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<FilterPanel ref={ref} data-testid="filter-panel" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should have displayName", () => {
        expect(FilterPanel.displayName).toBe("FilterPanel");
    });
});
