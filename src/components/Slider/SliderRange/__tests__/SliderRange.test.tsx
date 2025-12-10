import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SliderRange } from "@sberbusiness/triplex-next/components/Slider";

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

    it("sorts values on mount when order is invalid", () => {
        const handleChange = vi.fn();

        renderSliderRange({ values: [80, 20], onChange: handleChange });

        expect(handleChange).toHaveBeenCalledWith([20, 80]);
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
});
