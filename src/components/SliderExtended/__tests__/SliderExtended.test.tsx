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

    it("applies size class for LG size", () => {
        const { container } = renderSliderExtended({ size: EComponentSize.LG });

        expect(container.querySelector("[data-tx]")).toHaveClass("sliderExtended", "lg");
    });

    it("does not apply LG class for MD size", () => {
        const { container } = renderSliderExtended({ size: EComponentSize.MD });

        expect(container.querySelector("[data-tx]")).not.toHaveClass("lg");
    });

    it("applies disabled class to the slider and its parts", () => {
        const { container } = renderSliderExtended({ disabled: true });

        expect(container.querySelector("[data-tx]")).toHaveClass("disabled");
        expect(screen.getByRole("slider")).toHaveClass("disabled");
        expect(screen.getByRole("button")).toHaveClass("disabled");
    });

    it("merges className into the root element", () => {
        const { container } = renderSliderExtended({ className: "custom-slider" });

        expect(container.querySelector("[data-tx]")).toHaveClass("sliderExtended", "custom-slider");
    });

    it("passes rest attributes to the root element", () => {
        const { container } = renderSliderExtended({ id: "slider-id", "aria-label": "Сумма" });
        const sliderRoot = container.querySelector("[data-tx]");

        expect(sliderRoot).toHaveAttribute("id", "slider-id");
        expect(sliderRoot).toHaveAttribute("aria-label", "Сумма");
    });

    it("forwards ref to the root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <SliderExtended min={0} max={10} step={1} size={EComponentSize.MD} ref={ref}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={2} onChange={vi.fn()} />
            </SliderExtended>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("sliderExtended");
    });

    it("renders nothing when step array is empty", () => {
        const { container } = renderSliderExtended({ step: [] });

        expect(container).toBeEmptyDOMElement();
    });

    it("builds steps from the step array", () => {
        render(
            <SliderExtended min={0} max={100} step={[0, 25, 50, 75, 100]} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={50} onChange={vi.fn()} />
            </SliderExtended>,
        );

        expect(screen.getByRole("slider")).toHaveStyle({ left: "50%" });
    });

    it("removes unmounted dot from the slider state", () => {
        const { rerender, container } = render(
            <SliderExtended min={0} max={10} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Dot value={2} onChange={vi.fn()} />
                <SliderExtended.Track />
            </SliderExtended>,
        );

        expect(screen.getByRole("button")).toBeInTheDocument();

        rerender(
            <SliderExtended min={0} max={10} step={1} size={EComponentSize.MD}>
                <SliderExtended.Rail />
                <SliderExtended.Track />
            </SliderExtended>,
        );

        // Track не рендерится, пока в слайдере нет ни одного ползунка.
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(container.querySelector("[data-tx]")).toBeInTheDocument();
    });
});
