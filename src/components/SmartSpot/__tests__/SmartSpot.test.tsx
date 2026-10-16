import React, { createRef } from "react";
import { act, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { SmartSpot } from "../SmartSpot";
import { ESmartSpotAnimation, ESmartSpotStatus } from "../enums";
import { getSmartSpotFrame } from "../utils";

describe("SmartSpot", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should render four spots for each status", () => {
        Object.values(ESmartSpotStatus).forEach((status) => {
            const { container, unmount } = render(<SmartSpot status={status} animation={ESmartSpotAnimation.NONE} />);

            expect(container.querySelectorAll(".spot")).toHaveLength(4);
            unmount();
        });
    });

    it("should pass blur to runtime variable", () => {
        const { container } = render(<SmartSpot status={ESmartSpotStatus.SUCCESS} blur={40} />);

        expect(container.firstChild).toHaveStyle({ "--triplex-next-runtime-SmartSpot-Blur_Sigma": "40px" });
    });

    it("should hide background with hideBackground", () => {
        const { container } = render(<SmartSpot status={ESmartSpotStatus.SUCCESS} hideBackground />);

        expect(container.firstChild).toHaveClass("hideBackground");
    });

    it("should continue from the current point when duration changes", () => {
        let now = 0;
        let callback: FrameRequestCallback | undefined;
        vi.spyOn(performance, "now").mockImplementation(() => now);
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
            callback = cb;
            return 1;
        });
        vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
        const frame = (time: number) => {
            now = time;
            act(() => callback?.(time));
        };
        const getMoveX = (container: HTMLElement) =>
            (container.querySelector(".move") as HTMLElement).style.getPropertyValue(
                "--triplex-next-runtime-SmartSpot-Move_X",
            );

        const { container, rerender } = render(
            <SmartSpot status={ESmartSpotStatus.SUCCESS} animation={ESmartSpotAnimation.DRIFT} duration={8000} />,
        );

        // Четверть цикла: Drift в точке (+50, 0).
        frame(2000);
        expect(parseFloat(getMoveX(container))).toBeCloseTo(50);

        rerender(<SmartSpot status={ESmartSpotStatus.SUCCESS} animation={ESmartSpotAnimation.DRIFT} duration={4000} />);
        // Следующий кадр сразу после смены длительности — та же точка, без скачка.
        frame(2000);
        expect(parseFloat(getMoveX(container))).toBeCloseTo(50);
    });

    it("should forward ref, className and rest props, and render children", () => {
        const ref = createRef<HTMLDivElement>();

        render(
            <SmartSpot status={ESmartSpotStatus.ERROR} className="custom" data-testid="root" ref={ref}>
                content
            </SmartSpot>,
        );

        expect(ref.current).toBe(screen.getByTestId("root"));
        expect(ref.current).toHaveClass("custom");
        expect(screen.getByText("content")).toBeInTheDocument();
    });
});

describe("getSmartSpotFrame", () => {
    it("should start drift at (0, +25)", () => {
        const f = getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 0);

        expect(f.x).toBeCloseTo(0);
        expect(f.y).toBeCloseTo(25);
        expect(f.scale).toBe(1);
    });

    it("should start orbit at (+250, 0)", () => {
        const f = getSmartSpotFrame(ESmartSpotAnimation.ORBIT, 0);

        expect(f.x).toBeCloseTo(250);
        expect(f.y).toBeCloseTo(0);
    });

    it("should breathe 0.9 → 1.1 → 0.9 with period 2T", () => {
        const preset = ESmartSpotAnimation.BREATHING;

        expect(getSmartSpotFrame(preset, 0).scale).toBeCloseTo(0.9);
        expect(getSmartSpotFrame(preset, 4000).scale).toBeCloseTo(1.1);
        expect(getSmartSpotFrame(preset, 8000).scale).toBeCloseTo(0.9);
    });

    it("should override distance and duration, keeping ellipse proportions", () => {
        const motion = { distance: 20, duration: 2000 };

        expect(getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 0, motion).y).toBeCloseTo(10);
        expect(getSmartSpotFrame(ESmartSpotAnimation.DRIFT, 500, motion).x).toBeCloseTo(20);
        expect(getSmartSpotFrame(ESmartSpotAnimation.BREATHING, 1000, motion).scale).toBeCloseTo(1.1);
    });

    it("should not move for none", () => {
        expect(getSmartSpotFrame(ESmartSpotAnimation.NONE, 1234)).toEqual({ x: 0, y: 0, scale: 1 });
    });
});
