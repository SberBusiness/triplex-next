import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PaginationPanel } from "../PaginationPanel";

const getRoot = () => screen.getByTestId("pagination-panel");

describe("PaginationPanel", () => {
    it("Should render children inside the root div with own class", () => {
        render(<PaginationPanel data-testid="pagination-panel">Содержимое</PaginationPanel>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("paginationPanel");
        expect(screen.getByText("Содержимое")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<PaginationPanel className="custom-class" data-testid="pagination-panel" />);

        expect(getRoot()).toHaveClass("paginationPanel");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<PaginationPanel data-testid="pagination-panel" id="pagination" aria-label="Пагинация" />);

        expect(getRoot()).toHaveAttribute("id", "pagination");
        expect(getRoot()).toHaveAttribute("aria-label", "Пагинация");
    });

    it("Should set data-tx on the root div", () => {
        render(<PaginationPanel data-testid="pagination-panel" />);

        expect(getRoot()).toHaveAttribute("data-tx");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<PaginationPanel ref={ref} data-testid="pagination-panel" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<PaginationPanel ref={ref} data-testid="pagination-panel" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should have displayName", () => {
        expect(PaginationPanel.displayName).toBe("PaginationPanel");
    });
});
