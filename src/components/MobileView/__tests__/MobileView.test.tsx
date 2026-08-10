import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MobileView } from "../MobileView";

describe("MobileView", () => {
    const mockMatchMedia = vi.fn();
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    const mockChildren = <div data-testid="children">Mobile content</div>;
    const mockFallback = <div data-testid="fallback">Desktop content</div>;

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

    describe("rendering", () => {
        it("should render children when screen width matches mobile", () => {
            setMatches(true);

            render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when screen width does not match mobile", () => {
            setMatches(false);

            render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should render nothing when the matched branch is null", () => {
            setMatches(true);

            const { container } = render(<MobileView fallback={mockFallback}>{null}</MobileView>);

            expect(container).toBeEmptyDOMElement();
        });

        it("should render nothing when the matched fallback is null", () => {
            setMatches(false);

            const { container } = render(<MobileView fallback={null}>{mockChildren}</MobileView>);

            expect(container).toBeEmptyDOMElement();
        });

        it("should not wrap the rendered branch into its own markup", () => {
            setMatches(false);

            const { container } = render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(container.firstChild).toBe(screen.getByTestId("fallback"));
        });
    });

    describe("media query", () => {
        it("should subscribe to the mobile breakpoint media query", () => {
            setMatches(true);

            render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
            expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });

        it("should switch to children when the media query starts matching", () => {
            setMatches(false);

            render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(screen.getByTestId("fallback")).toBeInTheDocument();

            act(() => {
                getChangeHandler()({ matches: true });
            });

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should switch to fallback when the media query stops matching", () => {
            setMatches(true);

            render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            expect(screen.getByTestId("children")).toBeInTheDocument();

            act(() => {
                getChangeHandler()({ matches: false });
            });

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should unsubscribe from the media query on unmount", () => {
            setMatches(true);

            const { unmount } = render(<MobileView fallback={mockFallback}>{mockChildren}</MobileView>);

            unmount();

            expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });

    it("should have correct displayName", () => {
        expect(MobileView.displayName).toBe("MobileView");
    });
});
