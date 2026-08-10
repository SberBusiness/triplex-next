import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useMobileView } from "../useMobileView";

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

    it("should return true when screen width matches mobile", () => {
        setMatches(true);

        const { result } = renderHook(() => useMobileView());

        expect(result.current).toBe(true);
    });

    it("should return false when screen width does not match mobile", () => {
        setMatches(false);

        const { result } = renderHook(() => useMobileView());

        expect(result.current).toBe(false);
    });

    it("should use the same media query as MobileView", () => {
        setMatches(false);

        renderHook(() => useMobileView());

        expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
    });

    it("should update the returned value on media query change", () => {
        setMatches(false);

        const { result } = renderHook(() => useMobileView());

        act(() => {
            getChangeHandler()({ matches: true });
        });

        expect(result.current).toBe(true);

        act(() => {
            getChangeHandler()({ matches: false });
        });

        expect(result.current).toBe(false);
    });

    it("should unsubscribe from the media query on unmount", () => {
        setMatches(true);

        const { unmount } = renderHook(() => useMobileView());

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    });
});
