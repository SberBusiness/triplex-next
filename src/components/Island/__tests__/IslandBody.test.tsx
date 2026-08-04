import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IslandBody } from "../components/IslandBody";

describe("IslandBody", () => {
    it("renders children inside the root element", () => {
        render(<IslandBody data-testid="body">Body content</IslandBody>);

        const body = screen.getByTestId("body");

        expect(body).toHaveClass("islandBody");
        expect(body).toHaveTextContent("Body content");
    });

    it("merges custom className with base class", () => {
        render(
            <IslandBody data-testid="body" className="custom">
                Body content
            </IslandBody>,
        );

        expect(screen.getByTestId("body")).toHaveClass("islandBody", "custom");
    });

    it("passes through additional props", () => {
        render(
            <IslandBody data-testid="body" id="body-id" aria-label="Body">
                Body content
            </IslandBody>,
        );

        const body = screen.getByTestId("body");

        expect(body).toHaveAttribute("id", "body-id");
        expect(body).toHaveAttribute("aria-label", "Body");
    });

    it("forwards ref to root element", () => {
        const ref = React.createRef<HTMLDivElement>();

        render(
            <IslandBody data-testid="body" ref={ref}>
                Body content
            </IslandBody>,
        );

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toBe(screen.getByTestId("body"));
    });
});
