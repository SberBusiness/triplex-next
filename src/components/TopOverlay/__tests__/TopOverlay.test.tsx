import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { FocusTrapProps } from "focus-trap-react";
import { EOverlayDirection } from "../../Overlay/OverlayBase";
import { TopOverlay } from "../TopOverlay";

const focusTrapMock = vi.fn<(props: FocusTrapProps) => void>();

vi.mock("focus-trap-react", () => ({
    FocusTrap: (props: FocusTrapProps) => {
        focusTrapMock(props);
        return <div data-testid="focus-trap">{props.children}</div>;
    },
}));

interface IOverlayChildrenProvidePropsMock {
    closing: boolean;
    opened: boolean;
}

interface IOverlayMockProps {
    children: React.ReactNode | ((props: IOverlayChildrenProvidePropsMock) => React.ReactNode);
    className?: string;
    direction?: string;
    opened: boolean;
    onClose?: () => void;
    onClosing?: () => void;
    onOpen?: () => void;
    setOpened?: (opened: boolean) => void;
}

interface IOverlayPartMockProps {
    children?: React.ReactNode;
    className?: string;
    opened?: boolean;
}

vi.mock("../../Overlay/Overlay", () => {
    /**
     * Мок Overlay, повторяющий контракт OverlayBase: на переходах opened вызываются колбэки, а на маунте —
     * только onOpen и только если оверлей смонтирован уже открытым. Иначе тесты ловят поведение мока,
     * а не компонента.
     *
     * Фазы закрытия разнесены так же, как в реальном OverlayBase: переход opened → false вызывает только
     * onClosing, а onClose срабатывает по transitionend панели. В моке за transitionend отвечает кнопка
     * overlay-finish-closing — без этого закрытие схлопывалось бы в один тик и класс closing не рендерился.
     */
    const OverlayMock = ({
        children,
        className,
        direction,
        opened,
        onClose,
        onClosing,
        onOpen,
        setOpened,
    }: IOverlayMockProps) => {
        const callbacks = React.useRef({ onClose, onClosing, onOpen });
        const isFirstRender = React.useRef(true);

        React.useLayoutEffect(() => {
            callbacks.current = { onClose, onClosing, onOpen };
        });

        React.useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;

                // Монтирование сразу открытым: анимации открытия не было, цикл открытия завершён сразу.
                if (opened) {
                    callbacks.current.onOpen?.();
                }

                return;
            }

            if (opened) {
                callbacks.current.onOpen?.();
            } else {
                callbacks.current.onClosing?.();
            }
        }, [opened]);

        return (
            <div data-testid="overlay" className={className} data-opened={opened} data-direction={direction}>
                {/* Завершение анимации закрытия — в реальном OverlayBase это transitionend панели. */}
                <button
                    data-testid="overlay-finish-closing"
                    onClick={() => callbacks.current.onClose?.()}
                    type="button"
                />
                {/* Overlay зовёт setOpened при закрытии по клику вне панели — у TopOverlay это no-op. */}
                <button data-testid="overlay-set-opened" onClick={() => setOpened?.(false)} type="button" />
                {typeof children === "function" ? children({ closing: false, opened }) : children}
            </div>
        );
    };

    return {
        Overlay: Object.assign(OverlayMock, {
            Mask: ({ opened, className }: IOverlayPartMockProps) => (
                <div data-testid="overlay-mask" data-opened={opened} className={className} />
            ),
            Panel: ({ children, className }: IOverlayPartMockProps) => (
                <div data-testid="overlay-panel" className={className}>
                    {children}
                </div>
            ),
        }),
    };
});

const TestContent = () => <div data-testid="test-content">TopOverlay Content</div>;

/** Последние свойства, с которыми был отрисован FocusTrap. */
const getLastFocusTrapProps = () => focusTrapMock.mock.calls[focusTrapMock.mock.calls.length - 1][0];

