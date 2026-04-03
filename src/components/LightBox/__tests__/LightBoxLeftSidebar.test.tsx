import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { LightBoxLeftSidebar } from "../LightBoxSidebars/LightBoxLeftSidebar";
import styles from "../LightBoxSidebars/styles/LightBoxLeftSidebar.module.less";

describe("LightBoxLeftSidebar", () => {
    let triggerResize: (width: number) => void;

    beforeEach(() => {
        vi.stubGlobal(
            "ResizeObserver",
            vi.fn().mockImplementation((callback: (entries: ResizeObserverEntry[]) => void) => {
                triggerResize = (width: number) => {
                    act(() => {
                        callback([{ contentRect: { width } as DOMRectReadOnly } as ResizeObserverEntry]);
                    });
                };
                return {
                    observe: vi.fn(),
                    disconnect: vi.fn(),
                };
            }),
        );
    });

    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
    });

    it("renders children", () => {
        const { getByText } = render(<LightBoxLeftSidebar>Sidebar content</LightBoxLeftSidebar>);
        expect(getByText("Sidebar content")).toBeInTheDocument();
    });

    it("hides inner content on initial observation below minVisibleWidth", () => {
        const { container } = render(<LightBoxLeftSidebar>Content</LightBoxLeftSidebar>);
        triggerResize(50);
        expect(container.querySelector(`.${styles.lightBoxLeftSidebarInner}`)?.classList.contains(styles.hidden)).toBe(
            true,
        );
    });

    it("shows inner content on initial observation above minVisibleWidth", () => {
        const { container } = render(<LightBoxLeftSidebar>Content</LightBoxLeftSidebar>);
        triggerResize(150);
        expect(container.querySelector(`.${styles.lightBoxLeftSidebarInner}`)?.classList.contains(styles.hidden)).toBe(
            false,
        );
    });

    it("calls onHide on initial observation if width is below minVisibleWidth", () => {
        const onHide = vi.fn();
        render(<LightBoxLeftSidebar onHide={onHide}>Content</LightBoxLeftSidebar>);
        triggerResize(50);
        expect(onHide).toHaveBeenCalledTimes(1);
    });

    it("does not call onShow on initial observation if width is above minVisibleWidth", () => {
        const onShow = vi.fn();
        render(<LightBoxLeftSidebar onShow={onShow}>Content</LightBoxLeftSidebar>);
        triggerResize(150);
        expect(onShow).not.toHaveBeenCalled();
    });

    it("calls onHide when width drops below minVisibleWidth", () => {
        const onHide = vi.fn();
        render(<LightBoxLeftSidebar onHide={onHide}>Content</LightBoxLeftSidebar>);
        triggerResize(150); // initial: visible
        triggerResize(50); // change: hidden
        expect(onHide).toHaveBeenCalledTimes(1);
    });

    it("calls onShow when width rises above minVisibleWidth", () => {
        const onShow = vi.fn();
        render(<LightBoxLeftSidebar onShow={onShow}>Content</LightBoxLeftSidebar>);
        triggerResize(50); // initial: hidden
        triggerResize(150); // change: visible
        expect(onShow).toHaveBeenCalledTimes(1);
    });

    it("does not call callbacks when width stays on the same side of threshold", () => {
        const onShow = vi.fn();
        const onHide = vi.fn();
        render(
            <LightBoxLeftSidebar onShow={onShow} onHide={onHide}>
                Content
            </LightBoxLeftSidebar>,
        );
        triggerResize(150); // initial: visible
        triggerResize(200); // still visible
        triggerResize(120); // still visible
        expect(onShow).not.toHaveBeenCalled();
        expect(onHide).not.toHaveBeenCalled();
    });

    it("respects custom minVisibleWidth", () => {
        const onHide = vi.fn();
        render(
            <LightBoxLeftSidebar minVisibleWidth={200} onHide={onHide}>
                Content
            </LightBoxLeftSidebar>,
        );
        triggerResize(250); // initial: visible (250 > 200)
        triggerResize(150); // change: hidden (150 <= 200)
        expect(onHide).toHaveBeenCalledTimes(1);
    });
});
