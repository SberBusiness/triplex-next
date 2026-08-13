import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { CarouselExtended, ICarouselExtendedButtonProvideProps } from "../CarouselExtended";

/** Метрики прокрутки ленты. В JSDOM нет layout, поэтому все они равны нулю и подменяются вручную. */
interface IScrollMetrics {
    scrollWidth: number;
    clientWidth: number;
    offsetWidth: number;
    scrollLeft: number;
}

/** Лента шире видимой области, прокрутка в самом начале. */
const SCROLLABLE_METRICS: IScrollMetrics = { scrollWidth: 1000, clientWidth: 500, offsetWidth: 500, scrollLeft: 0 };
/** Контент помещается в видимую область — прокручивать нечего. */
const FITTING_METRICS: IScrollMetrics = { scrollWidth: 500, clientWidth: 500, offsetWidth: 500, scrollLeft: 0 };

/** Подменяет метрики прокрутки элемента. scrollLeft остаётся записываемым — его меняет прокрутка. */
const mockScrollMetrics = (element: HTMLElement, metrics: IScrollMetrics): void => {
    Object.defineProperty(element, "scrollWidth", { value: metrics.scrollWidth, configurable: true });
    Object.defineProperty(element, "clientWidth", { value: metrics.clientWidth, configurable: true });
    Object.defineProperty(element, "offsetWidth", { value: metrics.offsetWidth, configurable: true });
    Object.defineProperty(element, "scrollLeft", { value: metrics.scrollLeft, writable: true, configurable: true });
};

interface IRenderOptions {
    metrics?: IScrollMetrics;
    stepPrev?: number;
    stepNext?: number;
    children?: React.ReactNode;
    className?: string;
}

/** Рендерит карусель с кнопками, которые прокидывают полученные props на нативный button. */
const renderCarousel = ({
    metrics = SCROLLABLE_METRICS,
    stepPrev = 100,
    stepNext = 100,
    children = <div data-testid="content">Контент</div>,
    className,
}: IRenderOptions = {}) => {
    const scroll: { current: HTMLDivElement | null } = { current: null };
    const mockedElements = new WeakSet<HTMLElement>();

    const setScrollRef = (instance: HTMLDivElement | null): void => {
        // Метрики подменяются один раз на элемент: повторный вызов ref не должен сбрасывать позицию прокрутки.
        if (instance !== null && !mockedElements.has(instance)) {
            mockedElements.add(instance);
            mockScrollMetrics(instance, metrics);
        }

        scroll.current = instance;
    };

    const renderButton =
        (label: string) =>
        ({ hidden, ...buttonProps }: ICarouselExtendedButtonProvideProps) => (
            <button type="button" aria-label={label} data-hidden={String(hidden)} {...buttonProps} />
        );

    const buttonPrev = vi.fn(renderButton("Назад"));
    const buttonNext = vi.fn(renderButton("Вперёд"));

    const { rerender } = render(
        <CarouselExtended
            className={className}
            buttonPrev={buttonPrev}
            buttonNext={buttonNext}
            stepPrev={stepPrev}
            stepNext={stepNext}
            ref={setScrollRef}
        >
            {children}
        </CarouselExtended>,
    );

    /** Скроллируемый контейнер — элемент, на который компонент форвардит ref. */
    const getScrollContainer = (): HTMLDivElement => {
        if (scroll.current === null) {
            throw new Error("Скроллируемый контейнер не смонтирован.");
        }

        return scroll.current;
    };

    /** Меняет позицию прокрутки и уведомляет компонент, как это сделал бы браузер. */
    const scrollTo = (scrollLeft: number): void => {
        const container = getScrollContainer();

        container.scrollLeft = scrollLeft;
        fireEvent.scroll(container);
    };

    return {
        buttonPrev,
        buttonNext,
        getScrollContainer,
        scrollTo,
        rerenderChildren: (nextChildren: React.ReactNode) =>
            rerender(
                <CarouselExtended
                    className={className}
                    buttonPrev={buttonPrev}
                    buttonNext={buttonNext}
                    stepPrev={stepPrev}
                    stepNext={stepNext}
                    ref={setScrollRef}
                >
                    {nextChildren}
                </CarouselExtended>,
            ),
    };
};

