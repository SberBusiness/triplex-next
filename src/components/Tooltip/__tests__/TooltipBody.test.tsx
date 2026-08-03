import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TooltipBody } from "../components/common/TooltipBody";

describe("TooltipBody", () => {
    it("should render children", () => {
        render(<TooltipBody>Текст подсказки</TooltipBody>);

        expect(screen.getByText("Текст подсказки")).toBeInTheDocument();
    });

    it("should merge custom className with the base class", () => {
        render(<TooltipBody className="customClassName">Текст подсказки</TooltipBody>);

        const body = screen.getByText("Текст подсказки");

        expect(body).toHaveClass("tooltipBody");
        expect(body).toHaveClass("customClassName");
    });

    it("should spread rest props to the root element", () => {
        render(<TooltipBody data-testid="tooltip-body">Текст подсказки</TooltipBody>);

        expect(screen.getByTestId("tooltip-body")).toBeInTheDocument();
    });

    it("should forward ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(<TooltipBody ref={ref}>Текст подсказки</TooltipBody>);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
