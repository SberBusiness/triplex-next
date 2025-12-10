import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Slider } from "@sberbusiness/triplex-next/components/Slider";
import { EComponentSize } from "@sberbusiness/triplex-next";

const setRailMeasurements = (rail: HTMLDivElement) => {
    Object.defineProperty(rail, "getBoundingClientRect", {
        value: () => ({ left: 0, width: 100, right: 100, top: 0, bottom: 0, height: 0 }),
        configurable: true,
    });
    Object.defineProperty(rail, "offsetWidth", { value: 100, configurable: true });
};

describe("Slider", () => {
    const marks = [
        { value: 0, label: "0" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders slider with marks and accessibility attributes", async () => {
        render(<Slider min={0} max={100} marks={marks} value={20} onChange={vi.fn()} size={EComponentSize.MD} />);

        const slider = await screen.findByRole("slider");
        expect(slider).toHaveAttribute("aria-valuemin", "0");
        expect(slider).toHaveAttribute("aria-valuenow", "20");
        expect(slider).toHaveAttribute("aria-valuemax", "100");
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("calls onChange when rail is clicked", async () => {
        const handleChange = vi.fn();
        const { container } = render(
            <Slider min={0} max={100} marks={marks} value={20} onChange={handleChange} size={EComponentSize.MD} />,
        );

        const rail = await waitFor(() => container.querySelector('[class*="sliderExtendedRail"]') as HTMLDivElement);
        setRailMeasurements(rail);

        fireEvent.click(rail, { clientX: 100 });

        expect(handleChange).toHaveBeenCalledWith(100);
    });

    it("renders tooltip content when renderTooltipContent provided", async () => {
        render(
            <Slider
                min={0}
                max={100}
                marks={marks}
                value={20}
                onChange={vi.fn()}
                renderTooltipContent={(val) => `Value: ${val}`}
                size={EComponentSize.MD}
            />,
        );

        expect(await screen.findByText("Value: 20")).toBeInTheDocument();
    });
});
