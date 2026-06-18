import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { OverlayMask } from "../OverlayMask";

afterEach(cleanup);

describe("OverlayMask", () => {
    it("renders a div with the mask class", () => {
        render(<OverlayMask data-testid="mask" opened={false} />);

        const mask = screen.getByTestId("mask");
        expect(mask.tagName).toBe("DIV");
        expect(mask).toHaveClass("overlayMask");
    });

    it("applies overlayOpened class when opened is true", () => {
        render(<OverlayMask data-testid="mask" opened />);
        expect(screen.getByTestId("mask")).toHaveClass("overlayOpened");
    });

    it("does not apply overlayOpened class when opened is false", () => {
        render(<OverlayMask data-testid="mask" opened={false} />);
        expect(screen.getByTestId("mask")).not.toHaveClass("overlayOpened");
    });

    it("merges custom className", () => {
        render(<OverlayMask data-testid="mask" opened={false} className="custom-mask" />);
        const mask = screen.getByTestId("mask");
        expect(mask).toHaveClass("overlayMask");
        expect(mask).toHaveClass("custom-mask");
    });

    it("forwards extra html attributes", () => {
        render(<OverlayMask data-testid="mask" opened={false} role="presentation" />);
        expect(screen.getByTestId("mask")).toHaveAttribute("role", "presentation");
    });

    it("forwards ref to the mask div", () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<OverlayMask ref={ref} data-testid="mask" opened={false} />);

        expect(ref.current).toBeInstanceOf(HTMLDivElement);
        expect(ref.current).toHaveClass("overlayMask");
    });

    it("has correct displayName", () => {
        expect(OverlayMask.displayName).toBe("OverlayMask");
    });
});
