import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { Overlay } from "../Overlay";
import { EOverlayDirection } from "../OverlayBase";

afterEach(cleanup);

const renderOverlay = (props: Partial<React.ComponentProps<typeof Overlay>> = {}) =>
    render(
        <Overlay
            data-testid="overlay-root"
            direction={EOverlayDirection.RIGHT}
            opened={false}
            setOpened={vi.fn()}
            {...props}
        >
            {(provideProps) => (
                <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                    <span>content</span>
                </Overlay.Panel>
            )}
        </Overlay>,
    );

describe("Overlay", () => {
    it("renders the root div with overlay class and forwards children render prop", () => {
        renderOverlay();

        const root = screen.getByTestId("overlay-root");
        expect(root).toBeInTheDocument();
        expect(root.tagName).toBe("DIV");
        expect(root).toHaveClass("overlay");
        expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("applies opened class when opened", () => {
        renderOverlay({ opened: true });
        expect(screen.getByTestId("overlay-root")).toHaveClass("opened");
    });

    it("applies fixed class when fixed is true", () => {
        renderOverlay({ fixed: true });
        expect(screen.getByTestId("overlay-root")).toHaveClass("fixed");
    });

    it("merges custom className with internal classes", () => {
        renderOverlay({ className: "custom-overlay" });
        const root = screen.getByTestId("overlay-root");
        expect(root).toHaveClass("overlay");
        expect(root).toHaveClass("custom-overlay");
    });

    it("forwards extra html attributes to the root div", () => {
        renderOverlay({ id: "my-overlay", "aria-label": "Overlay" } as never);
        const root = screen.getByTestId("overlay-root");
        expect(root).toHaveAttribute("id", "my-overlay");
        expect(root).toHaveAttribute("aria-label", "Overlay");
    });

    it("transitions opened -> closing: marks closing and calls onClosing when opened changes true to false", () => {
        const onClosing = vi.fn();
        const onClose = vi.fn();

        const { rerender } = render(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened
                setOpened={vi.fn()}
                onClosing={onClosing}
                onClose={onClose}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        expect(onClosing).not.toHaveBeenCalled();

        rerender(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened={false}
                setOpened={vi.fn()}
                onClosing={onClosing}
                onClose={onClose}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        // Переход в состояние закрытия отражается классом closing на корневом div.
        expect(screen.getByTestId("overlay-root")).toHaveClass("closing");
        // onClosing вызывается ровно один раз при переходе opened: true -> false.
        expect(onClosing).toHaveBeenCalledTimes(1);
        // onClose ещё не вызывается, пока closing не сброшен.
        expect(onClose).not.toHaveBeenCalled();
    });

    it("transitions closed -> opening: calls onOpening exactly once when opened changes false to true", () => {
        const onOpening = vi.fn();
        const onOpen = vi.fn();

        const { rerender } = render(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened={false}
                setOpened={vi.fn()}
                onOpening={onOpening}
                onOpen={onOpen}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        expect(onOpening).not.toHaveBeenCalled();

        rerender(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened
                setOpened={vi.fn()}
                onOpening={onOpening}
                onOpen={onOpen}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        // onOpening вызывается ровно один раз при переходе opened: false -> true.
        expect(onOpening).toHaveBeenCalledTimes(1);
        // onOpen вызывается только после завершения transition.
        expect(onOpen).not.toHaveBeenCalled();
    });

    it("calls onClose after the panel transition ends and clears closing", () => {
        const onClose = vi.fn();
        const onClosing = vi.fn();

        const { rerender } = render(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened
                setOpened={vi.fn()}
                onClose={onClose}
                onClosing={onClosing}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        rerender(
            <Overlay
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened={false}
                setOpened={vi.fn()}
                onClose={onClose}
                onClosing={onClosing}
            >
                {(provideProps) => (
                    <Overlay.Panel data-testid="overlay-panel" {...provideProps}>
                        content
                    </Overlay.Panel>
                )}
            </Overlay>,
        );

        expect(screen.getByTestId("overlay-root")).toHaveClass("closing");

        // Завершение transition сбрасывает closing -> вызывается onClose.
        const panel = screen.getByTestId("overlay-panel");
        fireEvent.transitionEnd(panel);

        expect(screen.getByTestId("overlay-root")).not.toHaveClass("closing");
        expect(onClose).toHaveBeenCalled();
    });

    it("exposes Mask and Panel static subcomponents and displayName", () => {
        expect(Overlay.displayName).toBe("Overlay");
        expect(Overlay.Mask).toBeDefined();
        expect(Overlay.Panel).toBeDefined();
    });

    it("forwards ref to the root div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <Overlay
                ref={ref}
                data-testid="overlay-root"
                direction={EOverlayDirection.RIGHT}
                opened={false}
                setOpened={vi.fn()}
            >
                {(provideProps) => <Overlay.Panel {...provideProps}>content</Overlay.Panel>}
            </Overlay>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("overlay");
    });
});
