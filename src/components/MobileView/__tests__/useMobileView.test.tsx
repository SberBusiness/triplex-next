import React from "react";
import { render, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useMobileView } from "../useMobileView";

/**
 * Рендерит компонент, вызывающий useMobileView, и отдаёт его результат наружу теста.
 * Обёртка вместо renderHook: в release-0 (React 17) запинен @testing-library/react 12,
 * где renderHook ещё не экспортируется.
 */
const renderUseMobileView = () => {
    const results: boolean[] = [];

    const MobileViewReader: React.FC = () => {
        results.push(useMobileView());

        return null;
    };

    const { unmount } = render(<MobileViewReader />);

    return { unmount, getLastResult: () => results[results.length - 1] };
};

describe("useMobileView", () => {
    const mockMatchMedia = vi.fn();
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    /** Подменяет window.matchMedia результатом медиа-запроса. */
    const setMatches = (matches: boolean) => {
        mockMatchMedia.mockReturnValue({
            matches,
            addEventListener: mockAddEventListener,
            removeEventListener: mockRemoveEventListener,
        });
    };

    /** Возвращает обработчик change, переданный в addEventListener при подписке. */
    const getChangeHandler = (): ((event: { matches: boolean }) => void) => mockAddEventListener.mock.calls[0][1];

    beforeEach(() => {
        vi.clearAllMocks();

        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: mockMatchMedia,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should return true when screen width matches mobile", () => {
        setMatches(true);

        const { getLastResult } = renderUseMobileView();

        expect(getLastResult()).toBe(true);
    });

    it("should return false when screen width does not match mobile", () => {
        setMatches(false);

        const { getLastResult } = renderUseMobileView();

        expect(getLastResult()).toBe(false);
    });

    it("should use the same media query as MobileView", () => {
        setMatches(false);

        renderUseMobileView();

        expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    });

    it("should update the returned value on media query change", () => {
        setMatches(false);

        const { getLastResult } = renderUseMobileView();

        act(() => {
            getChangeHandler()({ matches: true });
        });

        expect(getLastResult()).toBe(true);

        act(() => {
            getChangeHandler()({ matches: false });
        });

        expect(getLastResult()).toBe(false);
    });

    it("should unsubscribe from the media query on unmount", () => {
        setMatches(true);

        const { unmount } = renderUseMobileView();

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });
});
