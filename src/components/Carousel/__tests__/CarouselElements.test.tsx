import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { ICarouselViewportProps } from "../types";
import { ECarouselScrollMode } from "../enums";
import {
    getResizeCallback,
    resetResizeCallback,
    mockElementSize,
    createTouch,
    createTouchList,
} from "../../../../test-utils/dom";

interface ITestProps {
    slideSizes?: number[];
    onTouchStart?: ICarouselViewportProps["onTouchStart"];
}

const ElementsTestCarousel: React.FC<ITestProps> = ({ slideSizes = [300, 300, 300], onTouchStart }) => (
    <Carousel gap={16}>
        <Carousel.Viewport
            data-testid="viewport"
            onTouchStart={onTouchStart}
            ref={(n) => n && mockElementSize(n, { clientWidth: 500 })}
        >
            <Carousel.Track data-testid="track">
                {slideSizes.map((s, i) => (
                    <Carousel.Item key={i} index={i} ref={(n) => n && mockElementSize(n, { width: s })}>
                        {i + 1}
                    </Carousel.Item>
                ))}
            </Carousel.Track>
            <Carousel.PrevButton data-testid="prev-btn" />
            <Carousel.NextButton data-testid="next-btn" />
        </Carousel.Viewport>
    </Carousel>
);

