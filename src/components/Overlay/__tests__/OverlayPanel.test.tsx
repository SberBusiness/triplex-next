import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { OverlayPanel, IOverlayPanelProps } from "../OverlayPanel";
import { EOverlayDirection } from "../OverlayBase";

afterEach(cleanup);

const baseProps: IOverlayPanelProps = {
    closing: false,
    direction: EOverlayDirection.RIGHT,
    opened: false,
    opening: false,
    setClosing: vi.fn(),
    setOpened: vi.fn(),
    setOpening: vi.fn(),
};

describe("OverlayPanel", () => {
    it.each([
        [EOverlayDirection.BOTTOM, "bottom"],
        [EOverlayDirection.LEFT, "left"],
        [EOverlayDirection.RIGHT, "right"],
        [EOverlayDirection.TOP, "top"],
    ])("applies %s direction class %s", (direction, expectedClass) => {
        render(
            <OverlayPanel {...baseProps} direction={direction} data-testid="panel">
                content
            </OverlayPanel>,
        );

        const panel = screen.getByTestId("panel");
        expect(panel).toHaveClass("overlayPanel");
        expect(panel).toHaveClass(expectedClass);
    });

    it("applies only the class matching the current direction", () => {
        render(
            <OverlayPanel {...baseProps} direction={EOverlayDirection.LEFT} data-testid="panel">
                content
            </OverlayPanel>,
        );

        const panel = screen.getByTestId("panel");
        expect(panel).toHaveClass("left");
        expect(panel).not.toHaveClass("right");
        expect(panel).not.toHaveClass("top");
        expect(panel).not.toHaveClass("bottom");
    });

    it("applies opened class when opened is true", () => {
        render(
            <OverlayPanel {...baseProps} opened data-testid="panel">
                content
            </OverlayPanel>,
        );

        expect(screen.getByTestId("panel")).toHaveClass("opened");
    });

    it("renders children inside the content wrapper", () => {
        render(
            <OverlayPanel {...baseProps} data-testid="panel">
                <span data-testid="child">child</span>
            </OverlayPanel>,
        );

        expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("resets closing and opening flags on own transition end", () => {
        const setClosing = vi.fn();
        const setOpening = vi.fn();
        const onTransitionEnd = vi.fn();

        render(
            <OverlayPanel
                {...baseProps}
                setClosing={setClosing}
                setOpening={setOpening}
                onTransitionEnd={onTransitionEnd}
                data-testid="panel"
            >
                content
            </OverlayPanel>,
        );

        const panel = screen.getByTestId("panel");
        fireEvent.transitionEnd(panel);

        expect(setClosing).toHaveBeenCalledWith(false);
        expect(setOpening).toHaveBeenCalledWith(false);
        expect(onTransitionEnd).toHaveBeenCalled();
    });

    it("does not reset flags when transition bubbles from a descendant", () => {
        const setClosing = vi.fn();
        const setOpening = vi.fn();

        render(
            <OverlayPanel {...baseProps} setClosing={setClosing} setOpening={setOpening} data-testid="panel">
                <button data-testid="inner">inner</button>
            </OverlayPanel>,
        );

        fireEvent.transitionEnd(screen.getByTestId("inner"));

        expect(setClosing).not.toHaveBeenCalled();
        expect(setOpening).not.toHaveBeenCalled();
    });

    it("forwards ref to the panel div", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <OverlayPanel {...baseProps} ref={ref} data-testid="panel">
                content
            </OverlayPanel>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("overlayPanel");
    });

    it("has correct displayName", () => {
        expect(OverlayPanel.displayName).toBe("OverlayPanel");
    });
});
