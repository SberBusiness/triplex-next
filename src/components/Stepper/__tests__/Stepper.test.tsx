import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Stepper } from "@sberbusiness/triplex-next/components/Stepper";
import { EStepperStepType, EStepperStepIconType } from "../enums";
import { StepperStepIcon } from "../StepperStepIcon";
import { EComponentSize } from "../../../enums";

/** Подменяет размеры элемента: jsdom не считает раскладку и возвращает нули. */
const mockRect = (element: Element, { left, right }: { left: number; right: number }): void => {
    element.getBoundingClientRect = () =>
        ({
            left,
            right,
            width: right - left,
            top: 0,
            bottom: 0,
            height: 0,
            x: left,
            y: 0,
            toJSON: () => ({}),
        }) as DOMRect;
};

/** Делает scrollLeft записываемым: jsdom игнорирует запись в элемент без раскладки. */
const mockScrollLeft = (element: Element, initialValue = 0): void => {
    let scrollLeft = initialValue;

    Object.defineProperty(element, "scrollLeft", {
        configurable: true,
        get: () => scrollLeft,
        set: (value: number) => {
            scrollLeft = value;
        },
    });
};

describe("Stepper", () => {
    const mockOnSelectStep = vi.fn();
    const mockSteps = [
        {
            id: "step1",
            label: "Step 1",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
            icon: <StepperStepIcon type={EStepperStepIconType.FILLED} />,
        },
        {
            id: "step2",
            label: "Step 2",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
            icon: <StepperStepIcon type={EStepperStepIconType.SUCCESS} />,
        },
        {
            id: "step3",
            label: "Step 3",
            disabled: false,
            type: EStepperStepType.NEUTRAL,
        },
    ];

    /** Элемент шага по его подписи. Шаг — это <li role="button">, поэтому доступен по роли. */
    const getStep = (label: string): HTMLElement => screen.getByRole("button", { name: label });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders stepper with multiple steps", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
        expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it.each([
        [EComponentSize.SM, "sm"],
        [EComponentSize.MD, "md"],
        [EComponentSize.LG, "lg"],
    ])("applies size %s to the carousel and to every step", (size, className) => {
        const { container } = render(
            <Stepper steps={mockSteps} size={size} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        expect(container.querySelector(".stepperCarousel")).toHaveClass(className);
        expect(getStep("Step 1")).toHaveClass(className);
    });

    it("uses LG size by default", () => {
        const { container } = render(
            <Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        expect(container.querySelector(".stepperCarousel")).toHaveClass("lg");
        expect(getStep("Step 1")).toHaveClass("lg");
    });

    it("calls onSelectStep when a step is clicked", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.click(getStep("Step 2"));

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
    });

    it("calls onSelectStep when Enter key is pressed on a step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.keyDown(getStep("Step 3"), { key: "Enter", code: "Enter" });

        expect(mockOnSelectStep).toHaveBeenCalledWith("step3");
    });

    it("calls onSelectStep when Space key is pressed on a step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.keyDown(getStep("Step 2"), { key: " ", code: "Space" });

        expect(mockOnSelectStep).toHaveBeenCalledWith("step2");
    });

    it("prevents default on Space so the page does not scroll", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const spaceEvent = new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true, cancelable: true });

        fireEvent(getStep("Step 2"), spaceEvent);

        expect(spaceEvent.defaultPrevented).toBe(true);
    });

    it("ignores other keys", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.keyDown(getStep("Step 2"), { key: "ArrowRight", code: "ArrowRight" });

        expect(mockOnSelectStep).not.toHaveBeenCalled();
    });

    it("marks the focused step with focusVisible class only on keyboard focus", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step = getStep("Step 2");

        act(() => {
            step.focus();
        });

        expect(step).toHaveClass("focusVisible");

        act(() => {
            step.blur();
        });

        expect(step).not.toHaveClass("focusVisible");
    });

    it("does not mark the step with focusVisible class on mouse focus", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        const step = getStep("Step 2");

        // mousedown и focus — разные события: в браузере состояние успевает примениться между ними.
        fireEvent.mouseDown(step);

        act(() => {
            step.focus();
        });

        expect(step).not.toHaveClass("focusVisible");
    });

    describe("disabled step", () => {
        const stepsWithDisabled = [
            ...mockSteps,
            {
                id: "step4",
                label: "Step 4 Disabled",
                disabled: true,
                type: EStepperStepType.NEUTRAL,
            },
        ];

        it("does not call onSelectStep on click, Enter or Space", () => {
            render(<Stepper steps={stepsWithDisabled} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

            const disabledStep = getStep("Step 4 Disabled");

            fireEvent.click(disabledStep);
            fireEvent.keyDown(disabledStep, { key: "Enter", code: "Enter" });
            fireEvent.keyDown(disabledStep, { key: " ", code: "Space" });

            expect(mockOnSelectStep).not.toHaveBeenCalled();
        });

        it("drops out of the tab order and is marked with aria-disabled", () => {
            render(<Stepper steps={stepsWithDisabled} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

            const disabledStep = getStep("Step 4 Disabled");

            expect(disabledStep).toHaveClass("disabled");
            expect(disabledStep).toHaveAttribute("aria-disabled", "true");
            expect(disabledStep).toHaveAttribute("tabindex", "-1");
        });
    });

    it("marks the selected step with aria-current", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

        expect(getStep("Step 2")).toHaveAttribute("aria-current", "true");
        expect(getStep("Step 1")).not.toHaveAttribute("aria-current");
    });

    it("splits steps into completed, active and not yet passed", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

        expect(getStep("Step 1")).toHaveClass("completed");
        expect(getStep("Step 2")).toHaveClass("active");
        expect(getStep("Step 3")).toHaveClass("inactive");
    });

    it("treats every step as not yet passed when selectedStepId is not set", () => {
        render(<Stepper steps={mockSteps} onSelectStep={mockOnSelectStep} />);

        expect(getStep("Step 1")).toHaveClass("inactive");
        expect(getStep("Step 2")).toHaveClass("inactive");
        expect(getStep("Step 3")).toHaveClass("inactive");
    });

    it.each([
        [EStepperStepType.ERROR, "error"],
        [EStepperStepType.WARNING, "warning"],
    ])("applies type %s to the step", (type, className) => {
        render(
            <Stepper
                steps={[{ id: "step1", label: "Step 1", type }]}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
            />,
        );

        expect(getStep("Step 1")).toHaveClass(className);
    });

    it("does not apply the type class to a disabled step", () => {
        render(
            <Stepper
                steps={[{ id: "step1", label: "Step 1", type: EStepperStepType.ERROR, disabled: true }]}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
            />,
        );

        const step = getStep("Step 1");

        expect(step).toHaveClass("disabled");
        expect(step).not.toHaveClass("error");
    });

    it("renders the step icon", () => {
        const { container } = render(
            <Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />,
        );

        expect(container.querySelectorAll(".icon")).toHaveLength(2);
    });

    it("applies custom className to the root element", () => {
        const { container } = render(
            <Stepper
                steps={mockSteps}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
                className="custom-class"
            />,
        );

        expect(container.firstElementChild).toHaveClass("stepperCarousel", "custom-class");
    });

    it("forwards forwardedRef and rest props to the list of steps", () => {
        const ref = React.createRef<HTMLOListElement>();

        render(
            <Stepper
                steps={mockSteps}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
                forwardedRef={ref}
                aria-label="Шаги оформления"
                data-test-id="stepper"
            />,
        );

        const list = screen.getByRole("tablist");

        expect(ref.current).toBe(list);
        expect(list).toHaveAttribute("aria-label", "Шаги оформления");
        expect(list).toHaveAttribute("data-test-id", "stepper");
    });

    it("renders empty steps array without error", () => {
        render(<Stepper steps={[]} selectedStepId="" onSelectStep={mockOnSelectStep} />);

        expect(screen.getByRole("tablist")).toBeEmptyDOMElement();
    });

    it("renders steps without labels", () => {
        render(
            <Stepper
                steps={[
                    { id: "step1", type: EStepperStepType.NEUTRAL },
                    { id: "step2", type: EStepperStepType.NEUTRAL },
                ]}
                selectedStepId="step1"
                onSelectStep={mockOnSelectStep}
            />,
        );

        expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    it("calls onSelectStep when clicking already selected step", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.click(getStep("Step 1"));

        expect(mockOnSelectStep).toHaveBeenCalledWith("step1");
    });

    it("handles rapid clicks on different steps", () => {
        render(<Stepper steps={mockSteps} selectedStepId="step1" onSelectStep={mockOnSelectStep} />);

        fireEvent.click(getStep("Step 2"));
        fireEvent.click(getStep("Step 3"));

        expect(mockOnSelectStep).toHaveBeenNthCalledWith(1, "step2");
        expect(mockOnSelectStep).toHaveBeenNthCalledWith(2, "step3");
    });

    describe("scrolls the selected step into view", () => {
        /** Ширина видимой области ленты в тестах. */
        const CAROUSEL_WIDTH = 100;

        beforeEach(() => {
            // scrollSmoothHorizontally анимирует прокрутку по кадрам: без rAF применяется только первый кадр.
            vi.stubGlobal("requestAnimationFrame", () => 0);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        /**
         * Рендерит Stepper и раскладывает ленту: шаги шириной 60px подряд, видимая область — 100px.
         * Возвращает узел прокручиваемой ленты и функцию смены выбранного шага.
         */
        const renderWithLayout = (initialScrollLeft = 0, initialStepId = "step1") => {
            const { rerender } = render(
                <Stepper steps={mockSteps} selectedStepId={initialStepId} onSelectStep={mockOnSelectStep} />,
            );

            const list = screen.getByRole("tablist");
            const carousel = list.parentElement;

            if (carousel === null) {
                throw new Error("Stepper list must be rendered inside the carousel track");
            }

            mockScrollLeft(carousel, initialScrollLeft);
            mockRect(carousel, { left: 0, right: CAROUSEL_WIDTH });
            mockRect(getStep("Step 1"), { left: -120, right: -60 });
            mockRect(getStep("Step 2"), { left: -60, right: 0 });
            mockRect(getStep("Step 3"), { left: 60, right: 120 });

            const selectStep = (selectedStepId: string) =>
                rerender(<Stepper steps={mockSteps} selectedStepId={selectedStepId} onSelectStep={mockOnSelectStep} />);

            return { carousel, selectStep };
        };

        it("scrolls the track forward when the step is past the right edge", () => {
            const { carousel, selectStep } = renderWithLayout();

            selectStep("step3");

            expect(carousel.scrollLeft).toBeGreaterThan(0);
        });

        it("scrolls the track back when the step is past the left edge", () => {
            const { carousel, selectStep } = renderWithLayout(500, "step3");

            selectStep("step1");

            expect(carousel.scrollLeft).toBeLessThan(500);
        });

        it("does not scroll the track when the step is already fully visible", () => {
            const { carousel, selectStep } = renderWithLayout(500);

            mockRect(getStep("Step 2"), { left: 30, right: 90 });
            selectStep("step2");

            expect(carousel.scrollLeft).toBe(500);
        });

        it("centers the step on narrow screens", () => {
            const matchMediaSpy = vi
                .spyOn(window, "matchMedia")
                .mockReturnValue({ matches: true } as unknown as MediaQueryList);

            try {
                const { carousel, selectStep } = renderWithLayout(500);

                // Шаг целиком виден, но его центр правее центра ленты — на узком экране он всё равно центрируется.
                mockRect(getStep("Step 2"), { left: 30, right: 90 });
                selectStep("step2");

                expect(carousel.scrollLeft).toBeGreaterThan(500);
            } finally {
                matchMediaSpy.mockRestore();
            }
        });

        it("does not scroll the track when no step is selected", () => {
            const { carousel, selectStep } = renderWithLayout(500);

            selectStep("");

            expect(carousel.scrollLeft).toBe(500);
        });
    });

    describe("scroll buttons", () => {
        /** Ширина видимой области ленты; содержимое шире неё, иначе кнопки прокрутки скрыты. */
        const CAROUSEL_CLIENT_WIDTH = 100;
        const CAROUSEL_SCROLL_WIDTH = 300;
        /** Стартовая позиция прокрутки: не у края, чтобы обе кнопки были активны. */
        const INITIAL_SCROLL_LEFT = 50;

        /** Сообщает ResizeObserver компонента ширину ленты — от неё считается шаг прокрутки. */
        let notifyResize: ((width: number) => void) | null = null;

        beforeEach(() => {
            vi.stubGlobal(
                "ResizeObserver",
                class {
                    private readonly callback: (entries: Array<{ contentRect: { width: number } }>) => void;

                    constructor(callback: (entries: Array<{ contentRect: { width: number } }>) => void) {
                        this.callback = callback;
                    }

                    observe(): void {
                        notifyResize = (width) => this.callback([{ contentRect: { width } }]);
                    }

                    unobserve(): void {}

                    disconnect(): void {
                        notifyResize = null;
                    }
                },
            );
            // scrollSmoothHorizontally анимирует прокрутку по кадрам: без rAF применяется только первый кадр.
            vi.stubGlobal("requestAnimationFrame", () => 0);
        });

        afterEach(() => {
            notifyResize = null;
            vi.unstubAllGlobals();
        });

        /** Кнопка прокрутки по направлению; бросает понятную ошибку, если разметка изменилась. */
        const getScrollButton = (container: HTMLElement, direction: "prev" | "next"): HTMLElement => {
            const button = container.querySelector(`.stepperButtonWrapper.${direction} .stepperButton`);

            if (!(button instanceof HTMLElement)) {
                throw new Error(`Scroll button "${direction}" is not rendered`);
            }

            return button;
        };

        /** Рендерит Stepper с переполненной лентой, чтобы CarouselExtended показал кнопки прокрутки. */
        const renderWithOverflow = (size = EComponentSize.MD) => {
            const { container } = render(
                <Stepper steps={mockSteps} size={size} selectedStepId="step2" onSelectStep={mockOnSelectStep} />,
            );

            const list = screen.getByRole("tablist");
            const carousel = list.parentElement;

            if (carousel === null) {
                throw new Error("Stepper list must be rendered inside the carousel track");
            }

            Object.defineProperty(carousel, "clientWidth", { value: CAROUSEL_CLIENT_WIDTH, configurable: true });
            Object.defineProperty(carousel, "offsetWidth", { value: CAROUSEL_CLIENT_WIDTH, configurable: true });
            Object.defineProperty(carousel, "scrollWidth", { value: CAROUSEL_SCROLL_WIDTH, configurable: true });
            mockScrollLeft(carousel, INITIAL_SCROLL_LEFT);

            act(() => {
                // CarouselExtended пересчитывает видимость кнопок по resize окна.
                fireEvent(window, new Event("resize"));
                notifyResize?.(CAROUSEL_CLIENT_WIDTH);
            });

            return { container, carousel };
        };

        it("renders both scroll buttons out of the tab order when the track overflows", () => {
            const { container } = renderWithOverflow();

            const prevButton = getScrollButton(container, "prev");
            const nextButton = getScrollButton(container, "next");

            expect(prevButton).toHaveAttribute("tabindex", "-1");
            expect(nextButton).toHaveAttribute("tabindex", "-1");
            expect(prevButton.querySelector("svg")).toBeInTheDocument();
            expect(nextButton.querySelector("svg")).toBeInTheDocument();
        });

        it("hides the scroll buttons when the track fits", () => {
            render(<Stepper steps={mockSteps} selectedStepId="step2" onSelectStep={mockOnSelectStep} />);

            // Шаги тоже имеют role="button": лишних кнопок нет — значит кнопок прокрутки в разметке нет.
            expect(screen.getAllByRole("button")).toHaveLength(mockSteps.length);
        });

        it.each([
            [EComponentSize.SM, "sm"],
            [EComponentSize.MD, "md"],
            [EComponentSize.LG, "lg"],
        ])("applies the %s size class to both scroll buttons", (size, expectedClass) => {
            const { container } = renderWithOverflow(size);

            expect(getScrollButton(container, "prev")).toHaveClass(expectedClass);
            expect(getScrollButton(container, "next")).toHaveClass(expectedClass);
        });

        it("scrolls the track forward on the next button click", () => {
            const { container, carousel } = renderWithOverflow();

            fireEvent.click(getScrollButton(container, "next"));

            expect(carousel.scrollLeft).toBeGreaterThan(INITIAL_SCROLL_LEFT);
        });

        it("scrolls the track back on the prev button click", () => {
            const { container, carousel } = renderWithOverflow();

            fireEvent.click(getScrollButton(container, "prev"));

            expect(carousel.scrollLeft).toBeLessThan(INITIAL_SCROLL_LEFT);
        });
    });
});
