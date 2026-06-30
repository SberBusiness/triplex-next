import { describe, expect, it, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { LightBoxClose } from "../LightBoxControls/LightBoxClose";
import { LightBoxOverlayContext } from "../LightBoxOverlayContext";

vi.mock("@sberbusiness/icons-next", () => ({
    CrossStrokeSrvIcon32: () => <span data-testid="icon-close-desktop" />,
    CrossStrokeSrvIcon20: () => <span data-testid="icon-close-mobile" />,
}));

// Маркер, чтобы отличить кнопку, обёрнутую Esc-триггером, от обычной.
vi.mock("../../Triggers/TriggerClickOnKeyDownEvent", () => ({
    TriggerClickOnKeyDownEvent: ({ children }: { children: React.ReactElement }) => (
        <div data-testid="esc-trigger">{children}</div>
    ),
}));

const renderWithOverlayActive = (escCapturingOverlayActive: boolean) =>
    render(
        <LightBoxOverlayContext.Provider
            value={{ registerEscCapturingOverlay: () => () => undefined, escCapturingOverlayActive }}
        >
            <LightBoxClose onClick={vi.fn()} />
        </LightBoxOverlayContext.Provider>,
    );

describe("LightBoxClose Esc", () => {
    it("оборачивает кнопку Esc-триггером, когда нет активного TopOverlay", () => {
        renderWithOverlayActive(false);

        expect(screen.queryByTestId("esc-trigger")).not.toBeNull();
    });

    it("отключает Esc-триггер, когда на экране активен TopOverlay", () => {
        renderWithOverlayActive(true);

        expect(screen.queryByTestId("esc-trigger")).toBeNull();
    });
});
