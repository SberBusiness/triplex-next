import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SliderExtended } from "@sberbusiness/triplex-next/components/SliderExtended";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

type TSliderExtendedTestProps = React.ComponentProps<typeof SliderExtended> & {
    value?: number;
    onChange?: (value: number) => void;
};

const renderSliderExtended = (props?: Partial<TSliderExtendedTestProps>) =>
    render(
        <SliderExtended min={0} max={10} step={1} size={EComponentSize.MD} {...props}>
            <SliderExtended.Rail />
            <SliderExtended.Dot value={props?.value ?? 2} onChange={props?.onChange ?? vi.fn()}>
                Dot
            </SliderExtended.Dot>
            <SliderExtended.Track />
        </SliderExtended>,
    );

describe("SliderExtended", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders container, dot and track", async () => {
        vi.stubEnv("npm_package_version", "1.0.0-test");
        const { container } = renderSliderExtended();
        const sliderRoot = await waitFor(() => container.querySelector("[data-tx]"));
        expect(sliderRoot).toBeInTheDocument();
        expect(await screen.findByRole("slider")).toBeInTheDocument();
        expect(await screen.findByRole("button")).toBeInTheDocument();
    });

    it("updates dot value on rerender", async () => {
        const onChange = vi.fn();
        const { rerender } = render(
            <SliderExtended min={0} max={10} size={EComponentSize.MD} step={1}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={2} onChange={onChange} />
                <SliderExtended.Track />
            </SliderExtended>,
        );

        await waitFor(() => expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "2"));

        rerender(
            <SliderExtended min={0} max={10} size={EComponentSize.MD} step={1}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={8} onChange={onChange} />
                <SliderExtended.Track />
            </SliderExtended>,
        );

        await waitFor(() => expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "8"));
    });

    it("positions dot from the end when reverse is true", async () => {
        renderSliderExtended({ reverse: true, value: 2 });

        const dot = await screen.findByRole("slider");
        await waitFor(() => expect(dot).toHaveStyle({ left: "80%" }));
    });
});
