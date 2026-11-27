import React, { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { SmartSpot } from "../SmartSpot";
import { ESmartSpotAnimation, ESmartSpotShape } from "../enums";

/** Подменяет rAF и performance.now: кадры вызываются вручную через frame(time). */
const mockAnimationFrames = () => {
    let now = 0;
    let callback: FrameRequestCallback | undefined;
    let nextId = 1;

    vi.spyOn(performance, "now").mockImplementation(() => now);
    const requestSpy = vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
        callback = cb;
        return nextId++;
    });
    const cancelSpy = vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);

    const frame = (time: number) => {
        now = time;
        act(() => callback?.(time));
    };

    return { frame, requestSpy, cancelSpy };
};

const getRoot = (container: HTMLElement) => container.firstChild as HTMLElement;

const getMove = (container: HTMLElement) => container.querySelector(".move") as HTMLElement;

const getMoveVariable = (container: HTMLElement, name: "Move_X" | "Move_Y" | "Spot_Scale") =>
    parseFloat(getMove(container).style.getPropertyValue(`--triplex-next-runtime-SmartSpot-${name}`));

describe("SmartSpot", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders one figure", () => {
        const { container } = render(<SmartSpot animation={ESmartSpotAnimation.NONE} />);

        expect(container.querySelectorAll(".spot")).toHaveLength(1);
    });

    it("paints the figure with style.backgroundColor", () => {
        const { container, rerender } = render(
            <SmartSpot animation={ESmartSpotAnimation.NONE} style={{ backgroundColor: "red" }} />,
        );
        const root = getRoot(container);

        expect(root).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Spot_Color": "red" });
        expect(root.style.backgroundColor).toBe("");

        rerender(<SmartSpot animation={ESmartSpotAnimation.NONE} style={{ backgroundColor: "var(--accent-color)" }} />);
        expect(root).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Spot_Color": "var(--accent-color)" });

        rerender(<SmartSpot animation={ESmartSpotAnimation.NONE} />);
        expect(root.style.getPropertyValue("--triplex-next-runtime-SmartSpot-Spot_Color")).toBe("");
    });

    it("hides the figure from assistive technologies", () => {
        const { container } = render(<SmartSpot animation={ESmartSpotAnimation.NONE} />);

        expect(getRoot(container)).toHaveAttribute("aria-hidden", "true");
    });

    it("passes blur to runtime variable, 60px by default", () => {
        const { container, rerender } = render(<SmartSpot />);

        expect(getRoot(container)).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Blur_Sigma": "60px" });

        rerender(<SmartSpot blur={0} />);
        expect(getRoot(container)).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Blur_Sigma": "0px" });
    });

    it("merges style with the runtime variable", () => {
        const { container } = render(<SmartSpot style={{ position: "absolute", left: 20, width: 100 }} />);

        expect(getRoot(container)).toHaveStyle({ position: "absolute", left: "20px", width: "100px" });
        expect(getRoot(container)).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Blur_Sigma": "60px" });
    });

    it("applies shape class, circle by default", () => {
        const { container, rerender } = render(<SmartSpot />);

        expect(getRoot(container)).toHaveClass(ESmartSpotShape.CIRCLE);

        Object.values(ESmartSpotShape).forEach((shape) => {
            rerender(<SmartSpot shape={shape} />);
            expect(getRoot(container)).toHaveClass(shape);
        });
    });

    it("forwards ref to the root element, merges className and passes rest props", () => {
        const ref = createRef<HTMLDivElement>();

        render(<SmartSpot className="custom" data-testid="root" ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("root"));
        expect(ref.current).toHaveClass("smartSpot", "custom");
    });

    describe("animation", () => {
        it("applies the static frame and does not start rAF for none", () => {
            const { requestSpy } = mockAnimationFrames();
            const { container } = render(<SmartSpot animation={ESmartSpotAnimation.NONE} />);

            expect(requestSpy).not.toHaveBeenCalled();
            expect(getMoveVariable(container, "Move_X")).toBe(0);
            expect(getMoveVariable(container, "Move_Y")).toBe(0);
            expect(getMoveVariable(container, "Spot_Scale")).toBe(1);
        });

        it("applies the first frame synchronously and moves the figure on each frame for drift", () => {
            const { frame } = mockAnimationFrames();
            const { container } = render(<SmartSpot />);

            // Начальная точка Drift — (0, +25).
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(0);
            expect(getMoveVariable(container, "Move_Y")).toBeCloseTo(25);

            // Четверть цикла (6000 мс) — точка (+50, 0).
            frame(1500);
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(50);
            expect(getMoveVariable(container, "Move_Y")).toBeCloseTo(0);
        });

        it("scales the figure without moving it for breathing", () => {
            const { frame } = mockAnimationFrames();
            const { container } = render(<SmartSpot animation={ESmartSpotAnimation.BREATHING} />);

            expect(getMoveVariable(container, "Spot_Scale")).toBeCloseTo(0.9);

            frame(3000);
            expect(getMoveVariable(container, "Spot_Scale")).toBeCloseTo(1.1);
            expect(getMoveVariable(container, "Move_X")).toBe(0);
            expect(getMoveVariable(container, "Move_Y")).toBe(0);
        });

        it("ignores a first frame timestamp earlier than the start time", () => {
            const { frame } = mockAnimationFrames();
            vi.spyOn(performance, "now").mockReturnValue(1000);
            const { container } = render(<SmartSpot animation={ESmartSpotAnimation.BREATHING} />);

            frame(0);
            expect(getMoveVariable(container, "Spot_Scale")).toBeCloseTo(0.9);
        });

        it("continues from the current point when duration changes", () => {
            const { frame } = mockAnimationFrames();
            const { container, rerender } = render(<SmartSpot duration={8000} />);

            frame(2000);
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(50);

            rerender(<SmartSpot duration={4000} />);
            // Следующий кадр сразу после смены длительности — та же точка, без скачка.
            frame(2000);
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(50);

            // Ещё четверть нового цикла (1000 мс из 4000) — верхняя точка (0, -25).
            frame(3000);
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(0);
            expect(getMoveVariable(container, "Move_Y")).toBeCloseTo(-25);
        });

        it("applies a new distance on the next frame without restarting rAF", () => {
            const { frame, requestSpy, cancelSpy } = mockAnimationFrames();
            const { container, rerender } = render(<SmartSpot />);

            frame(1500);
            const requestCount = requestSpy.mock.calls.length;

            rerender(<SmartSpot distance={100} />);
            expect(cancelSpy).not.toHaveBeenCalled();

            frame(1500);
            expect(getMoveVariable(container, "Move_X")).toBeCloseTo(100);
            expect(requestSpy).toHaveBeenCalledTimes(requestCount + 1);
        });

        it("restarts the loop when animation changes and stops it for none", () => {
            const { requestSpy, cancelSpy } = mockAnimationFrames();
            const { container, rerender } = render(<SmartSpot />);

            const firstRafId = requestSpy.mock.results[0].value;
            rerender(<SmartSpot animation={ESmartSpotAnimation.BREATHING} />);
            expect(cancelSpy).toHaveBeenCalledWith(firstRafId);
            expect(requestSpy).toHaveBeenCalledTimes(2);

            const secondRafId = requestSpy.mock.results[1].value;
            rerender(<SmartSpot animation={ESmartSpotAnimation.NONE} />);
            expect(cancelSpy).toHaveBeenLastCalledWith(secondRafId);
            expect(requestSpy).toHaveBeenCalledTimes(2);
            expect(getMoveVariable(container, "Spot_Scale")).toBe(1);
        });

        it("cancels the scheduled frame on unmount", () => {
            const { frame, requestSpy, cancelSpy } = mockAnimationFrames();
            const { unmount } = render(<SmartSpot />);

            frame(16);
            const lastRafId = requestSpy.mock.results[requestSpy.mock.results.length - 1].value;
            unmount();

            expect(cancelSpy).toHaveBeenCalledWith(lastRafId);
        });
    });
});
