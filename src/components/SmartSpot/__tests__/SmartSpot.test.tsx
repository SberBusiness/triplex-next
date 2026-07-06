import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SmartSpot } from "../SmartSpot";
import { ESmartSpotAnimation, ESmartSpotStatus } from "../enums";
import { getSmartSpotFrame } from "../utils";

describe("SmartSpot", () => {
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

    it("should not move for none", () => {
        expect(getSmartSpotFrame(ESmartSpotAnimation.NONE, 1234)).toEqual({ x: 0, y: 0, scale: 1 });
    });
});
