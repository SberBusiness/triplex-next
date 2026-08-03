import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TooltipLink } from "../components/common/TooltipLink";

describe("TooltipLink", () => {
    it("should render an anchor with children and href", () => {
        render(<TooltipLink href="https://example.com">Подробнее</TooltipLink>);

        const link = screen.getByRole("link", { name: "Подробнее" });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("should merge custom className with the base class", () => {
        render(
            <TooltipLink href="#" className="customClassName">
                Подробнее
            </TooltipLink>,
        );

        const link = screen.getByRole("link", { name: "Подробнее" });

        expect(link).toHaveClass("tooltipLink");
        expect(link).toHaveClass("desktop");
        expect(link).toHaveClass("customClassName");
    });

    it("should protect against reverse tabnabbing for target=_blank", () => {
        render(
            <TooltipLink href="#" target="_blank">
                Подробнее
            </TooltipLink>,
        );

        expect(screen.getByRole("link", { name: "Подробнее" })).toHaveAttribute("rel", "noopener");
    });

    it("should keep the rel passed by the consumer", () => {
        render(
            <TooltipLink href="#" target="_blank" rel="noopener noreferrer">
                Подробнее
            </TooltipLink>,
        );

        expect(screen.getByRole("link", { name: "Подробнее" })).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should not add rel without target=_blank", () => {
        render(<TooltipLink href="#">Подробнее</TooltipLink>);

        expect(screen.getByRole("link", { name: "Подробнее" })).not.toHaveAttribute("rel");
    });

    it("should forward ref to the anchor element", () => {
        const ref = React.createRef<HTMLAnchorElement>();

        render(
            <TooltipLink href="#" ref={ref}>
                Подробнее
            </TooltipLink>,
        );

        expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });
});
