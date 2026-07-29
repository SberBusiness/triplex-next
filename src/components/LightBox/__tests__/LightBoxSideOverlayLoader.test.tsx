import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { LightBoxSideOverlayLoader } from "../LightBoxSideOverlay/LightBoxSideOverlayLoader";

describe("LightBoxSideOverlayLoader", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        cleanup();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("keeps top position at zero when the parent is not scrolled", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: 0 } as DOMRect);

        const { container } = render(<LightBoxSideOverlayLoader />);
        act(() => {
            vi.runAllTimers();
        });

        expect((container.firstChild as HTMLElement).style.top).toBe("0px");
    });

    it("compensates parent scroll by setting top to the absolute rect top", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({ top: -120 } as DOMRect);

        const { container } = render(<LightBoxSideOverlayLoader />);
        act(() => {
            vi.runAllTimers();
        });

        expect((container.firstChild as HTMLElement).style.top).toBe("120px");
    });
});
