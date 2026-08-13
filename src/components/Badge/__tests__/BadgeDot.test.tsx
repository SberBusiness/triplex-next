import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BadgeDot } from "../BadgeDot";
import { EComponentSize } from "@sberbusiness/triplex-next/enums";

describe("BadgeDot", () => {
    it("should render as an empty span element", () => {
        const { container } = render(<BadgeDot size={EComponentSize.MD} />);
        const dot = container.firstChild;

        expect(dot).toBeInTheDocument();
        expect(dot?.nodeName).toBe("SPAN");
        expect(dot?.childNodes).toHaveLength(0);
    });

    it("should apply the base class", () => {
        const { container } = render(<BadgeDot size={EComponentSize.MD} />);

        expect(container.firstChild).toHaveClass("badgeDot");
    });

    it("should apply correct size class from the map", () => {
        const { container: sm } = render(<BadgeDot size={EComponentSize.SM} />);
        const { container: md } = render(<BadgeDot size={EComponentSize.MD} />);
        const { container: lg } = render(<BadgeDot size={EComponentSize.LG} />);

        expect(sm.firstChild).toHaveClass("sm");
        expect(md.firstChild).toHaveClass("md");
        expect(lg.firstChild).toHaveClass("lg");
    });

    it("should merge custom className with the base classes", () => {
        const { container } = render(<BadgeDot size={EComponentSize.SM} className="custom-class" />);
        const dot = container.firstChild;

        expect(dot).toHaveClass("custom-class");
        expect(dot).toHaveClass("badgeDot");
        expect(dot).toHaveClass("sm");
    });

    it("should forward ref correctly to the HTML element", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<BadgeDot size={EComponentSize.MD} ref={ref} />);

        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
        expect(ref.current).toHaveClass("badgeDot");
    });

    it("should spread rest props to the root element", () => {
        render(<BadgeDot size={EComponentSize.MD} data-testid="badge-dot" id="dot-id" aria-hidden />);
        const dot = screen.getByTestId("badge-dot");

        expect(dot).toHaveAttribute("id", "dot-id");
        expect(dot).toHaveAttribute("aria-hidden", "true");
    });

    it("should apply inline styles for positioning", () => {
        const { container } = render(
            <BadgeDot size={EComponentSize.LG} style={{ position: "absolute", top: "4px" }} />,
        );

        expect(container.firstChild).toHaveStyle({ position: "absolute", top: "4px" });
    });
});
