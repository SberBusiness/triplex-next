import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { FocusTrapProps } from "focus-trap-react";
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
    opened: boolean;
    onClose?: () => void;
    onClosing?: () => void;
    onOpen?: () => void;
}

interface IOverlayPartMockProps {
    children?: React.ReactNode;
    className?: string;
    opened?: boolean;
}

vi.mock("../../Overlay/Overlay", () => {
    /**
     * Мок Overlay, повторяющий контракт OverlayBase: колбэки вызываются только на переходах opened,
     * на маунте — нет. Иначе тесты ловят поведение мока, а не компонента.
     */
    const OverlayMock = ({ children, className, opened, onClose, onClosing, onOpen }: IOverlayMockProps) => {
        const callbacks = React.useRef({ onClose, onClosing, onOpen });
        const isFirstRender = React.useRef(true);

        React.useLayoutEffect(() => {
            callbacks.current = { onClose, onClosing, onOpen };
        });

        React.useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }

            if (opened) {
                callbacks.current.onOpen?.();
            } else {
                callbacks.current.onClosing?.();
                callbacks.current.onClose?.();
            }
        }, [opened]);

        return (
            <div data-testid="overlay" className={className} data-opened={opened}>
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

vi.mock("../../Overlay/OverlayBase", () => ({
    EOverlayDirection: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
    },
}));

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

            expect(handleClose).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledWith();
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

            expect(wrapper.style.top).not.toBe("");

            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(wrapper.style.top).toBe("");
        });
    });

    describe("Closing State", () => {
        it("should set closing state when opened changes from true to false", () => {
            // Тестируем через проверку, что компонент отрабатывает смену состояния opened
            const { container, rerender } = render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            // Изначально opened
            let wrapper = container.querySelector(".topOverlayWrapper");
            expect(wrapper?.className).toContain("opened");

            // Закрываем - проверяем что компонент рендерится корректно
            rerender(
                <TopOverlay opened={false}>
                    <TestContent />
                </TopOverlay>,
            );

            wrapper = container.querySelector(".topOverlayWrapper");
            // После закрытия не должен быть opened
            expect(wrapper?.className).not.toContain("opened");
        });
    });
});
