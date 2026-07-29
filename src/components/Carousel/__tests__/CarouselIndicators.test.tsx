import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { ECarouselOrientation, ECarouselScrollMode } from "../enums";
import { TCarouselViewportPadding, ICarouselIndicatorsProps } from "../types";
import { getResizeCallback, resetResizeCallback, mockElementSize } from "./utils";

interface IWrapperProps {
    scrollMode?: ECarouselScrollMode;
    orientation?: ECarouselOrientation;
    renderIndicator?: ICarouselIndicatorsProps["renderIndicator"];
    indicatorProps?: ICarouselIndicatorsProps["indicatorProps"];
    viewportPadding?: TCarouselViewportPadding;
    onKeyDown?: ICarouselIndicatorsProps["onKeyDown"];
}

const IndicatorsTestWrapper: React.FC<IWrapperProps> = ({
    scrollMode = ECarouselScrollMode.PAGE,
    orientation = ECarouselOrientation.HORIZONTAL,
    renderIndicator,
    indicatorProps,
    viewportPadding,
    onKeyDown,
}) => (
    <Carousel scrollMode={scrollMode} orientation={orientation} gap={10} viewportPadding={viewportPadding}>
        <Carousel.Viewport ref={(n) => n && mockElementSize(n, { width: 300, clientWidth: 300 })}>
            <Carousel.Track>
                {[150, 150, 150, 150].map((size, idx) => (
                    <Carousel.Item key={idx} index={idx} ref={(n) => n && mockElementSize(n, { width: size })} />
                ))}
            </Carousel.Track>
        </Carousel.Viewport>
        <Carousel.Indicators renderIndicator={renderIndicator} indicatorProps={indicatorProps} onKeyDown={onKeyDown} />
    </Carousel>
);

describe("CarouselIndicators Component", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
            cb(0);
            return 0;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
        resetResizeCallback();
    });

    it("should return null and not render anything in ITEM mode", () => {
        render(<IndicatorsTestWrapper scrollMode={ECarouselScrollMode.ITEM} />);
        act(() => getResizeCallback()?.());
        expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("should render correct number of indicators with WAI-ARIA tab attributes", () => {
        render(<IndicatorsTestWrapper scrollMode={ECarouselScrollMode.PAGE} />);
        act(() => getResizeCallback()?.());

        const list = screen.getByRole("tablist");
        expect(list).toBeInTheDocument();
        expect(list).toHaveAttribute("role", "tablist");

        const indicators = screen.getAllByRole("tab");
        expect(indicators).toHaveLength(4);
        expect(indicators.at(0)).toHaveAttribute("aria-selected", "true");
        expect(indicators.at(0)).toHaveAttribute("tabIndex", "0");
        expect(indicators.at(1)).toHaveAttribute("aria-selected", "false");
        expect(indicators.at(1)).toHaveAttribute("tabIndex", "-1");
    });

    it("should switch current slide index when an indicator tab is clicked", () => {
        render(<IndicatorsTestWrapper />);
        act(() => getResizeCallback()?.());

        const indicators = screen.getAllByRole("tab");
        fireEvent.click(indicators.at(2)!);

        expect(indicators.at(2)).toHaveAttribute("aria-selected", "true");
        expect(indicators.at(0)).toHaveAttribute("aria-selected", "false");
    });

    describe("Keyboard Accessibility (onKeyDown)", () => {
        it.each([
            { key: "ArrowRight", startIndex: 0, expectedIndex: 1 },
            { key: "ArrowRight", startIndex: 3, expectedIndex: 0 },
            { key: "ArrowLeft", startIndex: 0, expectedIndex: 3 },
            { key: "End", startIndex: 0, expectedIndex: 3 },
            { key: "Home", startIndex: 3, expectedIndex: 0 },
        ])(
            "should navigate to index $expectedIndex and invoke callback when pressing $key",
            ({ key, startIndex, expectedIndex }) => {
                const onKeyDownMock = vi.fn();
                render(
                    <IndicatorsTestWrapper orientation={ECarouselOrientation.HORIZONTAL} onKeyDown={onKeyDownMock} />,
                );
                act(() => getResizeCallback()?.());

                const indicators = screen.getAllByRole("tab");
                const list = screen.getByRole("tablist");

                fireEvent.click(indicators.at(startIndex)!);
                fireEvent.keyDown(list, { key });

                expect(indicators.at(expectedIndex)).toHaveAttribute("aria-selected", "true");
                expect(onKeyDownMock).toHaveBeenCalledTimes(1);
            },
        );

        it("should invoke custom onKeyDown callback for unhandled keys like Enter", () => {
            const onKeyDownMock = vi.fn();
            render(<IndicatorsTestWrapper onKeyDown={onKeyDownMock} />);
            act(() => getResizeCallback()?.());

            const list = screen.getByRole("tablist");
            fireEvent.keyDown(list, { key: "Enter" });

            expect(onKeyDownMock).toHaveBeenCalledTimes(1);
            expect(onKeyDownMock).toHaveBeenCalledWith(expect.objectContaining({ key: "Enter" }));
        });
    });

    describe("Dynamic Callbacks and Layout Customisation", () => {
        it("should evaluate dynamic factory function passed to indicatorProps", () => {
            const mockFactory = vi.fn(() => ({ "data-custom": "test-attr", className: "custom-class" }));
            render(<IndicatorsTestWrapper indicatorProps={mockFactory} />);
            act(() => getResizeCallback()?.());

            const indicators = screen.getAllByRole("tab");
            expect(mockFactory).toHaveBeenCalled();
            expect(indicators.at(0)).toHaveAttribute("data-custom", "test-attr");
            expect(indicators.at(0)).toHaveClass("custom-class");
        });

        it("should support structured layout customisation through renderIndicator prop", () => {
            const spyRender = vi.fn(({ page, props, ref }) => (
                <button {...props} ref={ref}>
                    Page {page}
                </button>
            ));
            render(<IndicatorsTestWrapper renderIndicator={spyRender} />);
            act(() => getResizeCallback()?.());

            expect(spyRender).toHaveBeenCalled();

            const tabs = screen.getAllByRole("tab");
            expect(tabs.at(0)).toBeInTheDocument();
            expect(tabs.at(0)).toHaveTextContent("Page 1");
        });
    });
});
