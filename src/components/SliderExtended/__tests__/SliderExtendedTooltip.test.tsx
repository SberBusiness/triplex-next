import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { SliderExtended } from "../SliderExtended";
import { ISliderExtendedTooltipProps } from "../components/SliderExtendedTooltip/SliderExtendedTooltip";

const renderTooltip = (
    tooltipProps?: Partial<ISliderExtendedTooltipProps> & { ref?: React.Ref<HTMLDivElement> },
    size: EComponentSize.MD | EComponentSize.LG = EComponentSize.MD,
) =>
    render(
        <SliderExtended min={0} max={100} step={25} size={size}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={50} onChange={vi.fn()}>
                <SliderExtended.Tooltip value={50} {...tooltipProps}>
                    Подсказка
                </SliderExtended.Tooltip>
            </SliderExtended.Dot>
        </SliderExtended>,
    );

/** Возвращает корневой элемент тултипа. */
const getTooltip = () => {
    const tooltip = screen.getByText("Подсказка").closest(".sliderExtendedTooltipOverlay");

    if (!tooltip) {
        throw new Error("Tooltip is not rendered");
    }

    return tooltip;
};

describe("SliderExtendedTooltip", () => {
    it("renders content", () => {
        renderTooltip();

        expect(screen.getByText("Подсказка")).toBeInTheDocument();
    });

    it("applies size class for LG size", () => {
        renderTooltip(undefined, EComponentSize.LG);

        expect(getTooltip()).toHaveClass("lg");
    });

    it("merges className with own classes", () => {
        renderTooltip({ className: "custom-tooltip" });

        expect(getTooltip()).toHaveClass("sliderExtendedTooltipOverlay", "custom-tooltip");
    });

    it("passes rest attributes to the root element", () => {
        renderTooltip({ id: "tooltip-id" });

        expect(getTooltip()).toHaveAttribute("id", "tooltip-id");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        renderTooltip({ ref });

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("sliderExtendedTooltipOverlay");
    });

    it("does not shift the tooltip body in the middle of the rail", () => {
        renderTooltip({ value: 50 });

        expect(screen.getByText("Подсказка")).toHaveStyle({ left: "0px" });
    });

    it("shifts the tooltip body towards the rail at its edges", () => {
        renderTooltip({ value: 0 });

        const shiftAtStart = screen.getByText("Подсказка").style.left;

        expect(shiftAtStart).not.toBe("0px");
    });

    it("does not shift the tooltip body without value", () => {
        renderTooltip({ value: undefined });

        expect(screen.getByText("Подсказка")).toHaveStyle({ left: "0px" });
    });
});
