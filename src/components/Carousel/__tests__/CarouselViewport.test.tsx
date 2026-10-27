import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Carousel } from "../Carousel";
import { CarouselContext, ICarouselContext } from "../CarouselContext";
import { ICarouselViewportProps } from "../types";
import { ECarouselScrollMode } from "../enums";
import { EOrientation } from "../../../enums";
import { createTouch, createTouchList, ITouchCoords } from "../../../../test-utils/dom";

interface IViewportFixtureProps {
    context: ICarouselContext;
    viewportProps?: ICarouselViewportProps & React.RefAttributes<HTMLDivElement>;
}

interface IViewportStyle extends React.CSSProperties {
    "--triplex-next-runtime-carousel-viewport-padding": string;
}

const createCarouselContext = (orientation = EOrientation.HORIZONTAL): ICarouselContext => ({
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

const createTouches = (coords: ITouchCoords) => createTouchList([createTouch(screen.getByTestId("viewport"), coords)]);

const touchStart = (coords: ITouchCoords) => {
    fireEvent.touchStart(screen.getByTestId("viewport"), { targetTouches: createTouches(coords) });
};

/** Отправляет touchmove на window и возвращает событие для проверки `defaultPrevented`. */
const touchMove = (coords: ITouchCoords, cancelable = true) => {
    const event = new TouchEvent("touchmove", { cancelable, targetTouches: createTouches(coords) });
    fireEvent(window, event);
    return event;
};

/** Координаты касания: `main` — вдоль оси карусели, `cross` — поперёк неё. */
const axisCoords = (orientation: EOrientation, main: number, cross: number): ITouchCoords =>
    orientation === EOrientation.HORIZONTAL ? { clientX: main, clientY: cross } : { clientX: cross, clientY: main };

/** Начинает drag и возвращает проверку, что все установленные window listeners сняты. */
const startDrag = () => {
    const addListener = vi.spyOn(window, "addEventListener");
    const removeListener = vi.spyOn(window, "removeEventListener");
    touchStart({ clientX: 100 });
    touchMove({ clientX: 20 });
    const listeners = addListener.mock.calls.filter(([type]) =>
        ["touchmove", "touchend", "touchcancel"].includes(type),
    );
    expect(listeners).toHaveLength(3);
    expect(addListener).toHaveBeenCalledWith("touchmove", expect.any(Function), { passive: false });

    return () => listeners.forEach(([type, handler]) => expect(removeListener).toHaveBeenCalledWith(type, handler));
};

describe("Carousel.Viewport", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("merges refs and HTML props while keeping the context padding above custom runtime styles", () => {
        const context = createCarouselContext();
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

    it("calls the current onTouchStart after subscribing to the gesture", () => {
        const context = createCarouselContext();
        const firstHandler = vi.fn();
        const addListener = vi.spyOn(window, "addEventListener");
        // Состояние снимается в момент вызова: assertion внутри React-обработчика не роняет тест.
        let subscribedAtCall = false;
        const currentHandler = vi.fn(() => {
            subscribedAtCall = addListener.mock.calls.some(([type]) => type === "touchmove");
        });
        const { rerender } = render(
            <ViewportFixture context={context} viewportProps={{ onTouchStart: firstHandler }} />,
        );
        rerender(<ViewportFixture context={context} viewportProps={{ onTouchStart: currentHandler }} />);

        touchStart({ clientX: 100 });
        expect(firstHandler).not.toHaveBeenCalled();
        expect(currentHandler).toHaveBeenCalledExactlyOnceWith(
            expect.objectContaining({ type: "touchstart", target: screen.getByTestId("viewport") }),
        );
        expect(subscribedAtCall).toBe(true);
        fireEvent.touchCancel(window);
    });

    it("calls onTouchStart without starting a gesture for an empty touch list", () => {
        const addListener = vi.spyOn(window, "addEventListener");
        const onTouchStart = vi.fn();
        render(<ViewportFixture context={createCarouselContext()} viewportProps={{ onTouchStart }} />);

        fireEvent.touchStart(screen.getByTestId("viewport"), { targetTouches: createTouchList([]) });

        expect(onTouchStart).toHaveBeenCalledOnce();
        expect(addListener.mock.calls.some(([type]) => type === "touchmove")).toBe(false);
    });

    it.each(
        [EOrientation.HORIZONTAL, EOrientation.VERTICAL].flatMap((orientation) => [
            { orientation, distance: 50, previous: 0, next: 0 },
            { orientation, distance: -50, previous: 0, next: 0 },
            { orientation, distance: 51, previous: 1, next: 0 },
            { orientation, distance: -51, previous: 0, next: 1 },
        ]),
    )(
        "uses a strict 50px navigation threshold ($orientation, $distance)",
        ({ orientation, distance, previous, next }) => {
            const context = createCarouselContext(orientation);
            render(<ViewportFixture context={context} />);
            touchStart({ clientX: 100, clientY: 100 });
            touchMove(axisCoords(orientation, 100 + distance, 100));
            fireEvent.touchEnd(window);

            expect(context.prevSlide).toHaveBeenCalledTimes(previous);
            expect(context.nextSlide).toHaveBeenCalledTimes(next);
        },
    );

    it.each([EOrientation.HORIZONTAL, EOrientation.VERTICAL])(
        "hands a cross-axis gesture over to page scrolling and drops the non-passive touchmove listener (%s)",
        (orientation) => {
            const addListener = vi.spyOn(window, "addEventListener");
            const removeListener = vi.spyOn(window, "removeEventListener");
            const context = createCarouselContext(orientation);
            render(<ViewportFixture context={context} />);
            const { style } = screen.getByTestId("track");
            touchStart({ clientX: 100, clientY: 100 });
            const touchMoveHandler = addListener.mock.calls.find(([type]) => type === "touchmove")?.[1];
            expect(touchMoveHandler).toEqual(expect.any(Function));

            touchMove(axisCoords(orientation, 97, 104));
            expect(removeListener).not.toHaveBeenCalledWith("touchmove", touchMoveHandler);

            expect(touchMove(axisCoords(orientation, 97, 120)).defaultPrevented).toBe(false);
            expect(removeListener).toHaveBeenCalledWith("touchmove", touchMoveHandler);
            expect(removeListener).not.toHaveBeenCalledWith("touchend", expect.any(Function));
            expect(style.transition).toBe("");

            expect(touchMove(axisCoords(orientation, 20, 120)).defaultPrevented).toBe(false);
            expect(style.transform).toBe("");
            fireEvent.touchEnd(window);

            expect(context.nextSlide).not.toHaveBeenCalled();
            expect(context.prevSlide).not.toHaveBeenCalled();
        },
    );

    it("waits for movement beyond 5px to lock an axis and cancels only cancelable main-axis moves", () => {
        const context = createCarouselContext();
        render(<ViewportFixture context={context} />);
        const { style } = screen.getByTestId("track");
        touchStart({ clientX: 100, clientY: 100 });

        expect(touchMove({ clientX: 95, clientY: 105 }).defaultPrevented).toBe(false);
        expect(style.transform).toBe("");
        expect(style.transition).toBe("");

        expect(touchMove({ clientX: 40, clientY: 105 }).defaultPrevented).toBe(true);
        expect(style.transform).toBe("translateX(-60px)");
        expect(style.transition).toBe("none");

        const preventDefault = vi.spyOn(TouchEvent.prototype, "preventDefault");
        touchMove({ clientX: 30, clientY: 105 }, false);
        expect(preventDefault).not.toHaveBeenCalled();
        expect(style.transform).toBe("translateX(-70px)");
        fireEvent.touchEnd(window);
        expect(context.nextSlide).toHaveBeenCalledExactlyOnceWith();
    });

    it("reads current orientation, offset and boundaries for a subsequent gesture", () => {
        const context = createCarouselContext();
        render(<ViewportFixture context={context} />);
        touchStart({ clientX: 100 });
        touchMove({ clientX: 40 });
        fireEvent.touchEnd(window);
        expect(context.nextSlide).toHaveBeenCalledOnce();

        context.orientationRef.current = EOrientation.VERTICAL;
        context.offsetRef.current = 120;
        context.maxOffsetRef.current = 150;
        touchStart({ clientX: 100, clientY: 100 });
        touchMove({ clientX: 100, clientY: 40 });

        // Целевое смещение 180px выходит за границу 150px: оставшиеся 30px уменьшаются втрое.
        expect(screen.getByTestId("track").style.transform).toBe("translateY(-160px)");
        fireEvent.touchEnd(window);
        expect(context.nextSlide).toHaveBeenCalledTimes(2);
    });

    it("uses the navigation callbacks current at touchend when the parent re-renders mid-gesture", () => {
        const context = createCarouselContext();
        const { rerender } = render(<ViewportFixture context={context} />);
        touchStart({ clientX: 100 });
        touchMove({ clientX: 40 });

        const nextSlide = vi.fn();
        rerender(<ViewportFixture context={{ ...context, nextSlide }} />);
        fireEvent.touchEnd(window);

        expect(nextSlide).toHaveBeenCalledExactlyOnceWith();
        expect(context.nextSlide).not.toHaveBeenCalled();
    });

    it("applies one-third resistance beyond the start boundary", () => {
        const context = createCarouselContext();
        context.offsetRef.current = 100;
        render(<ViewportFixture context={context} />);
        touchStart({ clientX: 100 });
        touchMove({ clientX: 260 });

        expect(screen.getByTestId("track").style.transform).toBe("translateX(20px)");
        fireEvent.touchCancel(window);
        expect(context.prevSlide).not.toHaveBeenCalled();
    });

    it.each([
        { type: "touchend", next: 1 },
        { type: "touchcancel", next: 0 },
    ])("removes the window listeners and resets inline track styles on $type", ({ type, next }) => {
        const context = createCarouselContext();
        render(<ViewportFixture context={context} />);
        const expectListenersRemoved = startDrag();

        fireEvent(window, new TouchEvent(type));

        const { style } = screen.getByTestId("track");
        expectListenersRemoved();
        expect(style.transform).toBe("");
        expect(style.transition).toBe("");
        expect(context.nextSlide).toHaveBeenCalledTimes(next);
    });

    it("removes the previous gesture listeners on restart without navigating", () => {
        const context = createCarouselContext();
        render(<ViewportFixture context={context} />);
        const expectListenersRemoved = startDrag();

        touchStart({ clientX: 80 });
        expectListenersRemoved();

        fireEvent.touchEnd(window);
        expect(context.nextSlide).not.toHaveBeenCalled();
    });

    it("removes the active window listeners on unmount", () => {
        const context = createCarouselContext();
        const { unmount } = render(<ViewportFixture context={context} />);
        const expectListenersRemoved = startDrag();

        unmount();

        expectListenersRemoved();
        expect(context.nextSlide).not.toHaveBeenCalled();
    });
});
