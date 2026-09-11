import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ISliderProps, Slider } from "@sberbusiness/triplex-next/components/Slider";
import { EComponentSize } from "@sberbusiness/triplex-next";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";

const setRailMeasurements = (rail: HTMLDivElement) => {
    Object.defineProperty(rail, "getBoundingClientRect", {
        value: () => ({ left: 0, width: 100, right: 100, top: 0, bottom: 0, height: 0 }),
        configurable: true,
    });
    Object.defineProperty(rail, "offsetWidth", { value: 100, configurable: true });
};

const marks = [
    { value: 0, label: "0" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
];

const renderSlider = (props?: Partial<ISliderProps>) =>
    render(
        <Slider min={0} max={100} marks={marks} value={20} onChange={vi.fn()} size={EComponentSize.MD} {...props} />,
    );

/** Возвращает полосу слайдера с заданными размерами: позиция клика считается от её DOM-узла. */
const findRail = async (container: HTMLElement) => {
    const rail = await waitFor(() => container.querySelector('[class*="sliderExtendedRail"]') as HTMLDivElement);

    setRailMeasurements(rail);

    return rail;
};

describe("Slider", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders slider with marks and accessibility attributes", async () => {
        renderSlider();

        const slider = await screen.findByRole("slider");
        expect(slider).toHaveAttribute("aria-valuemin", "0");
        expect(slider).toHaveAttribute("aria-valuenow", "20");
        expect(slider).toHaveAttribute("aria-valuemax", "100");
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("renders exactly one dot", async () => {
        renderSlider();

        await screen.findByRole("slider");

        expect(screen.getAllByRole("slider")).toHaveLength(1);
    });

    it("calls onChange when rail is clicked", async () => {
        const handleChange = vi.fn();
        const { container } = renderSlider({ onChange: handleChange });
        const rail = await findRail(container);

        fireEvent.click(rail, { clientX: 100 });

        expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("snaps to the nearest value of the step array", async () => {
        const handleChange = vi.fn();
        const { container } = renderSlider({ onChange: handleChange, step: [0, 25, 50, 75, 100] });
        const rail = await findRail(container);

        fireEvent.click(rail, { clientX: 80 });

        expect(handleChange).toHaveBeenCalledWith(75);
    });

    it("counts position from the right edge when reverse is true", async () => {
        const handleChange = vi.fn();
        const { container } = renderSlider({ onChange: handleChange, reverse: true, step: 25 });
        const rail = await findRail(container);

        fireEvent.click(rail, { clientX: 100 });

        expect(handleChange).toHaveBeenCalledWith(0);
    });

    it("moves the dot to the next step on ArrowRight", async () => {
        const handleChange = vi.fn();
        renderSlider({ onChange: handleChange, step: 25, value: 25 });

        const slider = await screen.findByRole("slider");
        fireEvent.focus(slider);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(handleChange).toHaveBeenCalledWith(50);
    });

    it("renders tooltip content when renderTooltipContent provided", async () => {
        const renderTooltipContent = vi.fn((val: number) => `Value: ${val}`);
        renderSlider({ renderTooltipContent });

        expect(await screen.findByText("Value: 20")).toBeInTheDocument();
        expect(renderTooltipContent).toHaveBeenCalledWith(20);
    });

    it("renders no tooltip when renderTooltipContent is omitted", async () => {
        const { container } = renderSlider();

        await screen.findByRole("slider");

        expect(container.querySelector('[class*="sliderExtendedTooltipOverlay"]')).not.toBeInTheDocument();
    });

    it("applies size class to the root element", () => {
        const { container } = renderSlider({ size: EComponentSize.LG });

        expect(container.querySelector("[data-tx]")).toHaveClass("sliderExtended", "lg");
    });

    it("merges className and rest attributes into the root element", () => {
        const { container } = renderSlider({ className: "custom-slider", id: "slider-id" });
        const sliderRoot = container.querySelector("[data-tx]");

        expect(sliderRoot).toHaveClass("sliderExtended", "custom-slider");
        expect(sliderRoot).toHaveAttribute("id", "slider-id");
    });
});
