import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ModalWindow } from "../ModalWindow";
import { EComponentSize } from "@sberbusiness/triplex-next/enums/EComponentSize";

const focusTrapMock = vi.fn();
const cssTransitionMock = vi.fn();

vi.mock("focus-trap-react", () => ({
    default: (props: { children: React.ReactElement }) => {
        focusTrapMock(props);
        return <div data-testid="focus-trap">{props.children}</div>;
    },
}));

vi.mock("react-transition-group", () => ({
    CSSTransition: (props: any) => {
        cssTransitionMock(props);
        // Simulate the transition lifecycle by calling callbacks
        if (props.in && props.onEnter) {
            props.onEnter();
        }
        if (!props.in && props.onExited) {
            // Simulate calling onExited when transitioning out
            setTimeout(() => props.onExited(), 0);
        }
        return props.in ? <div data-testid="css-transition">{props.children}</div> : null;
    },
}));

vi.mock("../../Portal/Portal", () => ({
    Portal: ({ children, container }: { children: React.ReactNode; container?: Element }) => (
        <div data-testid="portal" data-container={container?.id}>
            {children}
        </div>
    ),
}));

vi.mock("../components/ModalWindowViewManager", () => ({
    ModalWindowViewManager: () => <div data-testid="view-manager" />,
}));

vi.mock("../../ThemeProvider/useToken", () => ({
    useToken: () => ({
        scopeClassName: "theme-scope",
    }),
}));

const TestContent = () => <div data-testid="test-content">Modal Content</div>;
const TestCloseButton = () => <button data-testid="close-button">Close</button>;

