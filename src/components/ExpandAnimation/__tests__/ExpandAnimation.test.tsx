import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import { ExpandAnimation, IExpandAnimationProps } from "../ExpandAnimation";

/** Высота контента, которую возвращает замоканный scrollHeight в jsdom. */
const CONTENT_HEIGHT = 120;
/** Время анимации по умолчанию у ExpandAnimation. */
const DEFAULT_ANIMATION_TIME = 300;

type TTransitionProps = NonNullable<IExpandAnimationProps["transitionProps"]>;

/**
 * transitionProps типизирован полным TransitionProps<HTMLDivElement>, поэтому объект
 * с одними обработчиками не проходит по типам, хотя это единственный практичный сценарий:
 * children/in/timeout ExpandAnimation задаёт сам. Каст локализован здесь.
 */
const asTransitionProps = (handlers: Partial<TTransitionProps>) => handlers as TTransitionProps;

let scrollHeightSpy: ReturnType<typeof vi.spyOn>;

beforeAll(() => {
    // jsdom не считает layout: scrollHeight всегда 0, а он load-bearing для анимации.
    scrollHeightSpy = vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(CONTENT_HEIGHT);
});

afterAll(() => {
    scrollHeightSpy.mockRestore();
});

const getContainer = () => screen.getByTestId("expand-animation");

