import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NoColumns } from "../NoColumns";

const getRoot = () => screen.getByTestId("no-columns");

describe("NoColumns", () => {
    it("Should render children inside the content block", () => {
        render(<NoColumns data-testid="no-columns">Все колонки скрыты</NoColumns>);

        const root = getRoot();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("noColumns");
        expect(screen.getByText("Все колонки скрыты")).toHaveClass("content");
    });

    it("Should render icon before the content block", () => {
        const { container } = render(<NoColumns data-testid="no-columns">Все колонки скрыты</NoColumns>);

        expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("Should merge custom className with own class", () => {
        render(<NoColumns className="custom-class" data-testid="no-columns" />);

        expect(getRoot()).toHaveClass("noColumns");
        expect(getRoot()).toHaveClass("custom-class");
    });

    it("Should spread rest props to the root div", () => {
        render(<NoColumns data-testid="no-columns" id="no-columns-block" aria-label="Нет колонок" />);

        expect(getRoot()).toHaveAttribute("id", "no-columns-block");
        expect(getRoot()).toHaveAttribute("aria-label", "Нет колонок");
    });

    it("Should forward object ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<NoColumns ref={ref} data-testid="no-columns" />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(getRoot());
    });

    it("Should forward callback ref to the root div", () => {
        const ref = vi.fn();

        render(<NoColumns ref={ref} data-testid="no-columns" />);

        expect(ref).toHaveBeenCalledWith(getRoot());
    });

    it("Should have displayName", () => {
        expect(NoColumns.displayName).toBe("NoColumns");
    });
});
