import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { ECarouselOrientation, ECarouselScrollMode } from "../enums";
import { getResizeCallback, resetResizeCallback, mockElementSize } from "./utils";

interface ITestCarouselProps {
    orientation?: ECarouselOrientation;
    scrollMode?: ECarouselScrollMode;
    gap?: number;
    slideSizes?: number[];
    viewportSize?: number;
}

const TestCarousel: React.FC<ITestCarouselProps> = ({
    orientation = ECarouselOrientation.HORIZONTAL,
    scrollMode = ECarouselScrollMode.ITEM,
    gap = 16,
    slideSizes = [100, 100, 100],
    viewportSize = 500,
}) => {
    const horizontal = orientation === ECarouselOrientation.HORIZONTAL;
    return (
        <Carousel orientation={orientation} scrollMode={scrollMode} gap={gap}>
            <Carousel.Viewport
                data-testid="viewport"
                ref={(n) =>
                    n &&
                    mockElementSize(n, {
                        clientWidth: horizontal ? viewportSize : 0,
                        clientHeight: horizontal ? 0 : viewportSize,
                    })
                }
            >
                <Carousel.Track data-testid="track">
                    {slideSizes.map((size, index) => (
                        <Carousel.Item
                            key={index}
                            index={index}
                            ref={(n) =>
                                n && mockElementSize(n, { width: horizontal ? size : 0, height: horizontal ? 0 : size })
                            }
                        >
                            {index + 1}
                        </Carousel.Item>
                    ))}
                </Carousel.Track>
                <Carousel.PrevButton data-testid="prev-btn" />
                <Carousel.NextButton data-testid="next-btn" />
            </Carousel.Viewport>
            <Carousel.Indicators />
        </Carousel>
    );
};

describe("CarouselRoot (Core & Math Logic)", () => {
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

    it("should render core DOM structure successfully", () => {
        render(<TestCarousel />);
        expect(screen.getByTestId("viewport")).toBeInTheDocument();
        expect(screen.getByTestId("track")).toBeInTheDocument();

        const slides = screen.getAllByRole("group");
        expect(slides.at(0)).toHaveTextContent("1");
    });

    describe("Navigation and Layout Mathematics", () => {
        it.each([
            {
                name: "disable buttons when content fits inside viewport",
                sizes: [100, 100, 100],
                mode: ECarouselScrollMode.ITEM,
                orient: ECarouselOrientation.HORIZONTAL,
                viewSize: 500,
                expectNextDisabled: true,
            },
            {
                name: "enable next button when content overflows",
                sizes: [300, 300, 300],
                mode: ECarouselScrollMode.ITEM,
                orient: ECarouselOrientation.HORIZONTAL,
                viewSize: 500,
                expectNextDisabled: false,
            },
            {
                name: "scroll within a huge slide on next click",
                sizes: [800],
                mode: ECarouselScrollMode.ITEM,
                orient: ECarouselOrientation.HORIZONTAL,
                viewSize: 500,
                expectNextDisabled: false,
            },
            {
                name: "group elements into centered pages in PAGE mode",
                sizes: [200, 200, 200, 200],
                mode: ECarouselScrollMode.PAGE,
                orient: ECarouselOrientation.HORIZONTAL,
                viewSize: 450,
                expectNextDisabled: false,
            },
            {
                name: "handle height dimensions in VERTICAL orientation",
                sizes: [300, 300, 300],
                mode: ECarouselScrollMode.ITEM,
                orient: ECarouselOrientation.VERTICAL,
                viewSize: 400,
                expectNextDisabled: false,
            },
        ])("should $name", ({ sizes, mode, orient, viewSize, expectNextDisabled }) => {
            render(<TestCarousel slideSizes={sizes} scrollMode={mode} orientation={orient} viewportSize={viewSize} />);
            act(() => getResizeCallback()?.());

            const nextBtn = screen.getByTestId("next-btn");
            if (expectNextDisabled) {
                expect(nextBtn).toHaveAttribute("aria-disabled", "true");
            } else {
                expect(nextBtn).toHaveAttribute("aria-disabled", "false");
                fireEvent.click(nextBtn);
                expect(screen.getByTestId("prev-btn")).toHaveAttribute("aria-disabled", "false");
            }
        });
    });

    describe("Responsiveness and Cleanup", () => {
        it("should recalculate offsets on ResizeObserver trigger", () => {
            const { rerender } = render(<TestCarousel slideSizes={[100, 100, 100]} viewportSize={500} />);
            act(() => getResizeCallback()?.());
            expect(screen.getByTestId("next-btn")).toHaveAttribute("aria-disabled", "true");

            rerender(<TestCarousel slideSizes={[100, 100, 100]} viewportSize={200} />);
            act(() => getResizeCallback()?.());
            expect(screen.getByTestId("next-btn")).toHaveAttribute("aria-disabled", "false");
        });

        it("should reset state completely when all slides are dynamically removed", () => {
            const { rerender } = render(<TestCarousel slideSizes={[300, 300, 300]} viewportSize={500} />);
            act(() => getResizeCallback()?.());
            expect(screen.getByTestId("next-btn")).toHaveAttribute("aria-disabled", "false");

            rerender(<TestCarousel slideSizes={[]} viewportSize={500} />);
            act(() => getResizeCallback()?.());
            expect(screen.getByTestId("next-btn")).toHaveAttribute("aria-disabled", "true");
        });

        it("should clear scheduled requestAnimationFrame on unmount", () => {
            const cancelSpy = vi.spyOn(window, "cancelAnimationFrame");
            vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 123);

            const { rerender, unmount } = render(
                <TestCarousel
                    scrollMode={ECarouselScrollMode.PAGE}
                    slideSizes={[150, 150, 150, 150, 150, 150]}
                    viewportSize={500}
                />,
            );

            act(() => getResizeCallback()?.());
            fireEvent.click(screen.getByTestId("next-btn"));

            rerender(<TestCarousel scrollMode={ECarouselScrollMode.PAGE} slideSizes={[150]} viewportSize={500} />);
            act(() => getResizeCallback()?.());

            unmount();
            expect(cancelSpy).toHaveBeenCalledWith(123);
        });
    });
});