describe("TopOverlay", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });

    describe("Basic Rendering", () => {
        it("should render children correctly", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("test-content")).toBeInTheDocument();
            expect(screen.getByText("TopOverlay Content")).toBeInTheDocument();
        });

        it("should render when opened is false", () => {
            render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            // Компонент всё равно рендерится, но с другим состоянием
            expect(screen.getByTestId("focus-trap")).toBeInTheDocument();
        });

        it("should render FocusTrap wrapper", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("focus-trap")).toBeInTheDocument();
        });

        it("should render Overlay component", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay")).toBeInTheDocument();
        });

        it("should render Overlay.Mask", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay-mask")).toBeInTheDocument();
        });

        it("should render Overlay.Panel", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay-panel")).toBeInTheDocument();
        });
    });

    describe("CSS Classes", () => {
        it("should apply topOverlayWrapper class", () => {
            const { container } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper");
            expect(wrapper).toBeInTheDocument();
        });

        it("should apply opened class when opened is true", () => {
            const { container } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper");
            expect(wrapper?.className).toContain("opened");
        });

        it("should not apply opened class when opened is false", () => {
            const { container } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper");
            expect(wrapper?.className).not.toContain("opened");
        });

        it("should apply topOverlay class to Overlay", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay")).toHaveClass("topOverlay");
        });

        it("should apply own classes to Overlay.Mask and Overlay.Panel", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay-mask")).toHaveClass("topOverlayMask");
            expect(screen.getByTestId("overlay-panel")).toHaveClass("topOverlayPanel");
        });
    });

    describe("Focus Trap", () => {
        it("should configure FocusTrap with clickOutsideDeactivates option", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(focusTrapMock).toHaveBeenCalled();
            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions?.clickOutsideDeactivates).toBeInstanceOf(Function);
        });

        it("should configure FocusTrap with preventScroll option", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions?.preventScroll).toBe(true);
        });

        it("should merge custom focusTrapProps with defaults", () => {
            const customFocusTrapOptions = {
                allowOutsideClick: true,
                returnFocusOnDeactivate: true,
            };

            render(
                <TopOverlay opened={true} focusTrapProps={{ focusTrapOptions: customFocusTrapOptions }}>
                    <TestContent />
                </TopOverlay>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions?.clickOutsideDeactivates).toBeInstanceOf(Function);
            expect(focusTrapProps.focusTrapOptions?.preventScroll).toBe(true);
            expect(focusTrapProps.focusTrapOptions?.allowOutsideClick).toBe(true);
            expect(focusTrapProps.focusTrapOptions?.returnFocusOnDeactivate).toBe(true);
        });

        it("should pass additional focusTrapProps", () => {
            render(
                <TopOverlay opened={true} focusTrapProps={{ paused: true }}>
                    <TestContent />
                </TopOverlay>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.paused).toBe(true);
        });

        it("should keep FocusTrap inactive until overlay is opened", () => {
            render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(getLastFocusTrapProps().active).toBe(false);
        });

        it("should activate FocusTrap when mounted already opened", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(getLastFocusTrapProps().active).toBe(true);
        });

        it("should activate FocusTrap after overlay is opened and deactivate on closing", () => {
            const { rerender } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            rerender(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(getLastFocusTrapProps().active).toBe(true);

            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(getLastFocusTrapProps().active).toBe(false);
        });
    });

    describe("Callbacks", () => {
        it("should call onOpen when overlay opens", () => {
            const handleOpen = vi.fn();

            const { rerender } = render(
                <TopOverlay opened={false} onOpen={handleOpen}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleOpen).not.toHaveBeenCalled();

            rerender(
                <TopOverlay opened={true} onOpen={handleOpen}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleOpen).toHaveBeenCalledTimes(1);
            expect(handleOpen).toHaveBeenCalledWith();
        });

        it("should call onOpen when mounted already opened", () => {
            const handleOpen = vi.fn();

            render(
                <TopOverlay opened={true} onOpen={handleOpen}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleOpen).toHaveBeenCalledTimes(1);
            expect(handleOpen).toHaveBeenCalledWith();
        });

        it("should call onClose when overlay closes", () => {
            const handleClose = vi.fn();

            const { rerender } = render(
                <TopOverlay opened={true} onClose={handleClose}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleClose).not.toHaveBeenCalled();

            rerender(
                <TopOverlay opened={false} onClose={handleClose}>
                    <TestContent />
                </TopOverlay>,
            );

            // Переход opened → false запускает только анимацию закрытия, onClose ждёт её завершения.
            expect(handleClose).not.toHaveBeenCalled();

            fireEvent.click(screen.getByTestId("overlay-finish-closing"));

            expect(handleClose).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledWith();
        });

        it("should pass TOP direction down to Overlay", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(screen.getByTestId("overlay")).toHaveAttribute("data-direction", EOverlayDirection.TOP);
        });

        it("should pass a safe no-op setOpened to Overlay", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(() => fireEvent.click(screen.getByTestId("overlay-set-opened"))).not.toThrow();
        });

        it("should not call onOpen when opened is false", () => {
            const handleOpen = vi.fn();

            render(
                <TopOverlay opened={false} onOpen={handleOpen}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleOpen).not.toHaveBeenCalled();
        });

        it("should work without callbacks", () => {
            const { rerender } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(() =>
                rerender(
                    <TopOverlay opened={true}>
                        <TestContent />
                    </TopOverlay>,
                ),
            ).not.toThrow();
        });
    });

    describe("Wrapper Styles", () => {
        it("should not set inline top style when overlayWrapperTopPosition is 0", () => {
            const { container } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.style.top).toBe("");
        });

        it("should recalculate inline top style on open and reset it on close", () => {
            vi.spyOn(window, "getComputedStyle").mockReturnValue({
                getPropertyValue: () => "0px",
            } as unknown as CSSStyleDeclaration);
            // Обёртка отрисована выше вьюпорта — позиционирование должно быть скорректировано.
            vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
                top: -40,
            } as DOMRect);

            const { container, rerender } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.style.top).toBe("");

            rerender(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            // Пересчёт при открытии идёт дважды: из onOpen и из собственного эффекта по opened.
            // При top = -40 и --lightBox-screen-top = 0px это даёт 0 + 40, затем 40 + 40.
            expect(wrapper.style.top).toBe("80px");

            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );
            fireEvent.click(screen.getByTestId("overlay-finish-closing"));

            expect(wrapper.style.top).toBe("");
        });
    });

    describe("Wrapper Styles on mount", () => {
        it("should not correct inline top style when mounted already opened", () => {
            vi.spyOn(window, "getComputedStyle").mockReturnValue({
                getPropertyValue: () => "0px",
            } as unknown as CSSStyleDeclaration);
            vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: -40 } as DOMRect);

            const { container } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            // На маунте лайтбокс ещё не на своём месте, измерять нечего — позицию задают стили.
            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.style.top).toBe("");
        });

        it("should correct inline top style on the first open after mounting already opened", () => {
            vi.spyOn(window, "getComputedStyle").mockReturnValue({
                getPropertyValue: () => "0px",
            } as unknown as CSSStyleDeclaration);
            vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: -40 } as DOMRect);

            const { container, rerender } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );
            fireEvent.click(screen.getByTestId("overlay-finish-closing"));
            rerender(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.style.top).toBe("80px");
        });
    });

    describe("Props Forwarding", () => {
        it("should forward ref to the wrapper element", () => {
            const ref = React.createRef<HTMLDivElement>();

            const { container } = render(
                <TopOverlay opened={false} ref={ref}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(ref.current).toBe(container.querySelector(".topOverlayWrapper"));
        });

        it("should merge consumer className with own wrapper classes", () => {
            const { container } = render(
                <TopOverlay opened={true} className="custom-class">
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.className).toContain("custom-class");
            expect(wrapper.className).toContain("opened");
        });

        it("should put html attributes on the wrapper element", () => {
            const { container } = render(
                <TopOverlay opened={false} id="top-overlay" aria-label="Верхняя панель" data-test-id="top-overlay">
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper).toHaveAttribute("id", "top-overlay");
            expect(wrapper).toHaveAttribute("aria-label", "Верхняя панель");
            expect(wrapper).toHaveAttribute("data-test-id", "top-overlay");
            // Атрибуты остаются на обёртке и не уезжают во вложенный Overlay.
            expect(screen.getByTestId("overlay")).not.toHaveAttribute("id");
        });

        it("should keep consumer style but override top with the calculated position", () => {
            vi.spyOn(window, "getComputedStyle").mockReturnValue({
                getPropertyValue: () => "0px",
            } as unknown as CSSStyleDeclaration);
            vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: -40 } as DOMRect);

            const { container, rerender } = render(
                <TopOverlay opened={false} style={{ top: "10px", zIndex: 5 }}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.style.top).toBe("10px");

            rerender(
                <TopOverlay opened={true} style={{ top: "10px", zIndex: 5 }}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(wrapper.style.zIndex).toBe("5");
            expect(wrapper.style.top).toBe("80px");
        });
    });

    describe("Closing State", () => {
        it("should apply closing class while the overlay is closing and drop it when closing is done", () => {
            const { container, rerender } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.className).not.toContain("closing");

            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            // Анимация закрытия ещё идёт — обёртка должна остаться раскрытой вниз.
            expect(wrapper.className).toContain("closing");

            fireEvent.click(screen.getByTestId("overlay-finish-closing"));

            expect(wrapper.className).not.toContain("closing");
        });

        it("should not apply closing class on the first render when opened is false", () => {
            const { container } = render(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            const wrapper = container.querySelector(".topOverlayWrapper") as HTMLElement;
            expect(wrapper.className).not.toContain("closing");
        });
    });
});
