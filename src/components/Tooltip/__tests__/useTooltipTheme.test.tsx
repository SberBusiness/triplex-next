import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useTooltipTheme } from "../utils/useTooltipTheme";
import { TEST_SCOPE_CLASS_NAME, ThemeContextWrapper } from "../../../../test-utils/theme";

const COUNTER_ATTR = `data-tooltip-theme-${TEST_SCOPE_CLASS_NAME}-counter`;

/** Компонент-обёртка, вызывающая тестируемый хук. */
const ThemeConsumer: React.FC<{ open: boolean; container: Element }> = ({ open, container }) => {
    useTooltipTheme(open, container);

    return null;
};

const renderTree = (open: boolean, container: Element, scopeClassName?: string) => (
    <ThemeContextWrapper scopeClassName={scopeClassName}>
        <ThemeConsumer open={open} container={container} />
    </ThemeContextWrapper>
);

const renderHookComponent = (open: boolean, container: Element, scopeClassName?: string) =>
    render(renderTree(open, container, scopeClassName));

describe("useTooltipTheme", () => {
    let container: HTMLElement;

    beforeEach(() => {
        vi.useFakeTimers();
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        vi.useRealTimers();
        container.remove();
    });

    it("should not touch the container when there is no theme scope class", () => {
        renderHookComponent(true, container, "");

        expect(container.className).toBe("");
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);
    });

    it("should add the theme class and start the usage counter when opened", () => {
        renderHookComponent(true, container);

        expect(container).toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.getAttribute(COUNTER_ATTR)).toBe("1");
    });

    it("should not add the theme class while closed", () => {
        renderHookComponent(false, container);

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);
    });

    it("should remove the theme class after the closing animation delay", () => {
        const { rerender } = renderHookComponent(true, container);

        rerender(renderTree(false, container));

        // Класс держится, пока проигрывается анимация закрытия.
        expect(container).toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);

        vi.advanceTimersByTime(500);

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
    });

    it("should keep the theme class while another tooltip still uses the container", () => {
        const first = renderHookComponent(true, container);
        const second = renderHookComponent(true, container);

        expect(container.getAttribute(COUNTER_ATTR)).toBe("2");

        first.unmount();

        // Второй тултип ещё открыт — класс остаётся сразу же.
        expect(container).toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.getAttribute(COUNTER_ATTR)).toBe("1");

        second.unmount();

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);
    });

    it("should remove the theme class on unmount of the last open tooltip", () => {
        const { unmount } = renderHookComponent(true, container);

        unmount();

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);
    });

    it("should keep the theme class when the tooltip is reopened before the delay expires", () => {
        const { rerender } = renderHookComponent(true, container);

        rerender(renderTree(false, container));
        vi.advanceTimersByTime(200);
        rerender(renderTree(true, container));
        vi.advanceTimersByTime(500);

        expect(container).toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.getAttribute(COUNTER_ATTR)).toBe("1");
    });

    it("should keep the theme class when another tooltip claims the container during the delay", () => {
        const first = renderHookComponent(true, container);

        first.rerender(renderTree(false, container));
        vi.advanceTimersByTime(200);

        const second = renderHookComponent(true, container);

        vi.advanceTimersByTime(500);

        expect(container).toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.getAttribute(COUNTER_ATTR)).toBe("1");

        second.unmount();

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
    });

    it("should remove the theme class on unmount during the pending cleanup", () => {
        const { rerender, unmount } = renderHookComponent(true, container);

        rerender(renderTree(false, container));
        unmount();

        expect(container).not.toHaveClass(TEST_SCOPE_CLASS_NAME);
        expect(container.hasAttribute(COUNTER_ATTR)).toBe(false);
    });
});
