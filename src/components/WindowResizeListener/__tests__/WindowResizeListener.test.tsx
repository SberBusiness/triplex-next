import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WindowResizeListener } from "../WindowResizeListener";

describe("WindowResizeListener", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders children as is, without own markup", () => {
        const { container } = render(
            <WindowResizeListener onResize={() => {}}>
                <span>Content</span>
            </WindowResizeListener>,
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
        expect(container.firstChild).toBe(screen.getByText("Content"));
    });

    it("renders nothing when children are not passed", () => {
        const { container } = render(<WindowResizeListener onResize={() => {}} />);

        expect(container).toBeEmptyDOMElement();
    });

    // Инвариант: возвращается children ?? null, поэтому falsy-children (0, "") рендерятся.
    // Замена ?? на || отбросила бы этот узел — кейс её ловит.
    it("renders falsy children", () => {
        const { container } = render(<WindowResizeListener onResize={() => {}}>{0}</WindowResizeListener>);

        expect(container).toHaveTextContent("0");
    });

    it("calls onResize with the resize event", () => {
        const onResize = vi.fn();

        render(<WindowResizeListener onResize={onResize} />);
        fireEvent(window, new Event("resize"));

        expect(onResize).toHaveBeenCalledTimes(1);
        expect(onResize).toHaveBeenCalledWith(expect.objectContaining({ type: "resize" }));
    });

    it("throttles onResize with the default delay of 100ms", () => {
        const onResize = vi.fn();

        render(<WindowResizeListener onResize={onResize} />);

        fireEvent(window, new Event("resize"));
        fireEvent(window, new Event("resize"));
        fireEvent(window, new Event("resize"));

        // Leading-вызов происходит синхронно, остальные события схлопываются в один trailing-вызов.
        expect(onResize).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);

        expect(onResize).toHaveBeenCalledTimes(2);
    });

    it("uses throttleDelay for the throttle window", () => {
        const onResize = vi.fn();

        render(<WindowResizeListener onResize={onResize} throttleDelay={500} />);

        fireEvent(window, new Event("resize"));
        fireEvent(window, new Event("resize"));

        expect(onResize).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        expect(onResize).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(400);
        expect(onResize).toHaveBeenCalledTimes(2);
    });

    it("stops calling onResize after unmount", () => {
        const onResize = vi.fn();

        const { unmount } = render(<WindowResizeListener onResize={onResize} />);
        unmount();
        fireEvent(window, new Event("resize"));
        vi.advanceTimersByTime(100);

        expect(onResize).not.toHaveBeenCalled();
    });

    it("cancels the pending trailing call on unmount", () => {
        const onResize = vi.fn();

        const { unmount } = render(<WindowResizeListener onResize={onResize} />);

        fireEvent(window, new Event("resize"));
        fireEvent(window, new Event("resize"));
        expect(onResize).toHaveBeenCalledTimes(1);

        unmount();
        vi.advanceTimersByTime(100);

        expect(onResize).toHaveBeenCalledTimes(1);
    });

    it("resubscribes with the new handler when onResize changes", () => {
        const onResize = vi.fn();
        const nextOnResize = vi.fn();

        const { rerender } = render(<WindowResizeListener onResize={onResize} />);
        rerender(<WindowResizeListener onResize={nextOnResize} />);

        fireEvent(window, new Event("resize"));

        expect(onResize).not.toHaveBeenCalled();
        expect(nextOnResize).toHaveBeenCalledTimes(1);
    });

    it("resubscribes with the new delay when throttleDelay changes", () => {
        const onResize = vi.fn();

        const { rerender } = render(<WindowResizeListener onResize={onResize} throttleDelay={100} />);
        rerender(<WindowResizeListener onResize={onResize} throttleDelay={1000} />);

        fireEvent(window, new Event("resize"));
        fireEvent(window, new Event("resize"));

        expect(onResize).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(100);
        expect(onResize).toHaveBeenCalledTimes(1);

        vi.advanceTimersByTime(900);
        expect(onResize).toHaveBeenCalledTimes(2);
    });
});
