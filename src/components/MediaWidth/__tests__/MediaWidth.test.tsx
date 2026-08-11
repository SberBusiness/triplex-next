import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MediaWidth } from "../MediaWidth";
import { EScreenWidth } from "../../../helpers/breakpoints";

describe("MediaWidth", () => {
    const mockMatchMedia = vi.fn();
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

    const mockChildren = <div data-testid="children">Children content</div>;
    const mockFallback = <div data-testid="fallback">Fallback content</div>;

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

    describe("when both minWidth and maxWidth are provided", () => {
        it("should subscribe to the between-width media query", () => {
            setMatches(true);

            render(
                <MediaWidth minWidth={EScreenWidth.SM_MIN} maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 991px) and (min-width: 576px)");
        });

        it("should render children when the media query matches", () => {
            setMatches(true);

            render(
                <MediaWidth minWidth={EScreenWidth.SM_MIN} maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when the media query does not match", () => {
            setMatches(false);

            render(
                <MediaWidth minWidth={EScreenWidth.SM_MIN} maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });
    });

    describe("when only minWidth is provided", () => {
        it("should subscribe to the min-width media query", () => {
            setMatches(true);

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
        });

        it("should render children when the media query matches", () => {
            setMatches(true);

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when the media query does not match", () => {
            setMatches(false);

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });
    });

    describe("when only maxWidth is provided", () => {
        it("should subscribe to the max-width media query", () => {
            setMatches(true);

            render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");
        });

        it("should render children when the media query matches", () => {
            setMatches(true);

            render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when the media query does not match", () => {
            setMatches(false);

            render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });
    });

    describe("when neither minWidth nor maxWidth are provided", () => {
        it("should render fallback content", () => {
            render(<MediaWidth fallback={mockFallback}>{mockChildren}</MediaWidth>);

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should not subscribe to any media query", () => {
            render(<MediaWidth fallback={mockFallback}>{mockChildren}</MediaWidth>);

            expect(mockMatchMedia).not.toHaveBeenCalled();
            expect(mockAddEventListener).not.toHaveBeenCalled();
        });
    });

    describe("rendering", () => {
        it("should render nothing when the matched children is null", () => {
            setMatches(true);

            const { container } = render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {null}
                </MediaWidth>,
            );

            expect(container).toBeEmptyDOMElement();
        });

        it("should render nothing when the matched fallback is null", () => {
            setMatches(false);

            const { container } = render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={null}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(container).toBeEmptyDOMElement();
        });

        it("should not wrap the rendered branch into its own markup", () => {
            setMatches(true);

            const { container } = render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(container.firstChild).toBe(screen.getByTestId("children"));
        });
    });

    describe("media query subscription", () => {
        it("should switch to children when the media query starts matching", () => {
            setMatches(false);

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();

            act(() => {
                getChangeHandler()({ matches: true });
            });

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should switch to fallback when the media query stops matching", () => {
            setMatches(true);

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();

            act(() => {
                getChangeHandler()({ matches: false });
            });

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should resubscribe when the media query changes", () => {
            setMatches(true);

            const { rerender } = render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 767px)");

            rerender(
                <MediaWidth maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 991px)");
            expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });

        it("should unsubscribe from the media query on unmount", () => {
            setMatches(true);

            const { unmount } = render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            unmount();

            expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });

    it("should have correct displayName", () => {
        expect(MediaWidth.displayName).toBe("MediaWidth");
    });
});
