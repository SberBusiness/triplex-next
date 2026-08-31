import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TableFooter } from "../TableFooter/TableFooter";
import { TableFooterSummary } from "../TableFooter/components/TableFooterSummary";
import { FooterDescriptionControls } from "../../Footer/components/FooterDescriptionControls";

const getRoot = () => screen.getByTestId("table-footer");

describe("TableFooter", () => {
    it("Should render children inside FooterDescription", () => {
        render(<TableFooter data-testid="table-footer">Содержимое</TableFooter>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("tableFooterWrapper");
        expect(screen.getByText("Содержимое").closest(".footerDescription")).toBeInTheDocument();
    });

    it("Should render shadow and footer blocks", () => {
        const { container } = render(<TableFooter data-testid="table-footer" />);

        expect(container.querySelector(".tableFooterShadow")).toBeInTheDocument();
        expect(container.querySelector(".tableFooter")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<TableFooter className="custom-class" data-testid="table-footer" />);

        expect(getRoot()).toHaveClass("tableFooterWrapper");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<TableFooter data-testid="table-footer" id="footer" aria-label="Подвал" />);

        expect(getRoot()).toHaveAttribute("id", "footer");
        expect(getRoot()).toHaveAttribute("aria-label", "Подвал");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<TableFooter ref={ref} data-testid="table-footer" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<TableFooter ref={ref} data-testid="table-footer" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should keep statics identity", () => {
        expect(TableFooter.Summary).toBe(TableFooterSummary);
        expect(TableFooter.Controls).toBe(FooterDescriptionControls);
    });

    it("Should render composition with Summary and Controls", () => {
        render(
            <TableFooter data-testid="table-footer">
                <TableFooter.Summary data-testid="summary">Итого</TableFooter.Summary>
                <TableFooter.Controls data-testid="controls">Действия</TableFooter.Controls>
            </TableFooter>,
        );

        expect(getRoot()).toContainElement(screen.getByTestId("summary"));
        expect(getRoot()).toContainElement(screen.getByTestId("controls"));
    });

    it("Should have displayName", () => {
        expect(TableFooter.displayName).toBe("TableFooter");
    });
});