const getPrevButton = (): HTMLElement => screen.getByRole("button", { name: "Назад" });
const getNextButton = (): HTMLElement => screen.getByRole("button", { name: "Вперёд" });

/** Прогоняет анимацию прокрутки синхронно: scrollSmoothHorizontally рекурсивно вызывает requestAnimationFrame. */
const runScrollAnimationSynchronously = (): void => {
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback): number => {
        callback(0);

        return 0;
    });
};

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("CarouselExtended", () => {
    describe("рендер", () => {
        it("рендерит children внутри скроллируемого контейнера", () => {
            const { getScrollContainer } = renderCarousel();

            expect(screen.getByTestId("content")).toBeInTheDocument();
            expect(getScrollContainer()).toContainElement(screen.getByTestId("content"));
        });

        it("рендерит кнопки из рендер-функций до и после ленты", () => {
            renderCarousel();

            const root = getPrevButton().parentElement;

            expect(root).not.toBeNull();
            expect(Array.from(root?.children ?? [])).toEqual([
                getPrevButton(),
                expect.any(HTMLDivElement),
                getNextButton(),
            ]);
        });

        it("форвардит ref на скроллируемый контейнер, а не на корневой элемент", () => {
            const ref = React.createRef<HTMLDivElement>();

            render(
                <CarouselExtended
                    buttonPrev={() => null}
                    buttonNext={() => null}
                    stepPrev={100}
                    stepNext={100}
                    ref={ref}
                >
                    <div data-testid="content">Контент</div>
                </CarouselExtended>,
            );

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toHaveClass("carouselExtended");
            expect(ref.current).toContainElement(screen.getByTestId("content"));
        });

        it("не вызывает колбэк-ref повторно при ре-рендере", () => {
            const refCallback = vi.fn();
            const renderCarouselWithRef = (content: string) => (
                <CarouselExtended
                    buttonPrev={() => null}
                    buttonNext={() => null}
                    stepPrev={100}
                    stepNext={100}
                    ref={refCallback}
                >
                    <div>{content}</div>
                </CarouselExtended>
            );

            const { rerender } = render(renderCarouselWithRef("Контент"));

            expect(refCallback).toHaveBeenCalledTimes(1);
            expect(refCallback).toHaveBeenLastCalledWith(expect.any(HTMLDivElement));

            rerender(renderCarouselWithRef("Другой контент"));

            expect(refCallback).toHaveBeenCalledTimes(1);
        });

        it("прокидывает className и остальные атрибуты на корневой элемент", () => {
            const { getScrollContainer } = renderCarousel({ className: "custom-class" });

            const root = getScrollContainer().parentElement;

            expect(root).toHaveClass("custom-class");
            expect(getScrollContainer()).not.toHaveClass("custom-class");
        });
    });

    describe("состояние кнопок", () => {
        it("скрывает кнопки, когда контент помещается в видимую область", () => {
            renderCarousel({ metrics: FITTING_METRICS });

            expect(getPrevButton()).toHaveAttribute("data-hidden", "true");
            expect(getNextButton()).toHaveAttribute("data-hidden", "true");
        });

        it("показывает кнопки, когда лента шире видимой области", () => {
            renderCarousel();

            expect(getPrevButton()).toHaveAttribute("data-hidden", "false");
            expect(getNextButton()).toHaveAttribute("data-hidden", "false");
        });

        it("в начале ленты блокирует кнопку назад и оставляет активной кнопку вперёд", () => {
            renderCarousel();

            expect(getPrevButton()).toBeDisabled();
            expect(getNextButton()).toBeEnabled();
        });

        it("в середине ленты оставляет активными обе кнопки", () => {
            const { scrollTo } = renderCarousel();

            scrollTo(250);

            expect(getPrevButton()).toBeEnabled();
            expect(getNextButton()).toBeEnabled();
        });

        it("в конце ленты блокирует кнопку вперёд", () => {
            const { scrollTo } = renderCarousel();

            scrollTo(500);

            expect(getPrevButton()).toBeEnabled();
            expect(getNextButton()).toBeDisabled();
        });

        it("передаёт в рендер-функции disabled, hidden и onClick", () => {
            const { buttonPrev, buttonNext } = renderCarousel();

            expect(buttonPrev).toHaveBeenLastCalledWith({
                disabled: true,
                hidden: false,
                onClick: expect.any(Function),
            });
            expect(buttonNext).toHaveBeenLastCalledWith({
                disabled: false,
                hidden: false,
                onClick: expect.any(Function),
            });
        });
    });

    describe("пересчёт состояния", () => {
        it("пересчитывает состояние при изменении размера окна", () => {
            const { getScrollContainer } = renderCarousel({ metrics: FITTING_METRICS });

            expect(getNextButton()).toHaveAttribute("data-hidden", "true");

            mockScrollMetrics(getScrollContainer(), SCROLLABLE_METRICS);
            fireEvent(window, new Event("resize"));

            expect(getNextButton()).toHaveAttribute("data-hidden", "false");
            expect(getNextButton()).toBeEnabled();
        });

        it("пересчитывает состояние при прокрутке страницы", () => {
            const { getScrollContainer } = renderCarousel({ metrics: FITTING_METRICS });

            mockScrollMetrics(getScrollContainer(), SCROLLABLE_METRICS);
            fireEvent.scroll(document);

            expect(getNextButton()).toHaveAttribute("data-hidden", "false");
        });

        it("пересчитывает состояние при смене children", () => {
            const { getScrollContainer, rerenderChildren } = renderCarousel({ metrics: FITTING_METRICS });

            mockScrollMetrics(getScrollContainer(), SCROLLABLE_METRICS);
            rerenderChildren(<div data-testid="content">Другой контент</div>);

            expect(getNextButton()).toHaveAttribute("data-hidden", "false");
        });

        it("сохраняет состояние кнопок, если метрики ленты не изменились", () => {
            renderCarousel();

            fireEvent(window, new Event("resize"));
            fireEvent.scroll(document);

            expect(getPrevButton()).toBeDisabled();
            expect(getNextButton()).toBeEnabled();
            expect(getNextButton()).toHaveAttribute("data-hidden", "false");
        });

        it("снимает слушатели окна и документа при размонтировании", () => {
            const windowRemove = vi.spyOn(window, "removeEventListener");
            const documentRemove = vi.spyOn(document, "removeEventListener");
            const { unmount } = render(
                <CarouselExtended buttonPrev={() => null} buttonNext={() => null} stepPrev={100} stepNext={100}>
                    <div>Контент</div>
                </CarouselExtended>,
            );

            unmount();

            expect(windowRemove).toHaveBeenCalledWith("resize", expect.any(Function));
            expect(documentRemove).toHaveBeenCalledWith("scroll", expect.any(Function));
        });
    });

    describe("прокрутка по кнопкам", () => {
        it("кнопка вперёд прокручивает ленту вправо на stepNext", () => {
            runScrollAnimationSynchronously();

            const { getScrollContainer } = renderCarousel({ stepNext: 200 });

            fireEvent.click(getNextButton());

            expect(getScrollContainer().scrollLeft).toBeCloseTo(200);
        });

        it("кнопка назад прокручивает ленту влево на stepPrev", () => {
            runScrollAnimationSynchronously();

            const { getScrollContainer, scrollTo } = renderCarousel({ stepPrev: 200 });

            scrollTo(400);
            fireEvent.click(getPrevButton());

            expect(getScrollContainer().scrollLeft).toBeCloseTo(200);
        });

        it("округляет дробный шаг вверх по модулю", () => {
            runScrollAnimationSynchronously();

            const { getScrollContainer } = renderCarousel({ stepNext: 200.2 });

            fireEvent.click(getNextButton());

            expect(getScrollContainer().scrollLeft).toBeCloseTo(201);
        });

        it("не прокручивает ленту кликом по заблокированной кнопке", () => {
            runScrollAnimationSynchronously();

            const { getScrollContainer } = renderCarousel();

            fireEvent.click(getPrevButton());

            expect(getScrollContainer().scrollLeft).toBe(0);
        });
    });
});