describe("Carousel Elements (Viewport, Track, Item)", () => {
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

    describe("CarouselViewport (Touch Gestures)", () => {
        it("should call custom onTouchStart prop", () => {
            const cb = vi.fn();
            render(<ElementsTestCarousel onTouchStart={cb} />);

            fireEvent.touchStart(screen.getByTestId("viewport"), {
                targetTouches: createTouchList([createTouch(screen.getByTestId("viewport"), 0)]),
            });
            expect(cb).toHaveBeenCalledTimes(1);
        });

        it.each([
            {
                name: "swipe left past 50px",
                startX: 200,
                moveX: 100,
                canceled: false,
                clickNext: false,
                expectedDisabled: false,
            },
            {
                name: "swipe right past 50px",
                startX: 100,
                moveX: 200,
                canceled: false,
                clickNext: true,
                expectedDisabled: true,
            },
            {
                name: "swipe short of 50px",
                startX: 200,
                moveX: 170,
                canceled: false,
                clickNext: false,
                expectedDisabled: true,
            },
            {
                name: "touchcancel event",
                startX: 200,
                moveX: 100,
                canceled: true,
                clickNext: false,
                expectedDisabled: true,
            },
        ])("should handle $name properly", ({ startX, moveX, canceled, clickNext, expectedDisabled }) => {
            render(<ElementsTestCarousel />);
            act(() => getResizeCallback()?.());

            const v = screen.getByTestId("viewport");
            if (clickNext) {
                fireEvent.click(screen.getByTestId("next-btn"));
            }

            fireEvent.touchStart(v, {
                targetTouches: createTouchList([createTouch(v, startX)]),
            });
            fireEvent.touchMove(window, {
                targetTouches: createTouchList([createTouch(v, moveX)]),
            });

            if (canceled) {
                fireEvent.touchCancel(window);
                expect(screen.getByTestId("track").style.transform).toBe("");
            } else {
                fireEvent.touchEnd(window);
            }

            const prevBtn = screen.getByTestId("prev-btn");
            expect(prevBtn).toHaveAttribute("aria-disabled", expectedDisabled ? "true" : "false");
        });

        it("should apply rubber-band resistance when dragging past boundaries", () => {
            render(<ElementsTestCarousel slideSizes={[300, 300, 300]} />);
            act(() => getResizeCallback()?.());

            const v = screen.getByTestId("viewport");
            const t = screen.getByTestId("track");

            fireEvent.touchStart(v, {
                targetTouches: createTouchList([createTouch(v, 100)]),
            });
            fireEvent.touchMove(window, {
                targetTouches: createTouchList([createTouch(v, 200)]),
            });
            expect(t.style.transform).not.toBe("");
            fireEvent.touchEnd(window);

            fireEvent.click(screen.getByTestId("next-btn"));
            fireEvent.click(screen.getByTestId("next-btn"));

            fireEvent.touchStart(v, {
                targetTouches: createTouchList([createTouch(v, 300)]),
            });
            fireEvent.touchMove(window, {
                targetTouches: createTouchList([createTouch(v, 100)]),
            });
            expect(t.style.transform).not.toBe("");
        });

        it("should not prevent default browser scrolling when swiping vertically over a horizontal carousel", () => {
            render(<ElementsTestCarousel />);
            act(() => getResizeCallback()?.());
            const v = screen.getByTestId("viewport");

            fireEvent.touchStart(v, {
                targetTouches: createTouchList([createTouch(v, 200)]),
            });

            const touchMoveEvent = new TouchEvent("touchmove", {
                cancelable: true,
                bubbles: true,
                targetTouches: createTouchList([
                    {
                        identifier: Date.now(),
                        target: v,
                        clientX: 200,
                        clientY: 350,
                        pageX: 200,
                        pageY: 350,
                        screenX: 200,
                        screenY: 350,
                        force: 0,
                        radiusX: 0,
                        radiusY: 0,
                        rotationAngle: 0,
                    },
                ]),
            });

            const preventDefaultSpy = vi.spyOn(touchMoveEvent, "preventDefault");

            v.dispatchEvent(touchMoveEvent);
            fireEvent.touchEnd(v);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
    });

    describe("CarouselTrack (CSS Properties)", () => {
        it("should initial/update runtime CSS variables with explicit values", () => {
            render(<ElementsTestCarousel slideSizes={[400, 400, 400]} />);
            act(() => getResizeCallback()?.());

            const t = screen.getByTestId("track");
            expect(t).toHaveStyle({
                "--triplex-next-runtime-carousel-gap": "16px",
                "--triplex-next-runtime-carousel-transform": "translateX(0px)",
            });

            fireEvent.click(screen.getByTestId("next-btn"));
            expect(t).toHaveStyle({
                "--triplex-next-runtime-carousel-transform": "translateX(-316px)",
            });
        });

        it("should support direct object ref assignment for trackRef", () => {
            const trackRefObj = { current: null as HTMLDivElement | null };
            render(
                <Carousel>
                    <Carousel.Viewport>
                        <Carousel.Track ref={trackRefObj} />
                    </Carousel.Viewport>
                </Carousel>,
            );
            expect(trackRefObj.current).toBeInstanceOf(HTMLDivElement);
        });
    });

    describe("CarouselItem (Refs)", () => {
        it("should render list item with correct semantic role", () => {
            render(<ElementsTestCarousel />);

            const slides = screen.getAllByRole("group");
            expect(slides.at(0)).toBeInTheDocument();
            expect(slides).toHaveLength(3);
        });

        it("should handle function ref and object ref forwarding properly", () => {
            const refFn = vi.fn();
            const refObj = React.createRef<HTMLDivElement>();
            render(
                <Carousel>
                    <Carousel.Viewport>
                        <Carousel.Track>
                            <Carousel.Item index={0} ref={refFn}>
                                1
                            </Carousel.Item>
                            <Carousel.Item index={1} ref={refObj}>
                                2
                            </Carousel.Item>
                        </Carousel.Track>
                    </Carousel.Viewport>
                </Carousel>,
            );
            expect(refFn).toHaveBeenCalledWith(expect.any(HTMLDivElement));
            expect(refObj.current).toBeInstanceOf(HTMLDivElement);
        });

        it("should clean up old map registry when index prop changes dynamically", () => {
            const DynamicItemComponent = () => {
                const [idx, setIdx] = React.useState(0);
                return (
                    <Carousel scrollMode={ECarouselScrollMode.PAGE}>
                        <Carousel.Viewport ref={(n) => n && mockElementSize(n, { clientWidth: 500 })}>
                            <Carousel.Track>
                                <Carousel.Item index={idx} ref={(n) => n && mockElementSize(n, { width: 800 })}>
                                    Slide
                                </Carousel.Item>
                            </Carousel.Track>
                        </Carousel.Viewport>
                        <Carousel.Indicators />
                        <button data-testid="trigger-change" onClick={() => setIdx(5)}>
                            Change
                        </button>
                    </Carousel>
                );
            };

            render(<DynamicItemComponent />);
            act(() => getResizeCallback()?.());
            expect(screen.getAllByRole("tab")).toHaveLength(1);

            fireEvent.click(screen.getByTestId("trigger-change"));
            act(() => getResizeCallback()?.());
            expect(screen.getAllByRole("tab")).toHaveLength(1);
        });
    });
});