describe("ExpandAnimation", () => {
    describe("Рендер и проброс props", () => {
        it("Should render children inside the root element", () => {
            render(
                <ExpandAnimation expanded data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(getContainer()).toBeInTheDocument();
            expect(screen.getByText("Content")).toBeInTheDocument();
        });

        it("Should set own class on the root element", () => {
            render(
                <ExpandAnimation expanded data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(getContainer()).toHaveClass("expandAnimation");
        });

        it("Should merge custom className with own class", () => {
            render(
                <ExpandAnimation expanded className="custom-class" data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            const container = getContainer();
            expect(container).toHaveClass("expandAnimation");
            expect(container).toHaveClass("custom-class");
        });

        it("Should spread rest props on the root element", () => {
            render(
                <ExpandAnimation expanded id="body-id" role="region" aria-label="Body" data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            const container = getContainer();
            expect(container).toHaveAttribute("id", "body-id");
            expect(container).toHaveAttribute("role", "region");
            expect(container).toHaveAttribute("aria-label", "Body");
        });

        it("Should forward object ref to the root div", () => {
            const ref = React.createRef<HTMLDivElement>();

            render(
                <ExpandAnimation expanded ref={ref} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(getContainer());
        });

        it("Should forward callback ref to the root div", () => {
            const ref = vi.fn();

            render(
                <ExpandAnimation expanded ref={ref} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(ref).toHaveBeenCalledWith(getContainer());
        });
    });

    describe("Стили состояний", () => {
        it("Should hide content when collapsed on mount", () => {
            render(
                <ExpandAnimation expanded={false} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            const container = getContainer();
            expect(container).toHaveStyle({ height: "0px", overflow: "hidden", visibility: "hidden" });
        });

        it("Should not constrain height when expanded on mount", () => {
            render(
                <ExpandAnimation expanded data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            const container = getContainer();
            expect(container.style.height).toBe("");
            expect(container.style.overflow).toBe("");
            expect(container.style.visibility).toBe("");
        });

        it("Should set transition duration from animationTime", () => {
            render(
                <ExpandAnimation expanded animationTime={500} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(getContainer()).toHaveStyle({ transitionDuration: "500ms" });
        });

        it("Should use default animation time when animationTime is not passed", () => {
            render(
                <ExpandAnimation expanded data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(getContainer()).toHaveStyle({ transitionDuration: `${DEFAULT_ANIMATION_TIME}ms` });
        });

        it("Should let custom style override transition styles", () => {
            render(
                <ExpandAnimation expanded={false} style={{ overflow: "visible" }} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            const container = getContainer();
            expect(container).toHaveStyle({ overflow: "visible" });
            expect(container).toHaveStyle({ height: "0px" });
        });
    });

    describe("Анимация", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("Should measure content height when expanding", () => {
            const { rerender } = render(
                <ExpandAnimation expanded={false} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            act(() => {
                rerender(
                    <ExpandAnimation expanded data-testid="expand-animation">
                        Content
                    </ExpandAnimation>,
                );
            });

            expect(getContainer()).toHaveStyle({ height: `${CONTENT_HEIGHT}px`, overflow: "hidden" });
        });

        it("Should call onStart and then onEnd when expanding", () => {
            const onStart = vi.fn();
            const onEnd = vi.fn();

            const { rerender } = render(
                <ExpandAnimation expanded={false} onStart={onStart} onEnd={onEnd} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            expect(onStart).not.toHaveBeenCalled();

            act(() => {
                rerender(
                    <ExpandAnimation expanded onStart={onStart} onEnd={onEnd} data-testid="expand-animation">
                        Content
                    </ExpandAnimation>,
                );
            });

            expect(onStart).toHaveBeenCalledTimes(1);
            expect(onEnd).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).toHaveBeenCalledTimes(1);
        });

        it("Should call onStart and then onEnd when collapsing", () => {
            const onStart = vi.fn();
            const onEnd = vi.fn();

            const { rerender } = render(
                <ExpandAnimation expanded onStart={onStart} onEnd={onEnd} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            act(() => {
                rerender(
                    <ExpandAnimation expanded={false} onStart={onStart} onEnd={onEnd} data-testid="expand-animation">
                        Content
                    </ExpandAnimation>,
                );
            });

            expect(onStart).toHaveBeenCalledTimes(1);
            expect(onEnd).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(getContainer()).toHaveStyle({ height: "0px", visibility: "hidden" });
        });

        it("Should respect custom animationTime before calling onEnd", () => {
            const onEnd = vi.fn();

            const { rerender } = render(
                <ExpandAnimation expanded={false} animationTime={1000} onEnd={onEnd} data-testid="expand-animation">
                    Content
                </ExpandAnimation>,
            );

            act(() => {
                rerender(
                    <ExpandAnimation expanded animationTime={1000} onEnd={onEnd} data-testid="expand-animation">
                        Content
                    </ExpandAnimation>,
                );
            });

            act(() => {
                vi.advanceTimersByTime(DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1000 - DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).toHaveBeenCalledTimes(1);
        });
    });

    describe("transitionProps", () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it("Should call transitionProps.onEnter and onEntered alongside own callbacks", () => {
            const onStart = vi.fn();
            const onEnd = vi.fn();
            const onEnter = vi.fn();
            const onEntered = vi.fn();

            const { rerender } = render(
                <ExpandAnimation
                    expanded={false}
                    onStart={onStart}
                    onEnd={onEnd}
                    transitionProps={asTransitionProps({ onEnter, onEntered })}
                    data-testid="expand-animation"
                >
                    Content
                </ExpandAnimation>,
            );

            act(() => {
                rerender(
                    <ExpandAnimation
                        expanded
                        onStart={onStart}
                        onEnd={onEnd}
                        transitionProps={asTransitionProps({ onEnter, onEntered })}
                        data-testid="expand-animation"
                    >
                        Content
                    </ExpandAnimation>,
                );
            });

            expect(onStart).toHaveBeenCalledTimes(1);
            expect(onEnter).toHaveBeenCalledTimes(1);
            expect(onEnter).toHaveBeenCalledWith(false);

            act(() => {
                vi.advanceTimersByTime(DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(onEntered).toHaveBeenCalledTimes(1);
            expect(onEntered).toHaveBeenCalledWith(false);
        });

        it("Should call transitionProps.onExit and onExited alongside own callbacks", () => {
            const onStart = vi.fn();
            const onEnd = vi.fn();
            const onExit = vi.fn();
            const onExited = vi.fn();

            const { rerender } = render(
                <ExpandAnimation
                    expanded
                    onStart={onStart}
                    onEnd={onEnd}
                    transitionProps={asTransitionProps({ onExit, onExited })}
                    data-testid="expand-animation"
                >
                    Content
                </ExpandAnimation>,
            );

            act(() => {
                rerender(
                    <ExpandAnimation
                        expanded={false}
                        onStart={onStart}
                        onEnd={onEnd}
                        transitionProps={asTransitionProps({ onExit, onExited })}
                        data-testid="expand-animation"
                    >
                        Content
                    </ExpandAnimation>,
                );
            });

            expect(onStart).toHaveBeenCalledTimes(1);
            expect(onExit).toHaveBeenCalledTimes(1);

            act(() => {
                vi.advanceTimersByTime(DEFAULT_ANIMATION_TIME);
            });

            expect(onEnd).toHaveBeenCalledTimes(1);
            expect(onExited).toHaveBeenCalledTimes(1);
        });
    });
});
