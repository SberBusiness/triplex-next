import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { ICarouselViewportProps } from "../types";
import { ECarouselScrollMode } from "../enums";
import { EOrientation } from "../../../enums";
import { createTouch, createTouchList } from "../../../../test-utils/dom";

interface IViewportFixtureProps {
    context: ICarouselContext;
    viewportProps?: ICarouselViewportProps & React.RefAttributes<HTMLDivElement>;
}

interface IViewportStyle extends React.CSSProperties {
    "--triplex-next-runtime-carousel-viewport-padding": string;
}

const createContext = (orientation = EOrientation.HORIZONTAL): ICarouselContext => ({
    gap: 16,
    orientation,
    scrollMode: ECarouselScrollMode.ITEM,
    offset: 0,
    activeIndices: [],
    currentIndex: 0,
    viewportPaddingStyle: "8px 16px",
    atStart: false,
    atEnd: false,
    nextSlide: vi.fn(),
    prevSlide: vi.fn(),
    goToSlide: vi.fn(),
    orientationRef: { current: orientation },
    offsetRef: { current: 0 },
    maxOffsetRef: { current: 300 },
    viewportRef: { current: null },
    trackRef: { current: null },
    slideRefs: { current: new Map() },
});

const ViewportFixture = ({ context, viewportProps }: IViewportFixtureProps) => (
    <CarouselContext.Provider value={context}>
        <Carousel.Viewport data-testid="viewport" {...viewportProps}>
            <Carousel.Track data-testid="track">Slide content</Carousel.Track>
        </Carousel.Viewport>
    </CarouselContext.Provider>
);

const createTouches = (target: HTMLElement, clientX: number, clientY = 0) =>
    createTouchList([{ ...createTouch(target, clientX), clientY }]);

