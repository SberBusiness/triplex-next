import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { createTouch, createTouchList, mockElementSize } from "../../../../test-utils/dom";
import { ISwipeableAreaProps, ISwipeableAreaRef, SwipeableArea } from "../SwipeableArea";

const LEFT_AREA_WIDTH = 80;
const RIGHT_AREA_WIDTH = 100;

/** Touch с произвольными координатами. */
const createTouchAt = (target: HTMLElement, clientX: number, clientY: number): Touch => ({
    ...createTouch(target, clientX),
    clientY,
});

/** Элемент, внутри которого отрисован переданный контент. */
const getParent = (element: HTMLElement): HTMLElement => {
    const { parentElement } = element;

    if (!parentElement) {
        throw new Error("Родительский элемент не найден.");
    }

    return parentElement;
};

const getContent = () => getParent(screen.getByTestId("content"));

describe("SwipeableArea", () => {
    const renderSwipeableArea = (props: Partial<ISwipeableAreaProps> = {}, ref?: React.Ref<ISwipeableAreaRef>) => {
        const result = render(
            <SwipeableArea
                data-testid="swipeable-area"
                leftSwipeableArea={<div data-testid="left-area">Левая область</div>}
                rightSwipeableArea={<div data-testid="right-area">Правая область</div>}
                ref={ref}
                {...props}
            >
                <div data-testid="content">Контент карточки</div>
            </SwipeableArea>,
        );

        // JSDOM не считает размеры, ширина боковых областей задаётся вручную.
        if (screen.queryByTestId("left-area")) {
            mockElementSize(getParent(screen.getByTestId("left-area")), { width: LEFT_AREA_WIDTH });
        }
        if (screen.queryByTestId("right-area")) {
            mockElementSize(getParent(screen.getByTestId("right-area")), { width: RIGHT_AREA_WIDTH });
        }

        return result;
    };

    /** Начало свайпа. */
    const touchStart = (clientX: number, clientY = 0) => {
        const content = getContent();

        fireEvent.touchStart(content, { touches: createTouchList([createTouchAt(content, clientX, clientY)]) });
    };

    /** Перемещение пальца. Первое перемещение определяет направление, последующие двигают контент. */
    const touchMove = (clientX: number, clientY = 0) => {
        const content = getContent();

        fireEvent.touchMove(content, { touches: createTouchList([createTouchAt(content, clientX, clientY)]) });
    };

    /** Отпускание пальца. Компонент слушает touchend на документе. */
    const touchEnd = () => {
        fireEvent.touchEnd(document);
    };

    /** Свайп по горизонтали от startX до endX. */
    const swipe = (startX: number, endX: number) => {
        touchStart(startX);
        // Первое перемещение только определяет направление перемещения пальца.
        touchMove(endX);
        touchMove(endX);
        touchEnd();
    };

    it("renders children and both swipeable areas", () => {
        renderSwipeableArea();

        expect(screen.getByTestId("content")).toBeInTheDocument();
        expect(screen.getByTestId("left-area")).toBeInTheDocument();
        expect(screen.getByTestId("right-area")).toBeInTheDocument();
    });

    it("does not render a swipeable area when its prop is not passed", () => {
        renderSwipeableArea({ leftSwipeableArea: undefined, rightSwipeableArea: undefined });

        expect(screen.queryByTestId("left-area")).not.toBeInTheDocument();
        expect(screen.queryByTestId("right-area")).not.toBeInTheDocument();
    });

    it("merges className and forwards rest props to the root element", () => {
        renderSwipeableArea({ className: "custom-class", "aria-label": "Карточка" });

        const root = screen.getByTestId("swipeable-area");

        expect(root).toHaveClass("swipeableArea", "custom-class");
        expect(root).toHaveAttribute("aria-label", "Карточка");
    });

    it("opens the right area and calls onSwipeLeft on swipe left", () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();

        renderSwipeableArea({ onSwipeLeft, onSwipeRight });
        swipe(200, 150);

        expect(getContent().style.transform).toBe(`translateX(-${RIGHT_AREA_WIDTH}px)`);
        expect(onSwipeLeft).toHaveBeenCalledTimes(1);
        expect(onSwipeRight).not.toHaveBeenCalled();
    });

    it("opens the left area and calls onSwipeRight on swipe right", () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();

        renderSwipeableArea({ onSwipeLeft, onSwipeRight });
        swipe(100, 160);

        expect(getContent().style.transform).toBe(`translateX(${LEFT_AREA_WIDTH}px)`);
        expect(onSwipeRight).toHaveBeenCalledTimes(1);
        expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("returns content back and calls nothing when swipe is shorter than the threshold", () => {
        const onSwipeLeft = vi.fn();

        renderSwipeableArea({ onSwipeLeft });
        swipe(200, 190);

        expect(getContent().style.transform).toBe("translateX(0px)");
        expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("does not move content when there is no area in the swipe direction", () => {
        const onSwipeLeft = vi.fn();

        renderSwipeableArea({ rightSwipeableArea: undefined, onSwipeLeft });
        swipe(200, 100);

        expect(getContent().style.transform).toBe("translateX(0px)");
        expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("treats vertical drag as scroll and does not move content", () => {
        const onSwipeLeft = vi.fn();

        renderSwipeableArea({ onSwipeLeft });

        touchStart(200, 100);
        touchMove(150, 200);
        touchMove(150, 200);
        touchEnd();

        expect(getContent().style.transform).toBe("translateX(0px)");
        expect(onSwipeLeft).not.toHaveBeenCalled();
    });

    it("disables content scroll while swiping horizontally", () => {
        renderSwipeableArea();

        touchStart(200);
        touchMove(150);

        expect(getContent()).toHaveClass("disableScroll");

        touchMove(150);
        touchEnd();

        expect(getContent()).not.toHaveClass("disableScroll");
    });

    it("ignores multi-touch gestures", () => {
        renderSwipeableArea();

        const content = getContent();

        fireEvent.touchStart(content, { touches: createTouchList([createTouchAt(content, 200, 0)]) });
        fireEvent.touchMove(content, {
            touches: createTouchList([createTouchAt(content, 150, 0), createTouchAt(content, 100, 0)]),
        });

        expect(getContent().style.transform).toBe("translateX(0px)");
        expect(getContent()).not.toHaveClass("disableScroll");
    });

    it("closes the opened area on the opposite swipe", () => {
        const onSwipeLeft = vi.fn();
        const onSwipeRight = vi.fn();

        renderSwipeableArea({ onSwipeLeft, onSwipeRight });
        swipe(200, 150);
        expect(getContent().style.transform).toBe(`translateX(-${RIGHT_AREA_WIDTH}px)`);

        swipe(100, 160);

        expect(getContent().style.transform).toBe("translateX(0px)");
        // Закрытие области не является открывающим свайпом.
        expect(onSwipeRight).not.toHaveBeenCalled();
        expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    });

    it("keeps the area opened when the closing swipe is shorter than the threshold", () => {
        renderSwipeableArea();
        swipe(200, 150);

        swipe(100, 110);

        expect(getContent().style.transform).toBe(`translateX(-${RIGHT_AREA_WIDTH}px)`);
    });

    it("closes the opened area on touch outside of the component", () => {
        renderSwipeableArea();
        swipe(200, 150);

        fireEvent.touchStart(document.body, {
            touches: createTouchList([createTouchAt(document.body, 0, 0)]),
        });

        expect(getContent().style.transform).toBe("translateX(0px)");
    });

    it("opens and closes areas through the imperative ref", () => {
        const ref = React.createRef<ISwipeableAreaRef>();

        renderSwipeableArea({}, ref);

        expect(ref.current).toEqual({
            closeSwipe: expect.any(Function),
            swipeLeft: expect.any(Function),
            swipeRight: expect.any(Function),
        });

        act(() => ref.current?.swipeLeft());
        expect(getContent().style.transform).toBe(`translateX(-${RIGHT_AREA_WIDTH}px)`);

        act(() => ref.current?.closeSwipe());
        expect(getContent().style.transform).toBe("translateX(0px)");

        act(() => ref.current?.swipeRight());
        expect(getContent().style.transform).toBe(`translateX(${LEFT_AREA_WIDTH}px)`);
    });

    it("does not move content through the ref when the corresponding area is not rendered", () => {
        const ref = React.createRef<ISwipeableAreaRef>();

        renderSwipeableArea({ leftSwipeableArea: undefined, rightSwipeableArea: undefined }, ref);

        act(() => ref.current?.swipeLeft());
        act(() => ref.current?.swipeRight());

        expect(getContent().style.transform).toBe("translateX(0px)");
    });

    it("disables pointer events on the content while an area is opened", () => {
        const ref = React.createRef<ISwipeableAreaRef>();

        renderSwipeableArea({}, ref);

        expect(getContent()).not.toHaveClass("disablePointerEvents");

        act(() => ref.current?.swipeLeft());
        expect(getContent()).toHaveClass("disablePointerEvents");

        act(() => ref.current?.closeSwipe());
        expect(getContent()).not.toHaveClass("disablePointerEvents");
    });

    it("shows the side area proportionally to the content shift", () => {
        const ref = React.createRef<ISwipeableAreaRef>();

        renderSwipeableArea({}, ref);

        const rightArea = getParent(screen.getByTestId("right-area"));

        // Область открыта полностью — сдвиг контента равен её ширине.
        act(() => ref.current?.swipeLeft());
        expect(rightArea.style.opacity).toBe("1");

        // Закрытая область не проявлена.
        act(() => ref.current?.closeSwipe());
        expect(rightArea.style.opacity).toBe("0");

        // На середине жеста область проявлена наполовину.
        touchStart(200);
        touchMove(150);
        touchMove(150);
        expect(rightArea.style.opacity).toBe("0.5");
    });

    it("removes the animation class when the swipe animation is finished", () => {
        const ref = React.createRef<ISwipeableAreaRef>();

        renderSwipeableArea({}, ref);

        act(() => ref.current?.swipeLeft());
        expect(getContent()).toHaveClass("swipeAnimationFinish");

        fireEvent.transitionEnd(getContent());

        expect(getContent()).not.toHaveClass("swipeAnimationFinish");
    });

    it("removes document listeners on unmount", () => {
        const addEventListener = vi.spyOn(document, "addEventListener");
        const removeEventListener = vi.spyOn(document, "removeEventListener");

        const { unmount } = renderSwipeableArea();

        touchStart(200);

        // Слушатель touchend вешается только на время жеста, поэтому его ссылку нужно запомнить.
        const touchEndHandler = addEventListener.mock.calls.find(([type]) => type === "touchend")?.[1];

        expect(touchEndHandler).toBeDefined();

        unmount();

        expect(removeEventListener).toHaveBeenCalledWith("touchstart", expect.any(Function));
        // Снимается ровно тот слушатель, который был повешен на старте жеста.
        expect(removeEventListener).toHaveBeenCalledWith("touchend", touchEndHandler);

        addEventListener.mockRestore();
        removeEventListener.mockRestore();
    });
});
