import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { LightBox, lightBoxMountNodeIdDefault } from "../LightBox";
import { ELightBoxSize } from "../enums";
import styles from "../styles/LightBox.module.less";
import { addClassNameWithScrollbarWidth } from "../../../utils/scroll/scrollbar";

interface IFocusTrapMockProps {
    active?: boolean;
    children?: React.ReactNode;
}

const focusTrapMock = vi.fn();

vi.mock("focus-trap-react", () => ({
    default: (props: IFocusTrapMockProps) => {
        focusTrapMock(props);
        return <>{props.children}</>;
    },
}));

vi.mock("../../Portal/Portal", () => ({
    Portal: ({ children }: { children: React.ReactElement }) => <>{children}</>,
}));

vi.mock("../../MobileView/MobileView", () => ({
    MobileView: ({ children, fallback }: { children: React.ReactElement; fallback: React.ReactElement }) => (
        <div data-testid="mobile-view">
            {fallback}
            {children}
        </div>
    ),
}));

vi.mock("react-resize-detector", () => ({
    useResizeDetector: () => ({ ref: vi.fn() }),
}));

vi.mock("../LightBoxViewManager/LightBoxViewManager", () => ({
    LightBoxViewManager: () => null,
}));

vi.mock("../../../utils/scroll/scrollbar", () => ({
    addClassNameWithScrollbarWidth: vi.fn(),
}));

vi.mock("../../ThemeProvider/useToken", () => ({
    useToken: () => ({
        scopeClassName: "theme-scope",
        theme: "light",
        tokens: {},
    }),
}));

describe("LightBox", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        document.documentElement.className = "";
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
        document.body.innerHTML = "";
        document.documentElement.className = "";
        vi.useRealTimers();
    });

    it("renders children inside portal and toggles overflow class", () => {
        const { unmount } = render(
            <LightBox>
                {[
                    <LightBox.Content key="content">
                        <div>Dialog content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        expect(screen.getAllByText("Dialog content")[0]).toBeInTheDocument();
        expect(document.getElementById(lightBoxMountNodeIdDefault)).toBeTruthy();
        expect(document.documentElement.classList.contains(styles.bodyOverflowHidden)).toBe(true);
        expect(addClassNameWithScrollbarWidth).toHaveBeenCalledTimes(1);

        unmount();
        expect(document.documentElement.classList.contains(styles.bodyOverflowHidden)).toBe(false);
    });

    it("keeps overflow class while another lightbox is still mounted", () => {
        // Сценарий переключения через роутер: второй лайтбокс монтируется раньше, чем размонтируется первый.
        const first = render(
            <LightBox>
                {[
                    <LightBox.Content key="content">
                        <div>first</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );
        const second = render(
            <LightBox>
                {[
                    <LightBox.Content key="content">
                        <div>second</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        first.unmount();
        expect(document.documentElement.classList.contains(styles.bodyOverflowHidden)).toBe(true);

        second.unmount();
        expect(document.documentElement.classList.contains(styles.bodyOverflowHidden)).toBe(false);
    });

    it("disables focus trap while loading", () => {
        focusTrapMock.mockClear();

        render(
            <LightBox isLoading>
                {[
                    <LightBox.Content key="content">
                        <div>loading state</div>
                    </LightBox.Content>,
                    <LightBox.Controls key="controls">
                        <div data-test-id="controls" />
                    </LightBox.Controls>,
                ]}
            </LightBox>,
        );

        expect(focusTrapMock).toHaveBeenCalled();
        const focusTrapProps = focusTrapMock.mock.calls[0][0];
        expect(focusTrapProps.active).toBe(false);
    });

    it("applies loading state class to the dialog element", () => {
        // По классу состояния загрузки контролы поднимаются над лоадером контента,
        // иначе кнопка закрытия перекрыта и недоступна для клика.
        const { rerender } = render(
            <LightBox isLoading>
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        expect(screen.getByRole("dialog")).toHaveClass(styles.isLoading);

        rerender(
            <LightBox>
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        expect(screen.getByRole("dialog")).not.toHaveClass(styles.isLoading);
    });

    it("applies size class to the dialog element", () => {
        render(
            <LightBox size={ELightBoxSize.LG}>
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        expect(screen.getByRole("dialog")).toHaveClass(styles.lg);
    });

    it("applies overlay state classes when side and top overlays are opened", () => {
        render(
            <LightBox isSideOverlayOpened isTopOverlayOpened>
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveClass(styles.lightBoxSideOverlayActive);
        expect(dialog).toHaveClass(styles.lightBoxTopOverlayActive);
    });

    it("passes forwardRef and merges className on the dialog element", () => {
        const forwardRef: React.MutableRefObject<HTMLElement | null> = { current: null };

        render(
            <LightBox forwardRef={forwardRef} className="custom-class">
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        expect(forwardRef.current).toBeInstanceOf(HTMLDivElement);
        expect(forwardRef.current).toHaveClass("custom-class", styles.lightBox);
    });

    it("renders into provided mountNode", () => {
        const mountNode = document.createElement("div");
        document.body.appendChild(mountNode);

        render(
            <LightBox mountNode={mountNode}>
                {[
                    <LightBox.Content key="content">
                        <div>content</div>
                    </LightBox.Content>,
                ]}
            </LightBox>,
        );

        // Дефолтная mount-нода не создаётся, когда передана пользовательская.
        expect(document.getElementById(lightBoxMountNodeIdDefault)).toBeNull();
    });
});
