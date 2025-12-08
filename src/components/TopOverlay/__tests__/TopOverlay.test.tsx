import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TopOverlay } from "../TopOverlay";

const focusTrapMock = vi.fn();

vi.mock("focus-trap-react", () => ({
    default: (props: any) => {
        focusTrapMock(props);
        return <div data-testid="focus-trap">{props.children}</div>;
    },
}));

vi.mock("../../Overlay/Overlay", () => ({
    Overlay: Object.assign(
        (props: any) => {
            const { children, opened, onOpen, onClose, onClosing, className } = props;
            // Вызываем onOpen при монтировании, если opened=true
            React.useEffect(() => {
                if (opened) {
                    onOpen?.();
                }
            }, [opened, onOpen]);

            // Вызываем onClosing и затем onClose при закрытии
            React.useEffect(() => {
                if (!opened) {
                    onClosing?.();
                    onClose?.();
                }
            }, [opened, onClose, onClosing]);

            return (
                <div data-testid="overlay" className={className} data-opened={opened}>
                    {typeof children === "function" ? children({ opened }) : children}
                </div>
            );
        },
        {
            Mask: ({ opened, className }: any) => (
                <div data-testid="overlay-mask" data-opened={opened} className={className} />
            ),
            Panel: ({ children, className }: any) => (
                <div data-testid="overlay-panel" className={className}>
                    {children}
                </div>
            ),
        },
    ),
}));

vi.mock("../../Overlay/OverlayBase", () => ({
    EOverlayDirection: {
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
    },
}));

const TestContent = () => <div data-testid="test-content">TopOverlay Content</div>;

describe("TopOverlay", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
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
            expect(focusTrapProps.focusTrapOptions.clickOutsideDeactivates).toBe(true);
        });

        it("should configure FocusTrap with preventScroll option", () => {
            render(
                <TopOverlay opened={true}>
                    <TestContent />
                </TopOverlay>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions.preventScroll).toBe(true);
        });

        it("should merge custom focusTrapProps with defaults", () => {
            const customFocusTrapOptions = {
                escapeDeactivates: false,
                returnFocusOnDeactivate: false,
            };

            render(
                <TopOverlay opened={true} focusTrapProps={{ focusTrapOptions: customFocusTrapOptions }}>
                    <TestContent />
                </TopOverlay>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions.clickOutsideDeactivates).toBe(true);
            expect(focusTrapProps.focusTrapOptions.preventScroll).toBe(true);
            expect(focusTrapProps.focusTrapOptions.escapeDeactivates).toBe(false);
            expect(focusTrapProps.focusTrapOptions.returnFocusOnDeactivate).toBe(false);
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
    });

    describe("Callbacks", () => {
        it("should call onOpen when overlay opens", () => {
            const handleOpen = vi.fn();

            render(
                <TopOverlay opened={true} onOpen={handleOpen}>
                    <TestContent />
                </TopOverlay>,
            );

            expect(handleOpen).toHaveBeenCalled();
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

            expect(handleClose).toHaveBeenCalled();
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

