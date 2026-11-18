import React from "react";
import { act, render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IDropdownListKeyboard, useDropdownListKeyboard } from "../useDropdownListKeyboard";
import { EVENT_KEY_CODES } from "../../../utils/keyboard";

/**
 * Рендерит компонент, вызывающий useDropdownListKeyboard, и отдаёт наружу его последний результат.
 * Обёртка вместо renderHook: в release-0 (React 17) запинен @testing-library/react 12,
 * где renderHook ещё не экспортируется.
 */
const renderUseDropdownListKeyboard = () => {
    const result = {} as { current: IDropdownListKeyboard };

    const KeyboardReader: React.FC = () => {
        result.current = useDropdownListKeyboard();

        return null;
    };

    const { rerender } = render(<KeyboardReader />);

    return { result, rerender: () => rerender(<KeyboardReader />) };
};

/** Минимальное keydown-событие: хук только передаёт его зарегистрированному обработчику. */
const createEvent = () =>
    ({ keyCode: EVENT_KEY_CODES.ARROW_DOWN, preventDefault: vi.fn() }) as unknown as React.KeyboardEvent;

describe("useDropdownListKeyboard", () => {
    it("returns false while no list handler is registered", () => {
        const { result } = renderUseDropdownListKeyboard();

        expect(result.current.handleKeyDown(createEvent())).toBe(false);
    });

    it("passes the event to the registered handler and returns its result", () => {
        const { result } = renderUseDropdownListKeyboard();
        const handler = vi.fn(() => true);
        const event = createEvent();

        const unregister = result.current.context.registerKeyDownHandler(handler);

        expect(result.current.handleKeyDown(event)).toBe(true);
        expect(handler).toHaveBeenCalledWith(event);

        unregister();

        expect(result.current.handleKeyDown(event)).toBe(false);
    });

    it("does not unregister a handler registered later", () => {
        const { result } = renderUseDropdownListKeyboard();
        const laterHandler = vi.fn(() => true);

        const unregisterEarlier = result.current.context.registerKeyDownHandler(() => false);
        result.current.context.registerKeyDownHandler(laterHandler);
        unregisterEarlier();

        expect(result.current.handleKeyDown(createEvent())).toBe(true);
        expect(laterHandler).toHaveBeenCalledTimes(1);
    });

    it("exposes activeDescendant set through the context", () => {
        const { result } = renderUseDropdownListKeyboard();

        act(() => result.current.context.setActiveDescendant("item-1"));

        expect(result.current.activeDescendant).toBe("item-1");
        expect(result.current.context.activeDescendant).toBe("item-1");
    });

    it("keeps handlers and context stable between renders", () => {
        const { result, rerender } = renderUseDropdownListKeyboard();
        const { context, handleKeyDown } = result.current;

        rerender();

        expect(result.current.context).toBe(context);
        expect(result.current.handleKeyDown).toBe(handleKeyDown);

        act(() => result.current.context.setActiveDescendant("item-1"));

        expect(result.current.context).not.toBe(context);
        expect(result.current.context.registerKeyDownHandler).toBe(context.registerKeyDownHandler);
        expect(result.current.handleKeyDown).toBe(handleKeyDown);
    });
});
