import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandHeader } from "../components/IslandHeader";

describe("IslandHeader", () => {
    it("renders children inside the root element", () => {
        render(<IslandHeader data-testid="header">Header content</IslandHeader>);

        const header = screen.getByTestId("header");

        expect(header).toHaveClass("islandHeader");
        expect(header).toHaveTextContent("Header content");
    });

    it("merges custom className with base class", () => {
        render(
            <IslandHeader data-testid="header" className="custom">
                Header content
            </IslandHeader>,
        );

        expect(screen.getByTestId("header")).toHaveClass("islandHeader", "custom");
    });

    it("passes through additional props", () => {
        render(
            <IslandHeader data-testid="header" id="header-id" aria-label="Header">
                Header content
            </IslandHeader>,
        );

        const header = screen.getByTestId("header");

        expect(header).toHaveAttribute("id", "header-id");
        expect(header).toHaveAttribute("aria-label", "Header");
    });

    it("forwards ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <IslandHeader data-testid="header" ref={ref}>
                Header content
            </IslandHeader>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("header"));
    });
});
