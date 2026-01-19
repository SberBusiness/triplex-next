import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { LightBox } from "../LightBox";
import styles from "../styles/LightBox.module.less";
import { addClassNameWithScrollbarWidth } from "../../../utils/scroll/scrollbar";

const focusTrapMock = vi.fn();

vi.mock("focus-trap-react", () => ({
    default: (props: { children: React.ReactElement }) => {
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
        vi.useFakeTimers();

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
        expect(document.getElementById("LightBox-next-mount-node")).toBeTruthy();
        expect(document.documentElement.classList.contains(styles.bodyOverflowHidden)).toBe(true);
        expect(addClassNameWithScrollbarWidth).toHaveBeenCalledTimes(1);

        unmount();
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
});
