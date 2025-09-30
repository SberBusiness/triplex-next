import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MediaMinWidth } from "../MediaMinWidth";
import { EScreenWidth } from "../../../helpers/breakpoints";

describe("MediaMinWidth", () => {
    const mockMatchMedia = vi.fn();
    const mockAddEventListener = vi.fn();
    const mockRemoveEventListener = vi.fn();

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
        it("should render children when window width is above minWidth", () => {
            window.innerWidth = 800; // Above MD_MIN (768px)

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render fallback when window width is below minWidth", () => {
            window.innerWidth = 500; // Below MD_MIN (768px)

            mockMatchMedia.mockReturnValue({
                matches: false,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });

        it("should render children when window width equals minWidth", () => {
            window.innerWidth = 768; // Exactly MD_MIN

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should render children when window width is significantly above minWidth", () => {
            window.innerWidth = 1200; // Well above MD_MIN (768px)

            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });
    });

    describe("media query setup", () => {
        it("should create correct media query string for min-width", () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
        });

        it("should add event listener for media query changes", () => {
            mockMatchMedia.mockReturnValue({
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            });

            render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });

    describe("media query change handling", () => {
        it("should update state when media query matches changes to true", () => {
            // Set initial window width to be below the minWidth
            window.innerWidth = 500; // Below MD_MIN (768px)

            const mockMediaQueryList = {
                matches: false,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            };

            mockMatchMedia.mockReturnValue(mockMediaQueryList);

            const { rerender } = render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
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
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
            expect(screen.queryByTestId("fallback")).not.toBeInTheDocument();
        });

        it("should update state when media query matches changes to false", () => {
            // Set initial window width to be above the minWidth
            window.innerWidth = 800; // Above MD_MIN (768px)

            const mockMediaQueryList = {
                matches: true,
                addEventListener: mockAddEventListener,
                removeEventListener: mockRemoveEventListener,
            };

            mockMatchMedia.mockReturnValue(mockMediaQueryList);

            const { rerender } = render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
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
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
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
            });

            const { unmount } = render(
                <MediaMinWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaMinWidth>,
            );

            unmount();

            expect(mockRemoveEventListener).toHaveBeenCalledWith("change", expect.any(Function));
        });
    });
});
