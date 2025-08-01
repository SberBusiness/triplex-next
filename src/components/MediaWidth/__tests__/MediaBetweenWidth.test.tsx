import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MediaBetweenWidth } from "../MediaBetweenWidth";
import { EScreenWidth } from "../../../enums/EScreenWidth";

describe("MediaBetweenWidth", () => {
    const mockMatchMedia = vi.fn();
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();
    const mockAddListener = vi.fn();
    const mockRemoveListener = vi.fn();

    const mockChildren = <div data-testid="children">Children content</div>;
    const mockFallback = <div data-testid="fallback">Fallback content</div>;

    beforeEach(() => {
        vi.clearAllMocks();

        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: mockMatchMedia,
        });

        Object.defineProperty(window, "innerWidth", {
            writable: true,
            value: 800,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("initial render", () => {
        it("should render children when window width is within range", () => {
            window.innerWidth = 700; // Between SM_MIN (576px) and MD_MAX (991px)

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when window width is below minWidth", () => {
            window.innerWidth = 500; // Below SM_MIN (576px)

            mockMatchMedia.mockReturnValue({
                matches: false,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should render fallback when window width is above maxWidth", () => {
            window.innerWidth = 1000; // Above MD_MAX (991px)

            mockMatchMedia.mockReturnValue({
                matches: false,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should render children when window width equals minWidth", () => {
            window.innerWidth = 576; // Exactly SM_MIN

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render children when window width equals maxWidth", () => {
            window.innerWidth = 991; // Exactly MD_MAX

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });
    });

    describe("media query setup", () => {
        it("should create correct media query string", () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 991px) and (min-width: 576px)");
        });

        it("should add event listener for media query changes", () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });

    describe("media query change handling", () => {
        it("should update state when media query matches changes to true", () => {
            // Set initial window width to be outside the range
            window.innerWidth = 500; // Below SM_MIN (576px)

            const mockMediaQueryList = {
                matches: false,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            };

            mockMatchMedia.mockReturnValue(mockMediaQueryList);

            const { rerender } = render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            // Initially should show fallback
            expect(screen.getByTestId("fallback")).toBeInTheDocument();

            // Simulate media query change to matches: true
            const changeHandler = mockAddEventListener.mock.calls[0][1];
            act(() => {
                changeHandler({ matches: true });
            });

            // Re-render to see the state change
            rerender(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should update state when media query matches changes to false", () => {
            // Set initial window width to be within the range
            window.innerWidth = 700; // Between SM_MIN (576px) and MD_MAX (991px)

            const mockMediaQueryList = {
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            };

            mockMatchMedia.mockReturnValue(mockMediaQueryList);

            const { rerender } = render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            // Initially should show children
            expect(screen.getByTestId("children")).toBeInTheDocument();

            // Simulate media query change to matches: false
            const changeHandler = mockAddEventListener.mock.calls[0][1];
            act(() => {
                changeHandler({ matches: false });
            });

            // Re-render to see the state change
            rerender(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });
    });

    describe("cleanup", () => {
        it("should remove event listener on unmount", () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
                addListener: mockAddListener,
                removeListener: mockRemoveListener,
            });

            const { unmount } = render(
                <MediaBetweenWidth
                    minWidth={EScreenWidth.SM_MIN}
                    maxWidth={EScreenWidth.MD_MAX}
                    fallback={mockFallback}
                >
                    {mockChildren}
                </MediaBetweenWidth>,
            );

            unmount();

            expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });
});