describe("ModalWindow", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        document.body.className = "";
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
        document.body.innerHTML = "";
        document.body.className = "";
        vi.useRealTimers();
    });

    describe("Basic Rendering", () => {
        it("should not render when isOpen is false", () => {
            render(
                <ModalWindow isOpen={false} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.queryByTestId("test-content")).not.toBeInTheDocument();
        });

        it("should render when isOpen is true", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByTestId("test-content")).toBeInTheDocument();
        });
    });

    describe("Size Classes", () => {
        it("should apply size classes correctly", () => {
            const { rerender } = render(
                <ModalWindow isOpen={true} size={EComponentSize.SM} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByRole("dialog")).toHaveClass("sm");

            rerender(
                <ModalWindow isOpen={true} size={EComponentSize.MD} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByRole("dialog")).toHaveClass("md");

            rerender(
                <ModalWindow isOpen={true} size={EComponentSize.LG} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByRole("dialog")).toHaveClass("lg");
        });

        it("should use MD size by default", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByRole("dialog")).toHaveClass("md");
        });
    });

    describe("Portal Behavior", () => {
        it("should create portal wrapper node when opened", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const wrapperNode = document.getElementById("ufs-modal-window-wrapper");
            expect(wrapperNode).toBeInTheDocument();
            expect(wrapperNode?.tagName).toBe("DIV");
        });

        it("should create portal node inside wrapper when opened", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const wrapperNode = document.getElementById("ufs-modal-window-wrapper");
            const portalNode = wrapperNode?.querySelector(".ufs-modal-window-portal-node");
            expect(portalNode).toBeInTheDocument();
        });

        it("should render content through portal", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByTestId("portal")).toBeInTheDocument();
            expect(screen.getByTestId("test-content")).toBeInTheDocument();
        });

        it("should not create portal nodes when closed", () => {
            render(
                <ModalWindow isOpen={false} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const wrapperNode = document.getElementById("ufs-modal-window-wrapper");
            expect(wrapperNode).toBeNull();
        });
    });

    describe("Focus Trap", () => {
        it("should render focus trap with correct active state", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(focusTrapMock).toHaveBeenCalled();
            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.active).toBe(true);
        });

        it("should configure focus trap with correct default options", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions.clickOutsideDeactivates).toBe(true);
            expect(focusTrapProps.focusTrapOptions.preventScroll).toBe(true);
        });

        it("should merge custom focus trap options with defaults", () => {
            const customOptions = { escapeDeactivates: false };

            render(
                <ModalWindow
                    isOpen={true}
                    closeButton={<TestCloseButton />}
                    focusTrapProps={{ focusTrapOptions: customOptions }}
                >
                    <TestContent />
                </ModalWindow>,
            );

            const focusTrapProps = focusTrapMock.mock.calls[0][0];
            expect(focusTrapProps.focusTrapOptions.clickOutsideDeactivates).toBe(true);
            expect(focusTrapProps.focusTrapOptions.preventScroll).toBe(true);
            expect(focusTrapProps.focusTrapOptions.escapeDeactivates).toBe(false);
        });
    });

    describe("Body Classes", () => {
        it("should add modal classes to body when opened", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(document.body).toHaveClass("modal-open");
            expect(document.body).toHaveClass("no-hash-overflow-hidden");
        });

        it("should remove modal classes from body when closed", () => {
            const { unmount } = render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(document.body).toHaveClass("modal-open");
            expect(document.body).toHaveClass("no-hash-overflow-hidden");

            unmount();

            expect(document.body).not.toHaveClass("modal-open");
            expect(document.body).not.toHaveClass("no-hash-overflow-hidden");
        });

        it("should not add modal classes when not opened", () => {
            render(
                <ModalWindow isOpen={false} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(document.body).not.toHaveClass("modal-open");
            expect(document.body).not.toHaveClass("no-hash-overflow-hidden");
        });
    });

    describe("Accessibility", () => {
        it("should render with correct dialog role", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const dialog = screen.getByRole("dialog");
            expect(dialog).toBeInTheDocument();
        });

        it("should have aria-modal attribute set to true", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveAttribute("aria-modal", "true");
        });

        it("should pass through additional HTML attributes", () => {
            render(
                <ModalWindow
                    isOpen={true}
                    closeButton={<TestCloseButton />}
                    data-testid="custom-modal"
                    aria-label="Test Modal"
                >
                    <TestContent />
                </ModalWindow>,
            );

            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveAttribute("data-testid", "custom-modal");
            expect(dialog).toHaveAttribute("aria-label", "Test Modal");
        });
    });

    describe("Ref Forwarding", () => {
        it("should forward ref to the dialog element", () => {
            const ref = React.createRef<HTMLDivElement>();
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />} ref={ref}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(ref.current).toBeInstanceOf(HTMLDivElement);
            expect(ref.current).toBe(screen.getByRole("dialog"));
        });

        it("should call ref function when provided", () => {
            const refFn = vi.fn();
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />} ref={refFn}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(refFn).toHaveBeenCalledWith(screen.getByRole("dialog"));
        });
    });

    describe("Class Name Merging", () => {
        it("should apply custom className to modal window", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />} className="custom-modal-class">
                    <TestContent />
                </ModalWindow>,
            );

            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveClass("custom-modal-class");
            expect(dialog).toHaveClass("modalWindow");
            expect(dialog).toHaveClass("md");
        });

        it("should apply containerClassName to container element", () => {
            render(
                <ModalWindow
                    isOpen={true}
                    closeButton={<TestCloseButton />}
                    containerClassName="custom-container-class"
                >
                    <TestContent />
                </ModalWindow>,
            );

            // The container is the direct child of focus-trap
            const focusTrap = screen.getByTestId("focus-trap");
            const container = focusTrap.children[0] as HTMLElement;
            expect(container).toHaveClass("custom-container-class");
        });

        it("should merge multiple classes correctly", () => {
            render(
                <ModalWindow
                    isOpen={true}
                    closeButton={<TestCloseButton />}
                    className="class1 class2"
                    containerClassName="container1 container2"
                >
                    <TestContent />
                </ModalWindow>,
            );

            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveClass("class1");
            expect(dialog).toHaveClass("class2");

            const focusTrap = screen.getByTestId("focus-trap");
            const container = focusTrap.children[0] as HTMLElement;
            expect(container).toHaveClass("container1");
            expect(container).toHaveClass("container2");
        });
    });

    describe("Close Button", () => {
        it("should render close button inside modal content", () => {
            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            const closeButton = screen.getByTestId("close-button");
            expect(closeButton).toBeInTheDocument();

            // Close button should be inside the modal content wrapper
            const dialog = screen.getByRole("dialog");
            const contentWrapper = dialog.querySelector(".modalWindowContentWrapper");
            expect(contentWrapper).toContainElement(closeButton);
        });

        it("should render custom close button component", () => {
            const CustomCloseButton = () => <button data-testid="custom-close">×</button>;

            render(
                <ModalWindow isOpen={true} closeButton={<CustomCloseButton />}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(screen.getByTestId("custom-close")).toBeInTheDocument();
            expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
        });
    });

    describe("onExited Callback", () => {
        it("should call onExited callback when modal closes", async () => {
            const onExited = vi.fn();

            const { rerender } = render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />} onExited={onExited}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(onExited).not.toHaveBeenCalled();

            // Close the modal
            rerender(
                <ModalWindow isOpen={false} closeButton={<TestCloseButton />} onExited={onExited}>
                    <TestContent />
                </ModalWindow>,
            );

            // Wait for the exit animation to complete
            await new Promise((resolve) => setTimeout(resolve, 0));

            expect(onExited).toHaveBeenCalledTimes(1);
        });

        it("should not call onExited when modal opens", () => {
            const onExited = vi.fn();

            render(
                <ModalWindow isOpen={true} closeButton={<TestCloseButton />} onExited={onExited}>
                    <TestContent />
                </ModalWindow>,
            );

            expect(onExited).not.toHaveBeenCalled();
        });
    });
});
