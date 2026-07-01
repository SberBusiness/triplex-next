import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { act, render, screen } from "@testing-library/react";
import { LightBoxContent } from "../LightBoxContent";

vi.mock("react-resize-detector", () => ({
    useResizeDetector: () => ({ ref: vi.fn() }),
}));

vi.mock("../../WindowResizeListener/WindowResizeListener", () => ({
    WindowResizeListener: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

describe("LightBoxContent", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("applies padding after requestAnimationFrame", async () => {
        const controlsNode = document.createElement("div");
        Object.defineProperty(controlsNode, "offsetHeight", { value: 48, configurable: true });
        vi.spyOn(document, "querySelector").mockReturnValue(controlsNode);

        render(
            <LightBoxContent>
                <span>Body content</span>
            </LightBoxContent>,
        );

        const container = screen.getByText("Body content").parentElement as HTMLDivElement;
        expect(container.style.paddingTop).toBe("");

        await act(async () => {
            await new Promise(requestAnimationFrame);
        });

        expect(container.style.paddingTop).toBe("48px");
    });

    it("renders loader overlay with provided title", () => {
        render(
            <LightBoxContent isLoading loaderScreenProps={{ description: "Loading message" }}>
                <span>Body content</span>
            </LightBoxContent>,
        );

        const status = screen.getByRole("status", { name: /loading/i });
        expect(status).toBeInTheDocument();
    });
});
