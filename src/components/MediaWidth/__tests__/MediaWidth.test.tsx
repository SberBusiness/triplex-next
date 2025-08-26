import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MediaWidth } from "@sberbusiness/triplex-next/components";
import { EScreenWidth } from "../../../helpers/breakpoints";

describe("MediaWidth", () => {
    const mockMatchMedia = vi.fn();

    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: mockMatchMedia,
    });

    const mockChildren = <div data-testid="children">Children content</div>;
    const mockFallback = <div data-testid="fallback">Fallback content</div>;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("when both minWidth and maxWidth are provided", () => {
        it("should render MediaBetweenWidth component with children", () => {
            window.innerWidth = 700;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth >= 576 && window.innerWidth <= 991,
            }));

            render(
                <MediaWidth minWidth={EScreenWidth.SM_MIN} maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
        });

        it("should render MediaBetweenWidth component with fallback", () => {
            window.innerWidth = 1000;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth >= 576 && window.innerWidth <= 991,
            }));

            render(
                <MediaWidth minWidth={EScreenWidth.SM_MIN} maxWidth={EScreenWidth.MD_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
        });
    });

    describe("when only minWidth is provided", () => {
        it("should render MediaMinWidth component with children", () => {
            window.innerWidth = 800;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth >= 768,
            }));

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
        });

        it("should render MediaMinWidth component with fallback", () => {
            window.innerWidth = 500;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth >= 768,
            }));

            render(
                <MediaWidth minWidth={EScreenWidth.MD_MIN} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
        });
    });

    describe("when only maxWidth is provided", () => {
        it("should render MediaMaxWidth component with children", () => {
            window.innerWidth = 500;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth <= 767,
            }));

            render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("children")).toBeInTheDocument();
        });

        it("should render MediaMaxWidth component with fallback", () => {
            window.innerWidth = 800;

            mockMatchMedia.mockImplementation(() => ({
                matches: window.innerWidth <= 767,
            }));

            render(
                <MediaWidth maxWidth={EScreenWidth.SM_MAX} fallback={mockFallback}>
                    {mockChildren}
                </MediaWidth>,
            );

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
        });
    });

    describe("when neither minWidth nor maxWidth are provided", () => {
        it("should render fallback content", () => {
            render(<MediaWidth fallback={mockFallback}>{mockChildren}</MediaWidth>);

            expect(screen.getByTestId("fallback")).toBeInTheDocument();
            expect(screen.queryByTestId("children")).not.toBeInTheDocument();
        });
    });
});