describe("Carousel.Viewport", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("merges refs and HTML props while keeping the context padding above custom runtime styles", () => {
        const context = createContext();
        const ref = React.createRef<HTMLDivElement>();
        const callbackRef = vi.fn();
        const style: IViewportStyle = {
            height: 180,
            "--triplex-next-runtime-carousel-viewport-padding": "99px",
        };
        const viewportProps = { ref, className: "custom-viewport", role: "region", "aria-label": "Cards", style };
        const { rerender, unmount } = render(<ViewportFixture context={context} viewportProps={viewportProps} />);

        const viewport = screen.getByRole("region", { name: "Cards" });
        expect(viewport).toBeInstanceOf(HTMLDivElement);
        expect(viewport).toHaveClass("viewPort", "custom-viewport");
        expect(viewport).toHaveTextContent("Slide content");
        expect(viewport).toHaveStyle({
            height: "180px",
            "--triplex-next-runtime-carousel-viewport-padding": "8px 16px",
        });
        expect(ref.current).toBe(viewport);
        expect(context.viewportRef.current).toBe(viewport);

        rerender(<ViewportFixture context={context} viewportProps={{ ...viewportProps, ref: callbackRef }} />);
        expect(ref.current).toBeNull();
        expect(callbackRef).toHaveBeenLastCalledWith(viewport);
        expect(context.viewportRef.current).toBe(viewport);

        unmount();
        expect(callbackRef).toHaveBeenLastCalledWith(null);
        expect(context.viewportRef.current).toBeNull();
    });

    it("calls the current onTouchStart after initializing the gesture and ignores an empty touch list", () => {
        const context = createContext();
        const firstHandler = vi.fn();
        const currentHandler = vi.fn((event: React.TouchEvent<HTMLDivElement>) => {
            expect(event.currentTarget).toBe(screen.getByTestId("viewport"));
            expect(screen.getByTestId("track").style.transition).toBe("none");
        });
        const { rerender } = render(
            <ViewportFixture context={context} viewportProps={{ onTouchStart: firstHandler }} />,
        );
        rerender(<ViewportFixture context={context} viewportProps={{ onTouchStart: currentHandler }} />);

        const viewport = screen.getByTestId("viewport");
        fireEvent.touchStart(viewport, { targetTouches: createTouchList([]) });
        expect(currentHandler).not.toHaveBeenCalled();

        fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100) });
        expect(firstHandler).not.toHaveBeenCalled();
        expect(currentHandler).toHaveBeenCalledExactlyOnceWith(expect.objectContaining({ type: "touchstart" }));
        fireEvent.touchCancel(window);
    });

    it.each([
        { orientation: EOrientation.HORIZONTAL, distance: 50, previous: 0, next: 0 },
        { orientation: EOrientation.HORIZONTAL, distance: -50, previous: 0, next: 0 },
        { orientation: EOrientation.VERTICAL, distance: 50, previous: 0, next: 0 },
        { orientation: EOrientation.VERTICAL, distance: -50, previous: 0, next: 0 },
        { orientation: EOrientation.VERTICAL, distance: 51, previous: 1, next: 0 },
        { orientation: EOrientation.VERTICAL, distance: -51, previous: 0, next: 1 },
    ])(
        "uses a strict 50px navigation threshold ($orientation, $distance)",
        ({ orientation, distance, previous, next }) => {
            const context = createContext(orientation);
            render(<ViewportFixture context={context} />);
            const viewport = screen.getByTestId("viewport");
            fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100, 100) });
            fireEvent.touchMove(window, {
                targetTouches:
                    orientation === EOrientation.HORIZONTAL
                        ? createTouches(viewport, 100 + distance, 100)
                        : createTouches(viewport, 100, 100 + distance),
            });
            fireEvent.touchEnd(window);

            expect(context.prevSlide).toHaveBeenCalledTimes(previous);
            expect(context.nextSlide).toHaveBeenCalledTimes(next);
            if (previous) expect(context.prevSlide).toHaveBeenCalledWith();
            if (next) expect(context.nextSlide).toHaveBeenCalledWith();
        },
    );

    it.each([EOrientation.HORIZONTAL, EOrientation.VERTICAL])(
        "keeps cross-axis page scrolling after locking the direction (%s)",
        (orientation) => {
            const context = createContext(orientation);
            render(<ViewportFixture context={context} />);
            const viewport = screen.getByTestId("viewport");
            fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100, 100) });

            const crossMove = new TouchEvent("touchmove", {
                cancelable: true,
                targetTouches:
                    orientation === EOrientation.HORIZONTAL
                        ? createTouches(viewport, 100, 120)
                        : createTouches(viewport, 120, 100),
            });
            fireEvent(window, crossMove);
            expect(crossMove.defaultPrevented).toBe(false);

            const laterMove = new TouchEvent("touchmove", {
                cancelable: true,
                targetTouches:
                    orientation === EOrientation.HORIZONTAL
                        ? createTouches(viewport, 20, 120)
                        : createTouches(viewport, 120, 20),
            });
            fireEvent(window, laterMove);
            expect(laterMove.defaultPrevented).toBe(false);
            expect(screen.getByTestId("track").style.transform).toBe("");
            fireEvent.touchEnd(window);

            expect(context.nextSlide).not.toHaveBeenCalled();
            expect(context.prevSlide).not.toHaveBeenCalled();
            expect(screen.getByTestId("track").style.transition).toBe("");
        },
    );

    it("waits for movement beyond 5px to lock an axis and cancels only cancelable main-axis moves", () => {
        const context = createContext();
        render(<ViewportFixture context={context} />);
        const viewport = screen.getByTestId("viewport");
        fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100, 100) });
        fireEvent.touchMove(window, { targetTouches: createTouches(viewport, 100, 105) });

        const mainMove = new TouchEvent("touchmove", {
            cancelable: true,
            targetTouches: createTouches(viewport, 40, 105),
        });
        fireEvent(window, mainMove);
        expect(mainMove.defaultPrevented).toBe(true);
        expect(screen.getByTestId("track").style.transform).toBe("translateX(-60px)");

        const nonCancelableMove = new TouchEvent("touchmove", {
            cancelable: false,
            targetTouches: createTouches(viewport, 30, 105),
        });
        const preventDefault = vi.spyOn(nonCancelableMove, "preventDefault");
        fireEvent(window, nonCancelableMove);
        expect(preventDefault).not.toHaveBeenCalled();
        expect(screen.getByTestId("track").style.transform).toBe("translateX(-70px)");
        fireEvent.touchEnd(window);
        expect(context.nextSlide).toHaveBeenCalledExactlyOnceWith();
    });

    it("reads current orientation, offset, boundaries and navigation for a subsequent gesture", () => {
        const context = createContext();
        const { rerender } = render(<ViewportFixture context={context} />);
        const viewport = screen.getByTestId("viewport");
        fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100) });
        fireEvent.touchMove(window, { targetTouches: createTouches(viewport, 40) });
        fireEvent.touchEnd(window);
        expect(context.nextSlide).toHaveBeenCalledExactlyOnceWith();

        context.orientationRef.current = EOrientation.VERTICAL;
        context.offsetRef.current = 120;
        context.maxOffsetRef.current = 150;
        const nextSlide = vi.fn();
        const nextContext = { ...context, orientation: EOrientation.VERTICAL, nextSlide };
        rerender(<ViewportFixture context={nextContext} />);
        fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100, 100) });
        fireEvent.touchMove(window, { targetTouches: createTouches(viewport, 100, 40) });

        // Целевое смещение 180px выходит за границу 150px: оставшиеся 30px уменьшаются втрое.
        expect(screen.getByTestId("track").style.transform).toBe("translateY(-160px)");
        fireEvent.touchEnd(window);
        expect(nextSlide).toHaveBeenCalledExactlyOnceWith();
        expect(context.nextSlide).toHaveBeenCalledTimes(1);
    });

    it("applies one-third resistance beyond the start boundary", () => {
        const context = createContext();
        context.offsetRef.current = 100;
        render(<ViewportFixture context={context} />);
        const viewport = screen.getByTestId("viewport");
        fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100) });
        fireEvent.touchMove(window, { targetTouches: createTouches(viewport, 260) });

        expect(screen.getByTestId("track").style.transform).toBe("translateX(20px)");
        fireEvent.touchCancel(window);
        expect(context.prevSlide).not.toHaveBeenCalled();
    });

    it.each(["touchend", "touchcancel", "restart", "unmount"])(
        "removes the active window listeners on %s",
        (finish) => {
            const context = createContext();
            const addListener = vi.spyOn(window, "addEventListener");
            const removeListener = vi.spyOn(window, "removeEventListener");
            const { unmount } = render(<ViewportFixture context={context} />);
            const viewport = screen.getByTestId("viewport");
            const track = screen.getByTestId("track");
            fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 100) });
            fireEvent.touchMove(window, { targetTouches: createTouches(viewport, 20) });
            const listeners = addListener.mock.calls.filter(([type]) =>
                ["touchmove", "touchend", "touchcancel"].includes(type),
            );
            expect(listeners).toHaveLength(3);
            expect(addListener).toHaveBeenCalledWith("touchmove", expect.any(Function), { passive: false });

            if (finish === "unmount") {
                unmount();
            } else if (finish === "restart") {
                fireEvent.touchStart(viewport, { targetTouches: createTouches(viewport, 80) });
            } else {
                fireEvent(window, new TouchEvent(finish));
                expect(track.style.transform).toBe("");
                expect(track.style.transition).toBe("");
            }

            listeners.forEach(([type, handler]) => expect(removeListener).toHaveBeenCalledWith(type, handler));
            if (finish === "touchend") {
                expect(context.nextSlide).toHaveBeenCalledExactlyOnceWith();
            } else {
                expect(context.nextSlide).not.toHaveBeenCalled();
            }

            if (finish === "restart") {
                fireEvent.touchEnd(window);
                expect(context.nextSlide).not.toHaveBeenCalled();
            }
        },
    );
});
