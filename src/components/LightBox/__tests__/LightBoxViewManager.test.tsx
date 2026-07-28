import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { LightBoxViewManager } from "../LightBoxViewManager/LightBoxViewManager";
import { LightBoxViewManagerConsts } from "../LightBoxViewManager/LightBoxViewManagerConsts";

vi.mock("react-resize-detector", () => ({
    useResizeDetector: () => ({ ref: vi.fn() }),
}));

vi.mock("../../Portal/Portal", () => ({
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const createRect = (overrides: Partial<DOMRect> = {}): DOMRect =>
    ({
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        ...overrides,
    }) as DOMRect;

describe("LightBoxViewManager", () => {
    let mountNode: HTMLDivElement;
    let viewManagerNode: HTMLDivElement;

    beforeEach(() => {
        mountNode = document.createElement("div");
        viewManagerNode = document.createElement("div");
        document.body.appendChild(mountNode);
        document.body.appendChild(viewManagerNode);
    });

    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
        document.body.innerHTML = "";
    });

    const renderViewManager = () =>
        render(<LightBoxViewManager lightBoxMountNode={mountNode} lightBoxViewManagerNode={viewManagerNode} />);

    it("adds scope class name to the mount node", () => {
        renderViewManager();
        expect(mountNode.classList.contains("LightBoxMountNodeViewManager")).toBe(true);
    });

    it("adds narrow breakpoint class name when view node width is below media point", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(createRect({ width: 500 }));
        renderViewManager();
        expect(
            mountNode.classList.contains(
                LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"],
            ),
        ).toBe(true);
    });

    it("adds wide breakpoint class name and removes previous LB-classes when width is above media point", () => {
        mountNode.classList.add(LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"]);
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
            createRect({ width: LightBoxViewManagerConsts.lightBoxMediaPoint0 + 100 }),
        );
        renderViewManager();
        expect(
            mountNode.classList.contains(LightBoxViewManagerConsts.breakPointsClassNames["more-media-point-0"]),
        ).toBe(true);
        expect(
            mountNode.classList.contains(
                LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"],
            ),
        ).toBe(false);
    });

    it("removes scope and breakpoint class names from the mount node on unmount", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(createRect({ width: 500 }));
        const { unmount } = renderViewManager();

        unmount();

        expect(mountNode.classList.contains("LightBoxMountNodeViewManager")).toBe(false);
        expect(
            mountNode.classList.contains(
                LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"],
            ),
        ).toBe(false);
    });

    it("keeps mount node class names while another view manager of the same node is mounted", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(createRect({ width: 500 }));
        const first = renderViewManager();
        const second = renderViewManager();

        first.unmount();
        expect(mountNode.classList.contains("LightBoxMountNodeViewManager")).toBe(true);
        expect(
            mountNode.classList.contains(
                LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"],
            ),
        ).toBe(true);

        second.unmount();
        expect(mountNode.classList.contains("LightBoxMountNodeViewManager")).toBe(false);
        expect(
            mountNode.classList.contains(
                LightBoxViewManagerConsts.breakPointsClassNames["less-or-equal-media-point-0"],
            ),
        ).toBe(false);
    });

    it("renders style tag with CSS variables based on view node rect", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
            createRect({ x: 100, width: 800, height: 64 }),
        );
        const { container } = renderViewManager();

        const styleTag = container.querySelector("style");
        expect(styleTag?.textContent).toContain("--lightBox-screen-left: 100px");
        expect(styleTag?.textContent).toContain("--lightBox-screen-width: 800px");
        expect(styleTag?.textContent).toContain("--lightBox-screen-top: 64px");
    });

    it("clamps negative left coordinate to zero", () => {
        vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue(
            createRect({ x: -50, width: 800, height: 64 }),
        );
        const { container } = renderViewManager();

        const styleTag = container.querySelector("style");
        expect(styleTag?.textContent).toContain("--lightBox-screen-left: 0px");
    });
});
