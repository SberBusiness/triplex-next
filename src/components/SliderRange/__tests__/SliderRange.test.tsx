import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";
import { EVENT_KEY_CODES } from "@sberbusiness/triplex-next/utils/keyboard";
import { SliderRange } from "@sberbusiness/triplex-next/components/SliderRange/SliderRange";

const setRailMeasurements = (rail: HTMLDivElement) => {
    Object.defineProperty(rail, "getBoundingClientRect", {
        value: () => ({ left: 0, width: 100, right: 100, top: 0, bottom: 0, height: 0 }),
        configurable: true,
    });
    Object.defineProperty(rail, "offsetWidth", { value: 100, configurable: true });
};

const renderSliderRange = (props?: Partial<React.ComponentProps<typeof SliderRange>>) =>
    render(
        <SliderRange
            min={0}
            max={100}
            marks={[
                { value: 0, label: "0" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
            ]}
            values={[10, 30]}
            onChange={vi.fn()}
            {...props}
        />,
    );

/** Возвращает значения ползунков в порядке их отрисовки. */
const getDotValues = () => screen.getAllByRole("slider").map((dot) => dot.getAttribute("aria-valuenow"));

describe("SliderRange", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders two slider dots and marks", async () => {
        renderSliderRange();

        const sliders = await screen.findAllByRole("slider");
        expect(sliders).toHaveLength(2);
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("positions dots by values", () => {
        renderSliderRange({ values: [10, 30] });

        expect(getDotValues()).toEqual(["10", "30"]);
    });

    it("sorts values on mount when order is invalid", () => {
        const handleChange = vi.fn();

        renderSliderRange({ values: [80, 20], onChange: handleChange });

        expect(handleChange).toHaveBeenCalledWith([20, 80]);
    });

    it("does not call onChange on mount when order is valid", () => {
        const handleChange = vi.fn();

        renderSliderRange({ onChange: handleChange });

        expect(handleChange).not.toHaveBeenCalled();
    });

    it("moves dots when values prop changes", () => {
        const { rerender } = renderSliderRange({ values: [10, 30] });

        rerender(
            <SliderRange min={0} max={100} marks={[{ value: 0, label: "0" }]} values={[20, 40]} onChange={vi.fn()} />,
        );

        expect(getDotValues()).toEqual(["20", "40"]);
    });

    it("keeps each dot on its side when dots are crossed", () => {
        const handleChange = vi.fn();
        const { rerender } = renderSliderRange({ onChange: handleChange, step: 25, values: [25, 50] });

        // Первый ползунок уезжает правее второго — внутренние значения перекрещиваются.
        fireEvent.focus(screen.getAllByRole("slider")[0]);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(handleChange).toHaveBeenLastCalledWith([50, 75]);
        expect(getDotValues()).toEqual(["75", "50"]);

        // Потребитель вернул отсортированную пару — ползунки остаются на своих местах, а не прыгают.
        rerender(
            <SliderRange
                min={0}
                max={100}
                marks={[{ value: 0, label: "0" }]}
                step={25}
                values={[50, 75]}
                onChange={handleChange}
            />,
        );

        expect(getDotValues()).toEqual(["75", "50"]);
    });

    it("calls onChange with sorted values when dots cross", () => {
        const handleChange = vi.fn();

        renderSliderRange({ onChange: handleChange, step: 25, values: [25, 50] });

        fireEvent.focus(screen.getAllByRole("slider")[0]);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(handleChange).toHaveBeenNthCalledWith(1, [50, 50]);
        expect(handleChange).toHaveBeenNthCalledWith(2, [50, 75]);
    });

    it("moves both dots when track is moved by keyboard", () => {
        const handleChange = vi.fn();

        renderSliderRange({ onChange: handleChange, step: 25, values: [25, 50] });

        fireEvent.focus(screen.getByRole("button"));
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_RIGHT });

        expect(getDotValues()).toEqual(["50", "75"]);
        expect(handleChange).toHaveBeenLastCalledWith([50, 75]);
    });

    it("moves dots along the custom step array", () => {
        const handleChange = vi.fn();

        renderSliderRange({ onChange: handleChange, step: [0, 10, 90, 100], values: [10, 90] });

        fireEvent.focus(screen.getAllByRole("slider")[0]);
        fireEvent.keyDown(window, { keyCode: EVENT_KEY_CODES.ARROW_LEFT });

        expect(handleChange).toHaveBeenLastCalledWith([0, 90]);
    });

    it("calls onChange when rail is clicked", async () => {
        const handleChange = vi.fn();
        const { container } = renderSliderRange({ onChange: handleChange });

        const rail = await waitFor(() => container.querySelector('[class*="sliderExtendedRail"]') as HTMLDivElement);
        setRailMeasurements(rail);

        fireEvent.click(rail, { clientX: 100 });

        await waitFor(() => expect(handleChange).toHaveBeenCalled());
        expect(handleChange).toHaveBeenCalledWith([10, 100]);
    });

    it("renders non-draggable track when draggableTrack is false", async () => {
        renderSliderRange({ draggableTrack: false });

        const track = await screen.findByRole("button");
        expect(track).toHaveAttribute("tabindex", "-1");
    });

    it("renders tooltip content for both dots", () => {
        renderSliderRange({ renderTooltipContent: (value) => `${value} %` });

        expect(screen.getByText("10 %")).toBeInTheDocument();
        expect(screen.getByText("30 %")).toBeInTheDocument();
    });

    it("does not render tooltips without renderTooltipContent", () => {
        const { container } = renderSliderRange();

        expect(container.querySelector('[class*="sliderExtendedTooltip"]')).toBeNull();
    });

    it("takes dots out of tabulation when disabled", () => {
        renderSliderRange({ disabled: true });

        for (const dot of screen.getAllByRole("slider")) {
            expect(dot).toHaveAttribute("tabindex", "-1");
        }
    });

    it("passes className and rest attributes to the root element", () => {
        const { container } = renderSliderRange({ className: "custom-slider-range", id: "range" });

        const root = container.firstChild as HTMLElement;

        expect(root).toHaveClass("sliderExtended", "custom-slider-range");
        expect(root).toHaveAttribute("id", "range");
    });

    it("applies size class to the root element", () => {
        const { container } = renderSliderRange({ size: EComponentSize.LG });

        expect(container.firstChild).toHaveClass("lg");
    });

    it("exposes class instance through ref", () => {
        const ref = React.createRef<SliderRange>();

        render(
            <SliderRange
                min={0}
                max={100}
                marks={[{ value: 0, label: "0" }]}
                values={[10, 30]}
                onChange={vi.fn()}
                ref={ref}
            />,
        );

        expect(ref.current).toBeInstanceOf(SliderRange);
    });
});
