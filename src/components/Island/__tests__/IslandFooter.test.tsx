import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandFooter } from "../components/IslandFooter";

describe("IslandFooter", () => {
    it("renders children inside the root element", () => {
        render(<IslandFooter data-testid="footer">Footer content</IslandFooter>);

        const footer = screen.getByTestId("footer");

        expect(footer).toHaveClass("islandFooter");
        expect(footer).toHaveTextContent("Footer content");
    });

    it("merges custom className with base class", () => {
        render(
            <IslandFooter data-testid="footer" className="custom">
                Footer content
            </IslandFooter>,
        );

        expect(screen.getByTestId("footer")).toHaveClass("islandFooter", "custom");
    });

    it("passes through additional props", () => {
        render(
            <IslandFooter data-testid="footer" id="footer-id" aria-label="Footer">
                Footer content
            </IslandFooter>,
        );

        const footer = screen.getByTestId("footer");

        expect(footer).toHaveAttribute("id", "footer-id");
        expect(footer).toHaveAttribute("aria-label", "Footer");
    });

    it("forwards ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <IslandFooter data-testid="footer" ref={ref}>
                Footer content
            </IslandFooter>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("footer"));
    });
});
